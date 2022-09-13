import React, { useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Reciept from "../../../component/reciept";
import ReactToPrint from "react-to-print";

function Index() {
  const location = useLocation();
  const navigate = useNavigate();
  const componentRef = useRef(null);
  const state = location?.state?.transferInfo;

  const navigateToTransfer = () => {
    navigate("/transfer-money");
  };

  return (
    <div className="py-5 col-md-8 col-lg-6 col-xl-5 mx-auto">
      <div className="bg-light shadow-sm rounded p-3 p-sm-4 mb-4">
        <div className="text-center my-5">
          <p className="text-center text-success text-20 line-height-07">
            <i className="fas fa-check-circle"></i>
          </p>
          <p className="text-center text-success text-8 line-height-07">
            Success!
          </p>
          <p className="text-center text-4">Transactions Complete</p>
        </div>
        <p className="text-center text-3 mb-4">
          You've Succesfully sent{" "}
          <span className="text-4 font-weight-500">₦{state?.amount}</span> to{" "}
          <span className="font-weight-500">{state?.toAccountName}</span>, See
          transaction details under <Link to="/transaction">Activity</Link>.
        </p>
        <button
          onClick={navigateToTransfer}
          className="btn btn-primary btn-block"
        >
          Send More Money
        </button>
        <ReactToPrint
          trigger={() => (
            <button className="btn btn-link btn-block">
              <i className="fas fa-print"></i> Print Receipt
            </button>
          )}
          content={() => componentRef.current}
        />
      </div>
      <div style={{ display: "none" }}>
        <Reciept ref={componentRef} state={state} />
      </div>
    </div>
  );
}

export default Index;
