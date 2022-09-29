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

export interface ResponsePerson extends Person {
  vnumber: string;
  fullName: string;
}

export interface ContactDetails {
  email: string;
  phone: string;
}

export enum ErrorList {
  GENERAL = 'GENERAL',
  APT_TAKEN = 'APT_TAKEN',
  SIMILAR_APT_EXISTS = 'SIMILAR_APT_EXISTS',
}

export interface BookableSlot extends Slot {
  booked: boolean;
}

export interface Appointment extends Omit<Slot, 'key'> {
  productKey: string;
  phone: string;
  email: string;
  language: string;
  customers: Person[];
}

export interface BookAppointmentRequest {
  bookableSlot: BookableSlot;
  appointment: Appointment;
}

export interface BookAppointmentResponse extends Omit<Slot, 'parts'> {
  version: number;
  code: string;
  productKey: string;
  email: string;
  hasEmail: boolean;
  phone: string;
  language: string;
  status?: any;
  hasDetail: boolean;
  customers: ResponsePerson[];
  birthDate?: any;
  user?: any;
}

export enum TimeLineType {
  START_TIMER,
  NO_RECORDS,
  NO_RECORDS_WITH_CLOSEST,
  ERROR,
  SIMILAR_APT_EXISTS,
  MANY_FAILURES,
  UNKNOWN,
}

export interface TimeLineItem {
  type: TimeLineType;
  heading: string;
  description: string;
  timestamp: Date;
}

export enum SearchStatus {
  SEARCHING_IN_PROGRESS,
  WAIT,
  BOOKING,
  STOPPED,
  UNKNOW,
}
