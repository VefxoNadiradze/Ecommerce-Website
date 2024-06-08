import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import productData from "../data.json";

const initialState: Product[] = productData.products;
const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    filterByInputCategory: (_state, action: PayloadAction<string>) => {
      // if input value is less then zero render full
      if (action.payload.length - 1 < 1) {
        return initialState;
      }

      // filter product by it name & category
      const filteredProducts = initialState.filter(
        (item) =>
          item.category.toLowerCase().includes(action.payload) ||
          item.name.toLowerCase().includes(action.payload)
      );

      return filteredProducts;
    },
    // filter products by category funtion
    FilterByCategoryBtn: (_state, action: PayloadAction<string>) => {
      // display all item
      if (action.payload === "All") {
        return initialState;
      }
      // filter product by category
      return initialState.filter(
        (item) => item.category.toLowerCase() === action.payload.toLowerCase()
      );
    },

    FilterByBrands: (_state, action: PayloadAction<string>) => {
      // display all item
      if (action.payload === "All") {
        return initialState;
      }
      // filter product by brand
      return initialState.filter((item) => {
        return (
          item.seller.toLocaleLowerCase() === action.payload.toLocaleLowerCase()
        );
      });
    },

    sortItems: (state, action: PayloadAction<string>) => {
      switch (action.payload) {
        case "High to Low":
          return [...state].sort((a, b) => b.price - a.price);

        case "Low to High":
          return [...state].sort((a, b) => a.price - b.price);

        case "A-Z":
          return [...state].sort((a, b) => a.name.localeCompare(b.name));

        case "Z-A":
          return [...state].sort((a, b) => b.name.localeCompare(a.name));
      }
    },

    // filter items by price
    filterItemsByprice: (_state, action) => {
      return initialState.filter((item) => {
        return (
          item.price >= action.payload.minPrice &&
          item.price <= action.payload.maxPrice
        );
      });
    },
  },
});

export const {
  filterByInputCategory,
  FilterByCategoryBtn,
  FilterByBrands,
  sortItems,
  filterItemsByprice,
} = dataSlice.actions;

export default dataSlice.reducer;
