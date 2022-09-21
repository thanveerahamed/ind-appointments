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
  isEmailValid,
  isFormValid,
  isPhoneNumberValid,
} from "../../../helpers/validators";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../store/store";
import {
  updateContactInformation,
  updatePersonInformation,
} from "../../../store/reducers/bookingInformation";

interface Props {
  open: boolean;
  onClose: () => void;
}

const BookingInformation = ({ open, onClose }: Props) => {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const { contactInformation, peopleInformation } = useSelector(
    (state: RootState) => state.bookingInformation
  );

  const handlePeopleInformationChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const key = event.target.name as keyof Person;
    const { value } = event.target;
    dispatch(updatePersonInformation({ index, key, value }));
  };

  const handleContactInformationChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const data = { ...contactInformation };
    const key = event.target.name as keyof ContactDetails;
    data[key] = event.target.value;
    dispatch(updateContactInformation(data));
  };

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
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <fieldset>
              <legend>Contact Details</legend>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <TextField
                    required
                    label="Email"
                    name="email"
                    value={contactInformation.email}
                    error={submitted && !isEmailValid(contactInformation.email)}
                    helperText={
                      submitted && !isEmailValid(contactInformation.email)
                        ? "Invalid email"
                        : undefined
                    }
                    placeholder="john.doe@app.com"
                    onChange={handleContactInformationChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    label="Phone"
                    name="phone"
                    value={contactInformation.phone}
                    error={
                      submitted && !isPhoneNumberValid(contactInformation.phone)
                    }
                    helperText={
                      submitted && !isPhoneNumberValid(contactInformation.phone)
                        ? "Invalid phone"
                        : undefined
                    }
                    placeholder="0687123456"
                    onChange={handleContactInformationChange}
                  />
                </Grid>
              </Grid>
            </fieldset>
          </Grid>
          {peopleInformation.map((person, index) => {
            return (
              <Grid item xs={12} key={index}>
                <fieldset>
                  <legend>Person {index + 1}</legend>
                  <Grid container spacing={1}>
                    <Grid item xs={3}>
                      <TextField
                        required
                        label="V Number"
                        name="vNumber"
                        value={person.vNumber}
                        error={submitted && person.vNumber === ""}
                        onChange={(event) =>
                          handlePeopleInformationChange(event, index)
                        }
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <TextField
                        label="BSN"
                        name="bsn"
                        value={person.bsn}
                        onChange={(event) =>
                          handlePeopleInformationChange(event, index)
                        }
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <TextField
                        required
                        label="First Name"
                        name="firstName"
                        value={person.firstName}
                        error={submitted && person.firstName === ""}
                        onChange={(event) =>
                          handlePeopleInformationChange(event, index)
                        }
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <TextField
                        required
                        label="Last Name"
                        name="lastName"
                        error={submitted && person.lastName === ""}
                        value={person.lastName}
                        onChange={(event) =>
                          handlePeopleInformationChange(event, index)
                        }
                      />
                    </Grid>
                  </Grid>
                </fieldset>
              </Grid>
            );
          })}
        </Grid>
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

export default BookingInformation;
