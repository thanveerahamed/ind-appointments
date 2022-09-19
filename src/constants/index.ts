import {ValueLabelPair} from "../types";

export enum ALERT_SEVERITY{
    INFO = 'info',
    ERROR= 'error',
    WARNING = 'warning'
}

export const APPOINTMENT_TYPES: ValueLabelPair[] = [
    {
        value: "BIO",
        label: "Biometric"
    },
    {
        value: "DOC",
        label: "Document collection"
    }
]