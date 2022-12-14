import { EMAIL_REGEX, PHONE_NUMBER_REGEX } from '../constants';
import { ContactDetails, Filters, Person } from '../types';
import store from '../store/store';

const isEmailValid = (email: string) => email.match(EMAIL_REGEX);
const isPhoneNumberValid = (phone: string) => phone.match(PHONE_NUMBER_REGEX);

const isFormValid = (contactInformation: ContactDetails, persons: Person[]) => {
  if (
    !isPhoneNumberValid(contactInformation.phone) ||
    !isEmailValid(contactInformation.email)
  ) {
    return false;
  }

  for (const person of persons) {
    if (
      person.lastName === '' ||
      person.firstName === '' ||
      person.vNumber === ''
    ) {
      return false;
    }
  }

  return true;
};

const hasBookingInformation = (): boolean => {
  const {
    bookingInformation: { contactInformation, peopleInformation },
  } = store.getState();
  return isFormValid(contactInformation, peopleInformation);
};

const isFiltersValid = (filters?: Filters): boolean => {
  let currentFilters = filters;

  if (currentFilters === undefined) {
    currentFilters = store.getState().filters.criteria;
  }

  return !(
    currentFilters.locations.length <= 0 ||
    currentFilters.startDate === null ||
    currentFilters.endDate === null
  );
};

export {
  isEmailValid,
  isPhoneNumberValid,
  isFormValid,
  hasBookingInformation,
  isFiltersValid,
};
