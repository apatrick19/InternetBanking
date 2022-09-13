import React, { createContext, useReducer, useState } from "react";
import { getToken, SidebarState } from "./Reducers/account";
import { userInfo } from "./Reducers/general";
import { tokenInitialState, sidebarDataInitialState } from "./states/account";
import { user_Info_InitialState } from "./states/general";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [tokenState, tokenDispatch] = useReducer(getToken, tokenInitialState);
  // toggle sidebaron mobile
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const [userState, userDispatch] = useReducer(
    userInfo,
    user_Info_InitialState
  );
  const [sidebarState, sidebarDispatch] = useReducer(
    SidebarState,
    sidebarDataInitialState
  );

  const toggleSidebar = () => {
    setSidebarToggle(!sidebarToggle);
  };

  return (
    <Context.Provider
      value={{
        tokenState,
        sidebarToggle,
        toggleSidebar,
        tokenDispatch,
        userState,
        userDispatch,
        sidebarState,
        sidebarDispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};
