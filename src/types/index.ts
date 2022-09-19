import { Dayjs } from './dayjs';

export interface Filters {
  appointmentType: string;
  locations: Desk[];
  people: string;
  startDate: Dayjs | null;
  endDate: Dayjs | null;
}

export interface ValueLabelPair {
  value: string;
  label: string;
}

export interface Slot {
  key: string;
  date: string;
  startTime: string;
  endTime: string;
  parts: number;
}

export interface AvailableSlotsWithLocation {
  deskKey: string;
  deskName: string;
  slots: Slot[];
}

export interface SlotWithId extends Slot {
  id: string;
  deskKey: string;
  deskName: string;
}

export interface Desk {
  key: string;
  version: number;
  name: string;
}

export interface Person {
  vNumber: string;
  bsn: string;
  firstName: string;
  lastName: string;
}

export interface ContactDetails {
  email: string;
  phone: string;
}
