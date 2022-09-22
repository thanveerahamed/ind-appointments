import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../store/store";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import SuccessImage from "../../../assets/images/success.png";
import { resetSlots } from "../../../store/reducers/slots";

const BookedAppointmentView = () => {
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
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <div
              style={{
                width: "100%",
                height: 0,
                paddingBottom: "100%",
                position: "relative",
              }}
            >
              <img
                src={SuccessImage}
                width="100%"
                height="100%"
                style={{ position: "absolute" }}
                alt="success"
              ></img>
            </div>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom>
              Congratulations your booking is confirmed.
            </Typography>
            <Typography>Booking reference code:</Typography>
            <Typography variant="h6">{bookedSlotResponse.code}</Typography>
            <Typography sx={{ marginTop: "30px" }}>
              You will receive a confirmation email to{" "}
              <b>{bookedSlotResponse.email}</b> in sometime.
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="success" onClick={handleDone}>
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookedAppointmentView;
