import React, { useContext } from "react";
import bgBanner from "../../asset/images/login-banner.jpeg";
import logo from "../../asset/images/logo-light.png";
import logo2 from "../../asset/images/logo-2x-light.png";
import PinInput from "react-pin-input";
import { generate_token, validate_token } from "../../api/general/general";
import { Context } from "../../context/context";
import { useNavigate, useLocation } from "react-router-dom";
import { toaster } from "evergreen-ui";
import { createAccount } from "../../api/onboarding/onboarding";

function Index() {
  const { tokenState } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();

  const optStateData = location.state;

  const handleComplete = async (pin) => {
    const info = {
      pin,
      token: tokenState.token,
      phoneNumber: optStateData.phoneNumber,
    };
    const res = await validate_token(info);

    // if validate token is successful
    // handle create account or forget password
    if (res.responseCode === "00") {
      toaster.notify(res.responseMessage);
      // cheeck if forget password is true
      // if true handle forget password
      // and route the user to login
      // else call create password
      if (
        optStateData?.isForgetPassword &&
        optStateData?.isForgetPassword === true
      ) {
        navigate("/new-password", {
          state: optStateData,
        });
      } else {
        const info = {
          token: tokenState.token,
          navigate,
        };
        await createAccount(optStateData, info);
      }
    } else {
      toaster.danger(res.responseMessage);
    }
  };

  const handleRetryCode = async () => {
    if (!optStateData) {
      navigate("/signup");
    }
    toaster.notify("OTP Retry Request Successfully Sent");
    generate_token(optStateData, navigate);
  };

  return (
    <div id="main-wrapper" className="h-100">
      <div className="container-fluid px-0 h-100">
        <div className="row no-gutters h-100">
          <div className="col-md-6">
            <div className="hero-wrap d-flex align-items-center h-100">
              <div className="hero-mask opacity-8 bg-primary"></div>
              <div
                className="hero-bg hero-bg-scroll"
                style={{ backgroundImage: `url(${bgBanner})` }}
              ></div>
              <div className="hero-content mx-auto w-100 h-100 d-flex flex-column">
                <div className="row no-gutters">
                  <div className="col-10 col-lg-9 mx-auto">
                    <div className="logo mt-5 mb-5 mb-md-0">
                      {" "}
                      <a className="d-flex" href="/" title="">
                        <img src={logo} srcSet={`${logo2} 2x`} alt="" />
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
          <div className="col-md-6 ">
            <div className="d-flex align-items-center justify-content-center h-100">
              <div className="">
                <h3 className="font-weight-400 mb-3">Phone Verification</h3>
                <p>
                  We sent you an sms code to <br />
                </p>
                <h5> {optStateData.phoneNumber}</h5>
                <div className="d-flex mt-3">
                  <PinInput
                    length={4}
                    initialValue=""
                    secret
                    onChange={(value, index) => {}}
                    type="numeric"
                    inputMode="number"
                    style={{ padding: "20px" }}
                    inputStyle={{ borderColor: "#cc9933" }}
                    inputFocusStyle={{ borderColor: "#0a5673" }}
                    onComplete={(pin, index) => {
                      handleComplete(pin);
                    }}
                    autoSelect={true}
                    regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
                  />
                </div>
                <div className="mt-3">
                  <span className="code mr-2">Didn't recieve code?</span>
                  <button
                    className="otp__retry__button"
                    onClick={handleRetryCode}
                  >
                    Request Again
                  </button>
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
