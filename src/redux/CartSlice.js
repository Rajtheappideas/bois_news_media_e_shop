import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { GetUrl, PostUrl } from "../BaseUrl";

export const handleGetCart = createAsyncThunk(
  "cart/handleGetCart",
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await GetUrl("cart", {
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

export const handleAddMagazineToCart = createAsyncThunk(
  "cart/handleAddMagazineToCart",
  async ({ support, quantity, id, token, signal }, { rejectWithValue }) => {
    try {
      signal.current = new AbortController();
      const response = await PostUrl(`cart/magazine/${id}`, {
        data: { support, quantity },
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

export const handleAddSubscriptionToCart = createAsyncThunk(
  "cart/handleAddSubscriptionToCart",
  async ({ support, id, token, signal }, { rejectWithValue }) => {
    try {
      signal.current = new AbortController();
      const response = await PostUrl(`cart/subscription/${id}`, {
        data: { support },
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

export const handleUpdateCart = createAsyncThunk(
  "cart/handleUpdateCart",
  async ({ products, token, signal }, { rejectWithValue }) => {
    try {
      signal.current = new AbortController();
      const response = await PostUrl(`cart/update`, {
        data: products,
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

export const handleCheckout = createAsyncThunk(
  "cart/handleCheckout",
  async (
    {
      shippingAddress,
      billingAddress,
      phone,
      email,
      VAT,
      purchaseOrder,
      orderNotes,
      token,
      signal,
    },
    { rejectWithValue }
  ) => {
    try {
      signal.current = new AbortController();
      const response = await PostUrl(`checkout`, {
        data: {
          shippingAddress,
          billingAddress,
          phone,
          email,
          VAT,
          purchaseOrder,
          orderNotes,
        },
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

export const handleRemoveFromCart = createAsyncThunk(
  "cart/handleRemoveFromCart",
  async ({ id, token, signal }, { rejectWithValue }) => {
    try {
      signal.current = new AbortController();
      const response = await GetUrl(`cart/remove/${id}`, {
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

export const handleGetTaxAndShipping = createAsyncThunk(
  "cart/handleGetTaxAndShipping",
  async (_, { rejectWithValue }) => {
    try {
      const response = await GetUrl("pricing", {});
      return response.data;
    } catch (error) {
      if (error?.response) {
        return rejectWithValue(error?.response?.data);
      }
    }
  }
);

export const handleGetOrders = createAsyncThunk(
  "cart/handleGetOrders",
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await GetUrl("order", {
        headers: { Authorization: token },
      });
      return response.data;
    } catch (error) {
      if (error?.response) {
        return rejectWithValue(error?.response?.data);
      }
    }
  }
);

export const handleGetDownloads = createAsyncThunk(
  "cart/handleGetDownloads",
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await GetUrl("download", {
        headers: { Authorization: token },
      });
      return response.data;
    } catch (error) {
      if (error?.response) {
        return rejectWithValue(error?.response?.data);
      }
    }
  }
);

const initialState = {
  loading: false,
  getCartLoading: false,
  updateOrAddLoading: false,
  checkoutLoading: false,
  error: null,
  cart: [],
  total: 0,
  subTotal: 0,
  totalQuantity: 0,
  shippingAddress: null,
  taxPricing: null,
  shippingPricing: null,
  eec_switzerland_overseas_territories: [
    "Germany",
    "Switzerland",
    "Austria",
    "Belgium",
    "Bulgaria",
    "Cyprus",
    "Croatia",
    "Denmark",
    "Spain",
    "Estonia",
    "Finland",
    "Greece",
    "Hungary",
    "Ireland",
    "Italy",
    "Latvia",
    "Lithuania",
    "Luxembourg",
    "Malta",
    "Netherlands",
    "Poland",
    "Portugal",
    "Czech Republic",
    "Romania",
    "Slovakia",
    "Slovenia",
    "Sweden",
    "Guadeloupe",
    "Martinique",
    "French Guiana",
    "Reunion",
    "Mayotte",
    "Saint Pierre and Miquelon",
    "Saint Barthelemy",
    "Saint Martin",
    "Wallis and Futuna",
    "French Polynesia",
    "New Caledonia",
    "Clipperton Island",
  ],
  tax: 0,
  shipping: 0,
  discount: 0,
  orders: [],
  downloads: [],
  singleOrder: null,
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    handleCalculateTotal: (state, { payload }) => {
      const subtotal = state.cart.reduce((acc, cur) => {
        return acc + parseInt(cur?.itemId?.price) * parseInt(cur?.quantity);
      }, 0);
      if (subtotal !== NaN && typeof subtotal === "number") {
        state.total =
          parseInt(subtotal) +
          parseInt(state.shipping) +
          parseFloat(state.tax) -
          parseInt(state.discount);
      }
    },

    handleCalculateSubTotal: (state, { payload }) => {
      const subTotal = state.cart.reduce((acc, cur) => {
        return acc + parseInt(cur?.itemId?.price) * parseInt(cur?.quantity);
      }, 0);
      if (subTotal !== NaN && typeof subTotal === "number") {
        state.subTotal = subTotal;
      }
    },

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

    handleChangeTax: (state, { payload }) => {
      state.tax = payload;
    },

    handleChangeShipping: (state, { payload }) => {
      state.shipping = payload;
    },

    handleChangeDiscount: (state, { payload }) => {
      state.discount = payload;
    },

    handleFindSingleOrder: (state, { payload }) => {
      const findOrder = state.orders.find((order) => order?._id === payload);
      if (findOrder) {
        state.singleOrder = findOrder;
      } else {
        state.singleOrder = null;
      }
    },
  },
  extraReducers: (builder) => {
    // get cart
    builder.addCase(handleGetCart.pending, (state, {}) => {
      state.getCartLoading = true;
      state.error = null;
    });
    builder.addCase(handleGetCart.fulfilled, (state, { payload }) => {
      state.getCartLoading = false;
      state.cart = payload?.cart?.items;
      state.error = null;
    });
    builder.addCase(handleGetCart.rejected, (state, { payload }) => {
      state.getCartLoading = false;
      state.error = payload ?? null;
      state.cart = [];
    });

    // add magazine to cart
    builder.addCase(handleAddMagazineToCart.pending, (state, {}) => {
      state.updateOrAddLoading = true;
      state.error = null;
    });
    builder.addCase(handleAddMagazineToCart.fulfilled, (state, { payload }) => {
      state.updateOrAddLoading = false;
      state.cart = payload?.cart?.items;
      state.error = null;
    });
    builder.addCase(handleAddMagazineToCart.rejected, (state, { payload }) => {
      state.updateOrAddLoading = false;
      state.error = payload ?? null;
    });

    // add subscriptioon to cart
    builder.addCase(handleAddSubscriptionToCart.pending, (state, {}) => {
      state.updateOrAddLoading = true;
      state.error = null;
    });
    builder.addCase(
      handleAddSubscriptionToCart.fulfilled,
      (state, { payload }) => {
        state.updateOrAddLoading = false;
        state.cart = payload?.cart?.items;
        state.error = null;
      }
    );
    builder.addCase(
      handleAddSubscriptionToCart.rejected,
      (state, { payload }) => {
        state.updateOrAddLoading = false;
        state.error = payload ?? null;
      }
    );

    // remove from cart
    builder.addCase(handleRemoveFromCart.pending, (state, {}) => {
      state.updateOrAddLoading = true;
      state.error = null;
    });
    builder.addCase(handleRemoveFromCart.fulfilled, (state, { payload }) => {
      state.updateOrAddLoading = false;
      state.cart = payload?.cart?.items;
      state.error = null;
    });
    builder.addCase(handleRemoveFromCart.rejected, (state, { payload }) => {
      state.updateOrAddLoading = false;
      state.error = payload ?? null;
    });

    // update from cart
    builder.addCase(handleUpdateCart.pending, (state, {}) => {
      state.updateOrAddLoading = true;
      state.error = null;
    });
    builder.addCase(handleUpdateCart.fulfilled, (state, { payload }) => {
      state.updateOrAddLoading = false;
      state.cart = payload?.cart?.items;
      state.error = null;
    });
    builder.addCase(handleUpdateCart.rejected, (state, { payload }) => {
      state.updateOrAddLoading = false;
      state.error = payload ?? null;
    });

    // checkout
    builder.addCase(handleCheckout.pending, (state, {}) => {
      state.checkoutLoading = true;
      state.error = null;
    });
    builder.addCase(handleCheckout.fulfilled, (state, { payload }) => {
      state.checkoutLoading = false;
      state.orders = [...state.orders, payload?.order];
      state.cart = [];
      state.error = null;
    });
    builder.addCase(handleCheckout.rejected, (state, { payload }) => {
      state.checkoutLoading = false;
      state.error = payload ?? null;
    });

    // get tax & shipping price
    builder.addCase(handleGetTaxAndShipping.pending, (state, {}) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(handleGetTaxAndShipping.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.taxPricing = payload?.pricing?.tax;
      state.shippingPricing = payload?.pricing?.shipping;
      state.error = null;
    });
    builder.addCase(handleGetTaxAndShipping.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload ?? null;
    });

    // get orders
    builder.addCase(handleGetOrders.pending, (state, {}) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(handleGetOrders.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.orders = payload?.orders;
      state.error = null;
    });
    builder.addCase(handleGetOrders.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload ?? null;
      state.orders = [];
    });

    // get downloads
    builder.addCase(handleGetDownloads.pending, (state, {}) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(handleGetDownloads.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.downloads = payload?.magazines;
      state.error = null;
    });
    builder.addCase(handleGetDownloads.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload ?? null;
      state.downloads = [];
    });
  },
});

export const {
  handleCalculateTotal,
  handleAddProductToCart,
  handleCalculateSubTotal,
  handleRemoveProductFromCart,
  handleUpdateProductToCart,
  handleChangeShipping,
  handleFindSingleOrder,
  handleChangeTax,
  handleChangeDiscount,
} = CartSlice.actions;

export default CartSlice.reducer;
