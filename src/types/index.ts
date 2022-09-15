export interface Filter {
    appointmentType: string;
    locations: string[];
    people: string;
}

export interface ValueLabelPair {
    value: string;
    label: string
}

export interface Slot {
    key: string;
    date: string;
    startTime: string;
    endTime: string;
    parts: number;
}

export interface AvailableSlotsWithLocation {
    location: string;
    slots: Slot[];
}
