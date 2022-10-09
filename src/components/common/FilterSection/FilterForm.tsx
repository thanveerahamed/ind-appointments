import * as React from 'react';
import { Grid } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { APPOINTMENT_TYPES } from '../../../constants';
import { Desk } from '../../../types';
import { dayjs, Dayjs } from '../../../types/dayjs';
import {
  changeAppointmentType,
  changeDates,
  changeLocations,
  changeNumberOfPeople,
} from '../../../store/reducers/filters';
import { RootState, useAppDispatch } from '../../../store/store';
import { useSelector } from 'react-redux';

const FilterForm = () => {
  const dispatch = useAppDispatch();
  const { availableDesks: desks } = useSelector(
    (state: RootState) => state.desks,
  );
  const { filters } = useSelector((state: RootState) => state);

  const handleAppointmentTypeChange = (event: SelectChangeEvent) => {
    dispatch(changeAppointmentType(event.target.value));
  };

  const handleDeskChange = (newValue: Desk[]) => {
    dispatch(changeLocations(newValue));
  };

  const handlePeopleChange = (event: SelectChangeEvent) => {
    dispatch(changeNumberOfPeople(event.target.value));
  };

  const handleDateChange = (
    key: 'startDate' | 'endDate',
    date: Dayjs | null,
  ) => {
    dispatch(changeDates({ key, value: date }));
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={6}>
        <FormControl sx={{ width: '100%' }}>
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
        <FormControl sx={{ width: '100%' }}>
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
      <Grid item xs={6} sx={{ marginTop: '20px' }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Start date"
            value={filters.startDate}
            inputFormat={'DD-MM-YYYY'}
            onChange={(newValue) => {
              handleDateChange('startDate', newValue);
            }}
            minDate={dayjs()}
            renderInput={(params) => (
              <TextField {...params} sx={{ width: '100%' }} required disabled />
            )}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item xs={6} sx={{ marginTop: '20px' }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="End date"
            inputFormat={'DD-MM-YYYY'}
            minDate={filters.startDate?.add(1, 'day')}
            value={filters.endDate}
            onChange={(newValue) => {
              handleDateChange('endDate', newValue);
            }}
            renderInput={(params) => (
              <TextField {...params} sx={{ width: '100%' }} required disabled />
            )}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item xs={12} sx={{ marginTop: '20px' }}>
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
                      ? 'Minimum 1 location required.'
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
  );
};

export default FilterForm;
