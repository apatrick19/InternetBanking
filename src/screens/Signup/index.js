import React, { useContext, useState } from "react";
import Background from "../../asset/images/login-banner.jpeg";
import LogoLight from "../../asset/images/logo-light.png";
import LogoLight2 from "../../asset/images/logo-2x-light.png";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import { validateBvn } from "../../api/account/account";
import { useNavigate } from "react-router-dom";
import { Context } from "../../context/context";
import { generate_token } from "../../api/general/general";
import { toaster } from "evergreen-ui";
import { signupSchema } from "../../utli/validator";
import "./style.css";
import { SpinnerCircular } from "spinners-react";

function SignupForm() {
  const { tokenState, accountDispatch } = useContext(Context);
  const [bvnDetail, setBvnDetail] = useState({});
  const [bvnPhoneNumber, setBvnPhoneNumber] = useState("");
  // toggle password
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bvnLoading, setBvnLoading] = useState(false);

  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{
        bvn: "",
        email: "",
        phoneNumber: "",
        password: "",
      }}
      validationSchema={signupSchema}
      onSubmit={async (values) => {
        const user = {
          ...values,
          firstName: bvnDetail?.firstName,
          lastName: bvnDetail?.lastName,
          dob: bvnDetail?.dob,
        };

        if (!bvnDetail?.phoneNumber) {
          toaster.danger("bvn validation is required");
          return;
        }

        setLoading(true);
        const res = await generate_token(user, navigate);

        if (res) {
          setLoading(false);
        }

        // createAccount(values, tokenState.token);
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
              <label htmlFor="fullName">BVN</label>
              <input
                type="text"
                name="bvn"
                className="form-control"
                id="fullName"
                autoComplete="off"
                value={values.bvn}
                onChange={(e) => {
                  handleChange(e);
                }}
                onBlur={async (e) => {
                  handleBlur(e);
                  if (values.bvn === "") return;
                  // call the bvn api
                  setBvnLoading(true);
                  const res = await validateBvn(
                    values.bvn,
                    tokenState.token,
                    accountDispatch
                  );
                  if (res) {
                    setBvnLoading(false);
                  }
                  res?.phoneNumber && setBvnPhoneNumber(res?.phoneNumber);
                  setBvnDetail(res);
                }}
                placeholder="Bank Verification Number"
              />
              {bvnLoading && (
                <SpinnerCircular
                  size={18}
                  color="#d9d9d9"
                  secondaryColor="#035572"
                />
              )}

              {errors.bvn && touched.bvn && (
                <span style={{ color: "red" }}>{errors.bvn}</span>
              )}
              {bvnDetail?.firstName && (
                <p className="text-primary small">
                  {bvnDetail?.lastName} {bvnDetail?.firstName} -{" "}
                  {bvnDetail?.phoneNumber}
                </p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="emailAddress">Email Address</label>
              <input
                name="email"
                type="email"
                className="form-control"
                id="emailAddress"
                value={values?.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter Your Email"
              />
              {errors?.email && touched?.email && (
                <span style={{ color: "red" }}>{errors?.email}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                name="phoneNumber"
                type="text"
                className="form-control"
                autoComplete="off"
                value={(values.phoneNumber = bvnPhoneNumber)}
                onChange={(e) => {
                  handleChange(e);
                  setBvnPhoneNumber(e.currentTarget.value);
                }}
                onBlur={handleBlur}
                id="emailAddress"
                placeholder="Enter Your Phone Number"
              />
              {errors.phoneNumber && touched.phoneNumber && (
                <span style={{ color: "red" }}>{errors.phoneNumber}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="loginPassword">Password</label>
              <div className="input-group mb-2">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="loginPassword"
                  placeholder="Enter Password"
                />
                <div className="input-group-append">
                  <div
                    onClick={() => setShowPassword(!showPassword)}
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

              {errors.password && touched.password && (
                <span style={{ color: "red" }}>{errors.password}</span>
              )}
              <p className="text-primary small">
                Suggestion: Use combination of upper case, lower case, numeric
                and special character
              </p>
            </div>

            <button
              disabled={!(dirty && isValid)}
              type="submit"
              onClick={handleSubmit}
              className={"btn btn-primary btn-block my-4"}
            >
              {loading ? (
                <SpinnerCircular
                  size={25}
                  color="#00ac9f"
                  secondaryColor="#035572"
                />
              ) : (
                "Create an Account"
              )}
            </button>
          </form>
        );
      }}
    </Formik>
  );
}

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
                <div className="row  no-gutters">
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
                <div className="row my-auto">
                  <div className="col-10 col-lg-9 mx-auto">
                    <h1 className="text-11 text-white mb-4">Get Verified!</h1>
                    <p className="text-4 text-white line-height-4 mb-5">
                      Every day, Excellent MFB makes thousands of customers
                      happy.
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
                  <h3 className="font-weight-400 mb-4">Create Account</h3>
                  {/* signup form */}
                  <SignupForm />
                  {/* signup form end */}
                  <p className="text-3 text-center text-muted">
                    Already have an account?{" "}
                    <Link className="btn-link" to="/">
                      Log In
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
