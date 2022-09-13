import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/context";

function Index({ current }) {
  // state for showing account balance
  const [shoWBalance, setShowBalance] = useState(false);
  const { sidebarToggle } = useContext(Context);

  const toggleShowBalance = () => {
    setShowBalance(!shoWBalance);
  };

  let account;

  try {
    const currentAccount = sessionStorage.getItem("currentAccount");

    account = JSON.parse(currentAccount);
  } catch (error) {
    console.log("An Errors Occurred");
  }

  return (
    <aside
      className={
        sidebarToggle
          ? "py-3 col-lg-2 side-menu d-none"
          : "py-3 col-lg-2 side-menu"
      }
    >
      <div className="bg-primary text-white shadow-sm rounded p-3">
        <p className="mb-0 opacity-6">
          Available Balance{" "}
          <span onClick={toggleShowBalance}>
            {shoWBalance ? (
              <i className="fas fa-eye"></i>
            ) : (
              <i className="fas fa-eye-slash"></i>
            )}
          </span>
        </p>
        <h4 className="font-weight-400 account-balance">
          {shoWBalance
            ? `₦${account?.withdrawableAmount && account?.withdrawableAmount}`
            : `xxxxxx`}
        </h4>
        <p className="mb-0 opacity-6 small">
          Book Balance:{" "}
          <span>
            {" "}
            {shoWBalance
              ? `₦${account?.ledgerBalance && account?.ledgerBalance}`
              : `XXXXXX`}
          </span>
        </p>
        <p className="mb-2 opacity-6 small">
          A/C: <span>{account?.nuban}</span>
        </p>
      </div>
      <ul className="navbar-nav mr-auto mt-2">
        <Link className="my-2" to="/account">
          <li className={current === "account" ? "active p-2" : "p-2"}>
            <i className="fas fa-user"></i> <span>My Account</span>
          </li>
        </Link>
        <Link className="my-2" to="/transaction">
          <li className={current === "transaction" ? "active p-2" : "p-2"}>
            <i className="fas fa-receipt"></i> <span>Transactions</span>
          </li>
        </Link>
        <Link className="my-2" to="/transfer-money">
          <li className={current === "transfer" ? "active p-2" : "p-2"}>
            <i className="fas fa-paper-plane"></i> <span>Transfer Money</span>
          </li>
        </Link>
        <Link className="my-2" to="/airtime-data">
          <li className={current === "airtime" ? "active p-2" : "p-2"}>
            <i className="fas fa-mobile"></i> <span>Airtime & Data</span>
          </li>
        </Link>
        <Link className="my-2" to="/bills-and-payment">
          <li className={current === "bills" ? "active p-2" : "p-2"}>
            <i className="fas fa-bolt"></i> <span>Bills</span>
          </li>
        </Link>
        <Link className="my-2" to="/card-bank">
          <li className={current === "card" ? "active p-2" : "p-2"}>
            <i className="fas fa-credit-card"></i>{" "}
            <span>Cards & Bank Accounts</span>
          </li>
        </Link>
        <Link className="my-2" to="/kyc">
          <li className={current === "kyc" ? "active p-2" : "p-2"}>
            <i className="fas fa-file-alt"></i>
            <span>KYC Upload</span>
          </li>
        </Link>
        <Link className="my-2" to="/self-service">
          <li className={current === "self" ? "active p-2" : "p-2"}>
            <i className="fas fa-cog"></i> <span>Self Services</span>
          </li>
        </Link>
        <Link className="my-2" to="/feedback">
          <li className={current === "feedback" ? "active p-2" : "p-2"}>
            <i className="fas fa-comment-alt"></i> <span>Feedback</span>
          </li>
        </Link>
        <Link className="my-2" to="/">
          <li className="p-2">
            <i className="fas fa-box"></i>
            <span>Logout</span>
          </li>
        </Link>
      </ul>
    </aside>
  );
}

export default Index;
