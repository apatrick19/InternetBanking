import { SET_TOKEN, SET_SIDEBAR_STATE } from "../constants/account";

export const getToken = (state, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return { ...state, token: action.payload };
    default:
      return state;
  }
};

export const SidebarState = (state, action) => {
  switch (action.type) {
    case SET_SIDEBAR_STATE:
      return { ...state, account: action.payload };
    default:
      return state;
  }
};
