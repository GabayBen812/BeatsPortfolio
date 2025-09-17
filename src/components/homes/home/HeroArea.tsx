import { Link } from "react-router-dom";

const HeroArea = () => {
  return (
    <>
      <div className="hero-1--container">
        <div className="hero-1">
          <div className="section-space-y">
            <div className="container">
              <div className="row g-4 align-items-center">
                <div className="col-lg-7 col-xl-6">
                  <div
                    className="d-inline-flex align-items-center flex-wrap row-gap-2 column-gap-4"
                    data-cue="fadeIn"
                  >
                    <div className="flex-shrink-0 d-inline-block w-20 h-2px bg-primary-gradient"></div>
                    <span className="d-block fw-medium text-light fs-20">
                      Welcome to EchoLab
                    </span>
                  </div>
                  <h1 className="text-light" data-cue="fadeIn">
                    {" "}
                    The Next Generator{" "}
                    <span className="text-gradient-primary">
                      of Music Storage
                    </span>
                  </h1>
                  <p className="text-light mb-8 max-text-11" data-cue="fadeIn">
                    EchoLab is the ultimate platform for producers – a smart
                    space to create, share, and sell your beats. Upload your
                    tracks, connect with listeners, and let your music reach new
                    heights.
                  </p>
                  <div
                    className="d-inline-flex align-items-center flex-wrap row-gap-2 column-gap-6"
                    data-cue="fadeIn"
                  >
                    <Link
                      to="/contact"
                      className="btn btn-primary-gradient text-white fs-14 border-0 rounded-pill"
                    >
                      <span className="d-inline-block">Try EchoLab Now</span>
                      <span className="d-inline-block">
                        <i className="bi bi-arrow-right"></i>
                      </span>
                    </Link>
                    <span className="d-inline-block text-light">
                      No credit card required
                    </span>
                  </div>
                </div>
                <div className="col-lg-5 col-xl-6">
                  <img
                    src="assets/img/hero-img-1.png"
                    alt="image"
                    className="img-fluid"
                    data-cue="fadeIn"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="section-space-md-y">
          <div className="section-space-sm-bottom">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <h3 className="mb-0 text-light text-center" data-cue="fadeIn">
                    <span className="text-gradient-primary">EchoLab</span> – the
                    new platform built for producers to share, listen, and sell
                    their beats.
                  </h3>
                </div>
              </div>
            </div>
          </div>
		  <div className="container py-5">
			<div className="row text-center">
				<div className="col-12 mb-4">
				<h2 className="fw-bold">
					Why choose <span className="text-gradient-primary">EchoLab</span>?
				</h2>
				<p className="text-white-50">A modern platform built for music producers</p>
				</div>
			</div>
			<div className="row g-4">
				<div className="col-12 col-md-4">
				<div className="p-4 rounded-3 bg-white/5 border border-white/10 h-100">
					<h5 className="fw-semibold">Easy Beat Sharing</h5>
					<p className="text-white-50">
					Upload your beats in seconds and let your audience listen anywhere, anytime.
					</p>
				</div>
				</div>
				<div className="col-12 col-md-4">
				<div className="p-4 rounded-3 bg-white/5 border border-white/10 h-100">
					<h5 className="fw-semibold">Direct Sales</h5>
					<p className="text-white-50">
					Connect with customers instantly through WhatsApp or your preferred channel.
					</p>
				</div>
				</div>
				<div className="col-12 col-md-4">
				<div className="p-4 rounded-3 bg-white/5 border border-white/10 h-100">
					<h5 className="fw-semibold">Modern Design</h5>
					<p className="text-white-50">
					A sleek, mobile-first dark UI that makes your catalog look professional.
					</p>
				</div>
				</div>
			</div>
			</div>
        </div>
      </div>
    </>
  );
};

export default HeroArea;
