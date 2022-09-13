import { toaster } from "evergreen-ui";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { sendBillPayment } from "../../../api/billsPayment/bills";
import PinModal from "../../../component/createPinModal";

function BillsConfirm() {
  const navigate = useNavigate();
  const location = useLocation();
  const dataForBillsPayment = location?.state?.data;

  const [show, setShow] = useState(false);
  const [pin, setPin] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClick = (e) => {
    e.preventDefault();

    if (!pin) {
      toaster.warning("Kindly provide your pin");
      return;
    }

    const updatedDataForBillsPayment = {
      ...dataForBillsPayment,
      pin,
    };
    sendBillPayment(updatedDataForBillsPayment, navigate);
  };

  useEffect(() => {
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

    if (!userInfo?.isPinCreated) {
      handleShow();
    }
  }, []);

  // confirm payment date
  const date = new Date()?.toString()?.slice(0, 15);

  const amount =
    dataForBillsPayment?.customAmount &&
    parseInt(dataForBillsPayment?.customAmount);

  return (
    <>
      <div className="py-5 col-md-8 col-lg-6 col-xl-5 mx-auto">
        <PinModal show={show} handleClose={handleClose} />
        <div className="bg-light shadow-sm rounded p-3 p-sm-4 mb-4">
          <p className="text-4 text-center alert alert-info">
            You are paying for <br />
            <span className="font-weight-500">
              {dataForBillsPayment?.paymentItemName} ₦{amount}
            </span>
          </p>
          <div className="row">
            <p className="col-sm-4 text-muted text-sm-right mb-0 mb-sm-3">
              CustomerId
            </p>
            <p className="col-sm-8">{dataForBillsPayment?.customerId}</p>
          </div>
          <div className="row">
            <p className="col-sm-4 text-muted text-sm-right mb-0 mb-sm-3">
              Biller
            </p>
            <p className="col-sm-8">
              {" "}
              {dataForBillsPayment?.paymentItemName} ₦
              {dataForBillsPayment?.customAmount}
            </p>
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
            <p className="col-sm-8 font-weight-500">
              {" "}
              {dataForBillsPayment?.customAmount}
            </p>
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
              Confirm Payment
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default BillsConfirm;
