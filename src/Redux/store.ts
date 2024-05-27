import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./dataSlice";

const dataStore = configureStore({
  reducer: {
    datas: dataSlice,
  },
});

export default dataStore;
