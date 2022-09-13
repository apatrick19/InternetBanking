import {
  USER_INFO_LOADING,
  USER_INFO_SUCCESS,
  USER_INFO_FAILED,
} from "../constants/general";

export const loadUser = async (dispatch) => {
  dispatch({ type: USER_INFO_LOADING });
};

export const setUser = async (dispatch, info) => {
  dispatch({ type: USER_INFO_SUCCESS, payload: info });
};

export const failedUser = async (dispatch, info) => {
  dispatch({ type: USER_INFO_FAILED, payload: info });
};
