import React, { useContext, useState } from "react";
import Background from "../../asset/images/login-banner.jpeg";
import LogoLight from "../../asset/images/logo-light.png";
import LogoLight2 from "../../asset/images/logo-2x-light.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { loginAccount } from "../../api/onboarding/onboarding";
import { Context } from "../../context/context";
import { Formik } from "formik";
import { signinSchema } from "../../utli/validator";
import { SpinnerCircular } from "spinners-react";

function LoginForm({ navigate, token, dispatch }) {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Formik
      initialValues={{ accountNo: "", password: "" }}
      validationSchema={signinSchema}
      onSubmit={async (values) => {
        const info = {
          token,
          navigate,
          dispatch,
        };

        // handle login loader
        setLoading(true);
        const res = await loginAccount(values, info, setLoading);

        if (res) {
          setLoading(false);
        }
      }}
    >
      {(formik) => {
        const {
          values,
          handleChange,
          handleSubmit,
          errors,
          touched,
          handleBlur,
          isValid,
          dirty,
        } = formik;
        return (
          <form id="loginForm">
            <div className="form-group">
              <label htmlFor="emailAddress">Account No</label>
              <input
                name="accountNo"
                type="text"
                className="form-control"
                id="accountNo"
                placeholder="Enter Your Account No"
                autoComplete="off"
                value={values.accountNo}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            {errors?.accountNo && touched?.accountNo && (
              <span style={{ color: "red" }}>{errors?.accountNo}</span>
            )}
            <div className="form-group">
              <label htmlFor="loginPassword">Password</label>
              <div className="input-group mb-2">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  id="loginPassword"
                  placeholder="Enter Password"
                  autoComplete="off"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <div className="input-group-append">
                  <div
                    onClick={toggleShowPassword}
                    className="input-group-text"
                  >
                    {showPassword ? (
                      <i className="fas fa-eye"></i>
                    ) : (
                      <i className="fas fa-eye-slash"></i>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {errors?.password && touched?.password && (
              <span style={{ color: "red" }}>{errors?.password}</span>
            )}
            <div className="row">
              <div className="col-sm">
                <div className="form-check custom-control custom-checkbox">
                  <input
                    id="remember-me"
                    name="remember"
                    className="custom-control-input"
                    type="checkbox"
                  />
                  <label className="custom-control-label" htmlFor="remember-me">
                    Remember Me
                  </label>
                </div>
              </div>
              <div className="col-sm text-right">
                <Link to="/forget-password" className="btn-link">
                  Forgot Password ?
                </Link>
              </div>
            </div>
            <button
              disabled={!(dirty && isValid)}
              className="btn btn-primary btn-block my-4"
              onClick={handleSubmit}
            >
              {loading ? (
                <SpinnerCircular
                  size={25}
                  color="#00ac9f"
                  secondaryColor="#035572"
                />
              ) : (
                "Login"
              )}
            </button>
          </form>
        );
      }}
    </Formik>
  );
}

function Index() {
  const navigate = useNavigate();
  const { tokenState, userDispatch } = useContext(Context);

  return (
    <div id="main-wrapper" className="h-100">
      <div className="container-fluid px-0 h-100">
        <div className="row no-gutters h-100">
          <div className="col-md-6">
            <div className="hero-wrap d-flex align-items-center h-100">
              <div className="hero-mask opacity-8 bg-primary"></div>
              <div
                className="hero-bg hero-bg-scroll"
                style={{ backgroundImage: `url(${Background})` }}
              ></div>
              <div className="hero-content mx-auto w-100 h-100 d-flex flex-column">
                <div className="row no-gutters">
                  <div className="col-10 col-lg-9 mx-auto">
                    <div className="logo mt-5 mb-5 mb-md-0">
                      {" "}
                      <a className="d-flex" href="/" title="">
                        <img
                          src={LogoLight}
                          srcSet={`${LogoLight2} 2x`}
                          alt=""
                        />
                      </a>{" "}
                    </div>
                  </div>
                </div>
                <div className="row no-gutters my-auto">
                  <div className="col-10 col-lg-9 mx-auto">
                    <h1 className="text-11 text-white mb-4">Welcome back!</h1>
                    <p className="text-4 text-white line-height-4 mb-5">
                      We are glad to see you again! Instant deposits,
                      withdrawals & payouts trusted by millions worldwide.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 d-flex align-items-center">
            <div className="container my-4">
              <div className="row">
                <div className="col-11 col-lg-9 col-xl-8 mx-auto">
                  <h3 className="font-weight-400 mb-4">Log In</h3>
                  {/* login form */}
                  <LoginForm
                    navigate={navigate}
                    token={tokenState.token}
                    dispatch={userDispatch}
                  />
                  <p className="text-3 text-center text-muted">
                    Don't have an account?{" "}
                    <Link className="btn-link" to="/signup">
                      Sign Up
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
