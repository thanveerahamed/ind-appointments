import {ErrorList} from "../types";


const ERROR_MESSAGE_MAP = {
  [ErrorList.APT_TAKEN]:
    "This appointment is already taken. Select different appointment",
  [ErrorList.GENERAL]: "Some unknown error occurred, please try again later.",
};

export const getErrorMessage = (errorCode?: string): string => {
  if (errorCode === undefined || !(errorCode in ErrorList)) {
    return ERROR_MESSAGE_MAP[ErrorList.GENERAL];
  }

  return ERROR_MESSAGE_MAP[errorCode as ErrorList];
};
