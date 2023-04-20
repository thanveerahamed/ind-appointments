import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { SyntheticEvent, useEffect, useState } from 'react';
import Fade from '@mui/material/Fade';
import ManualQuery from './ManualQuery/ManualQuery';
import {
  changeLocations,
  setLoading as setFilterLoading,
} from '../../store/reducers/filters';
import { updatePeopleInformationOnNumberOfPeopleChange } from '../../store/reducers/bookingInformation';
import { RootState, useAppDispatch } from '../../store/store';
import { useSelector } from 'react-redux';
import { getAvailableDesks, getAvailableSlotsWithDesk } from '../../data';
import { updateDesks } from '../../store/reducers/desks';
import {
  updateAvailableSlotsWithLocation,
  updateAvailableSlotsWithLocationToEmpty,
  setLoading as setGridLoading,
} from '../../store/reducers/slots';
import SnackBarAlert from '../common/SnackBarAlert/SnackBarAlert';
import TimerQuery from './TimeQuery/TimerQuery';
import StopTimeConfirmationDialog from './TimeQuery/StopTimeConfirmationDialog';
import { stopTimerAndReset } from '../../store/reducers/timer';
import ErrorBoundaryContent from '../../App/App/ErrorBoundaryContent';
import { isFiltersValid } from '../../helpers/validators';
import { showSnackbar } from '../../store/reducers/alerts';
import { AvailableSlotsWithLocation } from '../../types';
import { useAnalyticsEventTracker } from '../../hooks/useAnalyticsEventTracker';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`query-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Fade in={value === index}>
        <Box>
          <div>{children}</div>
        </Box>
      </Fade>
    </div>
  );
};

const a11yProps = (index: number) => {
  return {
    id: `query-tab-${index}`,
    'aria-controls': `query-tabpanel-${index}`,
  };
};

const Home = () => {
  const dispatch = useAppDispatch();
  const trackEvent = useAnalyticsEventTracker('Home');
  const {
    filters: { criteria: filters },
    timer: { activeStep },
    desks: { availableDesks },
  } = useSelector((state: RootState) => state);
  const [error, setError] = useState<boolean>(false);
  const [value, setValue] = useState(0);
  const [tempValue, setTempValue] = useState(0);
  const [showDialog, setShowDialog] = useState<boolean>(false);

  const handleTabChange = (event: SyntheticEvent, newValue: number) => {
    // if the timer is running only then.
    if (activeStep === 2) {
      setShowDialog(true);
      setTempValue(newValue);
      return;
    }
    setValue(newValue);
  };

  const handleOnClose = (confirm: boolean) => {
    if (confirm) {
      dispatch(stopTimerAndReset());
      setValue(tempValue);
    }

    setShowDialog(false);
    setTempValue(0);
  };

  const dispatchSetAvailableSlotToEmpty = () =>
    dispatch(updateAvailableSlotsWithLocationToEmpty());
  const dispatchAvailableSlotUpdate = (slots: AvailableSlotsWithLocation[]) =>
    dispatch(updateAvailableSlotsWithLocation(slots));

  const getDesks = async () => {
    try {
      const desksList = await getAvailableDesks({
        appointmentType: filters.appointmentType,
      });
      dispatch(updateDesks(desksList));
      return desksList;
    } catch (e) {
      setError(true);
      return [];
    }
  };

  useEffect(() => {
    (async () => {
      dispatch(setFilterLoading(true));
      dispatchSetAvailableSlotToEmpty();
      const desks = await getDesks();
      dispatch(updateDesks(desks));
      dispatch(setFilterLoading(false));
      trackEvent('load_desks', 'Loading of desks complete');
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.appointmentType]);

  useEffect(() => {
    dispatch(
      updatePeopleInformationOnNumberOfPeopleChange(
        parseInt(filters.people, 10),
      ),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.people]);

  useEffect(() => {
    (async () => {
      dispatch(
        changeLocations(availableDesks.length > 0 ? [availableDesks[0]] : []),
      );
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [availableDesks]);

  useEffect(() => {
    (async () => {
      const isFilterValid = isFiltersValid(filters);

      if (isFilterValid) {
        dispatch(setGridLoading(true));
        try {
          const availableSlotsWithDesk = await getAvailableSlotsWithDesk(
            filters,
          );
          dispatchAvailableSlotUpdate(availableSlotsWithDesk);
        } catch (error: unknown) {
          dispatch(
            showSnackbar({
              message: 'Some unknown error occurred. Please refresh the page',
              severity: 'error',
            }),
          );
        }
      } else {
        dispatchSetAvailableSlotToEmpty();
      }
      dispatch(setGridLoading(false));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  return error ? (
    <ErrorBoundaryContent></ErrorBoundaryContent>
  ) : (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleTabChange} aria-label="query tabs">
          <Tab label="Search" {...a11yProps(0)} />
          <Tab label="Scheduler" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <ManualQuery></ManualQuery>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TimerQuery />
      </TabPanel>
      <SnackBarAlert />
      <StopTimeConfirmationDialog open={showDialog} onClose={handleOnClose} />
    </Box>
  );
};

export default Home;
