import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { SyntheticEvent, useEffect, useState } from "react";
import Fade from "@mui/material/Fade";
import ManualQuery from "./ManualQuery/ManualQuery";
import { changeLocations } from "../../store/reducers/filters";
import { updatePeopleInformationOnNumberOfPeopleChange } from "../../store/reducers/bookingInformation";
import { RootState, useAppDispatch } from "../../store/store";
import { useSelector } from "react-redux";
import { getAvailableDesks } from "../../data";
import { updateDesks } from "../../store/reducers/desks";
import { updateAvailableSlotsWithLocationToEmpty } from "../../store/reducers/slots";
import SnackBarAlert from "../common/SnackBarAlert/SnackBarAlert";
import TimerQuery from "./TimeQuery/TimerQuery";
import StopTimeConfirmationDialog from "./TimeQuery/StopTimeConfirmationDialog";
import {stopTimerAndReset} from "../../store/reducers/timer";

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
    "aria-controls": `query-tabpanel-${index}`,
  };
};

const Home = () => {
  const dispatch = useAppDispatch();
  const {
    filters,
    timer: { activeStep },
  } = useSelector((state: RootState) => state);
  const [loading, setLoading] = useState<boolean>(true);
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

  const getDesks = async () => {
    const desksList = await getAvailableDesks({
      appointmentType: filters.appointmentType,
    });
    dispatch(updateDesks(desksList));
    return desksList;
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      dispatchSetAvailableSlotToEmpty();
      const desks = await getDesks();
      dispatch(changeLocations(desks.length > 0 ? [desks[0]] : []));
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.appointmentType]);

  useEffect(() => {
    dispatch(
      updatePeopleInformationOnNumberOfPeopleChange(
        parseInt(filters.people, 10)
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.people]);

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleTabChange} aria-label="query tabs">
          <Tab label="Search" {...a11yProps(0)} />
          <Tab label="Scheduler" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <ManualQuery loading={loading} setLoading={setLoading}></ManualQuery>
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
