import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { GetUrl, PostUrl } from "../BaseUrl";

export const handleRegisterUser = createAsyncThunk(
  "auth/handleRegisterUser",
  async (
    { fname, lname, email, phone, civility, password, shippingAddress, signal },
    { rejectWithValue }
  ) => {
    try {
      signal.current = new AbortController();
      const response = await PostUrl("signup", {
        data: {
          fname,
          lname,
          email,
          phone,
          password,
          civility,
          shippingAddress,
        },
        signal: signal.current.signal,
      });
      return response.data;
    } catch (error) {
      if (error?.response) {
        toast.error(error?.response?.data?.message);
        return rejectWithValue(error?.response?.data);
      }
    }
  }
);

export const handleLoginUser = createAsyncThunk(
  "auth/handleLoginUser",
  async ({ email, password, signal }, { rejectWithValue }) => {
    try {
      signal.current = new AbortController();
      const response = await PostUrl("login", {
        data: { email, password },
        signal: signal.current.signal,
      });
      return response.data;
    } catch (error) {
      if (error?.response) {
        toast.error(error?.response?.data?.message);
        return rejectWithValue(error?.response?.data);
      }
    }
  }
);

export const handleVerifyOtp = createAsyncThunk(
  "auth/handleVerifyOtp",
  async ({ email, otp, signal }, { rejectWithValue }) => {
    try {
      signal.current = new AbortController();
      const response = await PostUrl("verify-otp", {
        data: { email, otp },
        signal: signal.current.signal,
      });
      return response.data;
    } catch (error) {
      if (error?.response) {
        toast.error(error?.response?.data?.message);
        return rejectWithValue(error?.response?.data);
      }
    }
  }
);

export const handleForgotPassword = createAsyncThunk(
  "auth/handleForgotPassword",
  async ({ email, signal }, { rejectWithValue }) => {
    try {
      signal.current = new AbortController();
      const response = await PostUrl("forgot-password", {
        data: { email },
        signal: signal.current.signal,
      });
      return response.data;
    } catch (error) {
      if (error?.response) {
        toast.error(error?.response?.data?.message);
        return rejectWithValue(error?.response?.data);
      }
    }
  }
);

export const handleResetPassword = createAsyncThunk(
  "auth/handleResetPassword",
  async ({ email, password, verifyToken, signal }, { rejectWithValue }) => {
    try {
      signal.current = new AbortController();
      const response = await PostUrl("reset-password", {
        data: { email, password, verifyToken },
        signal: signal.current.signal,
      });
      return response.data;
    } catch (error) {
      if (error?.response) {
        toast.error(error?.response?.data?.message);
        return rejectWithValue(error?.response?.data);
      }
    }
  }
);

export const handleChangePassword = createAsyncThunk(
  "auth/handleChangePassword",
  async ({ oldPassword, newPassword, token, signal }, { rejectWithValue }) => {
    try {
      signal.current = new AbortController();
      const response = await PostUrl("change-password", {
        data: { oldPassword, newPassword },
        signal: signal.current.signal,
        headers: {
          Authorization: token,
        },
      });
      return response.data;
    } catch (error) {
      if (error?.response) {
        toast.error(error?.response?.data?.message);
        return rejectWithValue(error?.response?.data);
      }
    }
  }
);

export const handleEditProfile = createAsyncThunk(
  "auth/handleEditProfile",
  async (
    { fname, lname, phone, civility, shippingAddress, token, signal },
    { rejectWithValue }
  ) => {
    try {
      signal.current = new AbortController();
      const response = await PostUrl("profile", {
        data: {
          fname,
          lname,
          phone,
          civility,
          shippingAddress,
        },
        signal: signal.current.signal,
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      if (error?.response) {
        toast.error(error?.response?.data?.message);
        return rejectWithValue(error?.response?.data);
      }
    }
  }
);

export const handleChangeUserAddress = createAsyncThunk(
  "auth/handleChangeUserAddress",
  async (
    {
      addressType,
      address1,
      address2,
      address3,
      zipCode,
      city,
      country,
      province,
      token,
      signal,
    },
    { rejectWithValue }
  ) => {
    try {
      signal.current = new AbortController();
      const response = await PostUrl("address", {
        data: {
          addressType,
          address1,
          address2,
          address3,
          zipCode,
          city,
          country,
          province,
        },
        signal: signal.current.signal,
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      if (error?.response) {
        toast.error(error?.response?.data?.message);
        return rejectWithValue(error?.response?.data);
      }
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  success: false,
  user: null,
  token: null,
  verifyToken: null,
  email: null,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    handleLogout: (state) => {
      state.loading = true;
      state.user = null;
      state.token = null;
      window.location.href = window.location.origin;
      toast.success("Logout Successfully.", { duration: 3000 });
      state.loading = false;
    },
    handleStoreUserEmail: (state, { payload }) => {
      state.email = payload;
    },
  },
  extraReducers: (builder) => {
    // register user
    builder.addCase(handleRegisterUser.pending, (state, {}) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    });
    builder.addCase(handleRegisterUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.user = payload?.subscriber;
      state.error = null;
      state.token = payload?.token;
      state.verifyToken = null;
      state.email = null;
    });
    builder.addCase(handleRegisterUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.user = null;
      state.error = payload ?? null;
      state.token = null;
      state.verifyToken = null;
      state.email = null;
    });
    // login user
    builder.addCase(handleLoginUser.pending, (state, {}) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    });
    builder.addCase(handleLoginUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.user = payload?.subscriber;
      state.error = null;
      state.token = payload?.token;
      state.verifyToken = null;
      state.email = null;
    });
    builder.addCase(handleLoginUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.user = null;
      state.error = payload ?? null;
      state.token = null;
      state.verifyToken = null;
      state.email = null;
    });
    // forgot password
    builder.addCase(handleForgotPassword.pending, (state, {}) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    });
    builder.addCase(handleForgotPassword.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.user = null;
      state.error = null;
      state.token = null;
    });
    builder.addCase(handleForgotPassword.rejected, (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.user = null;
      state.error = payload ?? null;
      state.token = null;
    });
    // verfiy otp
    builder.addCase(handleVerifyOtp.pending, (state, {}) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    });
    builder.addCase(handleVerifyOtp.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.error = null;
      state.user = null;
      state.token = null;
      state.verifyToken = payload?.verifyToken;
    });
    builder.addCase(handleVerifyOtp.rejected, (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.error = payload ?? null;
    });
    // reset password
    builder.addCase(handleResetPassword.pending, (state, {}) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    });
    builder.addCase(handleResetPassword.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.user = null;
      state.error = null;
      state.token = null;
      state.email = null;
      state.verifyToken = null;
    });
    builder.addCase(handleResetPassword.rejected, (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.user = null;
      state.error = payload ?? null;
      state.token = null;
    });
    // change password
    builder.addCase(handleChangePassword.pending, (state, {}) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    });
    builder.addCase(handleChangePassword.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    });
    builder.addCase(handleChangePassword.rejected, (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.error = payload ?? null;
    });
    // edit profile
    builder.addCase(handleEditProfile.pending, (state, {}) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    });
    builder.addCase(handleEditProfile.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.user = payload?.subscriber;
      state.error = null;
    });
    builder.addCase(handleEditProfile.rejected, (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.error = payload ?? null;
    });
    // shipping address
    builder.addCase(handleChangeUserAddress.pending, (state, {}) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    });
    builder.addCase(handleChangeUserAddress.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.user = {
        ...state.user,
        shippingAddress: payload?.shippingAddress,
        billingAddress: payload?.billingAddress,
      };
      state.error = null;
    });
    builder.addCase(handleChangeUserAddress.rejected, (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.error = payload ?? null;
    });
  },
});

export const { handleLogout, handleStoreUserEmail } = AuthSlice.actions;

export default AuthSlice.reducer;
