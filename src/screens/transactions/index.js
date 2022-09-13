/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import Header from "../../component/Header";
import Sidebar from "../../component/sidebar";
import Footer from "../../component/footer";
import { Modal } from "react-bootstrap";
import { DateRangePicker } from "rsuite";
import {
  generateStatement,
  getTransactionsForTransactionPage,
} from "../../api/transaction/transaction";
import { SpinnerDiamond } from "spinners-react";
import Pagination from "../../component/transactionPagination";

function ModalSub({ show, handleClose, data }) {
  const date = new Date(data?.transactionDate);
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
                  <h3 className="text-4 text-white font-weight-400 my-3">
                    {data?.referenceID}
                  </h3>
                  <div className="text-8 font-weight-500 text-white my-4">
                    ₦{data?.amount}
                  </div>
                  <p className="text-white">{date?.toString().slice(0, 24)}</p>
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
                    <li className="text-muted">Moyinsola Ogbeun</li>
                  </ul>
                  <ul className="list-unstyled">
                    <li className="font-weight-500">Transaction ID:</li>
                    <li className="text-muted">
                      {data?.instrumentNo.toString()}
                    </li>
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
  const [show, setShow] = React.useState(false);
  const [transactionDate, setTransactionDate] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [statementDate, setStatementDate] = useState([]);
  // modal data index
  const [modalIndex, setModalIndex] = useState(null);

  const handleClose = () => setShow(false);

  const handleShow = (index) => {
    setModalIndex(index);
    setShow(true);
  };

  useEffect(() => {
    const fetchTransactions = async (noOfTransaction) => {
      const res = await getTransactionsForTransactionPage({
        ...transactionDate,
        numberOfItems: noOfTransaction,
      });
      setTransactions(res?.history);
    };
    fetchTransactions();
  }, [transactionDate]);

  // handle statement download and statement date change

  useEffect(() => {
    const fetchTransactions = async () => {
      generateStatement({
        ...statementDate,
      });
      // setTransactions(res?.history);
    };
    fetchTransactions();
  }, [statementDate]);

  return (
    <div id="main-wrapper" className="ex-dashboard">
      <ModalSub
        show={show}
        handleClose={handleClose}
        data={transactions && transactions[modalIndex]}
      />
      <Header />
      <div className="container-fluid">
        <div className="row">
          <Sidebar current="transaction" />
          <div className="py-3 col-lg-10">
            <h2 className="font-weight-400 mb-3">Transactions</h2>
            <div className="row">
              <div className="col mb-2">
                <form id="filterTransactions" method="post">
                  <div className="form-row">
                    <DateRangePicker
                      appearance="default"
                      placeholder="select date range"
                      onChange={(date) => {
                        const date1 = date[0];
                        const splitDate1 = date1?.toString().split(" ");
                        const joinSplitDate1 = `${splitDate1[2]} ${splitDate1[1]} ${splitDate1[3]} ${splitDate1[4]} UTC`;
                        const objDate1 = new Date(joinSplitDate1);
                        const startDate = objDate1?.toISOString();

                        const date2 = date[1];
                        const splitDate2 = date2.toString().split(" ");
                        const joinSplitDate2 = `${splitDate2[2]} ${splitDate2[1]} ${splitDate2[3]} ${splitDate2[4]} UTC`;
                        const objDate2 = new Date(joinSplitDate2);
                        const endDate = objDate2.toISOString();

                        setTransactionDate({
                          startDate,
                          endDate,
                        });
                      }}
                      style={{ width: 230 }}
                    />

                    {/* statement */}

                    <div className="col-auto d-flex align-items-center ml-auto form-group">
                      <div className="dropdown">
                        {" "}
                        <a
                          className="text-muted btn-link"
                          href="#"
                          role="button"
                          id="statements"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <i className="fas fa-file-download text-3 mr-1"></i>
                        </a>
                        <DateRangePicker
                          size="sm"
                          placement="leftStart"
                          appearance="default"
                          placeholder="Download Statement"
                          onChange={(date) => {
                            const date1 = date[0];
                            const splitDate1 = date1?.toString().split(" ");
                            const joinSplitDate1 = `${splitDate1[2]} ${splitDate1[1]} ${splitDate1[3]} ${splitDate1[4]} UTC`;
                            const objDate1 = new Date(joinSplitDate1);
                            const startDate = objDate1?.toISOString();

                            const date2 = date[1];
                            const splitDate2 = date2.toString().split(" ");
                            const joinSplitDate2 = `${splitDate2[2]} ${splitDate2[1]} ${splitDate2[3]} ${splitDate2[4]} UTC`;
                            const objDate2 = new Date(joinSplitDate2);
                            const endDate = objDate2.toISOString();

                            setStatementDate({
                              startDate,
                              endDate,
                            });
                          }}
                          style={{ width: 230 }}
                        />
                      </div>
                    </div>
                    <div className="col-12 collapse mb-3" id="allFilters">
                      <div className="custom-control custom-radio custom-control-inline">
                        <input
                          type="radio"
                          id="allTransactions"
                          name="allFilters"
                          className="custom-control-input"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="allTransactions"
                        >
                          All Transactions
                        </label>
                      </div>
                      <div className="custom-control custom-radio custom-control-inline">
                        <input
                          type="radio"
                          id="paymentsSend"
                          name="allFilters"
                          className="custom-control-input"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="paymentsSend"
                        >
                          Payments Send
                        </label>
                      </div>
                      <div className="custom-control custom-radio custom-control-inline">
                        <input
                          type="radio"
                          id="paymentsReceived"
                          name="allFilters"
                          className="custom-control-input"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="paymentsReceived"
                        >
                          Payments Received
                        </label>
                      </div>
                      <div className="custom-control custom-radio custom-control-inline">
                        <input
                          type="radio"
                          id="refunds"
                          name="allFilters"
                          className="custom-control-input"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="refunds"
                        >
                          Refunds
                        </label>
                      </div>
                      <div className="custom-control custom-radio custom-control-inline">
                        <input
                          type="radio"
                          id="withdrawal"
                          name="allFilters"
                          className="custom-control-input"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="withdrawal"
                        >
                          Withdrawal
                        </label>
                      </div>
                      <div className="custom-control custom-radio custom-control-inline">
                        <input
                          type="radio"
                          id="deposit"
                          name="allFilters"
                          className="custom-control-input"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="deposit"
                        >
                          Deposit
                        </label>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="bg-light shadow-sm rounded py-4 mb-4">
              <h3 className="text-5 font-weight-400 d-flex align-items-center px-4 mb-3">
                All Transactions
              </h3>
              {transactions?.length !== 0 ? (
                <>
                  <div className="transaction-title py-2 px-4">
                    <div className="row">
                      <div className="col-2 col-sm-1 text-center">
                        <span className="">Date</span>
                      </div>
                      <div className="col col-sm-7">Description</div>
                      <div className="col-auto col-sm-2 d-none d-sm-block text-center">
                        Status
                      </div>
                      <div className="col-3 col-sm-2 text-right">Amount</div>
                    </div>
                  </div>
                  <div className="transaction-list">
                    {/* renderlist item */}
                    <Pagination
                      transactions={transactions}
                      handleShow={handleShow}
                    />
                  </div>

                  {/* <ul className="pagination justify-content-center mt-4 mb-0">
                    <li className="page-item disabled">
                      {" "}
                      <a className="page-link" href="#" tabIndex="-1">
                        <i className="fas fa-angle-left"></i>
                      </a>{" "}
                    </li>
                    <li className="page-item active">
                      <a className="page-link" href="#">
                        1
                      </a>
                    </li>
                    <li className="page-item ">
                      {" "}
                      <a className="page-link" href="#">
                        2 <span className="sr-only">(current)</span>
                      </a>{" "}
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        3
                      </a>
                    </li>
                    <li className="page-item d-flex align-content-center flex-wrap text-muted text-5 mx-1">
                      ......
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        15
                      </a>
                    </li>
                    <li className="page-item">
                      {" "}
                      <a className="page-link" href="#">
                        <i className="fas fa-angle-right"></i>
                      </a>{" "}
                    </li>
                  </ul> */}
                </>
              ) : (
                <div className="loader-container">
                  <SpinnerDiamond
                    size={50}
                    color="#00ac9f"
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
