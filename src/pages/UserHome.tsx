import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../services/authService";
import type { User } from "@supabase/supabase-js";
import HeaderOne from "../layouts/headers/HeaderOne";
import FooterOne from "../layouts/footers/FooterOne";
import Wrapper from "../common/Wrapper";

const UserHome = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
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

    // Listen for auth state changes
    const {
      data: { subscription },
    } = AuthService.onAuthStateChange((user) => {
      setUser(user);
      if (!user) {
        navigate("/login");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await AuthService.logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
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
                  <div className="col-lg-7 col-xl-6">
                    <div className="d-inline-flex align-items-center flex-wrap row-gap-2 column-gap-4">
                      <div className="flex-shrink-0 d-inline-block w-20 h-2px bg-primary-gradient"></div>
                      <span className="d-block fw-medium text-light fs-20">
                        Welcome Back
                      </span>
                    </div>
                    <h1 className="text-light">
                      Welcome back,{" "}
                      <span className="text-gradient-primary">
                        {user.user_metadata?.name || user.email}
                      </span>
                    </h1>
                    <p className="text-light mb-8 max-text-11">
                      Manage your beats, share your portfolio, and track your
                      growth on <span className="fw-bold">EchoLab</span>.
                    </p>

                     <div className="d-flex flex-column flex-sm-row align-items-center gap-3 gap-sm-4">
                       <button
                         onClick={() => navigate("/upload")}
                         className="btn btn-primary-gradient text-white fs-14 border-0 rounded-pill w-100 w-sm-auto"
                       >
                         <i className="bi bi-cloud-arrow-up me-2"></i> Upload
                         Beat
                       </button>
                       <button
                         onClick={() => navigate("/catalog")}
                         className="btn btn-outline-light text-white fs-14 border-1 rounded-pill w-100 w-sm-auto"
                       >
                         <i className="bi bi-music-note-beamed me-2"></i> My
                         Catalog
                       </button>
                       <button
                         onClick={handleLogout}
                         className="btn btn-outline-danger text-white fs-14 border-1 rounded-pill w-100 w-sm-auto"
                       >
                         <i className="bi bi-box-arrow-right me-2"></i> Logout
                       </button>
                     </div>
                  </div>
                  <div className="col-lg-5 col-xl-6">
                    <div className="text-center">
                      <div className="bg-white/10 backdrop-blur rounded-3xl p-8 border border-white/20">
                        <div className="w-20 h-20 bg-primary-gradient rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4">
                          <i className="bi bi-person-fill text-white fs-24"></i>
                        </div>
                        <h4 className="text-white mb-3">Account Status</h4>
                        <p className="text-light mb-4">
                          Your account is active and verified
                        </p>
                        <div className="d-flex justify-content-center gap-3">
                          <span className="badge bg-success">Verified</span>
                          <span className="badge bg-primary-gradient">
                            Active
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="section-space-y">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h2 className="text-light text-center mb-8">
                  What you can do with{" "}
                  <span className="text-gradient-primary">EchoLab</span>
                </h2>
              </div>
            </div>
            <div className="row g-4">
              <div className="col-lg-4 col-md-6">
                <div className="bg-white/5 backdrop-blur rounded-3xl p-6 border border-white/10 h-100">
                  <div className="w-16 h-16 bg-primary-gradient rounded-circle d-flex align-items-center justify-content-center mb-4">
                    <i className="bi bi-speedometer2 text-white fs-20"></i>
                  </div>
                  <h5 className="text-light mb-3">Analytics Dashboard</h5>
                  <p className="text-light text-opacity-75 mb-0">
                    Track your performance metrics and gain insights into your
                    data with our comprehensive analytics tools.
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="bg-white/5 backdrop-blur rounded-3xl p-6 border border-white/10 h-100">
                  <div className="w-16 h-16 bg-primary-gradient rounded-circle d-flex align-items-center justify-content-center mb-4">
                    <i className="bi bi-gear text-white fs-20"></i>
                  </div>
                  <h5 className="text-light mb-3">Project Management</h5>
                  <p className="text-light text-opacity-75 mb-0">
                    Organize and manage your projects efficiently with our
                    intuitive project management system.
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="bg-white/5 backdrop-blur rounded-3xl p-6 border border-white/10 h-100">
                  <div className="w-16 h-16 bg-primary-gradient rounded-circle d-flex align-items-center justify-content-center mb-4">
                    <i className="bi bi-shield-check text-white fs-20"></i>
                  </div>
                  <h5 className="text-light mb-3">Secure Access</h5>
                  <p className="text-light text-opacity-75 mb-0">
                    Your data is protected with enterprise-grade security and
                    privacy controls.
                  </p>
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

export default UserHome;
