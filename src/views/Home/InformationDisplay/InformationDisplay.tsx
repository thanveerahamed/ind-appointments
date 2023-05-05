import * as React from "react";
import Typography from "@mui/material/Typography";
import { Box, Grid, Paper } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import Button from "@mui/material/Button";

interface Props {
  onAddInformation: () => void;
}

const InformationDisplay = ({ onAddInformation }: Props) => {
  const { contactInformation, peopleInformation } = useSelector(
    (state: RootState) => state.bookingInformation
  );
  return (
    <Box sx={{ marginTop: "20px" }}>
      <Paper sx={{ padding: "20px" }} elevation={3}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Button variant="outlined" onClick={onAddInformation}>
              Update Contact Info
            </Button>
          </Grid>
          <Grid item xs={3}>
            Email:
          </Grid>
          <Grid item xs={9}>
            {contactInformation.email === "" ? (
              <i>
                <small>Information missing</small>
              </i>
            ) : (
              <Typography
                component="span"
                variant="body2"
                color="text.primary"
                sx={{ wordWrap: "break-word" }}
              >
                {contactInformation.email}
              </Typography>
            )}
          </Grid>
          <Grid item xs={3}>
            Phone:
          </Grid>
          <Grid item xs={9}>
            {contactInformation.phone === "" ? (
              <i>
                <small>Information missing</small>
              </i>
            ) : (
              <Typography
                component="span"
                variant="body2"
                color="text.primary"
                sx={{ wordWrap: "break-word" }}
              >
                {contactInformation.phone}
              </Typography>
            )}
          </Grid>
          {peopleInformation.map((person, index) => {
            return (
              <React.Fragment key={index}>
                <Grid item xs={3}>
                  Person {index + 1}:
                </Grid>
                <Grid item xs={9}>
                  {person.firstName === "" ? (
                    <i>
                      <small>Information missing</small>
                    </i>
                  ) : (
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.primary"
                      sx={{ wordWrap: "break-word" }}
                    >
                      {person.firstName} ({person.vNumber})
                    </Typography>
                  )}
                </Grid>
              </React.Fragment>
            );
          })}
        </Grid>
      </Paper>
    </Box>
  );
};

export default InformationDisplay;
