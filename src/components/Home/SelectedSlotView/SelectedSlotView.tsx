import { useSelector } from "react-redux";
import {RootState, useAppDispatch} from "../../../store/store";
import { Grid, Paper } from "@mui/material";
import { formatDate } from "../../../helpers/date";
import Button from "@mui/material/Button";
import { hasBookingInformation } from "../../../helpers/validators";
import {useEffect, useState} from "react";
import Alert from "@mui/material/Alert";
import {slotSelected} from "../../../store/reducers/slots";

const SelectedSlotView = () => {
  const dispatch = useAppDispatch();
  const {
    slots: { selectedSlot },
    filters,
  } = useSelector((state: RootState) => state);
  const { appointmentType, people } = filters;
  const [alertMessage, setAlertMessage] = useState<string | undefined>(undefined);

  const handleBookSlot = () => {};

  const handleBlockSlot = () => {
    if (hasBookingInformation()) {
    } else {
      setAlertMessage("Booking information missing - please fill in the contact information.")
    }
  };

  useEffect(() => {
    dispatch(slotSelected(undefined));
    setAlertMessage(undefined);
  }, [filters, dispatch])

  return selectedSlot === undefined ? null : (
    <Paper sx={{ padding: "10px" }}>
      {
        alertMessage &&
          <Alert variant="filled" severity="error">
            {alertMessage}
          </Alert>
      }
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
            <br />
            <br />
            <Button variant="text" color="secondary" onClick={handleBlockSlot}>
              Block slot
            </Button>
          </Grid>
        </Grid>
      </fieldset>
    </Paper>
  );
};

export default SelectedSlotView;
