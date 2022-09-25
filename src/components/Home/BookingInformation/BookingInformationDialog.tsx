import { Grid } from "@mui/material";
import { ContactDetails, Person } from "../../../types";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as React from "react";
import { useState } from "react";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  isFormValid,
} from "../../../helpers/validators";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import BookingInformationView from "./BookingInformationView";

interface Props {
  open: boolean;
  onClose: () => void;
}

const BookingInformationDialog = ({ open, onClose }: Props) => {
  const [submitted, setSubmitted] = useState<boolean>(false);

  const { contactInformation, peopleInformation } = useSelector(
    (state: RootState) => state.bookingInformation
  );

  const handleSave = () => {
    setSubmitted(true);

    if (!isFormValid(contactInformation, peopleInformation)) {
      return;
    }

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} scroll="paper">
      <DialogTitle id="scroll-dialog-title">Booking information</DialogTitle>
      <DialogContent dividers>
        <BookingInformationView submitted={submitted} />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="success" onClick={handleSave}>
          Save & close
        </Button>
        <Button
          variant="outlined"
          color="error"
          sx={{ marginLeft: "5px" }}
          onClick={onClose}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookingInformationDialog;
