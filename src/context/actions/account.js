import { securityAuth } from "../../api/onboarding/onboarding";
import { SET_TOKEN, SET_SIDEBAR_STATE } from "../constants/account";

export const setToken = async (dispatch) => {
  const token = await securityAuth();
  dispatch({ type: SET_TOKEN, payload: token.token });
};

export const setSidebarState = async (dispatch, account) => {
  dispatch({ type: SET_SIDEBAR_STATE, payload: account });
};
