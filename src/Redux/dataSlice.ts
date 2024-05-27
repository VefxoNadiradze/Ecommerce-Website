import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import productData from "../data.json";

const initialState: Product[] = productData.products;

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    filterByCategory: (state, action: PayloadAction<string>) => {
      // if input value is less then zero render full
      if (action.payload.length - 1 < 1) {
        return initialState;
      }

      console.log(state);

      // filter product by it name & category
      return initialState.filter((item) => {
        if (
          item.category.toLowerCase().includes(action.payload) ||
          item.name.toLowerCase().includes(action.payload)
        ) {
          return true;
        }
        return false;
      });
    },
  },
});

export const { filterByCategory } = dataSlice.actions;
export default dataSlice.reducer;
