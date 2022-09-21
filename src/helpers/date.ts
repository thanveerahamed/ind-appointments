import moment from "moment";

export const formatDate = (
  date: string,
  format: string = "dddd, MMMM Do YYYY"
) => moment(date).format(format);
