import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./dataSlice";
import cartSlice from "./cartData";
import arrangementSlice from "./arrangementSlice";

const dataStore = configureStore({
  reducer: {
    cart: cartSlice,
    datas: dataSlice,
    arrangement: arrangementSlice,
  },
});

export default dataStore;
