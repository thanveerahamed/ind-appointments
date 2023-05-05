import Dialog from '@mui/material/Dialog';
import SlideTransition from '../../../../components/common/transition/Slide';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import * as React from 'react';
import BookingInformationView from '../../BookingInformation/BookingInformationView';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import { isFormValid } from '../../../../helpers/validators';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../../../store/store';
import { bookAppointment } from '../../../../data';
import { SlotWithId } from '../../../../types';
import { updateBookedSlotResponse } from '../../../../store/reducers/slots';
import { showSnackbar } from '../../../../store/reducers/alerts';
import { getErrorMessage } from '../../../../helpers/error';
import BookedAppointmentView from '../../BookedAppointmentView/BookedAppointmentView';
import MobileLoading from './MobileLoading';

interface Props {
  showBookingInformationDialog: boolean;
  closeBookingInformationDialog: () => void;
}

const AppointmentDetails = ({
  showBookingInformationDialog,
  closeBookingInformationDialog,
}: Props) => {
  const dispatch = useAppDispatch();
  const [bookingInformationSubmitted, setBookingInformationSubmitted] =
    useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);

  const {
    bookingInformation: { contactInformation, peopleInformation },
    slots: { selectedSlot, bookedSlotResponse },
    filters: {
      criteria: { appointmentType },
    },
  } = useSelector((state: RootState) => state);

  const handleClose = () => {
    if (bookedSlotResponse === undefined) {
      closeBookingInformationDialog();
    } else {
      window.location.reload();
    }
  };

  const handleSave = async () => {
    setBookingInformationSubmitted(true);

    try {
      if (isFormValid(contactInformation, peopleInformation)) {
        setLoading(true);
        const bookedAppointment = await bookAppointment({
          slotWithId: selectedSlot as SlotWithId,
          contactInformation: contactInformation,
          persons: peopleInformation,
          appointmentType,
        });

        dispatch(updateBookedSlotResponse(bookedAppointment));
      }
    } catch (error: any) {
      dispatch(
        showSnackbar({
          message: getErrorMessage(error.message),
          severity: 'error',
        }),
      );
    }
    setLoading(false);
  };

  return showBookingInformationDialog ? (
    <Dialog
      fullScreen
      open={showBookingInformationDialog}
      onClose={closeBookingInformationDialog}
      TransitionComponent={SlideTransition}
    >
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <Typography sx={{ ml: 2, flex: 1 }}>
            {bookedSlotResponse === undefined
              ? 'Booking information'
              : 'Confirmation'}
          </Typography>
          {bookedSlotResponse === undefined && (
            <Button autoFocus color="error" onClick={handleClose}>
              Close
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          margin: '20px 5px 0',
        }}
      >
        {loading ? (
          <MobileLoading />
        ) : bookedSlotResponse === undefined ? (
          <>
            <BookingInformationView submitted={bookingInformationSubmitted} />
            <Box sx={{ margin: '20px 50px' }}>
              <Button
                color="success"
                variant="contained"
                onClick={handleSave}
                fullWidth
              >
                Book
              </Button>
            </Box>
          </>
        ) : (
          <Box sx={{ margin: '20px 20px' }}>
            <BookedAppointmentView bookedSlotResponse={bookedSlotResponse} />
            <Button
                sx={{marginTop: "30px"}}
                color="success"
                variant="contained"
                onClick={handleClose}
                fullWidth
            >
              Done
            </Button>
          </Box>
        )}
      </Box>
    </Dialog>
  ) : null;
};

export default AppointmentDetails;
