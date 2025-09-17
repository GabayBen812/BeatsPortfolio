const PricingAreaHomeOne = () => {
  return (
    <div className="section-space-top section-space-md-bottom">
      {/* Header */}
      <div className="section-space-sm-bottom">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10 col-xl-8">
              <div
                className="d-flex justify-content-center align-items-center flex-wrap row-gap-2 column-gap-4"
                data-cue="fadeIn"
              >
                <div className="flex-shrink-0 d-inline-block w-10 h-2px bg-primary-gradient"></div>
                <span className="d-block fw-medium text-light fs-20">
                  Pricing Plans
                </span>
              </div>
              <h2
                className="text-light text-center mb-0"
                data-cue="fadeIn"
              >
                Start Free. Upgrade When Ready.
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Plans */}
      <div className="container">
        <div className="row g-4 align-items-center" data-cues="fadeIn">
          {/* Free Plan */}
          <div className="col-md-6 col-lg-4">
            <div className="process-card rounded-5 p-6 p-xl-8 text-center">
              <h4 className="text-light">Free</h4>
              <p className="text-light text-opacity-50 mb-0">
                Perfect for getting started
              </p>
              <hr className="my-8" />
              <h2 className="text-light">$0<span className="fs-16 fw-normal">/month</span></h2>
              <span className="d-block fs-14 text-light text-opacity-50">
                Includes everything you need to share beats online.
              </span>
              <hr className="my-8" />
              <ul className="list gap-4">
                <li>Upload & store beats</li>
                <li>Shareable links</li>
                <li>Clean & modern online player</li>
                <li className="text-light text-opacity-50">AI Features (coming soon)</li>
              </ul>
              <hr className="my-8" />
              <button
                type="button"
                className="btn btn-primary-gradient text-white fs-14 rounded-pill border-0"
              >
                <span className="d-inline-block">Get Started </span>
                <i className="bi bi-arrow-right"></i>
              </button>
            </div>
          </div>

          {/* Premium Plan (Disabled) */}
          <div className="col-md-6 col-lg-4">
            <div className="process-card rounded-5 p-6 p-xl-8 text-center opacity-50">
              <h4 className="text-light">Premium</h4>
              <p className="text-light text-opacity-50 mb-0">
                Advanced tools for serious producers
              </p>
              <hr className="my-8" />
              <h2 className="text-light">$14.99<span className="fs-16 fw-normal">/month</span></h2>
              <span className="d-block fs-14 text-light text-opacity-50">
                Currently in development. Coming soon!
              </span>
              <hr className="my-8" />
              <ul className="list gap-4">
                <li>Everything in Free</li>
                <li>AI BPM & Key Detection</li>
                <li>Private access with codes</li>
                <li>Advanced analytics</li>
                <li>More pro features</li>
              </ul>
              <hr className="my-8" />
              <button
                type="button"
                className="btn btn-outline-secondary fs-14 rounded-pill"
                disabled
              >
                <span className="d-inline-block">Coming Soon </span>
                <i className="bi bi-hourglass-split"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PricingAreaHomeOne
