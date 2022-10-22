import FilterSection from '../../../common/FilterSection/FilterSection';
import * as React from 'react';
import { useState } from 'react';
import SlotsDisplay from '../../SlotsDisplay/SlotsDisplay';
import { Grid } from '@mui/material';
import BookingInformationDialog from '../../BookingInformation/BookingInformationDialog';
import InformationDisplay from '../../InformationDisplay/InformationDisplay';
import SelectedSlotView from '../../SelectedSlotView/SelectedSlotView';
import BookedAppointmentDialog from '../../BookedAppointmentView/BookedAppointmentDialog';

const ManualQueryWebView = () => {
  const [showBookingInformationScreen, setShowBookingInformationScreen] =
    useState<boolean>(false);

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12} md={4}>
          <FilterSection></FilterSection>
          <InformationDisplay
            onAddInformation={() => setShowBookingInformationScreen(true)}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <SelectedSlotView />
          <SlotsDisplay />
        </Grid>
        {showBookingInformationScreen && (
          <BookingInformationDialog
            open={showBookingInformationScreen}
            onClose={() => setShowBookingInformationScreen(false)}
          ></BookingInformationDialog>
        )}
      </Grid>
      <BookedAppointmentDialog />
    </>
  );
};

export default ManualQueryWebView;
