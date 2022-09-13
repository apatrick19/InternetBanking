import React from "react";
import "./style.css";
import receiptBackground from "../../asset/images/receipt-background.png";
import logo2 from "../../asset/images/logo-2x.png";
import logo from "../../asset/images/logo.png";

const Index = React.forwardRef(({ state }, ref) => {
  const date = new Date()?.toString()?.slice(0, 25);

  const receiptStyle = {
    receipt: {
      /* background-image: url(receipt-background.png); */
      backgroundImage: `url(${receiptBackground})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: "cover",
      padding: "2rem",
    },
    logoHead: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    internetBankingText: {
      color: "#035572",
    },
    toptext: {
      fontSize: "20px",
      paddingTop: "59px",
      color: "#035572",
      width: "100%",
      textAlign: "center",
    },
    info: {
      fontSize: "1rem",
      color: "#000",
      fontWeight: "400",
      borderBottom: "1px solid grey",
      padding: "16px",
      paddingTop: "56px",
      paddingRight: "0px",
      paddingLeft: "0px",
    },
    subInfo: {
      fontSize: "1.2rem",
      color: "#035572",
      fontWeight: "500",
      float: "right",
    },
    subInfoWithMessage: {
      marginTop: "-20px",
    },
    subInfoMessage: {
      color: "#767676",
      fontSize: "0.9rem",
    },
    buttomText: {
      color: "#035572",
      width: "100%",
      paddingTop: "5px",
      textAlign: "center",
    },
    subName: {
      marginTop: "-20px",
      fontSize: "1.2rem",
      color: "#035572",
      fontWeight: "500",
      float: "right",
    },
    receiptShareButton: {
      color: "#fff",
      background: "#035572",
      padding: "8px 16px",
      border: "none",
      borderRadius: "11px",
    },
  };

  return (
    <div style={receiptStyle.receipt} ref={ref}>
      <div style={receiptStyle.logoHead}>
        <div>
          <img src={logo} srcSet={`${logo2} 2x`} alt="" />
        </div>{" "}
        <span style={receiptStyle.internetBankingText}>Internet Banking</span>
      </div>
      <div>
        <h1 style={receiptStyle.toptext}>TRANSACTION DETAILS</h1>
      </div>
      <div style={receiptStyle.info}>
        Beneficiary Line{" "}
        <span style={receiptStyle.subInfo}>
          {state.billerName} - {state.beneficiaryPhoneNumber}
        </span>
      </div>
      <div style={receiptStyle.info}>
        Paid On<span style={receiptStyle.subInfo}>{date}</span>
      </div>
      <div style={receiptStyle.info}>
        Sender
        <span style={receiptStyle.subName}>
          {state.sourceAccountName} <br />
          <div style={receiptStyle.subInfoMessage}>
            {state.sourceAccountName} - Excellent Bank
          </div>
        </span>
      </div>
      <div style={receiptStyle.info}>
        Purchase Amount<span style={receiptStyle.subInfo}>{state.amount}</span>
      </div>
      <div style={receiptStyle.info}>
        Purchase Method<span style={receiptStyle.subInfo}>{state.type}</span>
      </div>
      {/* <div className="info">
        uniqueIdentifier
        <span className="sub-info">{state.uniqueIdentifier}</span>
      </div> */}
      <div style={receiptStyle.info}>
        Transaction Fee<span style={receiptStyle.subInfo}>N0.00</span>
      </div>
      <div className="mt-5" style={receiptStyle.buttomText}>
        <button style={receiptStyle.receiptShareButton}>
          <i className="fas fa-share mr-1"></i>Share
        </button>
      </div>
      <div className="mt-3">
        <div style={receiptStyle.buttomText}>
          Click here to download the mobile app.
        </div>
        <div style={receiptStyle.buttomText}>
          © 2022, Excellent Bank Bank Services.
        </div>
      </div>
    </div>
  );
});

export default Index;
