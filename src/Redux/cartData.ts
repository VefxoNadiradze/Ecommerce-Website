import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import productData from "../data.json";
let initialState: Product[] = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemsInCart: (state, action) => {
      // finding the shoping item which is clicked
      let clickedItem = productData.products.find(
        (item) => item.id === action.payload
      );

      // finding the discount item which is clicked
      let discountItem = productData.discount.find(
        (item) => item.id === action.payload
      );

      if (clickedItem) {
        state.push({ ...clickedItem!, quantity: 1 });
      }

      // adding discountItems items in the cart
      if (discountItem) {
        state.push({ ...discountItem, quantity: 1 });
      }
    },
    // removing single item from cart
    removeItemsFromCart: (state, action: PayloadAction<string>) => {
      const findIndex = state.findIndex((item) => item.id === action.payload);
      state.splice(findIndex, 1);
    },

    incrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.find((item) => item.id === action.payload);
      if (item) {
        item.quantity! += 1;
      }
    },
    decrementQuantity: (state, action: PayloadAction<string>) => {
      const findIndex = state.findIndex((item) => item.id === action.payload);
      const item = state.find((item) => item.id === action.payload);
      if (item && item.quantity! > 1) {
        item.quantity! -= 1;
      } else {
        state.splice(findIndex, 1);
      }
    },
    // clear cart
    clearCart: (state) => {
      state.length = 0;
    },
  },
});

export const {
  addItemsInCart,
  removeItemsFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
