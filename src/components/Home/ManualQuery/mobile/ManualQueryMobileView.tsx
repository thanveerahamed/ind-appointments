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
import Toolbar from '@mui/material/Toolbar';

const ManualQueryMobileView = () => {
  const [openFilterDialog, setOpenFilterDialog] = React.useState(false);
  const {
    filters: { criteria: filters, loading: filtersLoading },
    slots: { loading: slotsLoading, availableSlots },
  } = useSelector((state: RootState) => state);

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
            <AppointmentsView appointments={data} />
          )}
        </>
      )}

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
