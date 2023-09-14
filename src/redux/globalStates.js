import { createSlice } from "@reduxjs/toolkit";
import { BroadcastChannel } from "broadcast-channel";
import i18next from "i18next";
import { toast } from "react-hot-toast";

const initialState = {
  showSignin: false,
  showSignup: false,
  showForgotPassword: false,
  showOtpField: false,
  showResetPassword: false,
  language: JSON.parse(window.localStorage.getItem("lang")) ?? "en",
};

const logoutChannel = new BroadcastChannel("handleLogout");
const loginChannel = new BroadcastChannel("handleSuccess");

const globalStates = createSlice({
  name: "global",
  initialState,
  reducers: {
    handleChangeShowSignin: (state, { payload }) => {
      state.showSignin = payload;
    },
    handleChangeShowSignup: (state, { payload }) => {
      state.showSignup = payload;
    },
    handleChangeShowForgotPassword: (state, { payload }) => {
      state.showForgotPassword = payload;
    },
    handleChangeShowResetPassword: (state, { payload }) => {
      state.showResetPassword = payload;
    },
    handleChangeShowOtpField: (state, { payload }) => {
      state.showOtpField = payload;
    },
    handleSuccess: () => {
      loginChannel.postMessage("");
      loginChannel.onmessage = (event) => {
        loginChannel.close();
      };
      toast.success("Sign in successfully.");
    },
    handleLogoutFromAllTabs: () => {
      logoutChannel.postMessage("");
      logoutChannel.onmessage = (event) => {
        logoutChannel.close();
      };
    },
    logoutAllTabsEventListener: () => {
      logoutChannel.onmessage = (event) => {
        logoutChannel.close();
        window.location.reload();
      };
    },
    loginAllTabsEventListener: () => {
      loginChannel.onmessage = (event) => {
        window.location.reload();
        loginChannel.close();
      };
    },

    handleChangeUserLanguage: (state, { payload }) => {
      state.language = payload;
      i18next.changeLanguage(payload);
    },
  },
});

export const {
  handleChangeShowForgotPassword,
  handleChangeShowSignin,
  handleChangeShowSignup,
  handleChangeShowOtpField,
  handleChangeUserLanguage,
  handleLogoutFromAllTabs,
  handleSuccess,
  loginAllTabsEventListener,
  logoutAllTabsEventListener,
  handleChangeShowResetPassword,
} = globalStates.actions;

export default globalStates.reducer;
