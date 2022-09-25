import FilterSection from "../FilterSection/FilterSection";
import { AvailableSlotsWithLocation } from "../../../types";
import { getAvailableSlotsWithDesk } from "../../../data";
import * as React from "react";
import { useState } from "react";
import SlotsDisplay from "../SlotsDisplay/SlotsDisplay";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import { Grid } from "@mui/material";
import BookingInformationDialog from "../BookingInformation/BookingInformationDialog";
import InformationDisplay from "../InformationDisplay/InformationDisplay";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../store/store";
import SelectedSlotView from "../SelectedSlotView/SelectedSlotView";
import {
  updateAvailableSlotsWithLocation,
  updateAvailableSlotsWithLocationToEmpty,
} from "../../../store/reducers/slots";
import {showSnackbar} from "../../../store/reducers/alerts";
import BookedAppointmentDialog from "../BookedAppointmentView/BookedAppointmentDialog";
import {isFiltersValid} from "../../../helpers/validators";

interface Props {
  loading: boolean;
  setLoading: (flag: boolean) => void;
}

const ManualQuery = ({ loading, setLoading }: Props) => {
  const dispatch = useAppDispatch();
  const { filters } = useSelector((state: RootState) => state);

  const [showBookingInformationScreen, setShowBookingInformationScreen] =
    useState<boolean>(false);

  const dispatchAvailableSlotUpdate = (slots: AvailableSlotsWithLocation[]) =>
    dispatch(updateAvailableSlotsWithLocation(slots));
  const dispatchSetAvailableSlotToEmpty = () =>
    dispatch(updateAvailableSlotsWithLocationToEmpty());

  const handleOnSearch = async () => {
    if (
      !isFiltersValid(filters)
    ) {
      return;
    }

    setLoading(true);

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
        dispatch(
          showSnackbar({
            message: "No slots found for current search criteria",
            severity: "info",
          })
        );
      }
    } catch (error: unknown) {
      dispatch(
        showSnackbar({
          message: "Some unknown error occurred. Please refresh the page",
          severity: "error",
        })
      );
    }
    setLoading(false);
  };

  const handleFilterResetClick = () => {
    dispatchSetAvailableSlotToEmpty();
  };

  return (
    <>
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
          <BookingInformationDialog
            open={showBookingInformationScreen}
            onClose={() => setShowBookingInformationScreen(false)}
          ></BookingInformationDialog>
        )}
      </Grid>
      <BookedAppointmentDialog />
    </>
  );
};

export default ManualQuery;
