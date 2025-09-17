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
}

const Catalog = () => {
  const [user, setUser] = useState<User | null>(null);
  const [beats, setBeats] = useState<Beat[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBeat, setSelectedBeat] = useState<Beat | null>(null);
  const [showBeatModal, setShowBeatModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const currentUser = await AuthService.getCurrentUser();
        setUser(currentUser);
        if (!currentUser) {
          navigate("/login");
        } else {
          await fetchBeats(currentUser.id);
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


  const handleDeleteBeat = async (beatId: string) => {
    if (!confirm("Are you sure you want to delete this beat?")) return;

    try {
      const { error } = await supabase
        .from("beats")
        .delete()
        .eq("id", beatId);

      if (error) {
        throw error;
      }

      await fetchBeats(user!.id);
    } catch (error) {
      console.error("Error deleting beat:", error);
      alert("Error deleting beat. Please try again.");
    }
  };

  const handleBeatClick = (beat: Beat) => {
    setSelectedBeat(beat);
    setShowBeatModal(true);
  };

  const handleDownloadBeat = async (beat: Beat) => {
    try {
      const response = await fetch(beat.file_url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${beat.title}.mp3`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download error:', error);
      alert('Error downloading beat. Please try again.');
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
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
                        Your Beat Catalog
                      </span>
                    </div>
                    <h1 className="text-light">
                      Manage Your <span className="text-gradient-primary">Beats</span>
                    </h1>
                    <p className="text-light mb-8 max-text-11">
                      Upload, organize, and showcase your beats in one place. 
                      Build your portfolio and share your music with the world.
                    </p>
                        <div className="d-flex flex-column flex-sm-row align-items-center gap-3 gap-sm-4">
                      <button
                        onClick={() => navigate("/upload")}
                        className="btn btn-primary-gradient text-white fs-14 border-0 rounded-pill w-100 w-sm-auto"
                      >
                        <i className="bi bi-cloud-arrow-up me-2"></i>
                        Upload New Beat
                      </button>
                      <button
                        onClick={() => navigate("/user-home")}
                        className="btn btn-outline-light text-white fs-14 border-1 rounded-pill w-100 w-sm-auto"
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
                          <i className="bi bi-music-note-beamed text-white fs-24"></i>
                        </div>
                        <h4 className="text-white mb-2">{beats.length}</h4>
                        <p className="text-light mb-0">Total Beats</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* Beats Grid */}
        <div className="section-space-y">
          <div className="container">
            {beats.length === 0 ? (
              <div className="text-center">
                <div className="bg-white/5 backdrop-blur rounded-3xl p-8 border border-white/10">
                  <div className="w-20 h-20 bg-primary-gradient rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4">
                    <i className="bi bi-music-note-beamed text-white fs-24"></i>
                  </div>
                  <h3 className="text-light mb-3">No Beats Yet</h3>
                  <p className="text-light text-opacity-75 mb-4">
                    Start building your portfolio by uploading your first beat!
                  </p>
                  <button
                    onClick={() => navigate("/upload")}
                    className="btn btn-primary-gradient text-white fs-14 border-0 rounded-pill"
                  >
                    <i className="bi bi-cloud-arrow-up me-2"></i>
                    Upload Your First Beat
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="row">
                  <div className="col-12">
                    <h2 className="text-light text-center mb-8">
                      Your <span className="text-gradient-primary">Beat Collection</span>
                    </h2>
                  </div>
                </div>
                <div className="row g-4">
                  {beats.map((beat) => (
                    <div key={beat.id} className="col-lg-4 col-md-6">
                      <div 
                        className="bg-white/5 backdrop-blur rounded-3xl p-6 border border-white/10 h-100 cursor-pointer"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleBeatClick(beat)}
                      >
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

                        <div className="d-flex gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleBeatClick(beat);
                            }}
                            className="btn btn-primary-gradient btn-sm flex-grow-1"
                          >
                            <i className="bi bi-play-circle me-2"></i>
                            View Details
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteBeat(beat.id);
                            }}
                            className="btn btn-outline-danger btn-sm"
                            title="Delete Beat"
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Beat Detail Modal */}
        {showBeatModal && selectedBeat && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}>
            <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
              <div className="modal-content bg-dark border border-white/20">
                <div className="modal-header border-bottom border-white/20">
                  <h5 className="modal-title text-light">{selectedBeat.title}</h5>
                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    onClick={() => setShowBeatModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="row g-4">
                    <div className="col-md-6">
                      {selectedBeat.cover_image_url ? (
                        <img
                          src={selectedBeat.cover_image_url}
                          alt={selectedBeat.title}
                          className="w-100 rounded-3"
                          style={{ height: "300px", objectFit: "cover" }}
                        />
                      ) : (
                        <div className="w-100 bg-primary-gradient rounded-3 d-flex align-items-center justify-content-center" style={{ height: "300px" }}>
                          <i className="bi bi-music-note-beamed text-white fs-48"></i>
                        </div>
                      )}
                    </div>
                    <div className="col-md-6">
                      <div className="mb-4">
                        <h6 className="text-light mb-3">Beat Information</h6>
                        <div className="row g-3">
                          {selectedBeat.genre && (
                            <div className="col-6">
                              <small className="text-light text-opacity-75">Genre</small>
                              <div className="text-light fw-medium">{selectedBeat.genre}</div>
                            </div>
                          )}
                          {selectedBeat.bpm && (
                            <div className="col-6">
                              <small className="text-light text-opacity-75">BPM</small>
                              <div className="text-light fw-medium">{selectedBeat.bpm}</div>
                            </div>
                          )}
                          {selectedBeat.key && (
                            <div className="col-6">
                              <small className="text-light text-opacity-75">Key</small>
                              <div className="text-light fw-medium">{selectedBeat.key}</div>
                            </div>
                          )}
                          {selectedBeat.duration && (
                            <div className="col-6">
                              <small className="text-light text-opacity-75">Duration</small>
                              <div className="text-light fw-medium">{formatDuration(selectedBeat.duration)}</div>
                            </div>
                          )}
                          {selectedBeat.file_size && (
                            <div className="col-6">
                              <small className="text-light text-opacity-75">File Size</small>
                              <div className="text-light fw-medium">{formatFileSize(selectedBeat.file_size)}</div>
                            </div>
                          )}
                          <div className="col-6">
                            <small className="text-light text-opacity-75">Uploaded</small>
                            <div className="text-light fw-medium">
                              {new Date(selectedBeat.created_at).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </div>

                      {selectedBeat.description && (
                        <div className="mb-4">
                          <h6 className="text-light mb-3">Description</h6>
                          <p className="text-light text-opacity-75">{selectedBeat.description}</p>
                        </div>
                      )}

                      <div className="mb-4">
                        <h6 className="text-light mb-3">Audio Player</h6>
                        <audio controls className="w-100">
                          <source src={selectedBeat.file_url} type="audio/mpeg" />
                          Your browser does not support the audio element.
                        </audio>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer border-top border-white/20">
                  <button
                    type="button"
                    className="btn btn-outline-light"
                    onClick={() => setShowBeatModal(false)}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary-gradient"
                    onClick={() => handleDownloadBeat(selectedBeat)}
                  >
                    <i className="bi bi-download me-2"></i>
                    Download Beat
                  </button>
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

export default Catalog;
