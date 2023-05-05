import { Box, Grid, Paper } from '@mui/material';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { ColorLibConnector, ColorLibStepIcon } from './ColorLib';
import {ChangeEvent, useEffect, useState} from 'react';
import FilterSection from '../../../components/common/FilterSection/FilterSection';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../../store/store';
import {
  decrementStep,
  incrementStep,
  stopTimerAndReset,
  updateInterval,
} from '../../../store/reducers/timer';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { isFiltersValid, isFormValid } from '../../../helpers/validators';
import BookingInformationView from '../BookingInformation/BookingInformationView';
import TimerSearch from '../TimerSearch/TimerSearch';
import BookedAppointmentView from '../BookedAppointmentView/BookedAppointmentView';
import { resetSlots } from '../../../store/reducers/slots';
import ReactGA from "react-ga";
import {useAnalyticsEventTracker} from "../../../hooks/useAnalyticsEventTracker";

const TimerQuery = () => {
  const dispatch = useAppDispatch();
  const trackEvent = useAnalyticsEventTracker('Stepper');
  const {
    filters,
    timer: { activeStep, retryInterval, bookedSlot },
    bookingInformation: { contactInformation, peopleInformation },
  } = useSelector((state: RootState) => state);

  const [bookingInfoSubmitted, setBookingInfoSubmitted] =
    useState<boolean>(false);

  const stepNext = () => {
    let canMoveNext = false;
    switch (activeStep) {
      case 0:
        canMoveNext = isFiltersValid(filters.criteria);
        break;

      case 1:
        setBookingInfoSubmitted(true);
        canMoveNext = isFormValid(contactInformation, peopleInformation);
        break;
    }

    if (canMoveNext) {
      dispatch(incrementStep());
      trackEvent('move_next', activeStep.toString())
    }
  };
  const stepBack = () => dispatch(decrementStep());
  const handleIntervalChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    dispatch(updateInterval(parseInt(event.target.value, 10)))
    trackEvent('retry_interval_change', event.target.value)
  };

  const resetStepper = () => {
    dispatch(stopTimerAndReset());
    dispatch(resetSlots());
    trackEvent('reset_stepper', '')
  };

  useEffect(() => {
    ReactGA.pageview("scheduler");
  }, []);

  return (
    <Paper sx={{ padding: '20px 0' }}>
      <Box>
        <Stepper
          alternativeLabel
          activeStep={activeStep}
          connector={<ColorLibConnector />}
        >
          <Step>
            <StepLabel StepIconComponent={ColorLibStepIcon}>
              Create a filter
            </StepLabel>
          </Step>
          <Step>
            <StepLabel StepIconComponent={ColorLibStepIcon}>
              Enter the appointment information
            </StepLabel>
          </Step>
          <Step>
            <StepLabel StepIconComponent={ColorLibStepIcon}>
              Find an appointment
            </StepLabel>
          </Step>
          <Step>
            <StepLabel StepIconComponent={ColorLibStepIcon}>
              Appointment booked
            </StepLabel>
          </Step>
        </Stepper>
        {activeStep === 0 && (
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <FilterSection />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ float: 'right' }}>
                <Button
                  variant="contained"
                  color="success"
                  sx={{ margin: '0 20px' }}
                  onClick={stepNext}
                >
                  Next
                </Button>
              </Box>
            </Grid>
          </Grid>
        )}
        {activeStep === 1 && (
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Box sx={{ margin: '20px' }}>
                <BookingInformationView submitted={bookingInfoSubmitted} />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                sx={{ margin: '0 20px' }}
                type="number"
                label="Retry interval (in mins)"
                value={retryInterval}
                onChange={handleIntervalChange}
                inputProps={{
                  style: {
                    height: '10px',
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ float: 'right' }}>
                <Button variant="outlined" color="error" onClick={stepBack}>
                  Back
                </Button>

                <Button
                  variant="contained"
                  color="success"
                  sx={{ margin: '0 20px' }}
                  onClick={stepNext}
                >
                  Start the timer
                </Button>
              </Box>
            </Grid>
          </Grid>
        )}
        {activeStep === 2 && <TimerSearch></TimerSearch>}

        {activeStep === 3 && (
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Box sx={{ margin: '20px' }}>
                {bookedSlot === undefined ? (
                  <></>
                ) : (
                  <BookedAppointmentView bookedSlotResponse={bookedSlot} />
                )}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ float: 'right' }}>
                <Button
                  variant="contained"
                  color="success"
                  sx={{ margin: '0 20px' }}
                  onClick={resetStepper}
                >
                  Done
                </Button>
              </Box>
            </Grid>
          </Grid>
        )}
      </Box>
    </Paper>
  );
};

export default TimerQuery;
