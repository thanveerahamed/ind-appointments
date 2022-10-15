import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { BookAppointmentResponse } from '../../../types';
import Lottie from 'lottie-react';
import confetti from '../../../assets/lottie/confetti.json';

interface Props {
  bookedSlotResponse: BookAppointmentResponse;
}

const BookedAppointmentView = ({ bookedSlotResponse }: Props) => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={6}>
        <Lottie animationData={confetti} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography gutterBottom>
          Congratulations your booking is confirmed.
        </Typography>
        <Typography>Booking reference code:</Typography>
        <Typography variant="h6">{bookedSlotResponse.code}</Typography>
        <Typography sx={{ marginTop: '30px' }}>
          You will receive a confirmation email to{' '}
          <b>{bookedSlotResponse.email}</b> in sometime.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default BookedAppointmentView;
