import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SpinnerDiamond } from "spinners-react";
import { getBillsCategory } from "../../api/billsPayment/bills";

function Index() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await getBillsCategory();

      setCategories(res.categoryResponses);
    };

    fetchCategories();
  }, []);

  const iconList = [
    "fas fa-bolt",
    "fas fa-tv",
    "fas fa-mobile-alt",
    "fas fa-wifi",
    "fas fa-signal",
    "fas fa-file-alt",
    "fas fa-receipt",
    "fas fa-thumbs-up",
    "fas fa-file-invoice",
    "fas fa-city",
    "fas fa-plane-departure",
    "fas fa-mobile-alt",
    "fas fa-shopping-cart",
    "fas fa-location-arrow",
    "fab fa-blackberry",
    "fas fa-wallet",
    "fas fa-box",
    "fas fa-coffee",
    "fas fa-globe-africa",
    "fas fa-money-bill-alt",
    "fas fa-balance-scale",
    "fas fa-exchange-alt",
    "fas fa-poll-h",
    "fas fa-outdent",
    "fas fa-place-of-worship",
    "fas fa-users",
    "fas fa-university",
    "fas fa-ticket-alt",
    "fas fa-gavel",
    "fas fa-school",
    "fas fa-handshake",
    "fas fa-credit-card",
    "fas fa-toggle-on",
    "fas fa-money-bill-wave",
    "fas fa-futbol",
    "fas fa-microchip",
    "fas fa-drafting-compass",
    "fas fa-store",
    "fas fa-shopping-basket",
    "fas fa-chalkboard-teacher",
    "fas fa-phone-volume",
    "fas fa-transgender-alt",
    "fas fa-tv",
    "fas fa-american-sign-language-interpreting",
    "fas fa-file-invoice",
    "fab fa-sellsy",
    "fas fa-ship",
    "fas fa-gifts",
    "fas fa-chart-line",
  ];

  return (
    <div className="py-3 col-lg-10">
      <div className="bg-light shadow-sm rounded p-4 mb-4">
        <h3 className="text-5 font-weight-400 d-flex align-items-center mb-3">
          Bills and Payments
        </h3>
        {categories.length !== 0 ? (
          <div className="row profile-completeness">
            {categories.map((category, index) => {
              return (
                <Link
                  key={index}
                  to="/bills-and-payment/pay-bill"
                  className="col-6 col-sm-3 col-md-2 mb-4"
                  state={category}
                >
                  <div className="border rounded p-3 text-center ex-click-cards">
                    {" "}
                    <span className="d-block text-10 text-light mt-2 mb-3">
                      <i
                        className={`${iconList[index]}`}
                        aria-hidden="true"
                      ></i>
                    </span>
                    <h6>{category.name}</h6>
                    <p className="small text-muted mb-0">
                      {category.description}
                    </p>
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
  );
}

export default Index;
