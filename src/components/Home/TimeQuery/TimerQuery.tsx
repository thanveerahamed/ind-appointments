import { Box, Grid, Paper } from "@mui/material";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { ColorLibConnector, ColorLibStepIcon } from "./ColorLib";
import { ChangeEvent } from "react";
import FilterSection from "../FilterSection/FilterSection";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../store/store";
import {
  decrementStep,
  incrementStep,
  updateInterval,
} from "../../../store/reducers/timer";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const TimerQuery = () => {
  const dispatch = useAppDispatch();
  const { activeStep, retryInterval } = useSelector(
    (state: RootState) => state.timer
  );

  const stepNext = () => dispatch(incrementStep());
  const stepBack = () => dispatch(decrementStep());
  const handleIntervalChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => dispatch(updateInterval(parseInt(event.target.value, 10)));

  return (
    <Paper sx={{ padding: "20px 0" }}>
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
              <FilterSection showActions={false} />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ float: "right" }}>
                <TextField
                  type="number"
                  label="Retry interval (in mins)"
                  value={retryInterval}
                  defaultValue={retryInterval}
                  onChange={handleIntervalChange}
                />
                <Button
                  variant="contained"
                  color="success"
                  sx={{ margin: "0 20px", height: "100%" }}
                  onClick={stepNext}
                >
                  Next
                </Button>
              </Box>
            </Grid>
            <Grid item xs={6}></Grid>
          </Grid>
        )}
      </Box>
    </Paper>
  );
};

export default TimerQuery;
