import React, { useContext, useEffect, useState } from "react";
import { Formik } from "formik";
import Select from "react-select";
import CurrencyFlag from "react-currency-flags";
import { get_bank } from "../../api/general/general";
import {
  addBeneficiaries,
  enquiryName,
  getBeneficiaries,
} from "../../api/transfer/transfer";
import { Context } from "../../context/context";
import { getAllAccountByCustomerId } from "../../api/account/account";
import { useNavigate } from "react-router-dom";
import Modal from "../../component/createPinModal";
import { transferpSchema } from "../../utli/validator";
import Switch from "react-switch";
import { toaster } from "evergreen-ui";

function TransferMoneyForm() {
  const navigate = useNavigate();
  const [banks, setBanks] = React.useState([]);
  const [showBeneficiary, setBeneficiary] = React.useState(false);
  // beneficiary name
  const [selectedName, setSelectedName] = React.useState(null);
  const [selectedBank, setSelectedBank] = React.useState(null);
  const [fromAccount, setFromAccount] = React.useState(null);
  // store the response from name enquiry
  const [nameEnquiryRes, setNameEnquiryRes] = React.useState("");
  const [fromAccounts, setFromAccounts] = useState([]);
  // check if beneficiary is toggled
  const [isBeneficiary, setIsBeneficiary] = useState(false);
  const [beneficiariesArr, setBeneficiariesArr] = useState([]);
  const { userDispatch } = useContext(Context);

  // toggle the set beneficiary switch
  const switchBeneficiary = () => {
    setIsBeneficiary(!isBeneficiary);
  };

  useEffect(() => {
    const fetchBank = async () => {
      // get banks
      const res = await get_bank();
      let banks = [];

      // using th response from get bank api
      // create an array for react-select
      for (let x in res?.banks) {
        const bank = {
          label: res?.banks[x].name,
          value: res?.banks[x].name,
          code: res?.banks[x].code,
        };
        banks.push(bank);
      }

      // get beneficiaries
      const beneficiaries_res = await getBeneficiaries();

      // set beneficiaries for select
      const beneficiaries = [];

      for (let x in beneficiaries_res?.beneficiaries) {
        const beneficiary = {
          label: beneficiaries_res?.beneficiaries[x].recipientAccountName,
          value: beneficiaries_res?.beneficiaries[x].recipientAccountName,
          accountNo: beneficiaries_res?.beneficiaries[x].recipientAccountNumber,
          bankCode: beneficiaries_res?.beneficiaries[x].recipientBankCode,
          bankName: beneficiaries_res?.beneficiaries[x].recipientBankName,
        };
        beneficiaries.push(beneficiary);
      }

      setBeneficiariesArr(beneficiaries);

      setBanks(banks);
    };
    fetchBank();
  }, []);

  useEffect(() => {
    const fetchBank = async () => {
      let fromAccounts = [];
      const res = await getAllAccountByCustomerId({ dispatch: userDispatch });

      // get user accounts
      for (let x in res?.accounts) {
        const account = {
          label: res?.accounts[x]?.nuban,
          value: res?.accounts[x]?.nuban,
          accountName: res?.accounts[x]?.accountName,
        };
        fromAccounts.push(account);
      }

      setFromAccounts(fromAccounts);
    };
    fetchBank();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleBenficiary = () => {
    setBeneficiary(!showBeneficiary);
  };

  // handle create pin
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  // const handleShow = (e) => {
  //   e.preventDefault();
  //   setShow(true);
  // };

  return (
    <>
      <form id="form-send-money">
        <Modal show={show} handleClose={handleClose} />
        <div
          className="btn-group d-flex btn-group-toggle mb-3"
          data-toggle="buttons"
        >
          <label
            className={
              showBeneficiary
                ? "btn btn-outline-secondary btn-sm shadow-none w-100"
                : "btn btn-outline-secondary btn-sm shadow-none w-100 active"
            }
          >
            <input
              onClick={toggleBenficiary}
              type="radio"
              name="options"
              id="option1"
            />
            Pay Direct{" "}
          </label>
          <label
            className={
              showBeneficiary
                ? "btn btn-outline-secondary btn-sm shadow-none w-100 active"
                : "btn btn-outline-secondary btn-sm shadow-none w-100"
            }
          >
            <input
              onClick={toggleBenficiary}
              type="radio"
              name="options"
              id="option2"
            />
            Beneficiaries{" "}
          </label>
        </div>
        {showBeneficiary ? (
          <>
            <div className="form-group">
              <label htmlFor="emailID">Select Beneficiaries</label>
              <Select
                defaultValue={selectedName}
                onChange={setSelectedName}
                options={beneficiariesArr}
              />
            </div>
            {selectedName?.bankName && (
              <p className="text-primary">
                {selectedName?.bankName} - {selectedName?.accountNo}
              </p>
            )}
          </>
        ) : (
          ""
        )}
        <div className="form-group">
          <label htmlFor="SelectBank">Select Account</label>
          <Select
            defaultValue={fromAccount}
            onChange={setFromAccount}
            options={fromAccounts}
          />
        </div>
        {showBeneficiary ? (
          ""
        ) : (
          <div className="form-group">
            <label htmlFor="SelectBank">Select Bank</label>
            <Select
              defaultValue={selectedBank}
              onChange={setSelectedBank}
              options={banks}
            />
          </div>
        )}
      </form>
      {showBeneficiary ? (
        // form for beneficiary
        <Formik
          initialValues={{ amount: "", narration: "" }}
          onSubmit={async (values) => {
            navigate("/transfer-money/confirm", {
              state: {
                amount: values.amount,
                value: fromAccount.value,
                accountName: fromAccount.value,
                bankName: selectedName.bankName,
                bankCode: selectedName.bankCode,
                accountNo: selectedName.accountNo,
                toAccountName: selectedName.value,
                narration: values.narration,
                isBeneficiary: true,
              },
            });
          }}
        >
          {(formik) => {
            const { values, handleChange, handleSubmit } = formik;
            return (
              <form>
                <>
                  <div className="form-group">
                    <label htmlFor="youSend">You're Sending</label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        {" "}
                        <span className="input-group-text">₦</span>{" "}
                      </div>
                      {/* <NumberFormat
                     value={values.amount}
                     className=""
                     displayType={"text"}
                     thousandSeparator={true}
                     prefix={"₦"}
                     renderText={(value, props) => ( */}
                      <input
                        name="amount"
                        type="text"
                        className="form-control"
                        value={values.amount}
                        onChange={handleChange}
                        id="youSend"
                        placeholder=""
                      />

                      <div className="input-group-append">
                        <span className="input-group-text p-0">
                          <div className="p-2">
                            <CurrencyFlag currency="NGN" size="md" />
                            <span className="pl-2"> NGN</span>
                          </div>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="emailID">Narration</label>

                    <input
                      name="narration"
                      type="text"
                      className="pl-3 mr-3 form-control"
                      value={values.narration}
                      onChange={handleChange}
                      id="emailID"
                      placeholder="Enter Narration"
                    />
                  </div>

                  <button
                    onClick={handleSubmit}
                    className="btn btn-primary btn-block"
                  >
                    Transfer Money
                  </button>
                </>
              </form>
            );
          }}
        </Formik>
      ) : (
        <Formik
          initialValues={{ accountNo: "", amount: "", narration: "" }}
          validationSchema={transferpSchema}
          onSubmit={async (values) => {
            if (!nameEnquiryRes?.name) {
              toaster.warning("could not retrieve name");
              return;
            }

            // check if beneficiary account is local
            const isLocalAccount = () => {
              if (selectedBank.bankCode === process.env.REACT_APP_BANK_CODE) {
                return true;
              } else {
                return false;
              }
            };

            //  add benficiary
            const beneficiaryData = {
              recipientBankCode: selectedBank.code,
              recipientBankName: selectedBank.value,
              recipientAccountName: nameEnquiryRes?.name,
              recipientAccountNumber: values.accountNo,
              isLocalAccount: isLocalAccount(),
            };

            if (isBeneficiary === true) {
              addBeneficiaries(beneficiaryData);
            }

            // navigate to confirm page with transfer money data
            navigate("/transfer-money/confirm", {
              state: {
                ...values,
                ...fromAccount,
                bankName: selectedBank.value,
                bankCode: selectedBank.code,
                toAccountName: nameEnquiryRes?.name,
                sessionID: nameEnquiryRes?.sessionID,
                isBeneficiary: false,
              },
            });
          }}
        >
          {(formik) => {
            const {
              values,
              handleChange,
              handleSubmit,
              errors,
              touched,
              handleBlur,
              isValid,
              dirty,
            } = formik;
            return (
              <form>
                <div className="form-group">
                  <label htmlFor="emailID">Account Number</label>
                  <input
                    name="accountNo"
                    type="text"
                    className="form-control"
                    data-bv-field="emailid"
                    id="emailID"
                    value={values.accountNo}
                    onChange={handleChange}
                    onBlur={async (e) => {
                      handleBlur(e);
                      const data = {
                        accountNo: values?.accountNo,
                        bankCode: selectedBank?.code,
                      };
                      const res = await enquiryName(data);
                      setNameEnquiryRes(res);
                    }}
                    placeholder="Enter Account Number"
                  />
                </div>
                {errors?.accountNo && touched?.accountNo && (
                  <span style={{ color: "red" }}>{errors?.accountNo}</span>
                )}
                <p className="text-primary small">{nameEnquiryRes?.name}</p>

                <div className="form-group">
                  <label htmlFor="youSend">You're Sending</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      {" "}
                      <span className="input-group-text">₦</span>{" "}
                    </div>

                    <input
                      name="amount"
                      type="text"
                      className="form-control"
                      value={values.amount}
                      onChange={handleChange}
                      id="youSend"
                      placeholder=""
                    />

                    <div className="input-group-append">
                      <span className="input-group-text p-0">
                        <div className="p-2">
                          <CurrencyFlag currency="NGN" size="md" />
                          <span className="pl-2"> NGN</span>
                        </div>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="emailID">Narration</label>

                  <input
                    name="narration"
                    type="text"
                    className="pl-3 mr-3 form-control"
                    value={values.narration}
                    onChange={handleChange}
                    id="emailID"
                    placeholder="Enter Narration"
                  />
                </div>
                <div className="form-group d-flex align-items-center justify-content-between">
                  <label htmlFor="emailID">Set As Beneficiary</label>

                  <Switch
                    checked={isBeneficiary}
                    onChange={switchBeneficiary}
                    onColor="#00ac9f"
                    height={25}
                    width={50}
                  />
                </div>

                <button
                  disabled={!(dirty && isValid)}
                  onClick={handleSubmit}
                  className="btn btn-primary btn-block"
                >
                  Transfer Money
                </button>
              </form>
            );
          }}
        </Formik>
      )}
    </>
  );
}

function Index() {
  return (
    <div className="py-5 col-md-8 col-lg-6 col-xl-5 mx-auto">
      <div className="bg-light shadow-sm rounded p-3 p-sm-4 mb-4">
        <h3 className="text-5 font-weight-400 mb-3">Transfer Money</h3>
        <TransferMoneyForm />
      </div>
    </div>
  );
}

export default Index;
