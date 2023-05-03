import * as React from 'react';
import { Box, Fab } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import FilterDialog from './FilterDialog';
import { makeFilterQueryText } from '../../../../helpers/filters';
import MobileLoading from './MobileLoading';
import NoRecords from './NoRecords';
import { SlotWithId } from '../../../../types';
import { sortSlotsAscending } from '../../../../helpers/slots';
import AppointmentsView from './AppointmentsView';
import AppointmentDetails from './AppointmentDetails';
import {useEffect} from "react";
import ReactGA from "react-ga";

const ManualQueryMobileView = () => {
  const [openFilterDialog, setOpenFilterDialog] = React.useState(false);
  const [openBookingInformation, setOpenBookingInformation] =
    React.useState(false);

  const {
    filters: { criteria: filters, loading: filtersLoading },
    slots: { loading: slotsLoading, availableSlots },
  } = useSelector((state: RootState) => state);

  const handleAppointmentBook = () => {
    setOpenBookingInformation(true);
  };

  const data = availableSlots
    .reduce((accumulator: SlotWithId[], availableSlotsWithLocation) => {
      const slots = availableSlotsWithLocation.slots.map((slot): SlotWithId => {
        return {
          ...slot,
          id: slot.key,
          deskKey: availableSlotsWithLocation.deskKey,
          deskName: availableSlotsWithLocation.deskName,
        };
      });

      return [...accumulator, ...slots];
    }, [])
    .sort(sortSlotsAscending);

    useEffect(() => {
        ReactGA.pageview("manual-query/mobile");
    }, []);

  return (
    <Box sx={{ margin: '5px' }}>
      {filtersLoading || slotsLoading ? (
        <MobileLoading />
      ) : (
        <>
          <Typography variant="body1">
            {makeFilterQueryText(filters)}
          </Typography>
          {data.length === 0 ? (
            <NoRecords onChangeFilter={() => setOpenFilterDialog(true)} />
          ) : (
            <AppointmentsView
              appointments={data}
              onBookAppointment={handleAppointmentBook}
            />
          )}
        </>
      )}

      <AppointmentDetails
        showBookingInformationDialog={openBookingInformation}
        closeBookingInformationDialog={() => setOpenBookingInformation(false)}
      />

      <FilterDialog
        open={openFilterDialog}
        handleClose={() => setOpenFilterDialog(false)}
      />
      <Fab
        sx={{
          position: 'absolute',
          bottom: 16,
          right: 16,
        }}
        color="primary"
        aria-label="filter"
        onClick={() => setOpenFilterDialog(true)}
      >
        <FilterAltIcon />
      </Fab>
    </Box>
  );
};

export default ManualQueryMobileView;
