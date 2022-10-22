import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { dayjs, Dayjs } from '../../types/dayjs';
import { Desk, Filters } from '../../types';

const initialFilters: Filters = {
  appointmentType: 'BIO',
  people: '1',
  locations: [],
  startDate: dayjs(),
  endDate: dayjs().add(3, 'month'),
};

const initialState: {
  criteria: Filters;
  loading: boolean;
} = {
  criteria: initialFilters,
  loading: false,
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    changeAppointmentType: (state, action: PayloadAction<string>) => {
      state.criteria.appointmentType = action.payload;
    },
    changeNumberOfPeople: (state, action: PayloadAction<string>) => {
      state.criteria.people = action.payload;
    },
    changeLocations: (state, action: PayloadAction<Desk[]>) => {
      if (action.payload.length > 5) {
        return;
      }

      state.criteria.locations = action.payload;
    },
    changeDates: (
      state,
      action: PayloadAction<{
        key: 'startDate' | 'endDate';
        value: Dayjs | null;
      }>,
    ) => {
      state.criteria[action.payload.key] = action.payload.value;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    resetFilters: (state) => {
      state.criteria = initialFilters;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  changeLocations,
  changeNumberOfPeople,
  changeDates,
  changeAppointmentType,
  setLoading,
  resetFilters,
} = filtersSlice.actions;
