import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDocument } from "../../api/account/account";

function Index() {
  const [documents, setDocuments] = useState();

  useEffect(() => {
    const fetchDocument = async () => {
      const res = await getDocument();
      setDocuments(res.documents);
    };
    fetchDocument();
  }, []);

  const documentsIcon = [
    "fas fa-passport",
    "fas fa-signature",
    "fas fa-id-card",
    "fas fa-bolt",
    "fas fa-file",
    "fas fa-file",
  ];

  const checkDocumentStatus = (status) => {
    if (status === 0) {
      return "Not Yet Uploaded";
    } else if (status === 1) {
      return "Uploaded, Awaiting Review";
    } else if (status === 2) {
      return "Uploaded";
    }
  };

  return (
    <div className="py-3 col-lg-10">
      <div className="bg-light shadow-sm rounded p-4 mb-4">
        <h3 className="text-5 font-weight-400 d-flex align-items-center mb-3">
          KYC / Document Upload
        </h3>
        <div className="row profile-completeness">
          {documents?.map((document, index) => {
            return (
              <Link
                to={document.isDocumentUploaded ? "/kyc" : "/kyc/upload"}
                state={document}
                className="col-6 col-sm-3 col-md-2 mb-4"
                key={index}
              >
                <div className="border rounded p-3 text-center ex-click-cards">
                  {" "}
                  <span className="d-block text-10 text-light mt-2 mb-3">
                    <i className={documentsIcon[index]} aria-hidden="true"></i>
                  </span>
                  <h6>{document.documentName}</h6>
                  <p className="small text-muted mb-0">
                    status: {checkDocumentStatus(document?.status)}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Index;
