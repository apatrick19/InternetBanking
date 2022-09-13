import axios from "axios";
import { toaster } from "evergreen-ui";
import { getAllAccountByCustomerId } from "../account/account";

const base_Url = process.env.REACT_APP_BASE_URL;

export const getBillsCategory = async () => {
  const token = sessionStorage.getItem("token");
  try {
    const { data } = await axios.get(
      `${base_Url}api/v1/bills-payment/get-category`,
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
  }
};

export const getBillerByCategory = async (id) => {
  const token = sessionStorage.getItem("token");
  try {
    const body = {
      requestID: "12345",
      channelCode: 1,
      categoryID: id,
    };

    const { data } = await axios.post(
      `${base_Url}api/v1/bills-payment/get-biller-by-categoryid`,
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
  }
};

export const getProductByBillerId = async (id) => {
  const token = sessionStorage.getItem("token");
  try {
    const body = {
      requestID: "12345",
      channelCode: 1,
      billerId: id,
    };

    const { data } = await axios.post(
      `${base_Url}api/v1/bills-payment/get-product-by-billerid`,
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
  }
};

export const sendBillPayment = async (info, navigate) => {
  const token = sessionStorage.getItem("token");
  const customerId = sessionStorage.getItem("customerId");

  try {
    const body = {
      requestID: "123456",
      channelCode: 1,
      billerID: info.billerID,
      billerName: info.billerName,
      billerCategoryID: info?.billerCategoryID.toString(),
      billerCategoryName: info.value,
      paymentItemID: info.paymentItemId,
      paymentItemName: info.paymentItemName,
      customerID: info.customerId,
      customerName: info.accountName,
      accountNumber: info.accountNumber,
      customerEmail: info.email,
      customerPhone: info.phoneNumber,
      amount: parseInt(info?.customAmount),
      pin: info.pin,
      channelCustomerID: customerId,
    };

    const { data } = await axios.post(
      `${base_Url}api/v1/bills-payment/send-payment`,
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
      await getAllAccountByCustomerId();
      navigate("/bills-and-payment/success", {
        state: {
          billerName: info.paymentItemName,
          amount: info?.customAmount,
          isAirtime: info.isAirtime,
        },
      });
    } else {
      toaster.danger(data.responseCode);
    }

    return data;
  } catch (error) {
    console.log(error.response);
  }
};
