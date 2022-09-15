import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { CardHeader, Grid, Box } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { APPOINTMENT_DESKS, APPOINTMENT_TYPES } from "../../../constants";
import { useEffect, useState } from "react";
import { Filter } from "../../../types";
import { getAvailableSlots } from "../../../data";

const initialFilterState: Filter = {
  appointmentType: "BIO",
  people: "1",
  locations: ["AM"],
};

interface Props {
  onSearch: (filter: Filter) => void;
}

const FilterSection = ({ onSearch }: Props) => {
  const [filters, setFilters] = useState<Filter>(initialFilterState);

  const handleAppointmentTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFilters({
      ...filters,
      appointmentType: event.target.value,
    });
  };

  const handleDeskChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let selectedLocations = [];

    if (event.target.checked) {
      selectedLocations = [...filters.locations, event.target.value];
    } else {
      selectedLocations = filters.locations.filter(
        (location) => location !== event.target.value
      );
    }

    setFilters({
      ...filters,
      locations: selectedLocations,
    });
  };

  const handlePeopleChange = (event: SelectChangeEvent) => {
    setFilters({
      ...filters,
      people: event.target.value,
    });
  };

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardHeader title="Filter" />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Appointment Type</FormLabel>
              <RadioGroup
                row
                value={filters?.appointmentType}
                onChange={handleAppointmentTypeChange}
              >
                {APPOINTMENT_TYPES.map((type) => {
                  return (
                    <FormControlLabel
                      key={type.value}
                      value={type.value}
                      control={<Radio />}
                      label={type.label}
                    />
                  );
                })}
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Locations</FormLabel>
              <FormGroup aria-label="position" row>
                {APPOINTMENT_DESKS.map((desk) => {
                  return (
                    <FormControlLabel
                      key={desk.value}
                      value={desk.value}
                      control={
                        <Checkbox
                          checked={filters.locations.includes(desk.value)}
                          onChange={handleDeskChange}
                        />
                      }
                      label={desk.label}
                      labelPlacement="end"
                    />
                  );
                })}
              </FormGroup>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <Box sx={{ marginTop: "20px" }}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Total people</FormLabel>
                <Select value={filters.people} onChange={handlePeopleChange}>
                  {[1, 2, 3, 4, 5, 6].map((num) => {
                    return (
                      <MenuItem key={num} value={num}>
                        {num}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button onClick={() => onSearch(filters)}>Search</Button>
      </CardActions>
    </Card>
  );
};

export default FilterSection;
