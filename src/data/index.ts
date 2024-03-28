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
} from '../types';
import { dayjs } from '../types/dayjs';
import { Dayjs } from 'dayjs';
import { makeBookAppointmentRequest } from '../helpers/request';
import { sortSlotsAscending } from '../helpers/slots';
import axios, { AxiosResponse } from 'axios';

const url: string = 'https://ind-appointments.ey.r.appspot.com/ind-api/rest';

enum PostAction {
  GET_DESKS = 'getDesks',
  GET_SLOTS = 'getSlots',
  BLOCK_SLOT = 'blockSlot',
  RESERVE_SLOT = 'reserveSlot',
}

const getServerUrl = () => {
  return url;
};

const handleError = async (errorResponse: AxiosResponse) => {
  if (errorResponse.data !== undefined) {
    throw new Error(errorResponse.data);
  } else {
    throw new Error(ErrorList.GENERAL);
  }
};

const fetchAxios = async <T>({
  data,
  action,
}: {
  data: unknown;
  action: PostAction;
}) => {
  return await axios
    .post(getServerUrl(), {
      action,
      data,
    })
    .then(async (response) => {
      if (response.status !== 200) {
        await handleError(response);
      }

      return response.data as T;
    });
};

export const getAvailableDesks = async ({
  appointmentType,
}: {
  appointmentType: string;
}): Promise<Desk[]> => {
  return await fetchAxios<Desk[]>({
    action: PostAction.GET_DESKS,
    data: {
      productType: appointmentType,
    },
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
  return await fetchAxios<Slot[]>({
    action: PostAction.GET_SLOTS,
    data: {
      desk: location,
      productType: appointmentType,
      persons: people,
    },
  });
};

export const getAvailableSlotsWithDesk = async (
  filters: Filters,
): Promise<AvailableSlotsWithLocation[]> => {
  const promises = filters.locations.map(
    async (location): Promise<AvailableSlotsWithLocation> => {
      const result = await getAvailableSlots({
        location: location.key,
        appointmentType: filters.appointmentType,
        people: filters.people,
      });
      return {
        deskKey: location.key,
        deskName: location.name,
        slots: result.filter((slot): boolean =>
          dayjs(slot.date, 'YYYY-MM-DD').isBetween(
            (filters.startDate as Dayjs).format('YYYY-MM-DD'),
            (filters.endDate as Dayjs).format('YYYY-MM-DD'),
          ),
        ),
      };
    },
  );

  return Promise.all(promises);
};

export const blockSelectedSlot = async ({
  slotWithId,
  appointmentType,
}: {
  slotWithId: SlotWithId;
  appointmentType: string;
}): Promise<Slot> => {
  return await fetchAxios<Slot>({
    action: PostAction.BLOCK_SLOT,
    data: {
      desk: slotWithId.deskKey,
      productType: appointmentType,
      payload: slotWithId as Slot,
    },
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
  await blockSelectedSlot({
    slotWithId,
    appointmentType,
  });

  const payload = makeBookAppointmentRequest(
    slotWithId,
    persons,
    contactInformation,
    appointmentType,
  );
  return await fetchAxios<BookAppointmentResponse>({
    action: PostAction.RESERVE_SLOT,
    data: {
      desk: slotWithId.deskKey,
      productType: appointmentType,
      payload,
    },
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
  filters: Filters,
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
    },
  );

  const availableSlotsWithDesks = await Promise.all(promises);

  const sortedSlots = availableSlotsWithDesks
    .reduce(
      (
        accumulatorSlotWithId: SlotWithId[],
        slotWithLocation: AvailableSlotsWithLocation,
      ) => {
        return [
          ...accumulatorSlotWithId,
          ...mapWithSlotId(
            slotWithLocation.slots,
            slotWithLocation.deskKey,
            slotWithLocation.deskName,
          ),
        ];
      },
      [],
    )
    .sort(sortSlotsAscending);

  const closestSlot = sortedSlots.length > 0 ? sortedSlots[0] : undefined;

  const slotsMatchingDateTimeFilter = sortedSlots.filter((slot): boolean =>
    dayjs(slot.date, 'YYYY-MM-DD').isBetween(
      (filters.startDate as Dayjs).format('YYYY-MM-DD'),
      (filters.endDate as Dayjs).format('YYYY-MM-DD'),
    ),
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
