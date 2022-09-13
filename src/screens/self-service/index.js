import React, { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Formik } from "formik";
import Header from "../../component/Header";
import Sidebar from "../../component/sidebar";
import Footer from "../../component/footer";
import "./style.css";
import { changePassword, changePin } from "../../api/onboarding/onboarding";
import { Context } from "../../context/context";
import { getAccountOfficer } from "../../api/customerService";
import { changePasswordSchema, changePinSchema } from "../../utli/validator";
import { Link } from "react-router-dom";

function ModalPassword({ show, handleClose }) {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Body>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title font-weight-400">Change Password</h5>
            <button
              type="button"
              className="close font-weight-400"
              data-dismiss="modal"
              aria-label="Close"
              onClick={handleClose}
            >
              {" "}
              <span aria-hidden="true">&times;</span>{" "}
            </button>
          </div>

          <div className="modal-body p-4">
            <Formik
              initialValues={{
                currentPassword: "",
                newPassword: "",
                confirmNewPassword: "",
              }}
              validationSchema={changePasswordSchema}
              onSubmit={(values) => {
                changePassword(values);
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
                  <form id="changePassword" method="post">
                    <div className="form-group">
                      <label htmlFor="existingPassword">Current Password</label>
                      <input
                        name="currentPassword"
                        type="password"
                        className="form-control"
                        id="existingPassword"
                        value={values.currentPassword}
                        onChange={handleChange}
                        placeholder="Enter Current Password"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="newPassword">New Password</label>
                      <input
                        name="newPassword"
                        type="password"
                        className="form-control"
                        value={values.newPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        id="newPassword"
                        placeholder="Enter New Password"
                      />
                    </div>
                    {errors.newPassword && touched.newPassword && (
                      <span style={{ color: "red" }}>{errors.newPassword}</span>
                    )}
                    <div className="form-group">
                      <label htmlFor="confirmPassword">
                        Confirm New Password
                      </label>
                      <input
                        name="confirmNewPassword"
                        type="password"
                        className="form-control"
                        value={values.confirmNewPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        id="confirmPassword"
                        placeholder="Enter Confirm New Password"
                      />
                    </div>
                    {errors.confirmNewPassword &&
                      touched.confirmNewPassword && (
                        <span style={{ color: "red" }}>
                          {errors.confirmNewPassword}
                        </span>
                      )}
                    <button
                      disabled={!(dirty && isValid)}
                      className="btn btn-primary btn-block mt-4"
                      onClick={handleSubmit}
                    >
                      Update Password
                    </button>
                  </form>
                );
              }}
            </Formik>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

function ModalPin({ show, handleClose }) {
  return (
    <Modal
      // size="lg"
      show={show}
      onHide={handleClose}
      animation={false}
      aria-labelledby="example-custom-modal-styling-title"
      centered
    >
      <Modal.Body>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title font-weight-400">Change PIN</h5>
            <button
              type="button"
              className="close font-weight-400"
              data-dismiss="modal"
              aria-label="Close"
              onClick={handleClose}
            >
              {" "}
              <span aria-hidden="true">&times;</span>{" "}
            </button>
          </div>
          <div className="modal-body p-4">
            <Formik
              initialValues={{
                currentPin: "",
                newPin: "",
                confirmNewPin: "",
              }}
              validationSchema={changePinSchema}
              onSubmit={(values) => {
                changePin(values, handleClose);
              }}
              // validationSchema={}
              // onSubmit={}
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
                  <form id="changePIN" method="post">
                    <div className="form-group">
                      <label htmlFor="existingPIN">Confirm Current PIN</label>
                      <input
                        name="currentPin"
                        type="password"
                        value={values.currentPin}
                        onChange={handleChange}
                        className="form-control"
                        id="existingPIN"
                        placeholder="Enter Current PIN"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="newPIN">New PIN</label>
                      <input
                        name="newPin"
                        type="password"
                        value={values.newPin}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="form-control"
                        id="newPIN"
                        placeholder="Enter New PIN"
                      />
                    </div>
                    {errors.newPin && touched.newPin && (
                      <span style={{ color: "red" }}>{errors.newPin}</span>
                    )}
                    <div className="form-group">
                      <label htmlFor="confirmPIN">Confirm New PIN</label>
                      <input
                        name="confirmNewPin"
                        type="password"
                        value={values.confirmNewPin}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="form-control"
                        id="confirmPIN"
                        placeholder="Enter Confirm New PIN"
                      />
                    </div>
                    {errors.confirmNewPin && touched.confirmNewPin && (
                      <span style={{ color: "red" }}>
                        {errors.confirmNewPin}
                      </span>
                    )}
                    <button
                      disabled={!(dirty && isValid)}
                      className="btn btn-primary btn-block mt-4"
                      onClick={handleSubmit}
                    >
                      Update PIN
                    </button>
                  </form>
                );
              }}
            </Formik>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

function Index() {
  const { userState } = useContext(Context);
  const [show, setShow] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [officer, setOfficer] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClosePin = () => setShowPin(false);
  const handleShowPin = () => setShowPin(true);

  // fetch account officer on component mount
  useEffect(() => {
    const getOfficer = async () => {
      const res = await getAccountOfficer();
      setOfficer(res);
    };

    getOfficer();
  }, []);

  return (
    <div id="main-wrapper self-service" className="ex-dashboard">
      <ModalPassword show={show} handleClose={handleClose} />
      <ModalPin show={showPin} handleClose={handleClosePin} />
      <Header />
      <div id="content">
        <div className="container-fluid">
          <div className="row">
            <Sidebar current="self" />
            <div className="py-3 col-lg-7">
              <div className="bg-light shadow-sm rounded p-4 mb-4">
                <h3 className="text-5 font-weight-400 mb-3">
                  Personal Details
                </h3>
                <div className="row">
                  <p className="col-sm-3 text-muted text-sm-right mb-0 mb-sm-3">
                    Name
                  </p>
                  <p className="col-sm-9">{userState?.accountInfo?.name}</p>
                </div>
                <div className="row">
                  <p className="col-sm-3 text-muted text-sm-right mb-0 mb-sm-3">
                    Address
                  </p>
                  <p className="col-sm-9">
                    {userState?.accountInfo?.address}
                    <br />
                  </p>
                </div>
              </div>
              <div className="bg-light shadow-sm rounded p-4 mb-4">
                <h3 className="text-5 font-weight-400 mb-3">Email Addresses</h3>
                <div className="row">
                  <p className="col-sm-3 text-muted text-sm-right mb-0 mb-sm-3">
                    Email ID{" "}
                    <span className="text-muted font-weight-500">
                      (Primary)
                    </span>
                  </p>
                  <p className="col-sm-9">{userState?.accountInfo?.email}</p>
                </div>
              </div>
              <div className="bg-light shadow-sm rounded p-4 mb-4">
                <h3 className="text-5 font-weight-400 mb-3">Phone Number</h3>
                <div className="row">
                  <p className="col-sm-3 text-muted text-sm-right mb-0 mb-sm-3">
                    Mobile{" "}
                    <span className="text-muted font-weight-500">
                      (Primary)
                    </span>
                  </p>
                  <p className="col-sm-9">
                    {userState?.accountInfo?.phoneNumber}
                  </p>
                </div>
              </div>
              <div className="bg-light shadow-sm rounded p-4 mb-4">
                <h3 className="text-5 font-weight-400 mb-3">
                  Change Password{" "}
                  <span
                    onClick={handleShow}
                    className="float-right text-1 text-uppercase text-muted btn-link"
                  >
                    <i className="fas fa-edit mr-1"></i>Change
                  </span>
                </h3>
                <div className="row">
                  <p className="col-sm-3 text-muted text-sm-right mb-0 mb-sm-3">
                    <label className="col-form-label">Password</label>
                  </p>
                  <p className="col-sm-9">
                    <input
                      type="password"
                      className="form-control-plaintext"
                      data-bv-field="password"
                      id="password"
                      defaultValue="EnterPassword"
                    />
                  </p>
                </div>
              </div>

              <div className="bg-light shadow-sm rounded p-4">
                <h3 className="text-5 font-weight-400 mb-3">
                  Change PIN{" "}
                  <span
                    onClick={handleShowPin}
                    className="float-right text-1 text-uppercase text-muted btn-link"
                  >
                    <i className="fas fa-edit mr-1"></i>Change
                  </span>
                </h3>
                <div className="row">
                  <p className="col-sm-3 text-muted text-sm-right mb-0 mb-sm-3">
                    <label className="col-form-label">PIN</label>
                  </p>
                  <p className="col-sm-9">
                    <input
                      type="password"
                      className="form-control-plaintext"
                      data-bv-field="password"
                      id="password"
                      defaultValue="EnterPassword"
                    />
                  </p>
                </div>
              </div>
              <div
                id="change-pin"
                className="modal fade "
                role="dialog"
                aria-hidden="true"
              >
                <div
                  className="modal-dialog modal-dialog-centered"
                  role="document"
                >
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title font-weight-400">
                        Change PIN
                      </h5>
                      <button
                        type="button"
                        className="close font-weight-400"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        {" "}
                        <span aria-hidden="true">&times;</span>{" "}
                      </button>
                    </div>
                    <div className="modal-body p-4">
                      <form id="changePIN" method="post">
                        <div className="form-group">
                          <label htmlFor="existingPIN">
                            Confirm Current PIN
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            data-bv-field="existingPIN"
                            id="existingPIN"
                            required
                            placeholder="Enter Current PIN"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="newPIN">New PIN</label>
                          <input
                            type="text"
                            className="form-control"
                            data-bv-field="newPIN"
                            id="newPIN"
                            required
                            placeholder="Enter New PIN"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="confirmPIN">Confirm New PIN</label>
                          <input
                            type="text"
                            className="form-control"
                            data-bv-field="confirmgPIN"
                            id="confirmPIN"
                            required
                            placeholder="Enter Confirm New PIN"
                          />
                        </div>
                        <button
                          className="btn btn-primary btn-block mt-4"
                          type="submit"
                        >
                          Update PIN
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="py-3 col-lg-3">
              <div className="bg-light shadow-sm rounded text-center p-3 mb-4">
                <div className="mt-3 mb-4">
                  {" "}
                  <img
                    className="rounded-circle"
                    src={officer?.passportUrl}
                    alt=""
                  />
                </div>
                <p className="text-muted opacity-8 mb-0">Account Officer</p>
                <h3 className="font-weight-400">{officer?.name}</h3>
                <p className="text-muted opacity-8 mb-0">{officer?.email}</p>
                <p className="text-muted opacity-8 mb-4">
                  {officer?.phoneNumber}
                </p>
                <Link to="/feedback" className="btn btn-primary btn-block">
                  Request Link Call Back
                </Link>{" "}
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
