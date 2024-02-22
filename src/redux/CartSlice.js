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

export const handleApplyPromoCode = createAsyncThunk(
  "cart/handleApplyPromoCode",
  async ({ code, token, signal }, { rejectWithValue }) => {
    try {
      signal.current = new AbortController();
      const response = await PostUrl(`promo`, {
        data: { code },
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

export const handleCreatePaymentIntent = createAsyncThunk(
  "cart/handleCreatePaymentIntent",
  async (
    {
      shippingAddress,
      billingAddress,
      phone,
      email,
      VAT,
      purchaseOrder,
      orderNotes,
      code,
      token,
      signal,
    },
    { rejectWithValue }
  ) => {
    try {
      signal.current = new AbortController();
      const response = await PostUrl(`create-payment-intent`, {
        data: {
          shippingAddress,
          billingAddress,
          phone,
          email,
          VAT,
          purchaseOrder,
          orderNotes,
          code,
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

export const handleCreateOrder = createAsyncThunk(
  "cart/handleCreateOrder",
  async ({ paymentIntentId, token, signal }, { rejectWithValue }) => {
    try {
      signal.current = new AbortController();
      const response = await PostUrl(`create-order`, {
        data: {
          paymentIntentId,
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
  promoCode: null,
  isPromoCodeApplied: false,
  promoCodeLoading: false,
  promoCodeDiscount: 0,
};

function CheckConutryAndState(addresses, product, lowerCaseStatesAndCountries) {
  if (product?.itemType === "Subscription") {
    if (product?.support === "paper") {
      if (
        lowerCaseStatesAndCountries.includes(
          addresses?.shippingAddress?.province.toLowerCase()
        ) ||
        lowerCaseStatesAndCountries.includes(
          addresses?.shippingAddress?.country.toLowerCase()
        )
      ) {
        return product?.itemId?.pricePaperEEC;
      } else if (
        addresses?.shippingAddress?.country.toLowerCase() === "france"
      ) {
        return product?.itemId?.pricePaperFrance;
      } else {
        return product?.itemId?.pricePaperRestOfWorld;
      }
    } else {
      return product?.itemId?.priceDigital;
    }
  } else {
    if (product?.support === "paper") return product?.itemId?.pricePaper;
    return product?.itemId?.priceDigital;
  }
}

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    handleCalculateTotal: (state, { payload }) => {
      const lowerCaseStatesAndCountries =
        state.eec_switzerland_overseas_territories.map((country) =>
          country.toLocaleLowerCase()
        );
      const subtotal = state.cart.reduce((acc, cur) => {
        if (cur?.itemType === "Subscription") {
          if (cur?.support === "paper") {
            if (
              lowerCaseStatesAndCountries.includes(
                payload?.shippingAddress?.province.toLowerCase()
              ) ||
              lowerCaseStatesAndCountries.includes(
                payload?.shippingAddress?.country.toLowerCase()
              )
            ) {
              return acc + parseFloat(cur?.itemId?.pricePaperEEC);
            } else if (
              payload?.shippingAddress?.country.toLowerCase() === "france"
            ) {
              return acc + parseFloat(cur?.itemId?.pricePaperFrance);
            } else {
              return acc + parseFloat(cur?.itemId?.pricePaperRestOfWorld);
            }
          } else {
            return acc + parseFloat(cur?.itemId?.priceDigital);
          }
        } else {
          if (cur?.support === "paper") {
            return (
              acc +
              parseFloat(cur?.itemId?.priceDigital) * parseInt(cur?.quantity)
            );
          }
          return acc + parseFloat(cur?.itemId?.priceDigital);
        }
      }, 0);
      
      if (subtotal !== NaN && typeof subtotal === "number") {
        if (state.promoCode !== null && state.isPromoCodeApplied) {
          let total = 0;

          if (state.promoCode?.subscription) {
            const findArr = state.cart.find(
              (item) => item?.itemId?._id === state.promoCode?.subscription?._id
            );
            if (findArr.hasOwnProperty("itemId")) {
              total =
                parseFloat(subtotal) -
                parseInt(state.discount) -
                parseFloat(
                  (parseInt(state.promoCode?.discountPercentage) *
                    parseFloat(
                      CheckConutryAndState(
                        payload,
                        findArr,
                        lowerCaseStatesAndCountries
                      )
                    )) /
                    100
                ).toFixed(2);
            }
          } else {
            total =
              parseFloat(subtotal) -
              parseInt(state.discount) -
              parseFloat(
                (parseInt(state.promoCode?.discountPercentage) *
                  parseFloat(subtotal)) /
                  100
              ).toFixed(2);
          }
          if (total <= 0) {
            state.total = parseFloat(state.shipping);
          } else {
            state.total = total;
          }
        } else {
          state.total = parseFloat(subtotal) - parseFloat(state.discount);
        }
      }
    },

    handleCalculateSubTotal: (state, { payload }) => {
      const lowerCaseStatesAndCountries =
        state.eec_switzerland_overseas_territories.map((country) =>
          country.toLocaleLowerCase()
        );
      const subTotal = state.cart.reduce((acc, cur) => {
        if (cur?.itemType === "Subscription") {
          if (cur?.support === "paper") {
            if (
              lowerCaseStatesAndCountries.includes(
                payload?.shippingAddress?.province.toLowerCase()
              ) ||
              lowerCaseStatesAndCountries.includes(
                payload?.shippingAddress?.country.toLowerCase()
              )
            ) {
              return acc + parseFloat(cur?.itemId?.pricePaperEEC);
            } else if (
              payload?.shippingAddress?.country.toLowerCase() === "france"
            ) {
              return acc + parseFloat(cur?.itemId?.pricePaperFrance);
            } else {
              return acc + parseFloat(cur?.itemId?.pricePaperRestOfWorld);
            }
          } else {
            return acc + parseFloat(cur?.itemId?.priceDigital);
          }
        } else {
          if (cur?.support === "paper") {
            return (
              acc +
              parseFloat(cur?.itemId?.priceDigital) * parseInt(cur?.quantity)
            );
          }
          return acc + parseFloat(cur?.itemId?.priceDigital);
        }
        if (cur?.support === "paper") {
          return (
            acc + parseFloat(cur?.itemId?.pricePaper) * parseInt(cur?.quantity)
          );
        } else {
          return (
            acc +
            parseFloat(cur?.itemId?.priceDigital) * parseInt(cur?.quantity)
          );
        }
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

    handleChangeTax: (state, { payload }) => void (state.tax = payload),

    handleChangeShipping: (state, { payload }) => {
      state.shipping = payload;
    },

    handleChangeDiscount: (state, { payload }) => {
      state.discount = payload;
    },

    handleChangePromoCodeDiscount: (state, { payload }) => {
      state.promoCodeDiscount = payload;
    },

    handleChangePromoCodeRemove: (state, { payload }) => {
      state.promoCodeDiscount = 0;
      state.promoCode = null;
      state.isPromoCodeApplied = false;
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

    // create paymnet intent
    builder.addCase(handleCreatePaymentIntent.pending, (state, {}) => {
      state.checkoutLoading = true;
      state.error = null;
    });
    builder.addCase(
      handleCreatePaymentIntent.fulfilled,
      (state, { payload }) => {
        state.checkoutLoading = false;
        state.error = null;
      }
    );
    builder.addCase(
      handleCreatePaymentIntent.rejected,
      (state, { payload }) => {
        state.checkoutLoading = false;
        state.error = payload ?? null;
      }
    );

    // create order
    builder.addCase(handleCreateOrder.pending, (state, {}) => {
      state.checkoutLoading = true;
      state.error = null;
    });
    builder.addCase(handleCreateOrder.fulfilled, (state, { payload }) => {
      state.checkoutLoading = false;
      state.error = null;
      state.orders = [...state.orders, payload?.order];
      state.cart = [];
    });
    builder.addCase(handleCreateOrder.rejected, (state, { payload }) => {
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

    // handle apply promo code
    builder.addCase(handleApplyPromoCode.pending, (state, {}) => {
      state.promoCodeLoading = true;
      state.error = null;
    });
    builder.addCase(handleApplyPromoCode.fulfilled, (state, { payload }) => {
      state.promoCodeLoading = false;
      state.promoCode = payload?.promoCode;
      state.isPromoCodeApplied = true;
      state.error = null;
    });
    builder.addCase(handleApplyPromoCode.rejected, (state, { payload }) => {
      state.promoCodeLoading = false;
      state.error = payload ?? null;
      state.promoCode = null;
      state.isPromoCodeApplied = false;
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
  handleChangePromoCodeDiscount,
  handleChangePromoCodeRemove,
} = CartSlice.actions;

export default CartSlice.reducer;
