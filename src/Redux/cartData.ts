import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import productData from "../data.json";
let initialState: Product[] = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemsInCart: (state, action: PayloadAction<string>) => {
      let clickedItem = productData.products.filter(
        (item) => item.id === action.payload
      );

      state.push(...clickedItem);
    },
    removeItemsFromCart: (state, action: PayloadAction<string>) => {
      const findIndex = state.findIndex((item) => item.id === action.payload);

      state.splice(findIndex, 1);
    },
  },
});

export const { addItemsInCart, removeItemsFromCart } = cartSlice.actions;
export default cartSlice.reducer;
