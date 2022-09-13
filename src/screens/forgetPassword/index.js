import React, { useState } from "react";
import Background from "../../asset/images/login-banner.jpeg";
import LogoLight from "../../asset/images/logo-light.png";
import LogoLight2 from "../../asset/images/logo-2x-light.png";
import { forgetPasswordSchema } from "../../utli/validator";
import { Formik } from "formik";
import { getAccountByAccountNo } from "../../api/account/account";
import { useNavigate } from "react-router-dom";
import { generate_token } from "../../api/general/general";
import { SpinnerCircular } from "spinners-react";

const ForgetPasswordForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  return (
    <Formik
      initialValues={{ accountNo: "" }}
      validationSchema={forgetPasswordSchema}
      onSubmit={async (values) => {
        setLoading(true);
        const res = await getAccountByAccountNo(values.accountNo);
        const body = {
          phoneNumber: res?.mobileNo,
          email: res?.email,
          accountNo: res?.accountNumber,
          isForgetPassword: true,
        };

        const res2 = await generate_token(body, navigate);

        if (res2) {
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
              <input
                name="accountNo"
                value={values.accountNo}
                onBlur={handleBlur}
                onChange={handleChange}
                type="text"
                className="form-control"
                id="emailAddress"
                placeholder="Enter Account Number"
              />
            </div>
            {errors?.accountNo && touched?.accountNo && (
              <span style={{ color: "red" }}>{errors?.accountNo}</span>
            )}

            <button
              disabled={!(dirty && isValid)}
              onClick={handleSubmit}
              className="btn btn-primary btn-block my-4"
              type="submit"
            >
              {loading ? (
                <SpinnerCircular
                  size={25}
                  color="#00ac9f"
                  secondaryColor="#035572"
                />
              ) : (
                "Send Code"
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
                  <h3 className="font-weight-400 mb-4">Forgot Password</h3>
                  {/* forget password form */}
                  <ForgetPasswordForm />
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
