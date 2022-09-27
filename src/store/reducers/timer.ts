import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BookAppointmentResponse, TimeLineItem } from "../../types";

// minutes
const minTimer = 25;
const maxTimer = 45;

const initialState: {
  activeStep: number;
  retryInterval: number;
  timeline: TimeLineItem[];
  bookedSlot?: BookAppointmentResponse;
} = {
  activeStep: 0,
  retryInterval: minTimer,
  timeline: [],
  bookedSlot: undefined,
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
      if (action.payload >= minTimer && action.payload <= maxTimer) {
        state.retryInterval = action.payload;
      }
    },
    insertTimeLineItem: (state, action: PayloadAction<TimeLineItem>) => {
      state.timeline.push(action.payload);
      if (state.timeline.length > 10) {
        state.timeline.splice(1, 1);
      }
    },
    stopTimerAndReset: (state) => {
      state.activeStep = 0;
      state.timeline = [];
      state.bookedSlot = undefined;
    },
    updateBookedSlot: (
      state,
      action: PayloadAction<BookAppointmentResponse>
    ) => {
      state.bookedSlot = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  incrementStep,
  decrementStep,
  updateInterval,
  insertTimeLineItem,
  stopTimerAndReset,
  updateBookedSlot,
} = timerSlice.actions;
