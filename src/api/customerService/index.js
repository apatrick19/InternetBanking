import axios from "axios";
import { toaster } from "evergreen-ui";

const base_Url = process.env.REACT_APP_BASE_URL;

export const getAccountOfficer = async () => {
  const token = sessionStorage.getItem("token");
  const account = JSON.parse(sessionStorage.getItem("currentAccount"));

  try {
    const body = {
      requestID: "123456",
      channelCode: 1,
      accountNumber: account.nuban,
    };

    const { data } = await axios.post(
      `${base_Url}api/v1/service/get-account-officer`,
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
      toaster.warning("An error occurred while fetching account officer");
    }
    return data;
  } catch (error) {
    console.log(error.response);
  }
};

export const logComplaints = async (info) => {
  const token = sessionStorage.getItem("token");
  const account = JSON.parse(sessionStorage.getItem("currentAccount"));
  const userInfo =
    sessionStorage.getItem("userInfo") &&
    JSON.parse(sessionStorage.getItem("userInfo"));
  const customerId = sessionStorage.getItem("customerId");

  try {
    const body = {
      requestID: "123456",
      channelCode: 1,
      accountNumber: account.nuban,
      description: info?.message,
      title: info?.title,
      mobileNumber: userInfo.phoneNumber,
      customerId: customerId,
    };

    const { data } = await axios.post(
      `${base_Url}api/v1/service/log-complaints`,
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
      toaster.warning("An Error Occurred while logging your complains. Retry");
    }

    return data;
  } catch (error) {
    console.log(error.response);
  }
};
