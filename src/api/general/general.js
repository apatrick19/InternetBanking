import axios from "axios";
import { toaster } from "evergreen-ui";
import { securityAuth } from "../onboarding/onboarding";

const base_Url = process.env.REACT_APP_BASE_URL;
const hashkey = process.env.REACT_APP_HashKey;

export const generate_token = async (user, navigate) => {
  try {
    const res = await securityAuth();
    const body = {
      requestID: "7578",
      channelCode: 1,
      customerId: user.phoneNumber,
      mobileNumber: user.phoneNumber,
      email: user?.email,
      hashKey: hashkey,
    };

    const { data } = await axios.post(
      `${base_Url}api/v1/general/generate-token`,
      body,
      {
        headers: {
          Authorization: `Bearer ${res.token}`,
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      }
    );

    // alert the token
    if (data.responseCode === "00") {
      navigate("/otp", { state: user });
      get_token(user, res.token, navigate);
    } else {
      toaster.danger(data.responseMessage);
    }

    return data;
  } catch (error) {
    console.log(error.response);
  }
};

export const validate_token = async (info) => {
  const token = sessionStorage.getItem("token");
  try {
    const body = {
      requestID: "7578",
      channelCode: 1,
      customerId: info.phoneNumber,
      token: info.pin,
      hashKey: hashkey,
    };

    const { data } = await axios.post(
      `${base_Url}api/v1/general/validate-token`,
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

export const get_token = async (user, token, navigate) => {
  try {
    const body = {
      // requestID: "7578",
      // channelCode: 1,
      customerId: user.phoneNumber,
      // mobileNumber: user.phoneNumber,
      // email,
      // hashKey: hashkey,
    };

    const { data } = await axios.post(
      `${base_Url}api/v1/general/get-token`,
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

export const get_bank = async () => {
  try {
    const token = sessionStorage.getItem("token");

    const { data } = await axios.get(`${base_Url}api/v1/general/bank`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });

    return data;
  } catch (error) {
    console.log(error.response);
  }
};
