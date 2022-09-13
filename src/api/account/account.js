import axios from "axios";
import { toaster } from "evergreen-ui";
import { setUser } from "../../context/actions/general";
import { securityAuth } from "../onboarding/onboarding";
const base_Url = process.env.REACT_APP_BASE_URL;

export const validateBvn = async (bvn, token, dispatch) => {
  const res = await securityAuth();
  const body = {
    requestID: "7578",
    channelCode: 1,
    bvn: bvn,
  };

  try {
    const { data } = await axios.post(
      `${base_Url}api/v1/account/validate-bvn`,
      body,
      {
        headers: {
          Authorization: `Bearer ${res.token}`,
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      }
    );

    if (data?.responseCode !== "00") {
      toaster.danger("Check your Bvn, Invalid Bvn");
    }

    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const getAccountByAccountNo = async (accountNo) => {
  const res = await securityAuth();
  const body = {
    requestID: "7578",
    channelCode: 1,
    accountNumber: accountNo,
  };

  try {
    const { data } = await axios.post(
      `${base_Url}api/v1/account/get-account-by-account-no`,
      body,
      {
        headers: {
          Authorization: `Bearer ${res.token}`,
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      }
    );

    // if (data?.responseCode === "00") {
    //   if (user) {
    //     setUser(user?.dispatch, data);
    //   }

    //   sessionStorage.setItem("userInfo", JSON.stringify(data));

    //   // set sidebar state
    //   const currentAccount = JSON.parse(
    //     sessionStorage.getItem("currentAccount")
    //   );

    //   if (currentAccount) {
    //     const res = data?.accounts.filter((account) => {
    //       return account.nuban === currentAccount?.nuban;
    //     });

    //     sessionStorage.setItem("currentAccount", JSON.stringify(res[0]));
    //   }
    // } else {
    //   toaster.danger(`An Error occurred while fetch Account`);
    // }

    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const getAllAccountByCustomerId = async (user) => {
  const customerId = sessionStorage.getItem("customerId");
  const token = sessionStorage.getItem("token");
  const body = {
    requestID: "7578",
    channelCode: 1,
    customerID: customerId,
  };

  try {
    const { data } = await axios.post(
      `${base_Url}api/v1/account/get-all-accounts-by-customerid`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      }
    );

    if (data?.responseCode === "00") {
      if (user) {
        setUser(user?.dispatch, data);
      }

      sessionStorage.setItem("userInfo", JSON.stringify(data));

      // set sidebar state
      const currentAccount = JSON.parse(
        sessionStorage.getItem("currentAccount")
      );

      if (currentAccount) {
        const res = data?.accounts.filter((account) => {
          return account.nuban === currentAccount?.nuban;
        });

        sessionStorage.setItem("currentAccount", JSON.stringify(res[0]));
      }
    } else {
      toaster.danger(`An Error occurred while fetch Account`);
    }

    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const getDocument = async (user) => {
  const customerId = sessionStorage.getItem("customerId");
  const token = sessionStorage.getItem("token");
  const body = {
    requestID: "7578",
    channelCode: 1,
    customerID: customerId,
  };

  try {
    const { data } = await axios.post(
      `${base_Url}api/v1/account/get-documents-status`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      }
    );

    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const uploadDocument = async (user) => {
  const customerId = sessionStorage.getItem("customerId");
  const token = sessionStorage.getItem("token");
  const body = {
    requestID: "7578",
    channelCode: 1,
    customerID: customerId,
    accountNumber: user?.accountNumber,
    documentName: user?.documentName,
    documentCode: user?.documentCode,
    documentBase64: user?.documentBase64,
    documentType: user?.documentType,
  };

  try {
    const { data } = await axios.post(
      `${base_Url}api/v1/account/upload-document`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      }
    );

    if (data.responseCode === "00") {
      toaster.notify(`${data.responseMessage}`);
    } else {
      toaster.danger(`${data.responseMessage}`);
    }

    return data;
  } catch (error) {
    console.log(error.message);
  }
};
