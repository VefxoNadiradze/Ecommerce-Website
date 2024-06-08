import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: string = "grid";

const arrangementSlice = createSlice({
  name: "ProductArrangement",
  initialState,
  reducers: {
    HandleArrangement: (_state, action: PayloadAction<string>) => {
      if (action.payload === "grid") {
        return "grid";
      } else {
        return "list";
      }
    },
  },
});

export const { HandleArrangement } = arrangementSlice.actions;
export default arrangementSlice.reducer;
