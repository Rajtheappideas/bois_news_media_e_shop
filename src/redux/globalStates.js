import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showSignin: false,
  showSignup: false,
  showForgotPassword: false,
};

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
  },
});

export const {
  handleChangeShowForgotPassword,
  handleChangeShowSignin,
  handleChangeShowSignup,
} = globalStates.actions;

export default globalStates.reducer;
