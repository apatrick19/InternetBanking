import {
  USER_INFO_LOADING,
  USER_INFO_SUCCESS,
  USER_INFO_FAILED,
} from "../constants/general";

export const userInfo = (state, { type, payload }) => {
  switch (type) {
    case USER_INFO_LOADING:
      return {
        ...state,
        loading: true,
        accountInfo: "",
        failureMessage: "",
      };
    case USER_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        accountInfo: payload,
        failureMessage: "",
      };
    case USER_INFO_FAILED:
      return {
        ...state,
        loading: false,
        accountInfo: "",
        failureMessage: payload,
      };
    default:
      return state;
  }
};
