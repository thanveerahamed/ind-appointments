import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { filtersSlice } from './reducers/filters';
import { bookingInformationSlice } from './reducers/bookingInformation';
import { slotsSlice } from './reducers/slots';
import { desksSlice } from './reducers/desks';
import { alertsSlice } from './reducers/alerts';
import { timerSlice } from './reducers/timer';

const store = configureStore({
  reducer: {
    filters: filtersSlice.reducer,
    bookingInformation: bookingInformationSlice.reducer,
    slots: slotsSlice.reducer,
    desks: desksSlice.reducer,
    alerts: alertsSlice.reducer,
    timer: timerSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export type RootState = ReturnType<typeof store.getState>;
export const state = store.getState();

export default store;
