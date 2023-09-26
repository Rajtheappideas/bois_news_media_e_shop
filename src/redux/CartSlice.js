import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  cart: [],
  total: 0,
  subTotal: 0,
  totalQuantity: 0,
  shippingAddress: null,
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    handleCalculateTotal: (state, { payload }) => {},
    handleCalculateSubTotal: (state, { payload }) => {},
    handleCalculateQuantity: (state, { payload }) => {},
    handleAddProductToCart: (state, { payload }) => {},
    handleRemoveProductFromCart: (state, { payload }) => {},
    handleUpdateProductToCart: (state, { payload }) => {},
  },
});

export const {} = CartSlice.actions;

export default CartSlice.reducer;
