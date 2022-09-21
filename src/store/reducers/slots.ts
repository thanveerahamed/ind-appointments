import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AvailableSlotsWithLocation, SlotWithId } from "../../types";

const initialState: {
  selectedSlot?: SlotWithId;
  availableSlots: AvailableSlotsWithLocation[];
} = {
  selectedSlot: undefined,
  availableSlots: [],
};

export const slotsSlice = createSlice({
  name: "slots",
  initialState,
  reducers: {
    slotSelected: (state, action: PayloadAction<SlotWithId | undefined>) => {
      state.selectedSlot = action.payload;
    },
    updateAvailableSlotsWithLocation: (
      state,
      action: PayloadAction<AvailableSlotsWithLocation[]>
    ) => {
      state.availableSlots = action.payload;
    },
    updateAvailableSlotsWithLocationToEmpty: (state) => {
      state.availableSlots = []
    }
  },
});

// Action creators are generated for each case reducer function
export const { slotSelected, updateAvailableSlotsWithLocation, updateAvailableSlotsWithLocationToEmpty } = slotsSlice.actions;
