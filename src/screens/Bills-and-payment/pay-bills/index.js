import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  getBillerByCategory,
  getProductByBillerId,
} from "../../../api/billsPayment/bills";
import { Formik } from "formik";
import Select from "react-select";
import { Context } from "../../../context/context";
import { getAllAccountByCustomerId } from "../../../api/account/account";
import ModalPin from "../../../component/createPinModal";

function Index() {
  const navigate = useNavigate();
  const location = useLocation();
  const billsData = location?.state;
  const { userDispatch } = useContext(Context);
  const [fromAccounts, setFromAccounts] = useState([]);
  const [fromAccount, setFromAccount] = React.useState(null);
  const [biller, setBiller] = useState([]);
  const [selectedBiller, setSelectedBiller] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  // state for amount field
  const [amount, setAmount] = useState("");

  // const handleAmountChange = (e) => {
  //   setAmount(e.target.value);
  // };

  useEffect(() => {
    setAmount(selectedProduct?.amount);
  }, [selectedProduct]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  useEffect(() => {
    const fetchBank = async () => {
      let accounts = [];
      const res = await getAllAccountByCustomerId({ dispatch: userDispatch });

      // get user accounts
      for (let x in res?.accounts) {
        const account = {
          label: res?.accounts[x]?.nuban,
          value: res?.accounts[x]?.nuban,
          accountName: res?.name,
          phoneNumber: res?.phoneNumber,
          email: res?.email,
        };
        accounts.push(account);
      }

      setFromAccounts(accounts);

      let billers = [];
      const res2 = await getBillerByCategory(billsData.id);

      //get billers
      for (let x in res2.billersResponses) {
        const biller = {
          label: res2.billersResponses[x]?.name,
          value: res2.billersResponses[x]?.name,
          id: res2.billersResponses[x]?.id,
          categoryId: res2.billersResponses[x].categoryId,
          billerID: res2.billersResponses[x].billerID,
        };
        billers.push(biller);
      }
      // push billers to useState
      setBiller(billers);
    };
    fetchBank();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // fetch product by biller
    const fetchProduct = async () => {
      if (selectedBiller?.id) {
        const res = await getProductByBillerId(selectedBiller?.id);

        const products = [];
        for (let x in res.paymentItemsResponses) {
          const product = {
            label: res.paymentItemsResponses[x]?.name,
            value: res.paymentItemsResponses[x]?.name,
            paymentItemId: res.paymentItemsResponses[x]?.id,
            paymentItemName: res.paymentItemsResponses[x]?.name,
            amount: res.paymentItemsResponses[x]?.amount,
          };
          products.push(product);
        }
        setProducts(products);
      }
    };

    fetchProduct();
  }, [selectedBiller]);

  // const handleCreatePin = (e) => {
  //   e.preventDefault();
  //   handleShow();
  // };

  return (
    <div className="py-5 col-md-8 col-lg-6 col-xl-5 mx-auto">
      <div className="bg-light shadow-sm rounded p-3 p-sm-4 mb-4">
        <h3 className="text-5 font-weight-400 mb-3">
          {" "}
          Bills and Payments (Category)
        </h3>
        <Formik
          initialValues={{ customerId: "", amount: "" }}
          onSubmit={async (values) => {
            const data = {
              customerId: values.customerId,
              customAmount: amount,
              ...billsData,
              ...selectedProduct,
              accountNumber: fromAccount.value,
              accountName: fromAccount.accountName,
              phoneNumber: fromAccount.phoneNumber,
              email: fromAccount.email,
              billerName: selectedBiller.value,
              billerID: selectedBiller.id,
            };

            navigate("/bills-and-payment/confirm-bills", {
              state: { data },
            });
          }}
        >
          {(formik) => {
            const {
              values,
              handleChange,
              handleSubmit,

              isValid,
              dirty,
            } = formik;

            return (
              <form id="form-send-money">
                <div className="form-group">
                  <ModalPin show={show} handleClose={handleClose} />
                  <label htmlFor="SelectBank">Select Account</label>
                  <Select
                    defaultValue={fromAccount}
                    onChange={setFromAccount}
                    options={fromAccounts}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="SelectBiller">Select Biller</label>
                  <Select
                    defaultValue={selectedBiller}
                    onChange={setSelectedBiller}
                    options={biller}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="emailID">Customer Id</label>
                  <input
                    name="customerId"
                    type="text"
                    className="form-control"
                    value={values.customerId}
                    onChange={handleChange}
                    id="emailID"
                    placeholder="Enter Customer Id"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="SelectPackage">Select Package</label>
                  <Select
                    defaultValue={selectedProduct}
                    onChange={setSelectedProduct}
                    options={products}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="emailID">Amount</label>
                  <input
                    name="amount"
                    type="text"
                    onChange={(e) => {
                      handleChange(e.currentTarget.value);

                      setAmount(e.currentTarget.value);
                    }}
                    className="form-control"
                    value={amount || ""}
                    id="emailID"
                    placeholder=""
                  />
                </div>

                <button
                  disabled={!(dirty && isValid)}
                  className="btn btn-primary btn-block"
                  onClick={handleSubmit}
                >
                  Pay Bill
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
