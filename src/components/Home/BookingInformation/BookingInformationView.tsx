import { Grid } from "@mui/material";
import { ContactDetails, Person } from "../../../types";
import TextField from "@mui/material/TextField";
import * as React from "react";
import {
  isEmailValid,
  isPhoneNumberValid,
} from "../../../helpers/validators";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../store/store";
import {
  updateContactInformation,
  updatePersonInformation,
} from "../../../store/reducers/bookingInformation";

interface Props {
  submitted: boolean;
}

const BookingInformationDialog = ({ submitted }: Props) => {
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

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <fieldset>
          <legend>Contact Details</legend>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={6}>
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
                <Grid item xs={12} sm={3}>
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
                <Grid item xs={12} sm={3}>
                  <TextField
                    label="BSN"
                    name="bsn"
                    value={person.bsn}
                    onChange={(event) =>
                      handlePeopleInformationChange(event, index)
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
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
                <Grid item xs={12} sm={3}>
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
  );
};

export default BookingInformationDialog;
