import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {Desk} from "../../types";

const initialState: {
  availableDesks: Desk[]
} = {
  availableDesks: []
};

export const desksSlice = createSlice({
  name: "desks",
  initialState,
  reducers: {
    updateDesks: (state, action: PayloadAction<Desk[]>) => {
      state.availableDesks = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateDesks } = desksSlice.actions;
