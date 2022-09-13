import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  interbankTransfer,
  localTransfer,
} from "../../../api/transfer/transfer";
import { toaster } from "evergreen-ui";
import PinModal from "../../../component/createPinModal";
import { SpinnerCircular } from "spinners-react";

function Index() {
  const location = useLocation();
  const navigate = useNavigate();
  const [pin, setPin] = useState("");

  const transferInfo = location?.state;

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (!transferInfo) {
      navigate("/transfer-money");
    }
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

    if (!userInfo?.isPinCreated) {
      handleShow();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = async () => {
    setLoading(true);
    let res;
    const bank_code = process.env.REACT_APP_BANK_CODE;

    if (!pin) {
      toaster.warning("Kindly provide your pin");
      return;
    }

    const updateTransferInfo = {
      ...transferInfo,
      pin,
    };

    if (transferInfo.bankCode === bank_code) {
      res = await localTransfer(updateTransferInfo);
    } else {
      res = await interbankTransfer(updateTransferInfo);
    }

    if (res?.responseCode === "00") {
      navigate("/transfer-money/success", {
        state: {
          transferInfo,
        },
      });
    } else {
      toaster.danger(res?.responseMessage);
    }

    if (res) {
      setLoading(false);
    }
  };

  // confirm payment date
  const date = new Date()?.toString()?.slice(0, 15);

  return (
    <div className="py-5 col-md-8 col-lg-6 col-xl-5 mx-auto">
      <PinModal show={show} handleClose={handleClose} />
      <div className="bg-light shadow-sm rounded p-3 p-sm-4 mb-4">
        <p className="text-4 text-center alert alert-info">
          You are sending{" "}
          <span className="font-weight-500">₦{transferInfo.amount}</span> <br />
          to{" "}
          <span className="font-weight-500">{transferInfo.toAccountName}</span>
        </p>
        <div className="row">
          <p className="col-sm-4 text-muted text-sm-right mb-0 mb-sm-3">
            Recepient
          </p>
          <p className="col-sm-8">{transferInfo.toAccountName}</p>
        </div>
        <div className="row">
          <p className="col-sm-4 text-muted text-sm-right mb-0 mb-sm-3">
            Account Number
          </p>
          <p className="col-sm-8">{transferInfo.value}</p>
        </div>
        <div className="row">
          <p className="col-sm-4 text-muted text-sm-right mb-0 mb-sm-3">Bank</p>
          <p className="col-sm-8">{transferInfo.bankName}</p>
        </div>
        <div className="row">
          <p className="col-sm-4 text-muted text-sm-right mb-0 mb-sm-3">
            Payment date
          </p>
          <p className="col-sm-8">{date}</p>
        </div>
        <div className="row">
          <p className="col-sm-4 text-muted text-sm-right font-weight-500 mb-0 mb-sm-3">
            Send Amount
          </p>
          <p className="col-sm-8 font-weight-500">₦{transferInfo.amount}</p>
        </div>
        <div className="row">
          <p className="col-sm-4 text-muted text-sm-right mb-0 mb-sm-3">
            Reference ID
          </p>
          <p className="col-sm-8">DGB09865834</p>
        </div>
        <div className="row">
          <p className="col-sm-4 text-muted text-sm-right mb-0 mb-sm-3">
            Narration
          </p>
          <p className="col-sm-8">{transferInfo.narration}</p>
        </div>
        <div className="row d-flex align-items-center">
          <p className="col-sm-4 text-muted text-sm-right mb-0 mb-sm-3">Pin</p>
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
      </div>
    </div>
  );
}

export default Index;
