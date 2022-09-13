import React, { useEffect, useState } from "react";
import Header from "../../component/Header";
import Sidebar from "../../component/sidebar";
// import visa from "../../asset//images/payment/visa.svg";
// import mastercard from "../../asset/images/payment/mastercard.svg";
import Footer from "../../component/footer";
import Select from "react-select";
import { Modal } from "react-bootstrap";
import { get_card_config, request_card } from "../../api/card/card";
import { SpinnerCircular } from "spinners-react";
import { toaster } from "evergreen-ui";

function ModalSub({ show, handleClose }) {
  const userInfo =
    sessionStorage.getItem("userInfo") &&
    JSON.parse(sessionStorage.getItem("userInfo"));

  const account = userInfo?.accounts[0];

  const [cardType, setCardType] = useState(null);
  const [requestType, setRequestType] = useState(null);
  const [delivery, setDelivery] = useState(null);
  const [fromAccount, setFromAccount] = useState(null);
  // loader
  const [loading, setLoading] = useState(false);

  // arrays
  const [cardTypeArr, setCardTypeArr] = useState([]);
  const [requestTypeArr, setRequestTypeArr] = useState([]);
  const [fromAccountArr, setFromAccountArr] = useState([]);
  const [deliveryArr, setDeliveryArr] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await get_card_config();
      const _cardTypeArr = [];
      const _requestTypeArr = [];
      const _accountsArr = [];
      const _deliveryArr = [];

      // create cardType Arr
      for (let x in data?.cardProfiles) {
        const card = {
          label: data?.cardProfiles[x]?.displayName,
          value: data?.cardProfiles[x]?.displayName,
          bin: data?.cardProfiles[x]?.bin,
        };
        _cardTypeArr.push(card);
      }
      setCardTypeArr(_cardTypeArr);

      // create request type Arr
      for (let x in data?.requestType) {
        const card = {
          label: data?.requestType[x],
          value: data?.requestType[x],
        };
        _requestTypeArr.push(card);
      }

      setRequestTypeArr(_requestTypeArr);

      // create delivery method arr
      for (let x in data?.deliveryOptions) {
        const delivery = {
          label: data?.deliveryOptions[x].optionName,
          value: data?.deliveryOptions[x].optionName,
        };
        _deliveryArr.push(delivery);
      }

      setDeliveryArr(_deliveryArr);

      // create account Arr
      for (let x in userInfo?.accounts) {
        const account = {
          label: userInfo?.accounts[x].nuban,
          value: userInfo?.accounts[x].nuban,
        };
        _accountsArr.push(account);
      }

      setFromAccountArr(_accountsArr);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = async (e) => {
    setLoading(true);
    e.preventDefault();

    const data = {
      bin: cardType?.bin,
      accountNumber: fromAccount?.value,
      requestType: requestType?.value,
      deliveryOption: delivery?.value,
      identifier: cardType?.bin,
      nameOnCard: account?.accountName,
    };

    const res = await request_card(data);

    if (res) {
      setLoading(false);
    }
    if (res?.responseCode === "00") {
      toaster.notify(res?.responseMessage);
    } else {
      toaster.danger(res?.responseMessage);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} animation={false} centered>
      <Modal.Body>
        <div className="modal-header">
          <h5 className="modal-title font-weight-400">Request a New Card</h5>
          <button
            type="button"
            className="close font-weight-400"
            onClick={handleClose}
          >
            {" "}
            <span aria-hidden="true">&times;</span>{" "}
          </button>
        </div>
        <div className="modal-body p-4">
          <form id="addCard">
            <div className="form-group">
              <label htmlFor="cardHolderName">Card Holder Name</label>
              <input
                type="text"
                className="form-control"
                data-bv-field="cardholdername"
                id="cardHolderName"
                defaultValue={account?.accountName}
                placeholder="Card Holder Name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="cardType">Card Type</label>
              <Select
                defaultValue={cardType}
                onChange={setCardType}
                options={cardTypeArr}
              />
            </div>
            <div className="form-group">
              <label htmlFor="cardType">Request Type</label>
              <Select
                defaultValue={requestType}
                onChange={setRequestType}
                options={requestTypeArr}
              />
            </div>
            <div className="form-group">
              <label htmlFor="AccountDebit">Account to Debit</label>
              <Select
                defaultValue={fromAccount}
                onChange={setFromAccount}
                options={fromAccountArr}
              />
            </div>
            <div className="form-group">
              <label htmlFor="Delivery">Delivery</label>
              <Select
                defaultValue={delivery}
                onChange={setDelivery}
                options={deliveryArr}
              />
            </div>
            <button
              onClick={handleClick}
              className="btn btn-primary btn-block"
              type="submit"
            >
              {loading ? (
                <SpinnerCircular
                  size={25}
                  color="#00ac9f"
                  secondaryColor="#035572"
                />
              ) : (
                "Request a New Card"
              )}
            </button>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
}

function Index() {
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClick = (e) => {
    e.preventDefault();
    handleShow();
  };

  return (
    <div id="main-wrapper" className="ex-dashboard">
      <ModalSub show={show} handleClose={handleClose} />
      <Header />
      <div id="content">
        <div className="container-fluid">
          <div className="row">
            <Sidebar current="card" />
            <div className="py-3 col-lg-10">
              <div className="bg-light shadow-sm rounded p-4 mb-4">
                <h3 className="text-5 font-weight-400 mb-4">
                  Credit or Debit Cards{" "}
                  <span className="text-muted text-4">(for payments)</span>
                </h3>
                <div className="row">
                  {/* <div className="col-12 col-sm-6 col-lg-4">
                    <div className="account-card account-card-primary text-white rounded p-3 mb-4 mb-lg-0">
                      <p className="text-4">XXXX-XXXX-XXXX-4151</p>
                      <p className="d-flex align-items-center my-4 py-3">
                        {" "}
                        <span className="account-card-expire text-uppercase d-inline-block opacity-6 mr-2">
                          Valid
                          <br />
                          thru
                          <br />
                        </span>{" "}
                        <span className="text-4 opacity-9">07/24</span>{" "}
                        <span className="bg-light text-0 text-body font-weight-500 rounded-pill d-inline-block px-2 line-height-4 opacity-8 ml-auto">
                          Primary
                        </span>{" "}
                      </p>
                      <p className="d-flex align-items-center m-0">
                        {" "}
                        <span className="text-uppercase font-weight-500">
                          Falasinu Olumide
                        </span>{" "}
                        <img
                          className="ml-auto"
                          src={visa}
                          alt="visa"
                          title=""
                          style={{ width: "60px" }}
                        />{" "}
                      </p>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6 col-lg-4">
                    <div className="account-card text-white rounded p-3 mb-4 mb-lg-0">
                      <p className="text-4">XXXX-XXXX-XXXX-6296</p>
                      <p className="d-flex align-items-center my-4 py-3">
                        {" "}
                        <span className="account-card-expire text-uppercase d-inline-block opacity-6 mr-2">
                          Valid
                          <br />
                          thru
                          <br />
                        </span>{" "}
                        <span className="text-4 opacity-9">07/23</span>{" "}
                      </p>
                      <p className="d-flex align-items-center m-0">
                        {" "}
                        <span className="text-uppercase font-weight-500">
                          Falasinu Olumide
                        </span>{" "}
                        <img
                          className="ml-auto"
                          src={mastercard}
                          alt="mastercard"
                          title=""
                          style={{ width: "43px" }}
                        />{" "}
                      </p>
                    </div>
                  </div> */}
                  <div
                    style={{ height: "200px" }}
                    className="col-12 col-sm-6 col-lg-4"
                  >
                    {" "}
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a
                      href=""
                      className="account-card-new d-flex align-items-center rounded h-100 p-3 mb-4 mb-lg-0"
                      onClick={handleClick}
                    >
                      <p className="w-100 text-center line-height-4 m-0">
                        {" "}
                        <span className="text-3">
                          <i className="fas fa-plus-circle"></i>
                        </span>{" "}
                        <span className="d-block text-body text-3">
                          Request New Card
                        </span>{" "}
                      </p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Index;
