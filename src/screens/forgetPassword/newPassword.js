import React, { useState } from "react";
import Background from "../../asset/images/login-banner.jpeg";
import LogoLight from "../../asset/images/logo-light.png";
import LogoLight2 from "../../asset/images/logo-2x-light.png";
import { resetPasswordSchema } from "../../utli/validator";
import { Formik } from "formik";
import { useNavigate, useLocation } from "react-router-dom";
import { resetPassword } from "../../api/onboarding/onboarding";
import { toaster } from "evergreen-ui";
import { SpinnerCircular } from "spinners-react";

const NewPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const state = location.state;

  return (
    <Formik
      initialValues={{ createNewPassword: "", confirmNewPassword: "" }}
      validationSchema={resetPasswordSchema}
      onSubmit={async (values) => {
        setLoading(true);
        const body = {
          password: values.createNewPassword,
          accountNo: state?.accountNo,
        };

        const res = await resetPassword(body);

        if (res) {
          setLoading(false);
        }

        if (res.responseCode === "00") {
          toaster.notify("Password reset Successful");
          navigate("/");
        } else {
          toaster.danger(`${res.responseMessage}`);
        }
      }}
    >
      {(formik) => {
        const {
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
              <input
                name="createNewPassword"
                onChange={handleChange}
                onBlur={handleBlur}
                type="password"
                className="form-control"
                id="emailAddress"
                placeholder="Create new password"
              />
            </div>
            {errors?.createNewPassword && touched?.createNewPassword && (
              <span style={{ color: "red" }}>{errors?.createNewPassword}</span>
            )}
            <div className="form-group">
              <div className="input-group mb-2">
                <input
                  name="confirmNewPassword"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="password"
                  className="form-control"
                  id="loginPassword"
                  placeholder="Confirm new password"
                />
                <div className="input-group-append"></div>
              </div>
            </div>
            {errors?.confirmNewPassword && touched?.confirmNewPassword && (
              <span style={{ color: "red" }}>{errors?.confirmNewPassword}</span>
            )}
            <div className="row">
              <div className="col-sm"></div>
            </div>
            <button
              disabled={!(dirty && isValid)}
              onClick={handleSubmit}
              className="btn btn-primary btn-block my-4"
            >
              {loading ? (
                <SpinnerCircular
                  size={25}
                  color="#00ac9f"
                  secondaryColor="#035572"
                />
              ) : (
                "Change Password"
              )}
            </button>
          </form>
        );
      }}
    </Formik>
  );
};

function Index() {
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
                  <h3 className="font-weight-400 mb-4">New Password</h3>
                  {/* forget password form */}
                  <div className="new-password-message">
                    Please create a new password that you dont use on any other
                    site.
                  </div>
                  <NewPassword />
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
