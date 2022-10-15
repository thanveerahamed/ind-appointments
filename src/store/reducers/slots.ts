import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  AvailableSlotsWithLocation,
  BookAppointmentResponse,
  SlotWithId,
} from '../../types';

const initialState: {
  selectedSlot?: SlotWithId;
  availableSlots: AvailableSlotsWithLocation[];
  bookedSlotResponse?: BookAppointmentResponse;
  loading: boolean;
} = {
  selectedSlot: undefined,
  availableSlots: [],
  bookedSlotResponse: undefined,
  loading: false,
};

export const slotsSlice = createSlice({
  name: 'slots',
  initialState,
  reducers: {
    slotSelected: (state, action: PayloadAction<SlotWithId | undefined>) => {
      state.selectedSlot = action.payload;
    },
    updateAvailableSlotsWithLocation: (
      state,
      action: PayloadAction<AvailableSlotsWithLocation[]>,
    ) => {
      state.availableSlots = action.payload;
    },
    updateAvailableSlotsWithLocationToEmpty: (state) => {
      state.availableSlots = [];
    },
    updateBookedSlotResponse: (
      state,
      action: PayloadAction<BookAppointmentResponse>,
    ) => {
      state.bookedSlotResponse = action.payload;
    },
    resetSlots: (state) => {
      state.selectedSlot = undefined;
      state.availableSlots = [];
      state.bookedSlotResponse = undefined;
    },
    resetSelectedSlot: (state) => {
      state.selectedSlot = undefined;
      state.bookedSlotResponse = undefined;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  slotSelected,
  updateAvailableSlotsWithLocation,
  updateAvailableSlotsWithLocationToEmpty,
  updateBookedSlotResponse,
  resetSlots,
  setLoading,
  resetSelectedSlot,
} = slotsSlice.actions;
