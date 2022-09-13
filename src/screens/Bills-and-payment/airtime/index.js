import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Select from "react-select";
import { Formik } from "formik";
import { getAllAccountByCustomerId } from "../../../api/account/account";
import { Context } from "../../../context/context";
import Modal from "../../../component/createPinModal";

function Index() {
  const navigate = useNavigate();
  const location = useLocation();

  const [fromAccounts, setFromAccounts] = useState([]);
  const [fromAccount, setFromAccount] = React.useState(null);
  const { userDispatch } = useContext(Context);

  useEffect(() => {
    const fetchBank = async () => {
      let accounts = [];
      const res = await getAllAccountByCustomerId({ dispatch: userDispatch });

      // get user accounts
      for (let x in res?.accounts) {
        const account = {
          label: res?.accounts[x]?.nuban,
          value: res?.accounts[x]?.nuban,
          accountName: res?.accounts[x]?.accountName,
        };
        accounts.push(account);
      }

      setFromAccounts(accounts);
    };
    fetchBank();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  // const handleShow = (e) => {
  //   e.preventDefault();
  //   setShow(true);
  // };

  return (
    <div className="py-5 col-md-8 col-lg-6 col-xl-5 mx-auto">
      <Modal show={show} handleClose={handleClose} />
      <div className="bg-light shadow-sm rounded p-3 p-sm-4 mb-4">
        <h3 className="text-5 font-weight-400 mb-3">
          Airtime & Data (Category)
        </h3>
        <Formik
          initialValues={{ phoneNumber: "", amount: "" }}
          onSubmit={async (values) => {
            navigate("/bills-and-payment/confirm", {
              state: {
                ...location?.state,
                ...fromAccount,
                ...values,
              },
            });
          }}
        >
          {(formik) => {
            const {
              values,
              handleChange,
              handleSubmit,

              handleBlur,
            } = formik;
            return (
              <form>
                <div className="form-group">
                  <label htmlFor="SelectBank">Select Account</label>
                  <Select
                    defaultValue={fromAccount}
                    onChange={setFromAccount}
                    options={fromAccounts}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="emailID">Phone Number</label>
                  <input
                    name="phoneNumber"
                    type="text"
                    value={values.phoneNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="form-control"
                    id="emailID"
                    placeholder="Enter Phone Number"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="youSend">You're Recharging</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      {" "}
                      <span className="input-group-text">₦</span>{" "}
                    </div>
                    <input
                      name="amount"
                      type="text"
                      value={values.amount}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="form-control"
                      id="youSend"
                      placeholder=""
                    />
                    <div className="input-group-append">
                      {" "}
                      <span className="input-group-text p-0">
                        <select
                          id="youSendCurrency"
                          data-style="custom-select bg-transparent border-0"
                          data-container="body"
                          data-live-search="true"
                          className="selectpicker form-control bg-transparent"
                          required=""
                        >
                          <optgroup label="Popular Currency">
                            <option
                              data-icon="currency-flag currency-flag-ngn mr-1"
                              data-subtext="Nigerian naira"
                              // selected="selected"
                              value=""
                            >
                              NGN
                            </option>
                            <option
                              data-icon="currency-flag currency-flag-usd mr-1"
                              data-subtext="United States dollar"
                              value=""
                            >
                              USD
                            </option>
                            <option
                              data-icon="currency-flag currency-flag-aud mr-1"
                              data-subtext="Australian dollar"
                              value=""
                            >
                              AUD
                            </option>
                          </optgroup>
                          <option value="" data-divider="true">
                            divider
                          </option>
                          <optgroup label="Other Currency">
                            <option
                              data-icon="currency-flag currency-flag-aed mr-1"
                              data-subtext="United Arab Emirates dirham"
                              value=""
                            >
                              AED
                            </option>
                            <option
                              data-icon="currency-flag currency-flag-ars mr-1"
                              data-subtext="Argentine peso"
                              value=""
                            >
                              ARS
                            </option>
                            <option
                              data-icon="currency-flag currency-flag-aud mr-1"
                              data-subtext="Australian dollar"
                              value=""
                            >
                              AUD
                            </option>
                            <option
                              data-icon="currency-flag currency-flag-bdt mr-1"
                              data-subtext="Bangladeshi taka"
                              value=""
                            >
                              BDT
                            </option>
                            <option
                              data-icon="currency-flag currency-flag-bgn mr-1"
                              data-subtext="Bulgarian lev"
                              value=""
                            >
                              BGN
                            </option>
                            <option
                              data-icon="currency-flag currency-flag-brl mr-1"
                              data-subtext="Brazilian real"
                              value=""
                            >
                              BRL
                            </option>
                            <option
                              data-icon="currency-flag currency-flag-cad mr-1"
                              data-subtext="Canadian dollar"
                              value=""
                            >
                              CAD
                            </option>
                            <option
                              data-icon="currency-flag currency-flag-chf mr-1"
                              data-subtext="Swiss franc"
                              value=""
                            >
                              CHF
                            </option>
                            <option
                              data-icon="currency-flag currency-flag-clp mr-1"
                              data-subtext="Chilean peso"
                              value=""
                            >
                              CLP
                            </option>
                            <option
                              data-icon="currency-flag currency-flag-cny mr-1"
                              data-subtext="Chinese yuan"
                              value=""
                            >
                              CNY
                            </option>
                            <option
                              data-icon="currency-flag currency-flag-czk mr-1"
                              data-subtext="Czech koruna"
                              value=""
                            >
                              CZK
                            </option>
                            <option
                              data-icon="currency-flag currency-flag-dkk mr-1"
                              data-subtext="Danish krone"
                              value=""
                            >
                              DKK
                            </option>
                            <option
                              data-icon="currency-flag currency-flag-egp mr-1"
                              data-subtext="Egyptian pound"
                              value=""
                            >
                              EGP
                            </option>
                            <option
                              data-icon="currency-flag currency-flag-eur mr-1"
                              data-subtext="Euro"
                              value=""
                            >
                              EUR
                            </option>
                            <option
                              data-icon="currency-flag currency-flag-gbp mr-1"
                              data-subtext="British pound"
                              value=""
                            >
                              GBP
                            </option>
                            <option
                              data-icon="currency-flag currency-flag-gel mr-1"
                              data-subtext="Georgian lari"
                              value=""
                            >
                              GEL
                            </option>
                            <option
                              data-icon="currency-flag currency-flag-ghs mr-1"
                              data-subtext="Ghanaian cedi"
                              value=""
                            >
                              GHS
                            </option>
                            <option
                              data-icon="currency-flag currency-flag-hkd mr-1"
                              data-subtext="Hong Kong dollar"
                              value=""
                            >
                              HKD
                            </option>
                            <option
                              data-icon="currency-flag currency-flag-hrk mr-1"
                              data-subtext="Croatian kuna"
                              value=""
                            >
                              HRK
                            </option>
                            <option
                              data-icon="currency-flag currency-flag-huf mr-1"
                              data-subtext="Hungarian forint"
                              value=""
                            >
                              HUF
                            </option>
                            <option
                              data-icon="currency-flag currency-flag-idr mr-1"
                              data-subtext="Indonesian rupiah"
                              value=""
                            >
                              IDR
                            </option>
                            <option
                              data-icon="currency-flag currency-flag-ils mr-1"
                              data-subtext="Israeli shekel"
                              value=""
                            >
                              ILS
                            </option>
                            <option
                              data-icon="currency-flag currency-flag-inr mr-1"
                              data-subtext="Indian rupee"
                              value=""
                            >
                              INR
                            </option>
                            <option
                              data-icon="currency-flag currency-flag-jpy mr-1"
                              data-subtext="Japanese yen"
                              value=""
                            >
                              JPY
                            </option>
                            <option
                              data-icon="currency-flag currency-flag-kes mr-1"
                              data-subtext="Kenyan shilling"
                              value=""
                            >
                              KES
                            </option>
                            <option
                              data-icon="currency-flag currency-flag-krw mr-1"
                              data-subtext="South Korean won"
                              value=""
                            >
                              KRW
                            </option>
                            <option
                              data-icon="currency-flag currency-flag-lkr mr-1"
                              data-subtext="Sri Lankan rupee"
                              value=""
                            >
                              LKR
                            </option>
                            <option
                              data-icon="currency-flag currency-flag-mad mr-1"
                              data-subtext="Moroccan dirham"
                              value=""
                            >
                              MAD
                            </option>
                            <option
                              data-icon="currency-flag currency-flag-mxn mr-1"
                              data-subtext="Mexican peso"
                              value=""
                            >
                              MXN
                            </option>
                            <option
                              data-icon="currency-flag currency-flag-myr mr-1"
                              data-subtext="Malaysian ringgit"
                              value=""
                            >
                              MYR
                            </option>
                            <option
                              data-icon="currency-flag currency-flag-ngn mr-1"
                              data-subtext="Nigerian naira"
                              value=""
                            >
                              NGN
                            </option>
                            <option
                              data-icon="currency-flag currency-flag-nok mr-1"
                              data-subtext="Norwegian krone"
                              value=""
                            >
                              NOK
                            </option>
                            <option
                              data-icon="currency-flag currency-flag-npr mr-1"
                              data-subtext="Nepalese rupee"
                              value=""
                            >
                              NPR
                            </option>
                            <option
                              data-icon="currency-flag currency-flag-nzd mr-1"
                              data-subtext="New Zealand dollar"
                              value=""
                            >
                              NZD
                            </option>
                            <option
                              data-icon="currency-flag currency-flag-pen mr-1"
                              data-subtext="Peruvian nuevo sol"
                              value=""
                            >
                              PEN
                            </option>
                            <option
                              data-icon="currency-flag currency-flag-php mr-1"
                              data-subtext="Philippine peso"
                              value=""
                            >
                              PHP
                            </option>
                            <option
                              data-icon="currency-flag currency-flag-pkr mr-1"
                              data-subtext="Pakistani rupee"
                              value=""
                            >
                              PKR
                            </option>
                            <option
                              data-icon="currency-flag currency-flag-pln mr-1"
                              data-subtext="Polish złoty"
                              value=""
                            >
                              PLN
                            </option>
                            <option
                              data-icon="currency-flag currency-flag-ron mr-1"
                              data-subtext="Romanian leu"
                              value=""
                            >
                              RON
                            </option>
                            <option
                              data-icon="currency-flag currency-flag-rub mr-1"
                              data-subtext="Russian rouble"
                              value=""
                            >
                              RUB
                            </option>
                            <option
                              data-icon="currency-flag currency-flag-sek mr-1"
                              data-subtext="Swedish krona"
                              value=""
                            >
                              SEK
                            </option>
                            <option
                              data-icon="currency-flag currency-flag-sgd mr-1"
                              data-subtext="Singapore dollar"
                              value=""
                            >
                              SGD
                            </option>
                            <option
                              data-icon="currency-flag currency-flag-thb mr-1"
                              data-subtext="Thai baht"
                              value=""
                            >
                              THB
                            </option>
                            <option
                              data-icon="currency-flag currency-flag-try mr-1"
                              data-subtext="Turkish lira"
                              value=""
                            >
                              TRY
                            </option>
                            <option
                              data-icon="currency-flag currency-flag-uah mr-1"
                              data-subtext="Ukrainian hryvnia"
                              value=""
                            >
                              UAH
                            </option>
                            <option
                              data-icon="currency-flag currency-flag-ugx mr-1"
                              data-subtext="Ugandan shilling"
                              value=""
                            >
                              UGX
                            </option>
                            <option
                              data-icon="currency-flag currency-flag-vnd mr-1"
                              data-subtext="Vietnamese dong"
                              value=""
                            >
                              VND
                            </option>
                            <option
                              data-icon="currency-flag currency-flag-zar mr-1"
                              data-subtext="South African rand"
                              value=""
                            >
                              ZAR
                            </option>
                          </optgroup>
                        </select>
                      </span>{" "}
                    </div>
                  </div>
                </div>

                <button
                  className="btn btn-primary btn-block"
                  onClick={handleSubmit}
                >
                  Recharge Phone
                </button>
              </form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}

export default Index;
