import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  success: false,
  selectedView: "grid",
  activeCategory: "view_all",
  showSubscriptionDetails: false,
  showMagazineDetails: false,
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
    handleChangeSubscriptionShow: (state, { payload }) => {
      state.showSubscriptionDetails = payload;
    },
    handleChangeMagazineShow: (state, { payload }) => {
      state.showMagazineDetails = payload;
    },
  },
});

export const {
  handleChangeGridView,
  handleChangeActiveCategory,
  handleChangeMagazineShow,
  handleChangeSubscriptionShow,
} = ShopSlice.actions;

export default ShopSlice.reducer;
