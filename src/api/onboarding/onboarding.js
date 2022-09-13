import axios from "axios";
import { toaster } from "evergreen-ui";

const base_Url = process.env.REACT_APP_BASE_URL;
const hashKey = process.env.REACT_APP_HashKey;
const jwtName = process.env.REACT_APP_JWT_NAME;
const jwtPassword = process.env.REACT_APP_JWT_PASSWORD;

export const securityAuth = async () => {
  try {
    const body = {
      name: jwtName,
      password: jwtPassword,
    };
    const { data } = await axios.post(
      `${base_Url}api/v1/security/authenticate`,
      body,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      }
    );

    sessionStorage.setItem("token", data.token);

    return data;
  } catch (error) {
    console.log(error);
    toaster.danger("An Error Occurrred Retry");
  }
};

export const createAccount = async (user, info) => {
  try {
    const body = {
      requestID: "7578",
      bvn: user.bvn,
      firstName: user.firstName,
      lastName: user.lastName,
      dob: user.dob,
      email: user.email,
      mobileNo: user.phoneNumber,
      password: user.password,
      channelCode: 1,
    };

    const token = sessionStorage.getItem("token");

    const { data } = await axios.post(
      `${base_Url}api/v1/account/create-new`,
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
      toaster.notify(
        `Account Creation Successful \n
      AccountNo: ${data.accountNo} \n
      CustomerID: ${data.customerID}
      `
      );
      info.navigate("/");
    } else {
      toaster.danger(`${data?.responseMessage}`);
    }
    return data;
  } catch (error) {
    console.log(error.response);
  }
};

export const resetPassword = async (user) => {
  try {
    const body = {
      requestID: "7578",
      channelCode: 1,
      userId: user?.accountNo,
      password: user?.password,
    };

    const token = sessionStorage.getItem("token");

    const { data } = await axios.post(
      `${base_Url}api/v1/identity/reset-password`,
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

export const loginAccount = async (user, info, setLoading) => {
  try {
    sessionStorage.clear();
    const res = await securityAuth();
    const body = {
      requestID: "7578",
      channelCode: 1,
      userId: user.accountNo,
      password: user.password,
    };

    const { data } = await axios.post(
      `${base_Url}api/v1/identity/login`,
      body,
      {
        headers: {
          Authorization: `Bearer ${res.token}`,
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      }
    );

    if (data?.responseCode === "00") {
      toaster.notify(data?.responseMessage);
      sessionStorage.setItem("customerId", data.customerId);
      info.navigate("/account");
    } else {
      toaster.danger(`${data?.responseMessage} Retry`);
    }

    return data;
  } catch (error) {
    setLoading(false);
    console.log(error.response);
  }
};

export const changePassword = async (values, handleClose) => {
  try {
    const token = sessionStorage.getItem("token");
    const customerId = sessionStorage.getItem("customerId");

    const body = {
      requestID: "123456",
      channelCode: 1,
      customerId: customerId,
      currentPassword: values.currentPassword,
      newPassword: values.confirmNewPassword,
      token: hashKey,
    };

    const { data } = await axios.post(
      `${base_Url}api/v1/identity/change-password`,
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
      toaster.notify(data.responseMessage);
    } else {
      toaster.danger(data.responseMessage);
    }

    return data;
  } catch (error) {
    console.log(error.response);
    toaster.danger("An Error Occurred");
  }
};

export const changePin = async (values, handleClose) => {
  try {
    const token = sessionStorage.getItem("token");
    const customerId = sessionStorage.getItem("customerId");

    const body = {
      requestID: "123456",
      channelCode: 1,
      customerId: customerId,
      currentPin: values.currentPin,
      newPin: values.confirmNewPin,
      token: hashKey,
    };

    const { data } = await axios.post(
      `${base_Url}api/v1/identity/change-pin`,
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
      toaster.notify(data.responseMessage);
      handleClose();
    } else {
      toaster.danger(data.responseMessage);
    }

    return data;
  } catch (error) {
    console.log(error.response);
    toaster.danger("An Error Occurred");
  }
};

export const createPin = async (pin, handleClose) => {
  try {
    const token = sessionStorage.getItem("token");
    const customerId = sessionStorage.getItem("customerId");

    const body = {
      requestID: "123456",
      channelCode: 1,
      customerId: customerId,
      token: hashKey,
      pin: pin,
    };

    const { data } = await axios.post(
      `${base_Url}api/v1/identity/reset-pin`,
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
      toaster.notify(data.responseMessage);
      handleClose();
    } else {
      toaster.danger(data.responseMessage);
    }

    return data;
  } catch (error) {
    console.log(error.response);
    toaster.danger("An Error Occurred");
  }
};
