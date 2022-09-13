import React, { useRef } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import ReactToPrint from "react-to-print";
import ReceiptAirtime from "../../../component/reciept/airtime-receipt";

function Index() {
  const location = useLocation();
  const navigate = useNavigate();
  const componentRef = useRef(null);
  const state = location?.state;

  const handleNavigation = () => {
    navigate("/bills-and-payment");
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
          You've Succesfully paid{" "}
          <span className="text-4 font-weight-500">₦{state?.amount}</span> for{" "}
          <span className="font-weight-500">
            {state?.billerName} {state?.type}
          </span>
          , See transaction details under{" "}
          <Link to="/transaction">Activity</Link>.
        </p>
        <button
          className="btn btn-primary btn-block"
          onClick={handleNavigation}
        >
          Pay More Bills
        </button>

        {state?.isAirtime && (
          <ReactToPrint
            trigger={() => (
              <button className="btn btn-link btn-block">
                <i className="fas fa-print"></i> Print Receipt
              </button>
            )}
            content={() => componentRef.current}
          />
        )}
      </div>
      <div style={{ display: "none" }}>
        <ReceiptAirtime ref={componentRef} state={state} />
      </div>
    </div>
  );
}

export default Index;
