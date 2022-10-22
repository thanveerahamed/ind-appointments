import { Filters, ValueLabelPair } from '../types';
import { Dayjs } from '../types/dayjs';
import { formatTimeLineDate } from './date';
import { APPOINTMENT_TYPES } from '../constants';

const pluralMap = {
  person: {
    singular: 'person',
    plural: 'persons',
  },
};

const makePluralText = (key: keyof typeof pluralMap, value: number) => {
  return value > 1 ? pluralMap[key].plural : pluralMap[key].singular;
};

export const makeFilterQueryText = (filters: Filters) => {
  return `Showing results for ${
    (
      APPOINTMENT_TYPES.find(
        (type) => type.value === filters.appointmentType,
      ) as ValueLabelPair
    ).label
  } appointment, for ${filters.people} ${makePluralText(
    'person',
    Number(filters.people),
  )} at ${filters.locations
    .map((location) => location.name)
    .join(',')} between ${formatTimeLineDate(
    (filters.startDate as Dayjs).toDate(),
    'MMMM Do YYYY',
  )} and ${formatTimeLineDate(
    (filters.endDate as Dayjs).toDate(),
    'MMMM Do YYYY',
  )}`;
};
