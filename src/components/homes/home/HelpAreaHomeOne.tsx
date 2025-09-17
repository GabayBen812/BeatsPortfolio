import { Link } from "react-router-dom";

const HelpAreaHomeOne = () => {
  return (
    <div className="section-space-md-y">
      {/* Header */}
      <div className="section-space-sm-bottom">
        <div className="container">
          <div className="row">
            <div className="col-md-10 col-lg-8">
              <div
                className="d-inline-flex align-items-center flex-wrap row-gap-2 column-gap-4"
                data-cue="fadeIn"
              >
                <div className="flex-shrink-0 d-inline-block w-20 h-2px bg-primary-gradient"></div>
                <span className="d-block fw-medium text-light fs-20">
                  Why EchoLab
                </span>
              </div>
              <h2 className="text-light" data-cue="fadeIn">
                Empowering Music Producers Everywhere
              </h2>
              <p
                className="text-light mb-0 max-text-11"
                data-cue="fadeIn"
              >
                EchoLab makes it effortless to share, showcase, and protect
                your beats. Designed for producers who want professional
                presentation with zero hassle.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Feature cards */}
      <div className="container">
        <div className="row g-4" data-cues="fadeIn">
          {/* Card 1 */}
          <div className="col-md-6">
            <div className="process-card rounded-5 p-6 p-xl-10">
              <span className="d-inline-block h2 mb-8 text-light process-card__icon">
                <i className="bi bi-link-45deg"></i>
              </span>
              <h5 className="text-light process-card__title">Share Instantly</h5>
              <p className="mb-8">
                Export a clean link to your beat catalog. Anyone can listen
                instantly – no apps, no downloads.
              </p>
              <Link
                to="/beats"
                className="btn process-card__btn text-white fs-14 border-0 rounded-pill"
              >
                <span className="d-inline-block">Try Now</span>
                <i className="bi bi-arrow-right"></i>
              </Link>
            </div>
          </div>

          {/* Card 2 */}
          <div className="col-md-6">
            <div className="process-card rounded-5 p-6 p-xl-10">
              <span className="d-inline-block h2 mb-8 text-light process-card__icon">
                <i className="bi bi-shield-lock"></i>
              </span>
              <h5 className="text-light process-card__title">Control Access</h5>
              <p className="mb-8">
                Restrict who can open your link with private codes and secure
                permissions – your beats, your rules.
              </p>
              <Link
                to="/about"
                className="btn process-card__btn text-white fs-14 border-0 rounded-pill"
              >
                <span className="d-inline-block">Learn More</span>
                <i className="bi bi-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer note */}
      <div className="section-space-sm-top" data-cue="fadeIn">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h6 className="text-center mb-0 text-light">
                Ready to showcase your beats?{" "}
                <span className="text-gradient-primary">Join EchoLab today.</span>
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpAreaHomeOne;
