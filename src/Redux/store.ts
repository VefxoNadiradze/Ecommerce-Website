import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./dataSlice";
import cartSlice from "./cartData";
import arrangementSlice from "./arrangementSlice";
import WishlistState from "./wishlistSlice";

const dataStore = configureStore({
  reducer: {
    wishlist: WishlistState,
    cart: cartSlice,
    datas: dataSlice,
    arrangement: arrangementSlice,
  },
});

export default dataStore;
