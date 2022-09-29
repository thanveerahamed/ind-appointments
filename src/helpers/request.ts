import {
  BookAppointmentRequest,
  ContactDetails,
  Person,
  Slot,
  SlotWithId,
} from '../types';

export const makeRequestSlot = (slot: SlotWithId): Slot => {
  const { id, deskName, deskKey, ...rest } = slot;
  return rest;
};

export const makeBookAppointmentRequest = (
  slot: SlotWithId,
  persons: Person[],
  contact: ContactDetails,
  appointmentType: string,
): BookAppointmentRequest => {
  return {
    appointment: {
      ...makeRequestSlot(slot),
      phone: contact.phone,
      email: contact.email,
      productKey: appointmentType,
      language: 'en',
      customers: persons,
    },
    bookableSlot: {
      ...makeRequestSlot(slot),
      booked: false,
    },
  };
};
