import { Link } from "react-router-dom";

const HowItWorksAreaHomeOne = ({ style_2 }: any) => {
  return (
    <div
      className={`${
        style_2
          ? "section-space-md-bottom section-space-top"
          : "section-space-md-y"
      }`}
    >
      {/* Header */}
      <div className="section-space-sm-bottom">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-6">
              <div
                className="d-flex justify-content-center align-items-center flex-wrap row-gap-2 column-gap-4"
                data-cue="fadeIn"
              >
                <div className="flex-shrink-0 d-inline-block w-10 h-2px bg-primary-gradient"></div>
                <span className="d-block fw-medium text-light fs-20">
                  How It Works
                </span>
              </div>
              <h2 className="text-light text-center mt-3" data-cue="fadeIn">
                Share Your Beats. Simple, Secure & Professional.
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="container">
        <div className="row g-4" data-cues="fadeIn">
          {/* Step 1 */}
          <div className="col-md-6 col-lg-4">
            <div className="process-card rounded-5 p-6 p-xl-10">
              <span className="d-inline-block h2 mb-8 text-light process-card__icon">
                <i className="bi bi-link-45deg"></i>
              </span>
              <h5 className="text-light process-card__title">Generate a Link</h5>
              <p className="mb-8 text-light/80">
                Upload your beat and instantly get a shareable link that anyone
                can open – no apps required.
              </p>
              <Link
                to="/beats"
                className="btn process-card__btn text-white fs-14 border-0 rounded-pill"
              >
                <span className="d-inline-block">Try Now </span>
                <i className="bi bi-arrow-right"></i>
              </Link>
            </div>
          </div>

          {/* Step 2 */}
          <div className="col-md-6 col-lg-4">
            <div className="process-card rounded-5 p-6 p-xl-10">
              <span className="d-inline-block h2 mb-8 text-light process-card__icon">
                <i className="bi bi-shield-lock"></i>
              </span>
              <h5 className="text-light process-card__title">Control Access</h5>
              <p className="mb-8 text-light/80">
                Choose who can listen. Restrict access with invite-only links or
                unlock codes for full privacy.
              </p>
              <Link
                to="/about"
                className="btn process-card__btn text-white fs-14 border-0 rounded-pill"
              >
                <span className="d-inline-block">Learn More </span>
                <i className="bi bi-arrow-right"></i>
              </Link>
            </div>
          </div>

          {/* Step 3 */}
          <div className="col-md-6 col-lg-4">
            <div className="process-card rounded-5 p-6 p-xl-10">
              <span className="d-inline-block h2 mb-8 text-light process-card__icon">
                <i className="bi bi-music-note-beamed"></i>
              </span>
              <h5 className="text-light process-card__title">Play & Discover</h5>
              <p className="mb-8 text-light/80">
                Let others preview your catalog online with automatic BPM & key
                detection – aesthetic and professional.
              </p>
              <Link
                to="/beats"
                className="btn process-card__btn text-white fs-14 border-0 rounded-pill"
              >
                <span className="d-inline-block">Explore </span>
                <i className="bi bi-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksAreaHomeOne;
