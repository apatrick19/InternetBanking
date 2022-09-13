/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useContext } from "react";
import Header from "../../component/Header";
import Sidebar from "../../component/sidebar";
import { Modal } from "react-bootstrap";
import { getAllAccountByCustomerId } from "../../api/account/account";
import { getTransactions } from "../../api/transaction/transaction";
import Footer from "../../component/footer";
import "./account.css";
import { Context } from "../../context/context";
import { setSidebarState } from "../../context/actions/account";
import { Position, Tooltip } from "evergreen-ui";
import { SpinnerDiamond } from "spinners-react";
import { Link } from "react-router-dom";

function ModalSub({ show, handleClose, data }) {
  const date = new Date(data?.dateCreated);

  return (
    <div id="transaction-detail">
      <div className="transaction-details">
        <Modal
          // size="lg"
          show={show}
          onHide={handleClose}
          animation={false}
          dialogClassName="main-modal"
          aria-labelledby="example-custom-modal-styling-title"
          centered
        >
          <Modal.Body>
            <div className="row no-gutters">
              <div className="col-sm-5 d-flex justify-content-center bg-primary rounded-left py-4">
                <div className="my-auto text-center">
                  <div className="text-17 text-white my-3">
                    <i className="fas fa-building"></i>
                  </div>
                  {/* <h3 className="text-4 text-white font-weight-400 my-3">
                    Moyinsola Ogbeun
                  </h3> */}
                  <div className="text-8 font-weight-500 text-white my-4">
                    ₦{data?.amount}
                  </div>
                  <p className="text-white">{date.toString().slice(0, 24)}</p>
                </div>
              </div>
              <div className="col-sm-7">
                <h5 className="text-5 font-weight-400 m-3">
                  Transaction Details
                  <button
                    type="button"
                    className="close font-weight-400"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    {" "}
                    <span onClick={handleClose}>&times;</span>{" "}
                  </button>
                </h5>
                <hr />
                <div className="px-3">
                  <ul className="list-unstyled">
                    <li className="mb-2">
                      Payment Amount{" "}
                      <span className="float-right text-3">
                        ₦{data?.amount}
                      </span>
                    </li>
                    <li className="mb-2">
                      Fee <span className="float-right text-3">-₦0</span>
                    </li>
                  </ul>
                  <hr className="mb-2" />
                  <p className="d-flex align-items-center font-weight-500 mb-4">
                    Total Amount{" "}
                    <span className="text-3 ml-auto">₦{data?.amount}</span>
                  </p>
                  <ul className="list-unstyled">
                    <li className="font-weight-500">Paid By:</li>
                    <li className="text-muted">{data?.sourceAccountNumber}</li>
                  </ul>
                  <ul className="list-unstyled">
                    <li className="font-weight-500">Transaction ID:</li>
                    <li className="text-muted">26566689645685976589</li>
                  </ul>
                  <ul className="list-unstyled">
                    <li className="font-weight-500">Description:</li>
                    <li className="text-muted">{data?.description}</li>
                  </ul>
                  <ul className="list-unstyled">
                    <li className="font-weight-500">Status:</li>
                    <li className="text-muted">Completed</li>
                  </ul>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

function Index() {
  const { userDispatch, userState, sidebarDispatch } = useContext(Context);
  const [account, setAccount] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [displayAccount, setDisplayAccount] = useState(0);
  const [show, setShow] = useState(false);
  // state for showing account balance
  const [shoWBalance, setShowBalance] = useState(false);
  // index to track modal data
  const [modalIndex, setModalIndex] = useState(null);

  const { accountInfo } = userState;

  useEffect(() => {
    const fetchUserData = async () => {
      const customerId = sessionStorage.getItem("customerId");
      const token = sessionStorage.getItem("token");

      const data = {
        customerId,
        token,
        dispatch: userDispatch,
      };
      await getAllAccountByCustomerId(data);

      const res = await getTransactions();
      setTransactions(res?.channelTransactions);
    };

    fetchUserData().catch(console.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setAccount(accountInfo?.accounts[displayAccount]);
    setSidebarState(sidebarDispatch, accountInfo?.accounts[displayAccount]);

    accountInfo &&
      sessionStorage.setItem(
        "currentAccount",
        JSON.stringify(accountInfo?.accounts[displayAccount])
      );

    // window.location.reload(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayAccount, accountInfo]);

  const handleClose = () => setShow(false);
  const handleShow = (index) => {
    setModalIndex(index);
    setShow(true);
  };

  const previousAccount = () => {
    if (displayAccount > 0) {
      setDisplayAccount(displayAccount - 1);
      setAccount(accountInfo?.accounts[displayAccount]);
      sessionStorage.setItem(
        "currentAccount",
        JSON.stringify(accountInfo?.accounts[displayAccount])
      );
      setSidebarState(sidebarDispatch, accountInfo?.accounts[displayAccount]);
    }
  };

  const nextAccount = () => {
    if (displayAccount < accountInfo?.accounts.length - 1) {
      setDisplayAccount(displayAccount + 1);
      setAccount(accountInfo?.accounts[displayAccount]);
      sessionStorage.setItem(
        "currentAccount",
        JSON.stringify(accountInfo?.accounts[displayAccount])
      );
      setSidebarState(sidebarDispatch, accountInfo?.accounts[displayAccount]);
    }
  };

  const toggleShowBalance = () => {
    setShowBalance(!shoWBalance);
  };

  return (
    <div id="main-wrapper" className="ex-dashboard">
      <Header />
      <ModalSub
        show={show}
        handleClose={handleClose}
        data={transactions && transactions[modalIndex]}
      />
      <div className="container-fluid">
        <div className="row">
          <Sidebar current="account" />
          <div className="py-3 col-lg-10">
            <div className="bg-light shadow-sm rounded p-4 mb-4">
              <h3 className="text-5 font-weight-400 d-flex align-items-center justify-content-between mb-3">
                <div>Hello, {account?.accountName}</div>
                <div className="arrows">
                  <span onClick={previousAccount} className="mr-3 arrow-color">
                    <i id="left" className="fas fa-chevron-left"></i>
                  </span>

                  <span onClick={nextAccount} className="arrow-color">
                    <i id="right" className="fas fa-chevron-right"></i>
                  </span>
                </div>
              </h3>
              <div className="profile-completeness mt-4">
                <div className="row d-flex align-items-center">
                  <div className="col-lg-5 mb-3 mb-sm-0">
                    <div className="d-flex">
                      <div className="text-17 text-primary mr-3">
                        <i className="fas fa-wallet"></i>
                      </div>
                      <div className="">
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
                        <h2 className="font-weight-400 account-balance">
                          {shoWBalance
                            ? `₦${
                                account?.withdrawableAmount &&
                                account?.withdrawableAmount
                              }`
                            : `xxxxxx`}
                        </h2>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-7">
                    <div className="row">
                      <div className="col-lg-4 col-6">
                        <p className="mb-0 opacity-6">Book Balance</p>
                        <h5>
                          {shoWBalance
                            ? `₦${
                                account?.ledgerBalance && account?.ledgerBalance
                              }`
                            : `XXXXXX`}
                        </h5>
                      </div>
                      <div className="col-lg-4 col-6">
                        <p className="mb-0 opacity-6">Account Number</p>
                        <h5>{account?.nuban}</h5>
                      </div>
                      <div className="col-lg-4">
                        <p className="mb-0 opacity-6">Account Type</p>
                        <h5>{account?.accountType}</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-light shadow-sm rounded py-4 mb-4">
              <h3 className="text-5 font-weight-400 d-flex align-items-center px-4 mb-3">
                Recent Activity
              </h3>
              {/* show loader if transaction array is empty */}
              {transactions?.length !== 0 ? (
                <>
                  <div className="transaction-title py-2 px-4">
                    <div className="row">
                      <div className="col-2 col-sm-1 text-center">
                        <span className="">Date</span>
                      </div>
                      <div className="col col-sm-7">Description</div>
                      <div className="col-auto col-sm-2 d-none d-sm-block text-center">
                        type
                      </div>
                      <div className="col-3 col-sm-2 text-right">Amount</div>
                    </div>
                  </div>

                  <div className="transaction-list">
                    {transactions?.map((transaction, i) => {
                      const date = new Date(transaction?.dateCreated);
                      const monthNames = [
                        "January",
                        "February",
                        "March",
                        "April",
                        "May",
                        "June",
                        "July",
                        "August",
                        "September",
                        "October",
                        "November",
                        "December",
                      ];
                      const month = date.getMonth();
                      const day = date.getDate();

                      return (
                        <div
                          className="transaction-item px-4 py-3"
                          data-toggle="modal"
                          data-target="#transaction-detail"
                          onClick={() => handleShow(i)}
                          key={i}
                        >
                          <div className="row align-items-center flex-row">
                            <div className="col-2 col-sm-1 text-center">
                              {" "}
                              <span className="d-block text-4 font-weight-300">
                                {day}
                              </span>{" "}
                              <span className="d-block text-1 font-weight-300 text-uppercase">
                                {monthNames[month]}
                              </span>{" "}
                            </div>
                            <div className="col col-sm-7">
                              {" "}
                              <span className="d-block text-4">
                                {transaction?.recipient}
                              </span>{" "}
                              <span className="text-muted">
                                {transaction?.description}
                              </span>{" "}
                            </div>
                            <div className="col-auto col-sm-2 d-none d-sm-block text-center text-3">
                              {" "}
                              {transaction?.debitCredit === "D" ? (
                                <span
                                  className="text-danger"
                                  data-toggle="tooltip"
                                  data-original-title="Cancelled"
                                >
                                  <Tooltip content="Completed">
                                    <div className="status-debited">Debit</div>
                                  </Tooltip>
                                </span>
                              ) : (
                                <span
                                  className="text-success"
                                  data-toggle="tooltip"
                                  data-original-title="Completed"
                                >
                                  <Tooltip
                                    content="Completed"
                                    position={Position.TOP}
                                  >
                                    <div className="status-debited">Debit</div>
                                  </Tooltip>
                                </span>
                              )}
                            </div>
                            <div className="col-4 col-sm-2 text-right text-4">
                              {" "}
                              <span className="text-nowrap">
                                {transaction?.debitCredit === "D" ? "- " : ""}
                                {transaction?.amount}
                              </span>{" "}
                              <span className="text-2 text-uppercase">
                                (NGN)
                              </span>{" "}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="text-center mt-4">
                    <Link to="/transaction" className="btn-link text-3">
                      View all
                      <i className="fas fa-chevron-right text-2 ml-2"></i>
                    </Link>
                  </div>
                </>
              ) : (
                <div className="loader-container">
                  <SpinnerDiamond
                    size={50}
                    color="##00ac9f"
                    secondaryColor="#035572"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Index;
