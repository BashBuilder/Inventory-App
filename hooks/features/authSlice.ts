"use client";

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  profile: {
    title: string;
    image: string;
  };
}

const initialState: CounterState = {
  profile: {
    title: "",
    image: "",
  },
};

export const authSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    updateProfile: (
      state,
      action: PayloadAction<{ title: string; image: string }>,
    ) => {
      const payload = action.payload;
      return { ...state, profile: { ...payload } };
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateProfile } = authSlice.actions;

export default authSlice.reducer;
