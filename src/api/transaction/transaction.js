import axios from "axios";
import { toaster } from "evergreen-ui";

const base_Url = process.env.REACT_APP_BASE_URL;

export const getTransactions = async () => {
  try {
    const customerId = sessionStorage.getItem("customerId");
    const token = sessionStorage.getItem("token");
    const body = {
      requestID: "7578",
      channelCode: 1,
      customerId,
    };
    const { data } = await axios.post(
      `${base_Url}api/v1/transaction/get-channel-transactions`,
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

export const getTransactionsForTransactionPage = async (user) => {
  try {
    const token = sessionStorage.getItem("token");
    const currentAccount = JSON.parse(sessionStorage.getItem("currentAccount"));

    const body = {
      requestID: "5949844",
      channelCode: 1,
      accountNumber: currentAccount.nuban,
      startDate: user.startDate,
      endDate: user.endDate,
      // numberOfItems: user?.numberOfItems,
    };

    const { data } = await axios.post(
      `${base_Url}api/v1/transaction/get-transactions`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      }
    );

    // if (data.responseCode !== "00") {
    //   toaster.danger(data.responseMessage);
    // }

    return data;
  } catch (error) {
    console.log(error.response);
    // toaster.danger("An Error Occurred");
  }
};

export const generateStatement = async (user) => {
  if (!user.startDate) return;

  try {
    const token = sessionStorage.getItem("token");
    const currentAccount = JSON.parse(sessionStorage.getItem("currentAccount"));

    const body = {
      requestID: "5949844",
      channelCode: 1,
      accountNumber: currentAccount.nuban,
      startDate: user.startDate,
      endDate: user.endDate,
      // numberOfItems: user?.numberOfItems,
    };

    const { data } = await axios.post(
      `${base_Url}api/v1/transaction/generate-statement`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          responseType: "blob",
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      }
    );

    function downloadBase64File(contentType, base64Data, fileName) {
      const linkSource = `data:${contentType};base64,${base64Data}`;
      const downloadLink = document.createElement("a");
      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
    }

    downloadBase64File("application/pdf", data.file, "receipt");

    return data;
  } catch (error) {
    console.log(error.response);
    // toaster.danger("An Error Occurred");
  }
};
