import FilterSection from "../FilterSection/FilterSection";
import { AvailableSlotsWithLocation } from "../../../types";
import { getAvailableSlotsWithDesk } from "../../../data";
import * as React from "react";
import { useState } from "react";
import SlotsDisplay from "../SlotsDisplay/SlotsDisplay";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import { Box, Grid } from "@mui/material";
import { ALERT_SEVERITY } from "../../../constants";
import BookingInformation from "../BookingInformation/BookingInformation";
import InformationDisplay from "../InformationDisplay/InformationDisplay";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../store/store";
import SelectedSlotView from "../SelectedSlotView/SelectedSlotView";
import {
  updateAvailableSlotsWithLocation,
  updateAvailableSlotsWithLocationToEmpty,
} from "../../../store/reducers/slots";

interface Props{
  loading: boolean;
  setLoading: (flag: boolean) => void
}

const ManualQuery = ({loading, setLoading}: Props) => {
  const dispatch = useAppDispatch();
  const { filters } = useSelector((state: RootState) => state);
  const [alertSeverity, setAlertSeverity] = useState<ALERT_SEVERITY>(
    ALERT_SEVERITY.ERROR
  );
  const [alertMessage, setAlertMessage] = useState<string | undefined>(
    undefined
  );


  const [showBookingInformationScreen, setShowBookingInformationScreen] =
    useState<boolean>(false);

  const dispatchAvailableSlotUpdate = (slots: AvailableSlotsWithLocation[]) =>
    dispatch(updateAvailableSlotsWithLocation(slots));
  const dispatchSetAvailableSlotToEmpty = () =>
    dispatch(updateAvailableSlotsWithLocationToEmpty());

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

    try {
      const availableSlotsWithDesk = await getAvailableSlotsWithDesk(filters);
      dispatchAvailableSlotUpdate(availableSlotsWithDesk);
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
    dispatchSetAvailableSlotToEmpty();
  };





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
            filters={filters}
          ></FilterSection>
          <InformationDisplay
            onAddInformation={() => setShowBookingInformationScreen(true)}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <SelectedSlotView />
          <SlotsDisplay />
        </Grid>
        {showBookingInformationScreen && (
          <BookingInformation
            open={showBookingInformationScreen}
            onClose={() => setShowBookingInformationScreen(false)}
          ></BookingInformation>
        )}
      </Grid>
    </>
  );
};

export default ManualQuery;
