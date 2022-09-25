import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import SuccessImage from "../../../assets/images/success.png";
import { BookAppointmentResponse } from "../../../types";

interface Props {
  bookedSlotResponse: BookAppointmentResponse;
}

const BookedAppointmentView = ({ bookedSlotResponse }: Props) => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={6}>
        <div
          style={{
            width: "100%",

            height: 0,
            paddingBottom: "100%",
            position: "relative",
            marginRight: "auto",
            marginLeft: "auto",
          }}
        >
          <img
            src={SuccessImage}
            width="100%"
            height="100%"
            style={{ position: "absolute", maxWidth: "250px",
                maxHeight: "250px", }}
            alt="success"
          ></img>
        </div>
      </Grid>
      <Grid item xs={12} sm={6}>
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
  );
};

export default BookedAppointmentView;
