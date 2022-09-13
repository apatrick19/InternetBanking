import { Formik } from "formik";
import React from "react";
import { Modal } from "react-bootstrap";
import { createPin } from "../../api/onboarding/onboarding";

function Index({ show, handleClose }) {
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
            <h5 className="modal-title font-weight-400">Create PIN</h5>
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
                pin: "",
                confirmPin: "",
              }}
              onSubmit={(values) => {
                createPin(values.pin, handleClose);
              }}
            >
              {(formik) => {
                const { values, handleChange, handleSubmit } = formik;
                return (
                  <form id="changePIN" method="post">
                    <div className="form-group">
                      <label for="newPIN">PIN</label>
                      <input
                        name="pin"
                        type="password"
                        value={values.pin}
                        onChange={handleChange}
                        className="form-control"
                        id="newPIN"
                        placeholder="Enter New PIN"
                      />
                    </div>
                    <div className="form-group">
                      <label for="confirmPIN">Confirm PIN</label>
                      <input
                        name="confirmPin"
                        type="password"
                        value={values.confirmPin}
                        onChange={handleChange}
                        className="form-control"
                        id="confirmPIN"
                        placeholder="Enter Confirm New PIN"
                      />
                    </div>
                    <button
                      className="btn btn-primary btn-block mt-4"
                      onClick={handleSubmit}
                    >
                      Create PIN
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

export default Index;
