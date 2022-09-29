import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ContactDetails, Person } from '../../types';

const initialState: {
  contactInformation: ContactDetails;
  peopleInformation: Person[];
} = {
  contactInformation: {
    email: '',
    phone: '',
  },
  peopleInformation: [
    {
      bsn: '',
      firstName: '',
      lastName: '',
      vNumber: '',
    },
  ],
};

export const bookingInformationSlice = createSlice({
  name: 'bookingInformation',
  initialState,
  reducers: {
    updateContactInformation: (
      state,
      action: PayloadAction<ContactDetails>,
    ) => {
      state.contactInformation = action.payload;
    },
    updatePeopleInformation: (state, action: PayloadAction<Person[]>) => {
      state.peopleInformation = action.payload;
    },
    updatePersonInformation: (
      state,
      action: PayloadAction<{
        index: number;
        key: keyof Person;
        value: string;
      }>,
    ) => {
      state.peopleInformation[action.payload.index][action.payload.key] =
        action.payload.value;
    },
    updatePeopleInformationOnNumberOfPeopleChange: (
      state,
      action: PayloadAction<number>,
    ) => {
      const peopleCount = action.payload;
      const currentPersonCount = state.peopleInformation.length;
      const data = [...state.peopleInformation];
      if (peopleCount > currentPersonCount) {
        const incrementBy = peopleCount - currentPersonCount;
        for (let i = 1; i <= incrementBy; i++) {
          data.push({
            bsn: '',
            firstName: '',
            lastName: '',
            vNumber: '',
          });
        }
      } else {
        const decrementBy = currentPersonCount - peopleCount;
        data.splice(currentPersonCount - decrementBy, decrementBy);
      }

      state.peopleInformation = data;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updateContactInformation,
  updatePeopleInformation,
  updatePersonInformation,
  updatePeopleInformationOnNumberOfPeopleChange,
} = bookingInformationSlice.actions;
