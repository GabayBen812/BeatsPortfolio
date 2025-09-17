import Breadcrumb from '../../common/Bredcrumb';
import Wrapper from '../../common/Wrapper';
import FooterOne from '../../layouts/footers/FooterOne';
import HeaderOne from '../../layouts/headers/HeaderOne';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthService } from '../../services/authService';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/user-home';

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { user, error } = await AuthService.loginWithEmail(email, password);
      
      if (error) {
        setError(error.message);
        return;
      }

      if (user) {
        navigate(from, { replace: true });
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await AuthService.loginWithGoogle();
      
      if (error) {
        setError(error.message);
        setLoading(false);
      }
      // Note: For OAuth, the redirect will happen automatically
    } catch (err) {
      setError('Google login failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <div className="bg-dark">
        <HeaderOne />
        <Breadcrumb title="Login" subtitle="Login" />

        <div className="section-space-y">
          <div className="container">
            <div className="row g-4 align-items-center justify-content-center">
              <div className="col-lg-6 col-xl-5">
                <div className="bg-dark-gradient p-6 p-xl-8 rounded-5 shadow-lg" data-cue="fadeIn">
                  <h2 className="text-light text-center mb-6">Welcome Back to <span className="text-gradient-primary">EchoLab</span></h2>
                  {error && (
                    <div className="alert alert-danger" role="alert">
                      {error}
                    </div>
                  )}
                  
                  <form onSubmit={handleEmailLogin} className="row g-4">
                    <div className="col-12">
                      <label className="form-label fs-14 text-light">Email Address</label>
                      <div className="form-control--gradient rounded-1">
                        <input
                          type="email"
                          className="form-control border-0 bg-transparent text-light"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          disabled={loading}
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <label className="form-label fs-14 text-light">Password</label>
                      <div className="form-control--gradient rounded-1">
                        <input
                          type="password"
                          className="form-control border-0 bg-transparent text-light"
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          disabled={loading}
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <button
                        type="submit"
                        className="btn btn-primary-gradient text-white fs-14 border-0 rounded-1 w-100 justify-content-center"
                        disabled={loading}
                      >
                        {loading ? (
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        ) : (
                          <span className="d-inline-block">Login</span>
                        )}
                        {!loading && <span className="d-inline-block"><i className="bi bi-arrow-right"></i></span>}
                      </button>
                    </div>
                  </form>

                  <div className="text-center my-4">
                    <span className="text-light text-opacity-75">or</span>
                  </div>

                  <div className="col-12">
                    <button
                      type="button"
                      onClick={handleGoogleLogin}
                      className="btn btn-outline-light text-white fs-14 border-1 rounded-1 w-100 justify-content-center"
                      disabled={loading}
                    >
                      {loading ? (
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      ) : (
                        <>
                          <i className="bi bi-google me-2"></i>
                          <span className="d-inline-block">Login with Google</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-center text-light text-opacity-75 mt-4 mb-0">
                    Don’t have an account? <a href="/register" className="text-gradient-primary">Sign Up</a>
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

export default Login;
