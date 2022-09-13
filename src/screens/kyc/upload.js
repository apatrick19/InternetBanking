import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { uploadDocument } from "../../api/account/account";
import { toaster } from "evergreen-ui";
import { SpinnerCircular } from "spinners-react";

function Index() {
  const location = useLocation();
  const [file, setFile] = useState({});
  const [base64File, setBase64File] = useState(null);
  const [loading, setLoading] = useState(false);

  const state = location?.state;

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    const convertedFile = file && (await getBase64(file));

    const base64 = convertedFile.split(",");
    setBase64File(base64[1]);
    setFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const currentAccount =
      sessionStorage.getItem("currentAccount") &&
      JSON.parse(sessionStorage.getItem("currentAccount"));
    const size = Math.round(file.size / 1024);

    if (size >= 1024) {
      toaster.warning("file is too Big, please Select a file less than 1mb");
      setLoading(false);
      return;
    }

    const body = {
      accountNumber: currentAccount.nuban,
      documentName: state?.documentName,
      documentCode: state?.documentCode,
      documentBase64: base64File,
      documentType: file?.type,
    };

    const res = await uploadDocument(body);

    if (res) {
      setLoading(false);
    }
  };

  return (
    <div className="py-5 col-md-8 col-lg-6 col-xl-5 mx-auto">
      <div className="bg-light shadow-sm rounded p-3 p-sm-4 mb-4">
        <h3 className="text-5 font-weight-400 mb-3">
          <span className="text-5 font-weight-500 mb-3">
            {state?.documentName}
          </span>{" "}
          Upload
        </h3>
        <div className="py-3">
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/jpg,image/jpeg,image/gif,image/png,application/pdf,image/*"
          />
        </div>
        <button
          style={{
            padding: "2rem",
            fontSize: ".8rem",
            margin: "0.5rem 0",
          }}
          className="btn btn-primary py-2"
          onClick={handleSubmit}
        >
          {loading ? (
            <SpinnerCircular
              size={15}
              color="#00ac9f"
              secondaryColor="#035572"
            />
          ) : (
            "Submit"
          )}
        </button>
      </div>
    </div>
  );
}

export default Index;
