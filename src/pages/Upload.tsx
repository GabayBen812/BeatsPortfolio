import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../services/authService";
import { supabase } from "../lib/supabaseClient";
import type { User } from "@supabase/supabase-js";
import HeaderOne from "../layouts/headers/HeaderOne";
import FooterOne from "../layouts/footers/FooterOne";
import Wrapper from "../common/Wrapper";

const Upload = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [newBeat, setNewBeat] = useState({
    title: "",
    description: "",
    genre: "",
    bpm: "",
    key: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedCover, setSelectedCover] = useState<File | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const currentUser = await AuthService.getCurrentUser();
        setUser(currentUser);
        if (!currentUser) {
          navigate("/login");
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

  const handleFileUpload = async (file: File, bucket: string) => {
    if (!user) throw new Error("User not authenticated");

    console.log(`Starting upload for ${file.name} to bucket ${bucket}`);
    console.log(`File size: ${file.size} bytes`);
    console.log(`File type: ${file.type}`);

    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${user.id}/${fileName}`;

    console.log(`Upload path: ${filePath}`);

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Upload error:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
      throw error;
    }

    console.log('Upload successful:', data);

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    console.log('Public URL:', publicUrl);
    return publicUrl;
  };

  const getAudioDuration = (file: File): Promise<number> => {
    return new Promise((resolve, reject) => {
      const audio = new Audio();
      audio.addEventListener('loadedmetadata', () => {
        resolve(audio.duration);
      });
      audio.addEventListener('error', reject);
      audio.src = URL.createObjectURL(file);
    });
  };

  const handleUploadBeat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !selectedFile) {
      alert("Please select an audio file to upload");
      return;
    }

    console.log("Starting beat upload process...");
    setUploading(true);
    
    try {
      console.log("Step 1: Getting audio duration...");
      // Get audio duration
      const duration = await getAudioDuration(selectedFile);
      console.log(`Audio duration: ${duration} seconds`);

      console.log("Step 2: Uploading audio file...");
      // Upload audio file
      const audioUrl = await handleFileUpload(selectedFile, "beats");
      console.log("Audio file uploaded successfully");

      console.log("Step 3: Uploading cover image (if provided)...");
      // Upload cover image if provided
      let coverUrl = null;
      if (selectedCover) {
        coverUrl = await handleFileUpload(selectedCover, "covers");
        console.log("Cover image uploaded successfully");
      }

      console.log("Step 4: Saving beat to database...");
      // Save beat to database
      const beatData = {
        title: newBeat.title,
        description: newBeat.description || null,
        genre: newBeat.genre || null,
        bpm: newBeat.bpm ? parseInt(newBeat.bpm) : null,
        key: newBeat.key || null,
        file_url: audioUrl,
        cover_image_url: coverUrl,
        file_size: selectedFile.size,
        duration: duration,
        user_id: user.id,
      };

      console.log("Beat data to insert:", beatData);

      const { data, error } = await supabase
        .from("beats")
        .insert(beatData)
        .select()
        .single();

      if (error) {
        console.error('Database error:', error);
        console.error('Error details:', JSON.stringify(error, null, 2));
        throw error;
      }

      console.log("Beat saved to database:", data);

      console.log("Step 5: Resetting form...");
      // Reset form
      setNewBeat({ title: "", description: "", genre: "", bpm: "", key: "" });
      setSelectedFile(null);
      setSelectedCover(null);
      
      console.log("Upload process completed successfully!");
      alert("Beat uploaded successfully! Redirecting to your catalog...");
      
      // Redirect to catalog after successful upload
      navigate("/catalog");
    } catch (error) {
      console.error("Error uploading beat:", error);
      console.error("Full error object:", JSON.stringify(error, null, 2));
      
      let errorMessage = "Unknown error occurred";
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'object' && error !== null) {
        errorMessage = JSON.stringify(error);
      }
      
      alert(`Error uploading beat: ${errorMessage}`);
    } finally {
      setUploading(false);
      console.log("Upload process finished");
    }
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
                        Upload New Beat
                      </span>
                    </div>
                    <h1 className="text-light">
                      Share Your <span className="text-gradient-primary">Music</span>
                    </h1>
                    <p className="text-light mb-8 max-text-11">
                      Upload your latest beats and share them with the world. 
                      Add metadata, cover art, and build your portfolio.
                    </p>
                    <div className="d-inline-flex align-items-center flex-wrap row-gap-2 column-gap-6">
                      <button
                        onClick={() => navigate("/catalog")}
                        className="btn btn-outline-light text-white fs-14 border-1 rounded-pill"
                      >
                        <i className="bi bi-music-note-beamed me-2"></i>
                        View My Catalog
                      </button>
                      <button
                        onClick={() => navigate("/user-home")}
                        className="btn btn-outline-light text-white fs-14 border-1 rounded-pill"
                      >
                        <i className="bi bi-house me-2"></i>
                        Back to Home
                      </button>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="text-center">
                      <div className="bg-white/10 backdrop-blur rounded-3xl p-6 border border-white/20">
                        <div className="w-16 h-16 bg-primary-gradient rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4">
                          <i className="bi bi-cloud-arrow-up text-white fs-24"></i>
                        </div>
                        <h4 className="text-white mb-2">Upload</h4>
                        <p className="text-light mb-0">Share your beats</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Upload Form */}
        <div className="section-space-y">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div className="bg-white/5 backdrop-blur rounded-3xl p-6 border border-white/10">
                  <h3 className="text-light mb-4">Upload New Beat</h3>
                  <form onSubmit={handleUploadBeat}>
                    <div className="row g-4">
                      <div className="col-md-6">
                        <label className="form-label text-light">Beat Title *</label>
                        <input
                          type="text"
                          className="form-control bg-transparent border-white/20 text-light"
                          value={newBeat.title}
                          onChange={(e) => setNewBeat({ ...newBeat, title: e.target.value })}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label text-light">Genre</label>
                        <input
                          type="text"
                          className="form-control bg-transparent border-white/20 text-light"
                          value={newBeat.genre}
                          onChange={(e) => setNewBeat({ ...newBeat, genre: e.target.value })}
                          placeholder="e.g., Hip-Hop, Trap, R&B"
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label text-light">BPM</label>
                        <input
                          type="number"
                          className="form-control bg-transparent border-white/20 text-light"
                          value={newBeat.bpm}
                          onChange={(e) => setNewBeat({ ...newBeat, bpm: e.target.value })}
                          placeholder="e.g., 140"
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label text-light">Key</label>
                        <input
                          type="text"
                          className="form-control bg-transparent border-white/20 text-light"
                          value={newBeat.key}
                          onChange={(e) => setNewBeat({ ...newBeat, key: e.target.value })}
                          placeholder="e.g., C Minor"
                        />
                      </div>
                      <div className="col-12">
                        <label className="form-label text-light">Description</label>
                        <textarea
                          className="form-control bg-transparent border-white/20 text-light"
                          rows={3}
                          value={newBeat.description}
                          onChange={(e) => setNewBeat({ ...newBeat, description: e.target.value })}
                          placeholder="Describe your beat..."
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label text-light">Audio File *</label>
                        <input
                          type="file"
                          className="form-control bg-transparent border-white/20 text-light"
                          accept="audio/*"
                          onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label text-light">Cover Image</label>
                        <input
                          type="file"
                          className="form-control bg-transparent border-white/20 text-light"
                          accept="image/*"
                          onChange={(e) => setSelectedCover(e.target.files?.[0] || null)}
                        />
                      </div>
                      <div className="col-12">
                        <button
                          type="submit"
                          className="btn btn-primary-gradient text-white fs-14 border-0 rounded-pill"
                          disabled={uploading}
                        >
                          {uploading ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                              Uploading...
                            </>
                          ) : (
                            <>
                              <i className="bi bi-cloud-arrow-up me-2"></i>
                              Upload Beat
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <FooterOne />
      </div>
    </Wrapper>
  );
};

export default Upload;
