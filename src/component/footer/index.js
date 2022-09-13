import React from "react";
import { Link } from "react-router-dom";

function Index() {
  return (
    <footer id="footer">
      <div className="container">
        <div className="row">
          <div className="col-lg d-lg-flex align-items-center">
            <ul className="nav justify-content-center justify-content-lg-start text-3">
              <li className="nav-item">
                {" "}
                <Link className="nav-link active" to="/account">
                  My Account
                </Link>
              </li>
              <li className="nav-item">
                {" "}
                <Link className="nav-link" to="/transaction">
                  Transactions
                </Link>
              </li>
              <li className="nav-item">
                {" "}
                <Link className="nav-link" to="/transfer-money">
                  Transfer
                </Link>
              </li>
              <li className="nav-item">
                {" "}
                <Link className="nav-link" to="/bills-and-payment">
                  Pay Bills
                </Link>
              </li>
              <li className="nav-item">
                {" "}
                <Link className="nav-link" to="/self-service">
                  Self Services
                </Link>
              </li>
              <li className="nav-item">
                {" "}
                <Link className="nav-link" to="/">
                  Logout
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-lg d-lg-flex justify-content-lg-end mt-3 mt-lg-0">
            <ul className="social-icons justify-content-center">
              <li className="social-icons-facebook">
                <a
                  data-toggle="tooltip"
                  href="http://www.facebook.com/"
                  target="_blank"
                  title="Facebook"
                  rel="noreferrer"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
              </li>
              <li className="social-icons-twitter">
                <a
                  data-toggle="tooltip"
                  href="http://www.twitter.com/"
                  target="_blank"
                  title="Twitter"
                  rel="noreferrer"
                >
                  <i className="fab fa-twitter"></i>
                </a>
              </li>
              <li className="social-icons-google">
                <a
                  data-toggle="tooltip"
                  href="http://www.google.com/"
                  target="_blank"
                  title="Google"
                  rel="noreferrer"
                >
                  <i className="fab fa-google"></i>
                </a>
              </li>
              <li className="social-icons-youtube">
                <a
                  data-toggle="tooltip"
                  href="http://www.youtube.com/"
                  target="_blank"
                  title="Youtube"
                  rel="noreferrer"
                >
                  <i className="fab fa-youtube"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-copyright pt-3 pt-lg-2 mt-2">
          <div className="row">
            <div className="col-lg">
              <p className="text-center text-lg-left mb-2 mb-lg-0">
                Copyright &copy; 2022 <Link to="/account">Excellent MFB</Link>.
                All Rights Reserved.
              </p>
            </div>
            <div className="col-lg d-lg-flex align-items-center justify-content-lg-end">
              <ul className="nav justify-content-center">
                <li className="nav-item">
                  {" "}
                  <Link className="nav-link active" to="/account">
                    Security
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link className="nav-link" to="/account">
                    Terms
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link className="nav-link" to="/account">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Index;
