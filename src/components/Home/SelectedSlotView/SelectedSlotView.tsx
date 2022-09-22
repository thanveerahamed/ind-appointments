import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../store/store";
import { Grid, Paper } from "@mui/material";
import { formatDate } from "../../../helpers/date";
import Button from "@mui/material/Button";
import { hasBookingInformation } from "../../../helpers/validators";
import { useEffect, useState } from "react";
import {slotSelected, updateBookedSlotResponse} from "../../../store/reducers/slots";
import { showSnackbar } from "../../../store/reducers/alerts";
import { blockSelectedSlot, bookAppointment } from "../../../data";
import { SlotWithId } from "../../../types";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import * as React from "react";
import { getErrorMessage } from "../../../helpers/error";

const SelectedSlotView = () => {
  const dispatch = useAppDispatch();
  const {
    slots: { selectedSlot },
    filters,
    bookingInformation: { contactInformation, peopleInformation },
  } = useSelector((state: RootState) => state);
  const { appointmentType, people } = filters;
  const [loading, setLoading] = useState<boolean>(false);

  const handleBookSlot = async () => {
    if (hasBookingInformation()) {
      setLoading(true);
      try {
        await blockSelectedSlot({
          slotWithId: selectedSlot as SlotWithId,
        });
        const bookedAppointment = await bookAppointment({
          slotWithId: selectedSlot as SlotWithId,
          contactInformation: contactInformation,
          persons: peopleInformation,
          appointmentType
        });

        dispatch(updateBookedSlotResponse(bookedAppointment));
      } catch (error: any) {
        dispatch(
          showSnackbar({
            message: getErrorMessage(error.message),
            severity: "warning",
          })
        );
      }
      setLoading(false);
    } else {
      dispatch(
        showSnackbar({
          message:
            "Contact information missing. You can update the information below filter section",
        })
      );
    }
  };
  useEffect(() => {
    dispatch(slotSelected(undefined));
  }, [filters, dispatch]);

  return selectedSlot === undefined ? null : (
    <Paper sx={{ padding: "10px" }}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <fieldset>
        <legend>
          Selected appointment for {appointmentType} - {people} person
        </legend>
        <Grid container spacing={1}>
          <Grid item xs={8}>
            <p>{formatDate(selectedSlot.date)}</p>
            <p>
              {selectedSlot.startTime} - {selectedSlot.endTime}
            </p>
            <p>{selectedSlot.deskName}</p>
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="contained"
              color="success"
              onClick={handleBookSlot}
            >
              Book slot
            </Button>
          </Grid>
        </Grid>
      </fieldset>
    </Paper>
  );
};

export default SelectedSlotView;
