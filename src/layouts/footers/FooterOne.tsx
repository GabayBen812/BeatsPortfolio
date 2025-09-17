import { Link } from "react-router-dom";

const FooterOne = ({ style_2 }: any) => {
  return (
    <footer className={`${style_2 ? "footer-2" : "footer-1"}`}>
      <div className="section-space-md-y">
        <div className="container">
          <div className="row g-4">
            {/* Logo + About */}
            <div className="col-md-6 col-xl-4">
              {/* <Link to="/" className="logo d-block mb-6">
                <img
                  src="assets/img/logo-light.png"
                  alt="EchoLab Logo"
                  className="logo__img"
                />
              </Link> */}
              <p className="mb-6 text-light text-opacity-80">
                EchoLab is the modern way for producers to store, share, and
                showcase beats online. Share links instantly, control access,
                and look professional – no extra apps required.
              </p>
              <h6 className="text-light">Join Our Newsletter</h6>
              <div className="d-flex align-items-center border-bottom border-light border-opacity-50">
                <input
                  className="form-control bg-transparent border-0 flex-grow-1 text-light"
                  type="email"
                  placeholder="Email Address"
                />
                <button
                  type="submit"
                  className="border-0 bg-transparent d-inline-block flex-shrink-0 text-light"
                >
                  <i className="bi bi-arrow-right"></i>
                </button>
              </div>
            </div>

            {/* Links */}
            <div className="col-xl-8">
              <div className="row g-4">
                <div className="col-sm-6 col-md-3">
                  <h5 className="text-light mb-8">Product</h5>
                  <ul className="list gap-2">
                    <li>
                      <Link to="/pricing" className="link text-light text-opacity-70 hover:text-opacity-100 fs-14">
                        Pricing
                      </Link>
                    </li>
                    <li>
                      <Link to="/faq" className="link text-light text-opacity-70 hover:text-opacity-100 fs-14">
                        FAQ
                      </Link>
                    </li>
                    <li>
                      <Link to="/beats" className="link text-light text-opacity-70 hover:text-opacity-100 fs-14">
                        Explore Beats
                      </Link>
                    </li>
                    <li>
                      <Link to="/about" className="link text-light text-opacity-70 hover:text-opacity-100 fs-14">
                        About EchoLab
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="col-sm-6 col-md-3">
                  <h5 className="text-light mb-8">Support</h5>
                  <ul className="list gap-2">
                    <li>
                      <Link to="/contact" className="link text-light text-opacity-70 hover:text-opacity-100 fs-14">
                        Contact
                      </Link>
                    </li>
                    <li>
                      <Link to="/privacy" className="link text-light text-opacity-70 hover:text-opacity-100 fs-14">
                        Privacy Policy
                      </Link>
                    </li>
                    <li>
                      <Link to="/terms" className="link text-light text-opacity-70 hover:text-opacity-100 fs-14">
                        Terms of Service
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="col-sm-6 col-md-3">
                  <h5 className="text-light mb-8">Follow Us</h5>
                  <ul className="list gap-2">
                    <li>
                      <a href="#" className="link text-light text-opacity-70 hover:text-opacity-100 fs-14">
                        Instagram
                      </a>
                    </li>
                    <li>
                      <a href="#" className="link text-light text-opacity-70 hover:text-opacity-100 fs-14">
                        Twitter / X
                      </a>
                    </li>
                    <li>
                      <a href="#" className="link text-light text-opacity-70 hover:text-opacity-100 fs-14">
                        YouTube
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 

      {/* Bottom */}
      <div className="section-space-xsm-y border-top border-white border-opacity-10">
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-md-6">
              <p className="mb-0 fs-14 text-light text-opacity-70">
                © {new Date().getFullYear()} EchoLab. All rights reserved.
              </p>
            </div>
            <div className="col-md-6">
              <ul className="list list-row justify-content-md-end row-gap-2 column-gap-4">
                <li>
                  <Link to="/terms" className="link text-light text-opacity-70 hover:text-opacity-100 fs-14">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="link text-light text-opacity-70 hover:text-opacity-100 fs-14">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="link text-light text-opacity-70 hover:text-opacity-100 fs-14">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {style_2 && (
        <>
          <img
            src="assets/img/hero-2-shape-1.png"
            alt="shape"
            className="img-fluid footer-2__shape-2"
          />
          <img
            src="assets/img/hero-2-shape-2.png"
            alt="shape"
            className="img-fluid footer-2__shape-1"
          />
        </>
      )}
    </footer>
  );
};

export default FooterOne;
