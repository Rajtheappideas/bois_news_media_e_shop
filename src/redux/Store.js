import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore, FLUSH, REHYDRATE } from "redux-persist";
import globalStates from "./globalStates";
import ShopSlice from "./ShopSlice";
import AuthSlice from "./AuthSlice";
import CartSlice from "./CartSlice";

const rootPersistConfig = {
  key: "root",
  storage,
  blacklist: ["globalStates", "shop", "auth", "cart"],
};

const authPersistConfig = {
  key: "auth",
  storage,
  blacklist: ["loading"],
};

const rootReducer = combineReducers({
  globalStates: globalStates,
  shop: ShopSlice,
  auth: persistReducer(authPersistConfig, AuthSlice),
  cart: CartSlice,
});

const persisteRoot = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: { root: persisteRoot },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);
