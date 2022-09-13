import { toaster } from "evergreen-ui";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SpinnerCircular } from "spinners-react";
import { getAllAccountByCustomerId } from "../../../api/account/account";
import { sendAirtime } from "../../../api/airtime/airtime";
import PinModal from "../../../component/createPinModal";

function Index() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location?.state;

  const [show, setShow] = useState(false);
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

    if (!userInfo?.isPinCreated) {
      handleShow();
    }
  }, []);

  const handleClick = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (!pin) {
      toaster.warning("Kindly provide your pin");
      return;
    }

    const updatedState = {
      ...state,
      pin,
    };

    const res = await sendAirtime(updatedState);

    res && setLoading(false);

    if (res.responseCode === "00") {
      await getAllAccountByCustomerId();
      navigate("/bills-and-payment/success", {
        state: {
          amount: state?.amount,
          type: state?.billerCategoryName,
          billerName: state?.billerName,
          beneficiaryPhoneNumber: state?.phoneNumber,
          date: state?.dateCreated,
          sourceAccount: state?.value,
          sourceAccountName: state?.accountName,
          uniqueIdentifier: res?.uniqueIdentifier,
          isAirtime: true,
        },
      });
    } else {
      toaster.danger(res.responseMessage);
    }
  };

  // confirm payment date
  const date = new Date()?.toString()?.slice(0, 15);

  return (
    <>
      <div className="py-5 col-md-8 col-lg-6 col-xl-5 mx-auto">
        <PinModal show={show} handleClose={handleClose} />
        <div className="bg-light shadow-sm rounded p-3 p-sm-4 mb-4">
          <p className="text-4 text-center alert alert-info">
            You are recharging your line, <br />
            <span className="font-weight-500">
              {state.phoneNumber}
            </span> with{" "}
            <span className="font-weight-500">₦{state.amount}</span>
          </p>
          <div className="row">
            <p className="col-sm-4 text-muted text-sm-right mb-0 mb-sm-3">
              Network
            </p>
            <p className="col-sm-8">{state.billerName}</p>
          </div>
          <div className="row">
            <p className="col-sm-4 text-muted text-sm-right mb-0 mb-sm-3">
              Phone Number
            </p>
            <p className="col-sm-8">{state.phoneNumber}</p>
          </div>
          <div className="row">
            <p className="col-sm-4 text-muted text-sm-right mb-0 mb-sm-3">
              Payment date
            </p>
            <p className="col-sm-8">{date}</p>
          </div>
          <div className="row">
            <p className="col-sm-4 text-muted text-sm-right font-weight-500 mb-0 mb-sm-3">
              Amount
            </p>
            <p className="col-sm-8 font-weight-500">₦{state.amount}</p>
          </div>

          <div className="row d-flex align-items-center">
            <p className="col-sm-4 text-muted text-sm-right mb-0 mb-sm-3">
              Pin
            </p>
            <div className="form-group">
              <input
                name="pin"
                type="password"
                className="pl-3 mr-3 form-control py-1"
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                }}
                id="pin"
                placeholder="Enter pin"
              />
            </div>
          </div>
          <form
            id="form-send-money"
            method="post"
            action="pay-bills-success.html"
          >
            <button onClick={handleClick} className="btn btn-primary btn-block">
              {loading ? (
                <SpinnerCircular
                  size={25}
                  color="#00ac9f"
                  secondaryColor="#035572"
                />
              ) : (
                "Confirm Payment"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Index;
