import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../services/authService";
import { supabase } from "../lib/supabaseClient";
import type { User } from "@supabase/supabase-js";
import HeaderOne from "../layouts/headers/HeaderOne";
import FooterOne from "../layouts/footers/FooterOne";
import Wrapper from "../common/Wrapper";

interface Beat {
  id: string;
  title: string;
  description?: string;
  genre?: string;
  bpm?: number;
  key?: string;
  file_url: string;
  cover_image_url?: string;
  file_size?: number;
  duration?: number;
  created_at: string;
  updated_at: string;
  user_id: string;
  show_on_profile?: boolean;
  profile_order?: number;
}

interface ProfileSettings {
  id?: string;
  user_id: string;
  profile_title?: string;
  profile_description?: string;
  profile_image_url?: string;
  profile_username?: string;
  show_contact_info?: boolean;
  contact_email?: string;
  contact_phone?: string;
  social_links?: {
    instagram?: string;
    twitter?: string;
    youtube?: string;
    soundcloud?: string;
  };
  created_at?: string;
  updated_at?: string;
}

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [beats, setBeats] = useState<Beat[]>([]);
  const [profileSettings, setProfileSettings] = useState<ProfileSettings>({
    user_id: "",
    profile_title: "",
    profile_description: "",
    profile_username: "",
    show_contact_info: false,
    contact_email: "",
    contact_phone: "",
    social_links: {
      instagram: "",
      twitter: "",
      youtube: "",
      soundcloud: "",
    },
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [publicUrl, setPublicUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const currentUser = await AuthService.getCurrentUser();
        setUser(currentUser);
        if (!currentUser) {
          navigate("/login");
        } else {
          await Promise.all([
            fetchBeats(currentUser.id),
            fetchProfileSettings(currentUser.id),
          ]);
          setPublicUrl(`${window.location.origin}/public-profile/${currentUser.id}`);
        }
      } catch (error) {
        console.error("Error getting current user:", error);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    getCurrentUser();
  }, [navigate]);

  const fetchBeats = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("beats")
        .select("*")
        .eq("user_id", userId)
        .order("profile_order", { ascending: true, nullsLast: true })
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching beats:", error);
        return;
      }

      setBeats(data || []);
    } catch (error) {
      console.error("Error fetching beats:", error);
    }
  };

  const fetchProfileSettings = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profile_settings")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 means no rows found
        console.error("Error fetching profile settings:", error);
        return;
      }

      if (data) {
        setProfileSettings({
          ...data,
          social_links: data.social_links || {
            instagram: "",
            twitter: "",
            youtube: "",
            soundcloud: "",
          },
        });
      } else {
        // Initialize with user data
        setProfileSettings({
          user_id: userId,
          profile_title: user?.user_metadata?.name || user?.email || "",
          profile_username: user?.email?.split('@')[0] || "",
          social_links: {
            instagram: "",
            twitter: "",
            youtube: "",
            soundcloud: "",
          },
        });
      }
    } catch (error) {
      console.error("Error fetching profile settings:", error);
    }
  };

  const handleFileUpload = async (file: File, bucket: string) => {
    if (!user) throw new Error("User not authenticated");

    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${user.id}/${fileName}`;

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Upload error:', error);
      throw error;
    }

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const handleSaveProfile = async () => {
    if (!user) return;

    setSaving(true);
    
    // Add timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      setSaving(false);
      alert("Save operation timed out. Please try again.");
    }, 10000); // 10 second timeout

    try {
      console.log("Saving profile settings...", profileSettings);
      
      // Check if profile settings already exist
      const { data: existingProfile, error: checkError } = await supabase
        .from("profile_settings")
        .select("id")
        .eq("user_id", user.id)
        .single();

      let result;
      
      if (checkError && checkError.code === 'PGRST116') {
        // No existing profile, insert new one
        console.log("Creating new profile settings...");
        result = await supabase
          .from("profile_settings")
          .insert({
            ...profileSettings,
            user_id: user.id,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          .select()
          .single();
      } else if (existingProfile) {
        // Profile exists, update it
        console.log("Updating existing profile settings...");
        result = await supabase
          .from("profile_settings")
          .update({
            profile_title: profileSettings.profile_title,
            profile_description: profileSettings.profile_description,
            profile_image_url: profileSettings.profile_image_url,
            profile_username: profileSettings.profile_username,
            show_contact_info: profileSettings.show_contact_info,
            contact_email: profileSettings.contact_email,
            contact_phone: profileSettings.contact_phone,
            social_links: profileSettings.social_links,
            updated_at: new Date().toISOString(),
          })
          .eq("user_id", user.id)
          .select()
          .single();
      } else {
        throw checkError;
      }

      if (result.error) {
        console.error("Database error:", result.error);
        throw result.error;
      }

      console.log("Profile settings saved successfully:", result.data);
      setProfileSettings({ ...profileSettings, ...result.data });
      alert("Profile settings saved successfully!");
    } catch (error) {
      console.error("Error saving profile:", error);
      console.error("Full error details:", JSON.stringify(error, null, 2));
      alert(`Error saving profile settings: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      clearTimeout(timeoutId);
      setSaving(false);
    }
  };

  const handleBeatVisibilityToggle = async (beatId: string, showOnProfile: boolean) => {
    try {
      const { error } = await supabase
        .from("beats")
        .update({ show_on_profile: showOnProfile })
        .eq("id", beatId);

      if (error) {
        throw error;
      }

      // Update local state
      setBeats(beats.map(beat => 
        beat.id === beatId 
          ? { ...beat, show_on_profile: showOnProfile }
          : beat
      ));
    } catch (error) {
      console.error("Error updating beat visibility:", error);
      alert("Error updating beat visibility. Please try again.");
    }
  };

  const handleBeatReorder = async (beatId: string, newOrder: number) => {
    try {
      const { error } = await supabase
        .from("beats")
        .update({ profile_order: newOrder })
        .eq("id", beatId);

      if (error) {
        throw error;
      }

      // Update local state
      setBeats(beats.map(beat => 
        beat.id === beatId 
          ? { ...beat, profile_order: newOrder }
          : beat
      ));
    } catch (error) {
      console.error("Error reordering beat:", error);
      alert("Error reordering beat. Please try again.");
    }
  };

  const copyPublicUrl = () => {
    navigator.clipboard.writeText(publicUrl);
    alert("Public profile URL copied to clipboard!");
  };

  if (loading) {
    return null; // Let AuthGuard handle the loading state
  }

  if (!user) {
    return null;
  }

  return (
    <Wrapper>
      <div className="bg-dark">
        <HeaderOne />

        {/* Hero Section */}
        <div className="hero-1--container">
          <div className="hero-1">
            <div className="section-space-y">
              <div className="container">
                <div className="row g-4 align-items-center">
                  <div className="col-lg-8">
                    <div className="d-inline-flex align-items-center flex-wrap row-gap-2 column-gap-4">
                      <div className="flex-shrink-0 d-inline-block w-20 h-2px bg-primary-gradient"></div>
                      <span className="d-block fw-medium text-light fs-20">
                        Profile Settings
                      </span>
                    </div>
                    <h1 className="text-light">
                      Customize Your <span className="text-gradient-primary">Public Profile</span>
                    </h1>
                    <p className="text-light mb-8 max-text-11">
                      Set up how your profile appears to the public. Choose which beats to showcase, 
                      add your information, and create your unique artist profile.
                    </p>
                    <div className="d-inline-flex align-items-center flex-wrap row-gap-2 column-gap-6">
                      <button
                        onClick={copyPublicUrl}
                        className="btn btn-primary-gradient text-white fs-14 border-0 rounded-pill"
                      >
                        <i className="bi bi-link-45deg me-2"></i>
                        Copy Public Link
                      </button>
                      <button
                        onClick={() => navigate("/catalog")}
                        className="btn btn-outline-light text-white fs-14 border-1 rounded-pill"
                      >
                        <i className="bi bi-music-note-beamed me-2"></i>
                        Back to Catalog
                      </button>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="text-center">
                      <div className="bg-white/10 backdrop-blur rounded-3xl p-6 border border-white/20">
                        <div className="w-16 h-16 bg-primary-gradient rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4">
                          <i className="bi bi-person-gear text-white fs-24"></i>
                        </div>
                        <h4 className="text-white mb-2">Public Profile</h4>
                        <p className="text-light mb-0">Share with the world</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Settings Form */}
        <div className="section-space-y">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <div className="bg-white/5 backdrop-blur rounded-3xl p-6 border border-white/10 mb-6">
                  <h3 className="text-light mb-4">Profile Information</h3>
                  <div className="row g-4">
                    <div className="col-md-6">
                      <label className="form-label text-light">Profile Title</label>
                      <input
                        type="text"
                        className="form-control bg-transparent border-white/20 text-light"
                        value={profileSettings.profile_title || ""}
                        onChange={(e) => setProfileSettings({ ...profileSettings, profile_title: e.target.value })}
                        placeholder="e.g., Nadav - Music Producer"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label text-light">Username (for URL)</label>
                      <input
                        type="text"
                        className="form-control bg-transparent border-white/20 text-light"
                        value={profileSettings.profile_username || ""}
                        onChange={(e) => setProfileSettings({ ...profileSettings, profile_username: e.target.value })}
                        placeholder="e.g., nadav2323"
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label text-light">Profile Description</label>
                      <textarea
                        className="form-control bg-transparent border-white/20 text-light"
                        rows={4}
                        value={profileSettings.profile_description || ""}
                        onChange={(e) => setProfileSettings({ ...profileSettings, profile_description: e.target.value })}
                        placeholder="Tell people about yourself and your music..."
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label text-light">Profile Image</label>
                      <input
                        type="file"
                        className="form-control bg-transparent border-white/20 text-light"
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            try {
                              const url = await handleFileUpload(file, "covers");
                              setProfileSettings({ ...profileSettings, profile_image_url: url });
                            } catch (error) {
                              alert("Error uploading image. Please try again.");
                            }
                          }
                        }}
                      />
                      {profileSettings.profile_image_url && (
                        <div className="mt-3">
                          <img
                            src={profileSettings.profile_image_url}
                            alt="Profile"
                            className="rounded-3"
                            style={{ width: "150px", height: "150px", objectFit: "cover" }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="bg-white/5 backdrop-blur rounded-3xl p-6 border border-white/10 mb-6">
                  <h3 className="text-light mb-4">Social Links</h3>
                  <div className="row g-4">
                    <div className="col-md-6">
                      <label className="form-label text-light">Instagram</label>
                      <input
                        type="text"
                        className="form-control bg-transparent border-white/20 text-light"
                        value={profileSettings.social_links?.instagram || ""}
                        onChange={(e) => setProfileSettings({
                          ...profileSettings,
                          social_links: { ...profileSettings.social_links, instagram: e.target.value }
                        })}
                        placeholder="@yourusername"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label text-light">Twitter</label>
                      <input
                        type="text"
                        className="form-control bg-transparent border-white/20 text-light"
                        value={profileSettings.social_links?.twitter || ""}
                        onChange={(e) => setProfileSettings({
                          ...profileSettings,
                          social_links: { ...profileSettings.social_links, twitter: e.target.value }
                        })}
                        placeholder="@yourusername"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label text-light">YouTube</label>
                      <input
                        type="text"
                        className="form-control bg-transparent border-white/20 text-light"
                        value={profileSettings.social_links?.youtube || ""}
                        onChange={(e) => setProfileSettings({
                          ...profileSettings,
                          social_links: { ...profileSettings.social_links, youtube: e.target.value }
                        })}
                        placeholder="Channel URL"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label text-light">SoundCloud</label>
                      <input
                        type="text"
                        className="form-control bg-transparent border-white/20 text-light"
                        value={profileSettings.social_links?.soundcloud || ""}
                        onChange={(e) => setProfileSettings({
                          ...profileSettings,
                          social_links: { ...profileSettings.social_links, soundcloud: e.target.value }
                        })}
                        placeholder="Profile URL"
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleSaveProfile}
                  className="btn btn-primary-gradient text-white fs-14 border-0 rounded-pill"
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-check-circle me-2"></i>
                      Save Profile Settings
                    </>
                  )}
                </button>
                
                {saving && (
                  <div className="mt-3">
                    <small className="text-light text-opacity-75">
                      Please wait while we save your profile settings...
                    </small>
                  </div>
                )}
              </div>

              <div className="col-lg-4">
                {/* Public URL Card */}
                <div className="bg-white/5 backdrop-blur rounded-3xl p-6 border border-white/10 mb-6">
                  <h4 className="text-light mb-3">Your Public Profile</h4>
                  <p className="text-light text-opacity-75 mb-3">
                    Share this link with anyone to show your public profile:
                  </p>
                  <div className="bg-dark rounded-2 p-3 mb-3">
                    <code className="text-light small">{publicUrl}</code>
                  </div>
                  <button
                    onClick={copyPublicUrl}
                    className="btn btn-outline-light btn-sm w-100"
                  >
                    <i className="bi bi-copy me-2"></i>
                    Copy Link
                  </button>
                </div>

                {/* Preview Card */}
                <div className="bg-white/5 backdrop-blur rounded-3xl p-6 border border-white/10">
                  <h4 className="text-light mb-3">Preview</h4>
                  <div className="bg-dark rounded-3 p-4 text-center">
                    {profileSettings.profile_image_url ? (
                      <img
                        src={profileSettings.profile_image_url}
                        alt="Profile"
                        className="rounded-circle mb-3"
                        style={{ width: "80px", height: "80px", objectFit: "cover" }}
                      />
                    ) : (
                      <div className="w-20 h-20 bg-primary-gradient rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3">
                        <i className="bi bi-person-fill text-white fs-24"></i>
                      </div>
                    )}
                    <h5 className="text-light mb-2">
                      {profileSettings.profile_title || "Your Name"}
                    </h5>
                    <p className="text-light text-opacity-75 small mb-0">
                      {profileSettings.profile_description || "Your description will appear here..."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Beats Management */}
        <div className="section-space-y">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h2 className="text-light text-center mb-8">
                  Manage Your <span className="text-gradient-primary">Beat Visibility</span>
                </h2>
              </div>
            </div>
            <div className="row g-4">
              {beats.map((beat, index) => (
                <div key={beat.id} className="col-lg-6">
                  <div className="bg-white/5 backdrop-blur rounded-3xl p-6 border border-white/10">
                    <div className="d-flex align-items-start gap-4">
                      {beat.cover_image_url ? (
                        <img
                          src={beat.cover_image_url}
                          alt={beat.title}
                          className="rounded-3"
                          style={{ width: "80px", height: "80px", objectFit: "cover" }}
                        />
                      ) : (
                        <div className="w-20 h-20 bg-primary-gradient rounded-3 d-flex align-items-center justify-content-center">
                          <i className="bi bi-music-note-beamed text-white fs-20"></i>
                        </div>
                      )}
                      
                      <div className="flex-grow-1">
                        <h5 className="text-light mb-2">{beat.title}</h5>
                        <div className="d-flex flex-wrap gap-2 mb-3">
                          {beat.genre && (
                            <span className="badge bg-primary-gradient">{beat.genre}</span>
                          )}
                          {beat.bpm && (
                            <span className="badge bg-secondary">{beat.bpm} BPM</span>
                          )}
                        </div>
                        
                        <div className="d-flex align-items-center gap-3">
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id={`show-${beat.id}`}
                              checked={beat.show_on_profile || false}
                              onChange={(e) => handleBeatVisibilityToggle(beat.id, e.target.checked)}
                            />
                            <label className="form-check-label text-light" htmlFor={`show-${beat.id}`}>
                              Show on Profile
                            </label>
                          </div>
                          
                          {beat.show_on_profile && (
                            <div className="d-flex align-items-center gap-2">
                              <label className="text-light small">Order:</label>
                              <input
                                type="number"
                                className="form-control form-control-sm bg-transparent border-white/20 text-light"
                                style={{ width: "60px" }}
                                value={beat.profile_order || index + 1}
                                onChange={(e) => handleBeatReorder(beat.id, parseInt(e.target.value) || 1)}
                                min="1"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <FooterOne />
      </div>
    </Wrapper>
  );
};

export default Profile;
