const InfoAreaHomeOne = () => {
  return (
    <div className="section-space-md-y info-section">
      <div className="container">
        <div className="row g-4 align-items-center">
          {/* Image / Mockup */}
          <div className="col-lg-5">
            <div className="pe-xl-12" data-cue="slideInUp">
              <img
                src="assets/img/info-section-img.png"
                alt="EchoLab Preview"
                className="img-fluid rounded-4 shadow-lg"
              />
            </div>
          </div>

          {/* Text + Stats */}
          <div className="col-lg-7">
            <h2 className="h4 text-light mb-6" data-cue="fadeIn">
              “EchoLab helps me share my beats with clients instantly,
              while keeping everything professional and secure.”
            </h2>

            {/* User (testimonial) */}
            <div
              className="d-flex align-items-center gap-5 mb-6"
              data-cue="fadeIn"
            >
              <div className="d-grid place-content-center w-15 h-15 rounded-circle overflow-hidden flex-shrink-0 border border-white/10 shadow">
                <img
                  src="assets/img/user-img-1.png"
                  alt="Producer testimonial"
                  className="w-100 h-100 object-fit-cover"
                />
              </div>
              <div className="flex-grow-1">
                <h6 className="mb-0 text-light">Michael Torres</h6>
                <span className="d-block fs-14 text-light text-opacity-50">
                  Independent Producer
                </span>
              </div>
            </div>

            {/* Stats */}
            <div
              className="bg-dark-gradient p-4 p-sm-6 p-md-10 p-lg-6 p-xl-8 p-xxl-10 rounded-5"
              data-cue="fadeIn"
            >
              <ul className="list list-row flex-wrap info-list">
                <li>
                  <div className="d-flex align-items-center gap-6 p-4 p-md-6">
                    <h3 className="mb-0 text-light flex-shrink-0">90%</h3>
                    <p className="mb-0 text-opacity-50 flex-grow-1">
                      Faster sharing with clients & labels
                    </p>
                  </div>
                </li>
                <li>
                  <div className="d-flex align-items-center gap-6 p-4 p-md-6">
                    <h3 className="mb-0 text-light flex-shrink-0">80%</h3>
                    <p className="mb-0 text-opacity-50 flex-grow-1">
                      More engagement thanks to instant previews
                    </p>
                  </div>
                </li>
                <li>
                  <div className="d-flex align-items-center gap-6 p-4 p-md-6">
                    <h3 className="mb-0 text-light flex-shrink-0">100%</h3>
                    <p className="mb-0 text-opacity-50 flex-grow-1">
                      Control over who can access beats
                    </p>
                  </div>
                </li>
                <li>
                  <div className="d-flex align-items-center gap-6 p-4 p-md-6">
                    <h3 className="mb-0 text-light flex-shrink-0">+AI</h3>
                    <p className="mb-0 text-opacity-50 flex-grow-1">
                      Automatic BPM & Key detection for every upload
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InfoAreaHomeOne
