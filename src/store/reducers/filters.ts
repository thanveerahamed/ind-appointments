import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { dayjs, Dayjs } from '../../types/dayjs';
import { Desk, Filters } from '../../types';

const initialState: Filters = {
  appointmentType: 'BIO',
  people: '1',
  locations: [],
  startDate: dayjs(),
  endDate: dayjs().add(3, 'month'),
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    changeAppointmentType: (state, action: PayloadAction<string>) => {
      state.appointmentType = action.payload;
    },
    changeNumberOfPeople: (state, action: PayloadAction<string>) => {
      state.people = action.payload;
    },
    changeLocations: (state, action: PayloadAction<Desk[]>) => {
      if (action.payload.length > 5) {
        return;
      }

      state.locations = action.payload;
    },
    changeDates: (
      state,
      action: PayloadAction<{
        key: 'startDate' | 'endDate';
        value: Dayjs | null;
      }>,
    ) => {
      state[action.payload.key] = action.payload.value;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  changeLocations,
  changeNumberOfPeople,
  changeDates,
  changeAppointmentType,
} = filtersSlice.actions;
