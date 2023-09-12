import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore, FLUSH, REHYDRATE } from "redux-persist";
import globalStates from "./globalStates";
import ShopSlice from "./ShopSlice";

const rootPersistConfig = {
  key: "root",
  storage,
  blacklist: ["globalStates", "shop"],
};

const rootReducer = combineReducers({
  globalStates: globalStates,
  shop: ShopSlice,
});

const persisteRoot = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: { root: persisteRoot },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);
