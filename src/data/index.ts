import {
  AvailableSlotsWithLocation,
  BookAppointmentResponse,
  ContactDetails,
  Desk,
  ErrorList,
  Filters,
  Person,
  Slot,
  SlotWithId,
} from "../types";
import { dayjs } from "../types/dayjs";
import { Dayjs } from "dayjs";
import { makeBookAppointmentRequest } from "../helpers/request";
import { sortSlotsAscending } from "../helpers/slots";

const url = "https://ind-api.000webhostapp.com/ind-service/index.php";

const handleError = async (response: Response) => {
  const errorResponse = await response.json();
  if (errorResponse.data !== undefined) {
    throw Error(errorResponse.data);
  } else {
    throw Error(ErrorList.GENERAL);
  }
};

export const getAvailableDesks = async ({
  appointmentType,
}: {
  appointmentType: string;
}): Promise<Desk[]> => {
  return await fetch(url, {
    method: "post",
    body: JSON.stringify({
      action: "getDesks",
      data: {
        productType: appointmentType,
      },
    }),
  }).then(async (response) => {
    if (response.status !== 200) {
      await handleError(response);
    }

    return (await response.json()).data;
  });
};

export const getAvailableSlots = async ({
  location,
  appointmentType,
  people,
}: {
  location: string;
  appointmentType: string;
  people: string;
}): Promise<Slot[]> => {
  return await fetch(url, {
    method: "post",
    body: JSON.stringify({
      action: "getSlots",
      data: {
        desk: location,
        productType: appointmentType,
        persons: people,
      },
    }),
  }).then(async (response) => {
    if (response.status !== 200) {
      await handleError(response);
    }

    return (await response.json()).data;
  });
};

export const getAvailableSlotsWithDesk = async (
  filters: Filters
): Promise<AvailableSlotsWithLocation[]> => {
  const promises = filters.locations.map(
    async (location): Promise<AvailableSlotsWithLocation> => {
      return {
        deskKey: location.key,
        deskName: location.name,
        slots: (
          await getAvailableSlots({
            location: location.key,
            appointmentType: filters.appointmentType,
            people: filters.people,
          })
        ).filter((slot): boolean =>
          dayjs(slot.date, "YYYY-MM-DD").isBetween(
            (filters.startDate as Dayjs).format("YYYY-MM-DD"),
            (filters.endDate as Dayjs).format("YYYY-MM-DD")
          )
        ),
      };
    }
  );

  return Promise.all(promises);
};

export const blockSelectedSlot = async ({
  slotWithId,
}: {
  slotWithId: SlotWithId;
}): Promise<Slot[]> => {
  return await fetch(url, {
    method: "post",
    body: JSON.stringify({
      action: "blockSlot",
      data: {
        desk: slotWithId.deskKey,
        payload: slotWithId as Slot,
      },
    }),
  }).then(async (response) => {
    if (response.status !== 200) {
      await handleError(response);
    }

    return (await response.json()).data;
  });
};

export const bookAppointment = async ({
  slotWithId,
  contactInformation,
  persons,
  appointmentType,
}: {
  slotWithId: SlotWithId;
  contactInformation: ContactDetails;
  persons: Person[];
  appointmentType: string;
}): Promise<BookAppointmentResponse> => {
  const payload = makeBookAppointmentRequest(
    slotWithId,
    persons,
    contactInformation,
    appointmentType
  );
  return fetch(url, {
    method: "post",
    body: JSON.stringify({
      action: "reserveSlot",
      data: {
        desk: slotWithId.deskKey,
        payload,
      },
    }),
  }).then(async (response) => {
    if (response.status !== 200) {
      await handleError(response);
    }

    return (await response.json()).data;
  });
};

const mapWithSlotId = (slots: Slot[], deskKey: string, deskName: string) => {
  let response: SlotWithId[] = [];
  for (const slot of slots) {
    response.push({
      ...slot,
      deskName,
      deskKey,
      id: deskKey,
    });
  }

  return response;
};

export const getAvailableSlotsForTimerView = async (
  filters: Filters
): Promise<{ matchingSlot?: SlotWithId; closestSlot?: SlotWithId }> => {
  const promises = filters.locations.map(
    async (location): Promise<AvailableSlotsWithLocation> => {
      return {
        deskKey: location.key,
        deskName: location.name,
        slots: await getAvailableSlots({
          location: location.key,
          appointmentType: filters.appointmentType,
          people: filters.people,
        }),
      };
    }
  );

  const availableSlotsWithDesks = await Promise.all(promises);

  const sortedSlots = availableSlotsWithDesks
    .reduce(
      (
        accumulatorSlotWithId: SlotWithId[],
        slotWithLocation: AvailableSlotsWithLocation
      ) => {
        return [
          ...accumulatorSlotWithId,
          ...mapWithSlotId(
            slotWithLocation.slots,
            slotWithLocation.deskKey,
            slotWithLocation.deskName
          ),
        ];
      },
      []
    )
    .sort(sortSlotsAscending);

  const closestSlot = sortedSlots.length > 0 ? sortedSlots[0] : undefined;

  const slotsMatchingDateTimeFilter = sortedSlots.filter((slot): boolean =>
    dayjs(slot.date, "YYYY-MM-DD").isBetween(
      (filters.startDate as Dayjs).format("YYYY-MM-DD"),
      (filters.endDate as Dayjs).format("YYYY-MM-DD")
    )
  );

  const matchingSlot =
    slotsMatchingDateTimeFilter.length > 0
      ? slotsMatchingDateTimeFilter[0]
      : undefined;

  return {
    closestSlot,
    matchingSlot,
  };
};
