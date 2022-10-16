import { SlotWithId } from '../../../../types';
import { Box, Grid, Paper } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PlaceIcon from '@mui/icons-material/Place';
import { formatDate } from '../../../../helpers/date';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useScrollAppointments } from './useScroll';
import { LoadingButton } from '@mui/lab';

const PAGE_SIZE = 5;

interface Props {
  appointments: SlotWithId[];
}

const lineItemStyle = {
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  marginBottom: '10px',
};

const AppointmentsView = ({ appointments }: Props) => {
  const [pageCount, setPageCount] = useState<number>(PAGE_SIZE);
  const { currentPageAppointments, isLoading, hasMore } = useScrollAppointments(
    { pageCount, appointments },
  );

  return (
    <Box sx={{ overflowY: 'scroll', height: '70vh' }}>
      {currentPageAppointments.map((appointment) => {
        return (
          <Paper variant="outlined" sx={{ marginTop: '10px' }}>
            <Box sx={{ padding: '10px', wordWrap: 'break-word' }}>
              <Grid container>
                <Grid item xs={12}>
                  <Box sx={lineItemStyle}>
                    <CalendarMonthIcon />
                    <span>{formatDate(appointment.date)}</span>
                  </Box>
                </Grid>
                <Grid item xs={9}>
                  <Box sx={lineItemStyle}>
                    <AccessTimeIcon />
                    <span>
                      {appointment.startTime} - {appointment.endTime}
                    </span>
                  </Box>
                  <Box sx={lineItemStyle}>
                    <PlaceIcon />
                    <span>{appointment.deskName}</span>
                  </Box>
                </Grid>
                <Grid item xs={3}>
                  <Button variant="contained" color="success">
                    Book
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        );
      })}
      {hasMore && (
        <LoadingButton
          sx={{ marginTop: '20px' }}
          loading={isLoading}
          variant="outlined"
          color="primary"
          fullWidth
          onClick={() => setPageCount(pageCount + PAGE_SIZE)}
        >
          View more
        </LoadingButton>
      )}
    </Box>
  );
};

export default AppointmentsView;
