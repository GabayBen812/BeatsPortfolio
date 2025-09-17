import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
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
  show_on_profile?: boolean;
  profile_order?: number;
}

interface ProfileSettings {
  id: string;
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
  created_at: string;
  updated_at: string;
}

interface User {
  id: string;
  email: string;
  user_metadata?: {
    name?: string;
    full_name?: string;
  };
}

const PublicProfile = () => {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [beats, setBeats] = useState<Beat[]>([]);
  const [profileSettings, setProfileSettings] = useState<ProfileSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  console.log("PublicProfile component rendered");
  console.log("userId from params:", userId);

  useEffect(() => {
    if (userId) {
      fetchPublicProfile(userId);
    }
  }, [userId]);

  const fetchPublicProfile = async (userId: string) => {
    try {
      console.log("Fetching public profile for user ID:", userId);
      console.log("Supabase client:", supabase);
      
      // Get user from users table (this should be publicly accessible)
      const { data: usersData, error: usersError } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .single();

      console.log("Users query result:", { usersData, usersError });
      console.log("Error details:", usersError ? {
        message: usersError.message,
        details: usersError.details,
        hint: usersError.hint,
        code: usersError.code
      } : "No error");

      if (usersError) {
        console.error("Error fetching user:", usersError);
        setError("Profile not found");
        return;
      }

      if (!usersData) {
        console.error("No user data found");
        setError("Profile not found");
        return;
      }

      setUser({
        id: usersData.id,
        email: usersData.email,
        user_metadata: { name: usersData.name }
      });

      // Fetch profile settings
      const { data: profileData, error: profileError } = await supabase
        .from("profile_settings")
        .select("*")
        .eq("user_id", userId)
        .single();

      console.log("Profile settings query result:", { profileData, profileError });

      if (profileError && profileError.code !== 'PGRST116') {
        console.error("Error fetching profile settings:", profileError);
      } else {
        setProfileSettings(profileData);
      }

      // Fetch public beats
      const { data: beatsData, error: beatsError } = await supabase
        .from("beats")
        .select("*")
        .eq("user_id", userId)
        .eq("show_on_profile", true)
        .order("profile_order", { ascending: true, nullsLast: true })
        .order("created_at", { ascending: false });

      if (beatsError) {
        console.error("Error fetching beats:", beatsError);
      } else {
        setBeats(beatsData || []);
      }
    } catch (error) {
      console.error("Error fetching public profile:", error);
      setError("Error loading profile");
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Debug: Show what we have
  console.log("PublicProfile render state:", { loading, error, user, userId, profileSettings, beats });

  if (loading) {
    return (
      <Wrapper>
        <div className="bg-dark min-vh-100 d-flex justify-content-center align-items-center">
          <div className="text-center">
            <div className="spinner-border text-primary mb-3" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="text-light">Loading profile...</p>
            <p className="text-light text-opacity-75 small">User ID: {userId}</p>
          </div>
        </div>
      </Wrapper>
    );
  }

  if (error || !user) {
    return (
      <Wrapper>
        <div className="bg-dark min-vh-100 d-flex justify-content-center align-items-center">
          <div className="text-center">
            <h1 className="text-light mb-4">Profile Not Found</h1>
            <p className="text-light text-opacity-75">
              The profile you're looking for doesn't exist or is not public.
            </p>
            <p className="text-light text-opacity-50 small mt-3">
              Debug info: User ID: {userId}, Error: {error || 'No error'}, User: {user ? 'Found' : 'Not found'}
            </p>
          </div>
        </div>
      </Wrapper>
    );
  }

  const displayTitle = profileSettings?.profile_title || user.user_metadata?.name || user.email;
  const displayDescription = profileSettings?.profile_description || "Music Producer";
  const displayImage = profileSettings?.profile_image_url;

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
                    <div className="d-flex align-items-center gap-4">
                      {displayImage ? (
                        <img
                          src={displayImage}
                          alt={displayTitle}
                          className="rounded-circle"
                          style={{ width: "120px", height: "120px", objectFit: "cover" }}
                        />
                      ) : (
                        <div className="w-30 h-30 bg-primary-gradient rounded-circle d-flex align-items-center justify-content-center">
                          <i className="bi bi-person-fill text-white fs-32"></i>
                        </div>
                      )}
                      
                      <div>
                        <h1 className="text-light mb-2">
                          {displayTitle}
                        </h1>
                        <p className="text-light text-opacity-75 mb-0">
                          {displayDescription}
                        </p>
                        {profileSettings?.social_links && (
                          <div className="d-flex gap-3 mt-3">
                            {profileSettings.social_links.instagram && (
                              <a
                                href={`https://instagram.com/${profileSettings.social_links.instagram.replace('@', '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-light text-opacity-75"
                              >
                                <i className="bi bi-instagram fs-20"></i>
                              </a>
                            )}
                            {profileSettings.social_links.twitter && (
                              <a
                                href={`https://twitter.com/${profileSettings.social_links.twitter.replace('@', '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-light text-opacity-75"
                              >
                                <i className="bi bi-twitter fs-20"></i>
                              </a>
                            )}
                            {profileSettings.social_links.youtube && (
                              <a
                                href={profileSettings.social_links.youtube}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-light text-opacity-75"
                              >
                                <i className="bi bi-youtube fs-20"></i>
                              </a>
                            )}
                            {profileSettings.social_links.soundcloud && (
                              <a
                                href={profileSettings.social_links.soundcloud}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-light text-opacity-75"
                              >
                                <i className="bi bi-soundwave fs-20"></i>
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="text-center">
                      <div className="bg-white/10 backdrop-blur rounded-3xl p-6 border border-white/20">
                        <div className="w-16 h-16 bg-primary-gradient rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4">
                          <i className="bi bi-music-note-beamed text-white fs-24"></i>
                        </div>
                        <h4 className="text-white mb-2">{beats.length}</h4>
                        <p className="text-light mb-0">Public Beats</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Beats Section */}
        <div className="section-space-y">
          <div className="container">
            {beats.length === 0 ? (
              <div className="text-center">
                <div className="bg-white/5 backdrop-blur rounded-3xl p-8 border border-white/10">
                  <div className="w-20 h-20 bg-primary-gradient rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4">
                    <i className="bi bi-music-note-beamed text-white fs-24"></i>
                  </div>
                  <h3 className="text-light mb-3">No Public Beats</h3>
                  <p className="text-light text-opacity-75 mb-0">
                    This producer hasn't made any beats public yet.
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="row">
                  <div className="col-12">
                    <h2 className="text-light text-center mb-8">
                      <span className="text-gradient-primary">Featured Beats</span>
                    </h2>
                  </div>
                </div>
                <div className="row g-4">
                  {beats.map((beat) => (
                    <div key={beat.id} className="col-lg-4 col-md-6">
                      <div className="bg-white/5 backdrop-blur rounded-3xl p-6 border border-white/10 h-100">
                        {beat.cover_image_url ? (
                          <img
                            src={beat.cover_image_url}
                            alt={beat.title}
                            className="w-100 rounded-3 mb-4"
                            style={{ height: "200px", objectFit: "cover" }}
                          />
                        ) : (
                          <div className="w-100 bg-primary-gradient rounded-3 mb-4 d-flex align-items-center justify-content-center" style={{ height: "200px" }}>
                            <i className="bi bi-music-note-beamed text-white fs-32"></i>
                          </div>
                        )}
                        
                        <h5 className="text-light mb-2">{beat.title}</h5>
                        {beat.description && (
                          <p className="text-light text-opacity-75 mb-3 small">
                            {beat.description.length > 100 
                              ? `${beat.description.substring(0, 100)}...` 
                              : beat.description}
                          </p>
                        )}
                        
                        <div className="d-flex flex-wrap gap-2 mb-3">
                          {beat.genre && (
                            <span className="badge bg-primary-gradient">{beat.genre}</span>
                          )}
                          {beat.bpm && (
                            <span className="badge bg-secondary">{beat.bpm} BPM</span>
                          )}
                          {beat.key && (
                            <span className="badge bg-info">{beat.key}</span>
                          )}
                        </div>

                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <small className="text-light text-opacity-50">
                            {beat.duration && formatDuration(beat.duration)}
                          </small>
                          <small className="text-light text-opacity-50">
                            {beat.file_size && formatFileSize(beat.file_size)}
                          </small>
                        </div>

                        <audio controls className="w-100">
                          <source src={beat.file_url} type="audio/mpeg" />
                          Your browser does not support the audio element.
                        </audio>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Contact Section */}
        {profileSettings?.show_contact_info && (profileSettings.contact_email || profileSettings.contact_phone) && (
          <div className="section-space-y">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-6">
                  <div className="bg-white/5 backdrop-blur rounded-3xl p-6 border border-white/10 text-center">
                    <h3 className="text-light mb-4">Get In Touch</h3>
                    <div className="d-flex justify-content-center gap-4">
                      {profileSettings.contact_email && (
                        <a
                          href={`mailto:${profileSettings.contact_email}`}
                          className="btn btn-outline-light text-white fs-14 border-1 rounded-pill"
                        >
                          <i className="bi bi-envelope me-2"></i>
                          Email
                        </a>
                      )}
                      {profileSettings.contact_phone && (
                        <a
                          href={`tel:${profileSettings.contact_phone}`}
                          className="btn btn-outline-light text-white fs-14 border-1 rounded-pill"
                        >
                          <i className="bi bi-telephone me-2"></i>
                          Call
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <FooterOne />
      </div>
    </Wrapper>
  );
};

export default PublicProfile;
