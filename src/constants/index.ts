import { ValueLabelPair } from '../types';

export enum ALERT_SEVERITY {
  INFO = 'info',
  ERROR = 'error',
  WARNING = 'warning',
}

export const APPOINTMENT_TYPES: ValueLabelPair[] = [
  {
    value: 'BIO',
    label: 'Biometric',
  },
  {
    value: 'DOC',
    label: 'Document collection',
  },
  {
    value: 'VAA',
    label: 'Endorsement sticker',
  },
  {
    value: 'TKV',
    label: 'Return visa',
  },
];

// eslint-disable-next-line no-useless-escape
export const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
export const PHONE_NUMBER_REGEX = /^[0-9]{10}$/g;
