import axios from "axios";
import { toaster } from "evergreen-ui";

const base_Url = process.env.REACT_APP_BASE_URL;

export const getAirtime = async () => {
  try {
    const token = sessionStorage.getItem("token");
    const { data } = await axios.get(
      `${base_Url}api/v1/account/get-airtime-product`,
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
    toaster.danger("An Error occurred");
  }
};

export const sendAirtime = async (info) => {
  try {
    const token = sessionStorage.getItem("token");
    const customerId = sessionStorage.getItem("customerId");
    const body = {
      requestID: "5698997",
      channelCode: 1,
      billerID: info.billerID,
      billerName: info.billerName,
      billerCategoryID: info.billerCategoryID,
      billerCategoryName: info.billerCategoryName,
      paymentItemID: info.paymentItemID,
      paymentItemName: info.paymentItemName,
      customerID: info.phoneNumber,
      customerName: info.accountName,
      accountNumber: info.value,
      customerEmail: "",
      customerPhone: info.phoneNumber,
      token: "60631a02-9cfe-40e1-949b-7b080d827955",
      amount: parseInt(info.amount),
      pin: info.pin,
      channelCustomerID: customerId,
    };

    const { data } = await axios.post(
      `${base_Url}api/v1/account/send-payment`,
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
    toaster.danger("An Error occurred");
  }
};
