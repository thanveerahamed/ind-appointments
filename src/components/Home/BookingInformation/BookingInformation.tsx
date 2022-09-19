import { Box, Grid, Modal } from "@mui/material";
import { ContactDetails, Person } from "../../../types";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import * as React from "react";
import Alert from "@mui/material/Alert";
import { useState } from "react";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface Props {
  open: boolean;
  persons: Person[];
  totalPersons: number;
  contactDetails: ContactDetails;
  onClose: () => void;
}

const BookingInformation = ({
  totalPersons,
  open,
  onClose,
  persons,
}: Props) => {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [peopleInformation, setPeopleInformation] = useState<Person[]>(persons);

  const handleTextChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const data = [...peopleInformation];
    const key = event.target.name as keyof Person;
    data[index][key] = event.target.value;
    setPeopleInformation(data);
  };

  const handleSave = () => {};

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Booking information
            </Typography>
            <Alert severity="info">
              To add or remove people, update the number of people on filter
              screen
            </Alert>
          </Grid>
          <Grid item xs={12}>
            <fieldset>
              <legend>Contact Details</legend>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <TextField required label="Email" />
                </Grid>
                <Grid item xs={6}>
                  <TextField required label="Phone" />
                </Grid>
              </Grid>
            </fieldset>
          </Grid>
          {peopleInformation.map((person, index) => {
            return (
              <Grid item xs={12} key={index}>
                <fieldset >
                  <legend>Person {index + 1}</legend>
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <TextField
                        required
                        label="V Number"
                        name="vNumber"
                        value={person.vNumber}
                        onChange={(event) => handleTextChange(event, index)}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="BSN"
                        name="bsn"
                        value={person.bsn}
                        onChange={(event) => handleTextChange(event, index)}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        required
                        label="First Name"
                        name="firstName"
                        value={person.firstName}
                        onChange={(event) => handleTextChange(event, index)}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        required
                        label="Last Name"
                        name="lastName"
                        value={person.lastName}
                        onChange={(event) => handleTextChange(event, index)}
                      />
                    </Grid>
                  </Grid>
                </fieldset>
              </Grid>
            );
          })}
          <Grid item xs={12}>
            <Button variant="contained" color="success">
              Save
            </Button>
            <Button
              variant="outlined"
              color="error"
              sx={{ marginLeft: "5px" }}
              onClick={onClose}
            >
              Close
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default BookingInformation;
