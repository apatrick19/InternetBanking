import React from "react";
import Header from "../../component/Header";
import Sidebar from "../../component/sidebar";
import Footer from "../../component/footer";
import { Outlet } from "react-router-dom";

function Index() {
  return (
    <div id="main-wrapper" className="ex-dashboard">
      <Header />
      <div id="content">
        <div className="container-fluid">
          <div className="row">
            <Sidebar current="kyc" />
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Index;
