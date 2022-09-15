import axios from "axios";
import {Slot} from "../types";

const HOST_NAME = "https://oap.ind.nl";

export const getAvailableSlots = async ({
  location,
  appointmentType,
  people,
}: {
  location: string;
  appointmentType: string;
  people: string;
}): Promise<Slot[]> => {
  const url = `${HOST_NAME}/oap/api/desks/${location}/slots/?productKey=${appointmentType}&persons=${people}`;
  return await axios
    .get(url)
    .then((response) => JSON.parse(response.data.replace(")]}',", "")).data);
};
