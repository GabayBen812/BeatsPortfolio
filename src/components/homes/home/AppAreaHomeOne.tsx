import { Link } from "react-router-dom";

const AppAreaHomeOne = () => {
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
                  EchoLab Tools
                </span>
              </div>
              <h2 className="mb-0 text-light" data-cue="fadeIn">
                Built For Producers. Simple, Secure & Powerful.
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Features grid */}
      <div className="container">
        <div className="row g-4" data-cues="fadeIn">
          {/* Card 1 */}
          <div className="col-md-6 col-lg-4 col-xl-3">
            <div className="process-card rounded-5 p-6 p-xl-8">
              <span className="d-inline-block h2 mb-8">
                <i className="bi bi-link-45deg text-gradient-primary"></i>
              </span>
              <h5 className="text-light mb-12">Shareable Links</h5>
              <p className="text-light/70 mb-6">
                Generate clean links for each beat. No apps or downloads needed.
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

          {/* Card 2 */}
          <div className="col-md-6 col-lg-4 col-xl-3">
            <div className="process-card rounded-5 p-6 p-xl-8">
              <span className="d-inline-block h2 mb-8">
                <i className="bi bi-shield-lock text-gradient-primary"></i>
              </span>
              <h5 className="text-light mb-12">Private Access</h5>
              <p className="text-light/70 mb-6">
                Control who listens to your beats with secure codes & invites.
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

          {/* Card 3 */}
          <div className="col-md-6 col-lg-4 col-xl-3">
            <div className="process-card rounded-5 p-6 p-xl-8">
              <span className="d-inline-block h2 mb-8">
                <i className="bi bi-music-note-beamed text-gradient-primary"></i>
              </span>
              <h5 className="text-light mb-12">Online Player</h5>
              <p className="text-light/70 mb-6">
                Stream beats directly in-browser with a modern, responsive
                player.
              </p>
              <Link
                to="/beats"
                className="btn process-card__btn text-white fs-14 border-0 rounded-pill"
              >
                <span className="d-inline-block">Listen </span>
                <i className="bi bi-arrow-right"></i>
              </Link>
            </div>
          </div>

          {/* Card 4 */}
          <div className="col-md-6 col-lg-4 col-xl-3">
            <div className="process-card rounded-5 p-6 p-xl-8">
              <span className="d-inline-block h2 mb-8">
                <i className="bi bi-cpu text-gradient-primary"></i>
              </span>
              <h5 className="text-light mb-12">AI Detection</h5>
              <p className="text-light/70 mb-6">
                Automatic BPM & key detection for every upload, powered by AI.
              </p>
              <Link
                to="/about"
                className="btn process-card__btn text-white fs-14 border-0 rounded-pill"
              >
                <span className="d-inline-block">Discover </span>
                <i className="bi bi-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="section-space-sm-top" data-cue="fadeIn">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <Link
                to="/service"
                className="btn btn-primary-gradient text-white fs-14 border-0 rounded-pill"
              >
                <span className="d-inline-block">Explore All EchoLab Features </span>
                <i className="bi bi-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppAreaHomeOne
