import FilterSection from "./FilterSection/FilterSection";
import { AvailableSlotsWithLocation, Filter, Slot } from "../../types";
import { getAvailableSlots } from "../../data";
import { useState } from "react";
import SlotsDisplay from "./SlotsDisplay/SlotsDisplay";

const Home = () => {
  const [availableSlots, setAvailableSlots] = useState<
    AvailableSlotsWithLocation[]
  >([]);

  const handleOnSearch = async (filter: Filter) => {
    const promises = filter.locations.map(
      async (location): Promise<AvailableSlotsWithLocation> => {
        return {
          location,
          slots: await getAvailableSlots({
            location,
            appointmentType: filter.appointmentType,
            people: filter.people,
          }),
        };
      }
    );

    setAvailableSlots(await Promise.all(promises));
  };

  const handleFilterResetClick = () => {
    setAvailableSlots([]);
  };

  return (
    <>
      <FilterSection
        onSearch={handleOnSearch}
        onReset={handleFilterResetClick}
      ></FilterSection>
      <SlotsDisplay availableSlots={availableSlots}></SlotsDisplay>
    </>
  );
};

export default Home;
