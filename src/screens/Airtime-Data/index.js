import React, { useEffect, useState } from "react";
import Header from "../../component/Header";
import Sidebar from "../../component/sidebar";
import mtn from "../../asset/images/payment/mtn.svg";
import airtel from "../../asset/images/payment/airtel.svg";
import glo from "../../asset/images/payment/glo.svg";
import NineMobile from "../../asset/images/payment/9mobile.svg";
import Footer from "../../component/footer";
import { Link } from "react-router-dom";
import { getAirtime } from "../../api/airtime/airtime";
import { SpinnerDiamond } from "spinners-react";

function Index() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchAirtime = async () => {
      const res = await getAirtime();

      setProducts(res.products);
    };
    fetchAirtime();
  }, []);

  const getAirtimeImg = (id) => {
    if (id === "90106") {
      return airtel;
    } else if (id === "91309") {
      return glo;
    } else if (id === "10906") {
      return mtn;
    } else if (id === "90806") {
      return NineMobile;
    }
  };

  return (
    <div id="main-wrapper" className="ex-dashboard">
      <Header />
      <div id="content">
        <div className="container-fluid">
          <div className="row">
            <Sidebar current="airtime" />
            <div className="py-3 col-lg-10">
              <div className="bg-light shadow-sm rounded p-4 mb-4">
                <h3 className="text-5 font-weight-400 d-flex align-items-center mb-3">
                  Airtime & Data
                </h3>
                {products.length !== 0 ? (
                  <div className="row profile-completeness">
                    {products.map((product, i) => {
                      return (
                        <Link
                          key={i}
                          to="/bills-and-payment/airtime"
                          className="col-6 col-sm-3 col-md-3 mb-4"
                          state={product}
                        >
                          <div className="border rounded p-3 text-center ex-click-airtime">
                            <img
                              src={getAirtimeImg(product?.paymentItemID)}
                              alt=""
                            />
                          </div>
                        </Link>
                      );
                    })}
                  </div>
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
      </div>
      <Footer />
    </div>
  );
}

export default Index;
