import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Desk } from "../../types";

const initialState: {
  activeStep: number;
  retryInterval: number;
} = {
  activeStep: 0,
  retryInterval: 5, // minutes
};

export const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    incrementStep: (state) => {
      state.activeStep++;
    },
    decrementStep: (state) => {
      state.activeStep--;
    },
    updateInterval: (state, action: PayloadAction<number>) => {
      if (action.payload >= 5 && action.payload <= 45) {
        state.retryInterval = action.payload;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { incrementStep, decrementStep, updateInterval } =
  timerSlice.actions;
