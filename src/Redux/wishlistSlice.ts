import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import productData from "../data.json";

let initialState: Product[] = [];

const WishlistState = createSlice({
  name: "data",
  initialState,
  reducers: {
    addWishlistitems: (state, action) => {
      // find clicked shopping item and add in the wishlist
      let wishlistItem = productData.products.filter((item) => {
        return item.id === action.payload;
      });

      if (wishlistItem) {
        state.push(...wishlistItem);
      }

      // find clicked discount item and add in the wishlist
      let DiscountwishlistItem = productData.discount.filter((item) => {
        return item.id === action.payload;
      });

      if (DiscountwishlistItem) {
        state.push(...DiscountwishlistItem);
      }
    },
    removeItemsFromWishlist: (state, action: PayloadAction<string>) => {
      const findIndex = state.findIndex((item) => item.id === action.payload);
      state.splice(findIndex, 1);
    },
    clearWishlist: (state) => {
      state.length = 0;
    },
  },
});

export const { addWishlistitems, removeItemsFromWishlist, clearWishlist } =
  WishlistState.actions;

export default WishlistState.reducer;
