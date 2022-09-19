import {Desk, Slot} from "../types";

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
