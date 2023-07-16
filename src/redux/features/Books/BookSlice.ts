/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { createSlice } from "@reduxjs/toolkit";

const bookSlice = createSlice({
  name: "book",
  initialState: [],
  reducers: {
    setBook: (state, action) => {
      return action.payload;
    },
  },
});

export const { setBook } = bookSlice.actions;
export default bookSlice.reducer;
