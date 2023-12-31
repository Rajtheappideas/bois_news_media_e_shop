import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { GetUrl } from "../BaseUrl";

export const handleGetMagazines = createAsyncThunk(
  "getContent/handleGetMagazines",
  async (_, { rejectWithValue }) => {
    try {
      const response = await GetUrl("magazine");
      return response.data;
    } catch (error) {
      if (error?.response) {
        toast.error(error?.response?.data?.message);
        return rejectWithValue(error?.response?.data);
      }
    }
  }
);

export const handleGetLastestMagazines = createAsyncThunk(
  "getContent/handleGetLastestMagazines",
  async (_, { rejectWithValue }) => {
    try {
      const response = await GetUrl("magazine/latest");
      return response.data;
    } catch (error) {
      if (error?.response) {
        toast.error(error?.response?.data?.message);
        return rejectWithValue(error?.response?.data);
      }
    }
  }
);

export const handleGetSubscriptions = createAsyncThunk(
  "getContent/handleGetSubscriptions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await GetUrl("subscription");
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
  selectedView: "grid",
  activeCategory: "view_all",
  showMagazineOrSubscriptionDetails: false,
  magazineLoading: false,
  subscriptionLoading: false,
  singleMagazineOrSubscription: null,
  magazines: [],
  latestMagazines: null,
  subscriptions: [],
  allMagazinesAndSubscriptions: [],
};

const ShopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    handleChangeGridView: (state, { payload }) => {
      state.selectedView = payload;
    },
    handleChangeActiveCategory: (state, { payload }) => {
      state.activeCategory = payload;
    },
    handleChangeMagazineOrSubscriptionShow: (state, { payload }) => {
      state.showMagazineOrSubscriptionDetails = payload;
    },
    handleChangeSingleMagazineOrSubscription: (
      state,
      { payload: { id, type } }
    ) => {
      if (type === "magazine") {
        const findMagazine = state.magazines.find(
          (magazine) => magazine?._id === id
        );
        state.singleMagazineOrSubscription = findMagazine;
      } else {
        const findSubscription = state.subscriptions.find(
          (subscription) => subscription?._id === id
        );
        state.singleMagazineOrSubscription = findSubscription;
      }
    },
  },
  extraReducers: (builder) => {
    // get magazines
    builder.addCase(handleGetMagazines.pending, (state, {}) => {
      state.magazineLoading = true;
      state.error = null;
    });
    builder.addCase(handleGetMagazines.fulfilled, (state, { payload }) => {
      state.magazineLoading = false;
      state.error = null;
      state.magazines = payload?.magazines;
      state.allMagazinesAndSubscriptions = [
        ...state.allMagazinesAndSubscriptions,
        ...payload?.magazines,
      ];
    });
    builder.addCase(handleGetMagazines.rejected, (state, { payload }) => {
      state.magazineLoading = false;
      state.error = payload ?? null;
    });
    // get latest magazines
    builder.addCase(handleGetLastestMagazines.pending, (state, {}) => {
      state.magazineLoading = true;
      state.error = null;
    });
    builder.addCase(
      handleGetLastestMagazines.fulfilled,
      (state, { payload }) => {
        state.magazineLoading = false;
        state.error = null;
        state.latestMagazines = payload?.magazines;
      }
    );
    builder.addCase(
      handleGetLastestMagazines.rejected,
      (state, { payload }) => {
        state.magazineLoading = false;
        state.error = payload ?? null;
      }
    );
    // get subscriptions
    builder.addCase(handleGetSubscriptions.pending, (state, {}) => {
      state.subscriptionLoading = true;
      state.error = null;
    });
    builder.addCase(handleGetSubscriptions.fulfilled, (state, { payload }) => {
      state.subscriptionLoading = false;
      state.error = null;
      state.subscriptions = payload?.subscriptions;
      state.allMagazinesAndSubscriptions = [
        ...state.allMagazinesAndSubscriptions,
        ...payload?.subscriptions,
      ];
    });
    builder.addCase(handleGetSubscriptions.rejected, (state, { payload }) => {
      state.subscriptionLoading = false;
      state.error = payload ?? null;
    });
  },
});

export const {
  handleChangeGridView,
  handleChangeActiveCategory,
  handleChangeMagazineOrSubscriptionShow,
  handleChangeSingleMagazineOrSubscription,
} = ShopSlice.actions;

export default ShopSlice.reducer;
