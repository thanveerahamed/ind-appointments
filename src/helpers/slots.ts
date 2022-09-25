import { SlotWithId } from "../types";

export const sortSlotsAscending = (slot1: SlotWithId, slot2: SlotWithId) => {
  if (new Date(slot1.date) > new Date(slot2.date)) {
    return 1;
  } else if (new Date(slot1.date) < new Date(slot2.date)) {
    return -1;
  }
  return 0;
};
