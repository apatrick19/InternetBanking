import axios from "axios";
import { toaster } from "evergreen-ui";
import { getAllAccountByCustomerId } from "../account/account";

const base_Url = process.env.REACT_APP_BASE_URL;

export const enquiryName = async (user) => {
  try {
    const token = sessionStorage.getItem("token");
    const body = {
      requestID: "7897",
      channelCode: 1,
      accountNumber: user.accountNo,
      bankCode: user.bankCode,
    };

    const { data } = await axios.post(
      `${base_Url}api/v1/transfer/name-enquiry`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      }
    );
    if (data.responseCode !== "00") {
      toaster.warning(
        `${data.responseMessage} Check your information and try again`
      );
    }

    return { name: data.name, sessionID: data.sessionID };
  } catch (error) {
    console.log(error.response);
    toaster.danger("An Error Occurred");
  }
};

export const interbankTransfer = async (user) => {
  try {
    const token = sessionStorage.getItem("token");
    const customerId = sessionStorage.getItem("customerId");
    const body = {
      requestID: "44648978",
      channelCode: 1,
      amount: parseInt(user.amount),
      payerAccountNumber: user.value,
      payerAccountName: user.accountName,
      receiverBankCode: user.bankCode,
      receiverAccountNumber: user.accountNo,
      receiverName: user.toAccountName,
      narration: user.narration,
      nipSessionID: user.sessionID,
      pin: user.pin,
      customerId: customerId,
      isBeneficiaryTransfer: user.isBeneficiary,
    };

    const { data } = await axios.post(
      `${base_Url}api/v1/transfer/interbank-transfer`,
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
      getAllAccountByCustomerId();
    }

    return data;
  } catch (error) {
    console.log(error.response);
    toaster.danger(error.responseMessage.data);
  }
};

export const localTransfer = async (user) => {
  try {
    const token = sessionStorage.getItem("token");
    const customerId = sessionStorage.getItem("customerId");

    const body = {
      requestID: "44648978",
      channelCode: 1,
      amount: parseInt(user.amount),
      fromAccountNumber: user.value,
      toAccountNumber: user.accountNo,
      narration: user.narration,
      pin: user.pin,
      customerId: customerId,
    };

    const { data } = await axios.post(
      `${base_Url}api/v1/transfer/local-transfer`,
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
      getAllAccountByCustomerId();
    }

    return data;
  } catch (error) {
    console.log(error.response);
    toaster.danger(error.responseMessage.data);
  }
};

export const getBeneficiaries = async (user) => {
  try {
    const token = sessionStorage.getItem("token");
    const customerId = sessionStorage.getItem("customerId");
    const body = {
      requestID: "7897",
      channelCode: 1,
      customerId,
    };
    const { data } = await axios.post(
      `${base_Url}api/v1/transfer/get-beneficiaries`,
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
    console.log(error.response);
    toaster.danger("An Error Occurred");
  }
};

export const addBeneficiaries = async (user) => {
  try {
    const token = sessionStorage.getItem("token");
    const customerId = sessionStorage.getItem("customerId");

    const body = {
      requestID: "7897",
      channelCode: 100,
      sourceCustomerID: customerId,
      recipientBankCode: user.recipientBankCode,
      recipientBankName: user.recipientBankName,
      recipientAccountName: user.recipientAccountName,
      recipientAccountNumber: user.recipientAccountNumber,
      isLocalAccount: user.isLocalAccount,
    };

    const { data } = await axios.post(
      `${base_Url}api/v1/transfer/add-beneficiary`,
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
      toaster.notify("Beneficiary added Successfully");
    } else {
      toaster.danger(data.responseMessage);
    }

    return data;
  } catch (error) {
    console.log(error.response);
    toaster.danger("An error Occurred  Retry");
  }
};
