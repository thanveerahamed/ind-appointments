import FilterSection from "../FilterSection/FilterSection";
import {
  AvailableSlotsWithLocation,
  Desk,
  Filters,
  Person,
} from "../../../types";
import { getAvailableDesks, getAvailableSlots } from "../../../data";
import * as React from "react";
import { useEffect, useState } from "react";
import SlotsDisplay from "../SlotsDisplay/SlotsDisplay";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import { dayjs } from "../../../types/dayjs";
import { Box, Grid } from "@mui/material";
import { ALERT_SEVERITY } from "../../../constants";
import { Dayjs } from "dayjs";
import BookingInformation from "../BookingInformation/BookingInformation";

const initialFilterState: Filters = {
  appointmentType: "BIO",
  people: "1",
  locations: [],
  startDate: dayjs(),
  endDate: dayjs().add(3, "month"),
};

const ManualQuery = () => {
  const [availableSlots, setAvailableSlots] = useState<
    AvailableSlotsWithLocation[]
  >([]);
  const [alertSeverity, setAlertSeverity] = useState<ALERT_SEVERITY>(
    ALERT_SEVERITY.ERROR
  );
  const [alertMessage, setAlertMessage] = useState<string | undefined>(
    undefined
  );
  const [selectedAppointmentIds, setSelectedAppointmentIds] = useState<
    string[]
  >([]);
  const [filters, setFilters] = useState<Filters>(initialFilterState);
  const [desks, setDesks] = useState<Desk[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showBookingInformationScreen, setShowBookingInformationScreen] =
    useState<boolean>(false);
  const [peopleInformation, setPeopleInformation] = useState<Person[]>([
    {
      bsn: "",
      firstName: "",
      lastName: "",
      vNumber: "",
    },
  ]);

  const handlePeopleChange = (newFilterValue: Filters) => {
    const countNew = parseInt(newFilterValue.people, 10);
    const countOld = parseInt(filters.people, 10);
    const data = [...peopleInformation];
    if (countNew > countOld) {
      const incrementBy = countNew - countOld;
      for (let i = 1; i <= incrementBy; i++) {
        data.push({
          bsn: "",
          firstName: "",
          lastName: "",
          vNumber: "",
        });
      }
    } else {
      const decrementBy = countOld - countNew;
      data.splice(peopleInformation.length - decrementBy, decrementBy);
    }

    setPeopleInformation(data);
  };

  const handleFilterChange = async (newFilters: Filters) => {
    setAvailableSlots([]);
    setFilters(newFilters);
    if (parseInt(newFilters.people, 10) !== parseInt(filters.people, 10)) {
      handlePeopleChange(newFilters);
    }
  };

  const handleOnSearch = async () => {
    if (
      filters.locations.length <= 0 ||
      filters.startDate === null ||
      filters.endDate === null
    ) {
      return;
    }

    setLoading(true);
    setAlertMessage(undefined);

    const promises = filters.locations.map(
      async (location): Promise<AvailableSlotsWithLocation> => {
        return {
          deskKey: location.key,
          deskName: (desks.find((desk) => desk.key === location.key) as Desk)
            .name,
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

    try {
      const availableSlotsWithDesk = await Promise.all(promises);
      setAvailableSlots(availableSlotsWithDesk);
      const totalNumberOfSlots = availableSlotsWithDesk.reduce(
        (total, value) => {
          return total + value.slots.length;
        },
        0
      );

      if (totalNumberOfSlots <= 0) {
        setAlertSeverity(ALERT_SEVERITY.INFO);
        setAlertMessage("No slots found for current search criteria");
      } else {
        setAlertMessage(undefined);
      }
    } catch (error: unknown) {
      setAlertSeverity(ALERT_SEVERITY.ERROR);
      setAlertMessage("Some unknown error occurred. Please refresh the page");
    }
    setLoading(false);
  };

  const handleFilterResetClick = () => {
    setAvailableSlots([]);
  };

  const handleOnAppointmentSlotSelected = (appointmentIds: string[]) => {
    setSelectedAppointmentIds(appointmentIds);
  };

  const getDesks = async () => {
    const availableDesks = await getAvailableDesks({
      appointmentType: filters.appointmentType,
    });
    setDesks(availableDesks);
    return availableDesks;
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      const desks = await getDesks();
      setFilters({
        ...filters,
        locations: desks.length > 0 ? [desks[0]] : [],
      });
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.appointmentType]);

  return (
    <>
      {alertMessage !== undefined && (
        <Box
          sx={{
            margin: "1% 10%",
          }}
        >
          <Alert
            severity={alertSeverity}
            variant="outlined"
            onClose={() => setAlertMessage(undefined)}
          >
            {alertMessage}
          </Alert>
        </Box>
      )}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid container spacing={1}>
        <Grid item xs={12} md={4}>
          <FilterSection
            onSearch={handleOnSearch}
            onReset={handleFilterResetClick}
            onFilterChange={handleFilterChange}
            onAddInformation={() => setShowBookingInformationScreen(true)}
            filters={filters}
            desks={desks}
          ></FilterSection>
        </Grid>
        <Grid item xs={12} md={8}>
          <SlotsDisplay
            availableSlots={availableSlots}
            selectedAppointments={selectedAppointmentIds}
            desks={desks}
            onAppointmentSelected={handleOnAppointmentSlotSelected}
          ></SlotsDisplay>
        </Grid>
        {showBookingInformationScreen && (
          <BookingInformation
            totalPersons={parseInt(filters.people, 10)}
            persons={peopleInformation}
            contactDetails={{ email: "", phone: "" }}
            open={showBookingInformationScreen}
            onClose={() => setShowBookingInformationScreen(false)}
          ></BookingInformation>
        )}
      </Grid>
    </>
  );
};

export default ManualQuery;
