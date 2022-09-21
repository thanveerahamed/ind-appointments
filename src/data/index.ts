import {AvailableSlotsWithLocation, Desk, Filters, Slot} from "../types";
import { dayjs } from "../types/dayjs";
import { Dayjs } from "dayjs";

const url = "https://ind-api.000webhostapp.com/ind-service/index.php";

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
    return (await response.json()).data;
  });
};

export const  getAvailableSlotsWithDesk = async (
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
