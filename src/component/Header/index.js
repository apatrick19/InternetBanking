import React, { useContext } from "react";
import logo from "../../asset/images/logo.png";
import logo2 from "../../asset/images/logo-2x.png";
import { Link } from "react-router-dom";
import "./style.css";
import { Context } from "../../context/context";

function Index() {
  const { toggleSidebar } = useContext(Context);

  return (
    <header id="header">
      <div className="container">
        <div className="header-row py-3">
          <div className="header-column justify-content-between">
            <div className="logo">
              {" "}
              <a className="d-flex" href="/">
                <img src={logo} srcSet={`${logo2} 2x`} alt="" />
              </a>{" "}
            </div>
            <button
              onClick={() => {
                toggleSidebar();
              }}
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#header-nav"
            >
              {" "}
              <span></span> <span></span> <span></span>{" "}
            </button>
          </div>
          <div className="header-column justify-content-end hide_on_mobile">
            <nav className="login-signup navbar navbar-expand">
              <ul className="navbar-nav">
                <li className="align-items-center h-auto ml-sm-3 ">
                  <Link
                    className="btn btn-outline-primary shadow-none d-none d-sm-block"
                    to="/"
                  >
                    Sign out
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Index;
