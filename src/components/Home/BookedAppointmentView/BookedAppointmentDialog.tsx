import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../store/store";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { resetSlots } from "../../../store/reducers/slots";
import BookedAppointmentView from "./BookedAppointmentView";

const BookedAppointmentDialog = () => {
  const dispatch = useAppDispatch();
  const { bookedSlotResponse } = useSelector((state: RootState) => state.slots);
  const handleDone = () => {
    dispatch(resetSlots());
  };

  return bookedSlotResponse === undefined ? (
    <></>
  ) : (
    <Dialog open={true} scroll="body" maxWidth="sm" fullWidth>
      <DialogTitle>Appointment Details</DialogTitle>
      <DialogContent dividers>
        <BookedAppointmentView bookedSlotResponse={bookedSlotResponse} />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="success" onClick={handleDone}>
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookedAppointmentDialog;
