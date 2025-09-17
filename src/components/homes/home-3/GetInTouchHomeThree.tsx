const GetInTouchHomeThree = () => {
  return (
    <>
      <div className="section-space-y">
        <div className="container">
          <div className="row g-4 align-items-center justify-content-xl-between">
            <div className="col-lg-6">
              <span
                className="d-inline-block fs-20 text-gradient-primary fw-medium"
                data-cue="fadeIn"
              >
                Get In Touch
              </span>
              <h2 className="text-light" data-cue="fadeIn">
                Have Questions About EchoLab?
              </h2>
              <p className="mb-8 text-light" data-cue="fadeIn">
                EchoLab is built for music producers who want to showcase, share,
                and protect their beats with a professional look.  
                Whether you’re curious about features, collaborations, or future AI tools —
                we’d love to hear from you.
              </p>
              <ul className="list gap-6" data-cues="fadeIn">
                <li className="d-flex align-items-center gap-4">
                  <span className="d-grid place-content-center w-13 h-13 rounded-circle bg-primary-gradient text-light fs-24 lh-1 flex-shrink-0">
                    <i className="bi bi-phone-vibrate"></i>
                  </span>
                  <div className="d-block flex-grow-1">
                    <p className="mb-0 fs-14">For quick support</p>
                    <span className="d-block fw-medium text-light">+972 50-000-0000</span>
                  </div>
                </li>
                <li className="d-flex align-items-center gap-4">
                  <span className="d-grid place-content-center w-13 h-13 rounded-circle bg-primary-gradient text-light fs-24 lh-1 flex-shrink-0">
                    <i className="bi bi-envelope-at"></i>
                  </span>
                  <div className="d-block flex-grow-1">
                    <p className="mb-0 fs-14">Email us anytime</p>
                    <span className="d-block fw-medium text-light">support@echolab.io</span>
                  </div>
                </li>
              </ul>
            </div>
            <div className="col-lg-6 col-xl-5">
              <div className="row g-4" data-cues="fadeIn">
                <div className="col-12">
                  <label className="form-label fs-14 text-light">Your Name</label>
                  <div className="form-control--gradient rounded-1">
                    <input
                      type="text"
                      className="form-control border-0 bg-transparent text-light"
                      placeholder="Enter your name"
                    />
                  </div>
                </div>
                <div className="col-12">
                  <label className="form-label fs-14 text-light">Email Address</label>
                  <div className="form-control--gradient rounded-1">
                    <input
                      type="email"
                      className="form-control border-0 bg-transparent text-light"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
                <div className="col-12">
                  <label className="form-label fs-14 text-light">Message</label>
                  <div className="form-control--gradient rounded-1">
                    <textarea
                      className="form-control border-0 bg-transparent text-light"
                      rows={4}
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>
                </div>
                <div className="col-12">
                  <button className="btn btn-primary-gradient text-white fs-14 border-0 rounded-1 w-100 justify-content-center">
                    <span className="d-inline-block">Send Message</span>
                    <span className="d-inline-block">
                      <i className="bi bi-arrow-right"></i>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GetInTouchHomeThree;
