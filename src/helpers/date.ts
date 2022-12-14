import moment from 'moment';

export const formatDate = (
  date: string,
  format: string = 'dddd, MMMM Do YYYY',
) => moment(date).format(format);

export const formatTimeLineDate = (
  date: Date,
  format: string = 'dddd, MMMM Do YYYY hh:mm',
) => moment(date).format(format);
