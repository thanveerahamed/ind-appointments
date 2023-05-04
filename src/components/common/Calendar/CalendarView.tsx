import * as React from 'react';
import Paper from '@mui/material/Paper';
import { AppointmentModel, ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  MonthView,
  WeekView,
  Appointments,
  DateNavigator,
  Toolbar,
  AppointmentTooltip,
} from '@devexpress/dx-react-scheduler-material-ui';
import { SlotWithId } from '../../../types';
import { dayjs } from '../../../types/dayjs';
import { useEffect } from 'react';

const schedulerData = [
  {
    startDate: '2018-11-01T09:45',
    endDate: '2018-11-01T11:00',
    title: 'Meeting',
  },
  {
    startDate: '2018-11-01T12:00',
    endDate: '2018-11-01T13:30',
    title: 'Go to a gym',
  },
];

interface Props {
  slots: SlotWithId[];
}

const getSchedulerData = (slots: SlotWithId[]): AppointmentModel[] => {
  return slots.map(
    (slot: SlotWithId): AppointmentModel => ({
      endDate: dayjs(`${slot.date} ${slot.endTime}`).toISOString(),
      startDate: dayjs(`${slot.date} ${slot.startTime}`).toISOString(),
      id: slot.id,
      title: slot.deskKey,
    }),
  );
};

const CalendarView = ({ slots }: Props) => {
  const currentDate = dayjs().format('YYYY-MM-DD');

  useEffect(() => {
    console.log(currentDate, getSchedulerData(slots));
  }, []);

  return (
    <Paper variant="elevation">
      <Scheduler data={getSchedulerData(slots)}>
        <ViewState defaultCurrentDate={currentDate} />
        <WeekView startDayHour={9} endDayHour={17} excludedDays={[0, 6]} />
        <Appointments />
        <Toolbar />
        <DateNavigator />
        <AppointmentTooltip showCloseButton showDeleteButton showOpenButton />
      </Scheduler>
    </Paper>
  );
};

export default CalendarView;
