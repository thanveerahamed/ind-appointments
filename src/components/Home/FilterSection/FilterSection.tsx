import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { CardHeader, Grid } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import { APPOINTMENT_TYPES } from "../../../constants";
import { Desk, Filters } from "../../../types";
import { dayjs } from "../../../types/dayjs";

interface Props {
  filters: Filters;
  desks: Desk[];
  onSearch: () => void;
  onReset: () => void;
  onAddInformation: () => void;
  onFilterChange: (filter: Filters) => void;
}

const FilterSection = ({
  filters,
  onSearch,
  onReset,
  onFilterChange,
  onAddInformation,
  desks,
}: Props) => {
  const handleAppointmentTypeChange = (event: SelectChangeEvent) => {
    onFilterChange({
      ...filters,
      appointmentType: event.target.value,
    });
  };

  const handleDeskChange = (newValue: Desk[]) => {
    if (newValue.length > 5) {
      return;
    }

    onFilterChange({
      ...filters,
      locations: newValue,
    });
  };

  const handlePeopleChange = (event: SelectChangeEvent) => {
    onFilterChange({
      ...filters,
      people: event.target.value,
    });
  };

  const handleOnResetClick = () => {
    onReset();
  };

  return (
    <>
      <Card sx={{ minWidth: 275 }}>
        <CardHeader title="Filter" />
        <CardContent>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <FormControl sx={{ width: "100%" }}>
                <InputLabel required>Appointment Type</InputLabel>
                <Select
                  value={filters.appointmentType}
                  label="Appointment Type"
                  onChange={handleAppointmentTypeChange}
                >
                  {APPOINTMENT_TYPES.map((type) => {
                    return (
                      <MenuItem key={type.value} value={type.value}>
                        {type.label}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl sx={{ width: "100%" }}>
                <InputLabel required>Persons</InputLabel>
                <Select
                  value={filters.people}
                  label="Persons"
                  onChange={handlePeopleChange}
                >
                  {[1, 2, 3, 4, 5, 6].map((num) => {
                    return (
                      <MenuItem key={num} value={num}>
                        {num}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} sx={{ marginTop: "20px" }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Start date"
                  value={filters.startDate}
                  inputFormat={"DD-MM-YYYY"}
                  onChange={(newValue) => {
                    debugger;
                    onFilterChange({
                      ...filters,
                      startDate: newValue,
                    });
                  }}
                  minDate={dayjs()}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      sx={{ width: "100%" }}
                      required
                      disabled
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={6} sx={{ marginTop: "20px" }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="End date"
                  inputFormat={"DD-MM-YYYY"}
                  value={filters.endDate}
                  onChange={(newValue) => {
                    onFilterChange({
                      ...filters,
                      endDate: newValue,
                    });
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      sx={{ width: "100%" }}
                      required
                      disabled
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sx={{ marginTop: "20px" }}>
              {desks.length > 0 && (
                <FormControl component="fieldset" fullWidth>
                  <Autocomplete
                    id="tags-outlined"
                    value={filters.locations}
                    onChange={(event: any, newValue: Desk[] | null) => {
                      if (newValue !== null) {
                        handleDeskChange(newValue);
                      }
                    }}
                    multiple
                    options={desks}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        error={filters.locations.length <= 0}
                        helperText={
                          filters.locations.length <= 0
                            ? "Minimum 1 location required."
                            : undefined
                        }
                        required
                        label="Locations (max. 5)"
                        placeholder="Maximum 5 locations"
                      />
                    )}
                  />
                </FormControl>
              )}
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Button
                onClick={() => onSearch()}
                color="success"
                variant="contained"
              >
                Search
              </Button>
              <Button
                onClick={handleOnResetClick}
                color="error"
                variant="outlined"
                sx={{ marginLeft: "5px" }}
              >
                Reset
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                onClick={onAddInformation}
                color="secondary"
                variant="contained"
                startIcon={<AddIcon />}
              >
                Add information
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </>
  );
};

export default FilterSection;
