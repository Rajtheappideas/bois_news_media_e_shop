import { createSlice, current } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

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
    handleCalculateTotal: (state, { payload }) => {
      const total = state.cart.reduce((acc, cur) => {
        return acc + parseFloat(cur?.price) * parseFloat(cur?.quantity);
      }, 0);
      if (total !== NaN && typeof total === "number") {
        state.total = total;
      }
    },
    handleCalculateSubTotal: (state, { payload }) => {
      const subTotal = state.cart.reduce((acc, cur) => {
        return acc + parseFloat(cur?.price) * parseFloat(cur?.quantity);
      }, 0);
      if (subTotal !== NaN && typeof subTotal === "number") {
        state.subTotal = subTotal;
      }
    },
    handleCalculateQuantity: (state, { payload }) => {},
    handleAddProductToCart: (
      state,
      {
        payload: {
          selectedShippingZone,
          selectedTypeOfSupport,
          quantity,
          _id,
          isSubscription,
          price,
          title,
        },
      }
    ) => {
      const alreadyInCart = state.cart.find((product) => product?._id === _id);
      if (alreadyInCart) {
        toast.error(`${title} already in the cart.`);
        return;
      } else {
        state.cart = [
          ...state.cart,
          {
            selectedShippingZone,
            selectedTypeOfSupport,
            quantity,
            _id,
            isSubscription,
            price,
            title,
          },
        ];
        toast.success(`${title} added to cart.`);
      }
    },
    handleUpdateProductToCart: (state, { payload }) => {
      const updatedArr = state.cart.map((product) => {
        const updated = payload.find(
          (updatedProduct) => updatedProduct._id === product._id
        );
        return updated ? { ...product, quantity: updated?.quantity } : product;
      });
      if (updatedArr) {
        state.cart = updatedArr;
        toast.success(`Cart is updated.`);
        return;
      }
    },
    handleRemoveProductFromCart: (state, { payload }) => {
      const updatedProduct = state.cart.filter(
        (product) => product?._id !== payload
      );
      if (updatedProduct) {
        state.cart = updatedProduct;
        return;
      } else {
        toast.error("Product not found");
      }
    },
  },
});

export const {
  handleCalculateTotal,
  handleAddProductToCart,
  handleCalculateSubTotal,
  handleRemoveProductFromCart,
  handleUpdateProductToCart,
} = CartSlice.actions;

export default CartSlice.reducer;
