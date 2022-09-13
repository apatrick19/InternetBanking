import React, { useState } from "react";
import Header from "../../component/Header";
import Sidebar from "../../component/sidebar";
import Footer from "../../component/footer";
import { logComplaints } from "../../api/customerService";

function Index() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const handleClick = (e) => {
    e.preventDefault();
    logComplaints({
      title,
      message,
    });
  };

  return (
    <div id="main-wrapper" className="ex-dashboard">
      <Header />
      <div id="content">
        <div className="container-fluid">
          <div className="row">
            <Sidebar current="feedback" />
            <div className="py-5 col-md-8 col-lg-6 col-xl-5 mx-auto">
              <div className="bg-light shadow-sm rounded p-3 p-sm-4 mb-4">
                <h3 className="text-5 font-weight-400 mb-3">
                  How was your overall experience?
                </h3>
                <p>It will help us serve you better</p>
                <form id="form-send-money" method="post">
                  <div className="form-group">
                    <label for="emailID">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      id="emailID"
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                      placeholder="Title of feedback"
                    />
                  </div>

                  <div className="form-group">
                    <label for="emailID">Your message (required)</label>

                    <textarea
                      style={{
                        width: "100%",
                        border: ".4px solid rgba(0, 0, 0, .2)",
                      }}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows="2"
                    ></textarea>
                  </div>
                  <button
                    onClick={handleClick}
                    className="btn btn-primary btn-block"
                  >
                    Submit
                  </button>
                </form>
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
