import axios from "axios";

const base_Url = process.env.REACT_APP_BASE_URL;
const hashkey = process.env.REACT_APP_HashKey;

export const get_card_config = async () => {
  const token = sessionStorage.getItem("token");

  try {
    const { data } = await axios.get(`${base_Url}api/v1/cards/get-config`, {
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

export const request_card = async (data) => {
  const token = sessionStorage.getItem("token");

  const body = {
    requestID: "123456",
    channelCode: 1,
    token: hashkey,
    bin: data?.bin,
    accountNumber: data?.accountNumber,
    requestType: data?.requestType,
    deliveryOption: data?.deliveryOption,
    identifier: data?.identifier,
    nameOnCard: data?.nameOnCard,
  };

  try {
    const { data } = await axios.post(
      `${base_Url}api/v1/cards/request-card`,
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
