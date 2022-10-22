import { Box, Grid } from '@mui/material';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import RepeatIcon from '@mui/icons-material/Repeat';
import Typography from '@mui/material/Typography';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import RepeatOneIcon from '@mui/icons-material/RepeatOne';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import moment from 'moment';
import ErrorIcon from '@mui/icons-material/Error';
import { RootState, useAppDispatch } from '../../../store/store';
import {
  incrementStep,
  insertTimeLineItem,
  stopTimerAndReset,
  updateBookedSlot,
} from '../../../store/reducers/timer';
import {
  ErrorList,
  SearchStatus,
  TimeLineItem,
  TimeLineType,
} from '../../../types';
import {
  bookAppointment,
  getAvailableSlotsForTimerView,
} from '../../../data';
import { useSelector } from 'react-redux';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import { getTimeLineHeadingAndDescription } from './helper';
import { formatTimeLineDate } from '../../../helpers/date';
import { resetSlots } from '../../../store/reducers/slots';
import TopTimeLineElement from './TopTimeLineElement';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import useIsMobile from '../../common/hooks/useIsMobile';
import { makeFilterQueryText } from '../../../helpers/filters';

const TYPE_ICON_MAP = {
  [TimeLineType.START_TIMER]: (
    <TimelineSeparator>
      <TimelineConnector sx={{ bgcolor: 'success.main' }} />
      <TimelineDot color="success">
        <AlarmOnIcon />
      </TimelineDot>
    </TimelineSeparator>
  ),
  [TimeLineType.NO_RECORDS]: (
    <TimelineSeparator>
      <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
      <TimelineDot color="secondary" variant="outlined">
        <RepeatIcon />
      </TimelineDot>
      <TimelineConnector />
    </TimelineSeparator>
  ),
  [TimeLineType.NO_RECORDS_WITH_CLOSEST]: (
    <TimelineSeparator>
      <TimelineConnector sx={{ bgcolor: 'primary.main' }} />
      <TimelineDot color="primary">
        <RepeatOneIcon />
      </TimelineDot>
      <TimelineConnector />
    </TimelineSeparator>
  ),
  [TimeLineType.ERROR]: (
    <TimelineSeparator>
      <TimelineConnector sx={{ bgcolor: 'error.main' }} />
      <TimelineDot color="error">
        <ErrorIcon />
      </TimelineDot>
      <TimelineConnector />
    </TimelineSeparator>
  ),
  [TimeLineType.MANY_FAILURES]: (
    <TimelineSeparator>
      <TimelineConnector sx={{ bgcolor: 'error.main' }} />
      <TimelineDot color="error">
        <ErrorIcon />
      </TimelineDot>
      <TimelineConnector />
    </TimelineSeparator>
  ),
  [TimeLineType.UNKNOWN]: (
    <TimelineSeparator>
      <TimelineConnector sx={{ bgcolor: 'grey.main' }} />
      <TimelineDot color="grey">
        <HelpCenterIcon />
      </TimelineDot>
      <TimelineConnector />
    </TimelineSeparator>
  ),
  [TimeLineType.SIMILAR_APT_EXISTS]: (
    <TimelineSeparator>
      <TimelineConnector sx={{ bgcolor: 'warning.main' }} />
      <TimelineDot color="warning">
        <ReportProblemIcon />
      </TimelineDot>
      <TimelineConnector />
    </TimelineSeparator>
  ),
};

const TimerSearch = () => {
  const startTimerRef = useRef<boolean>(false);
  const scrollDivRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();
  const {
    filters: { criteria: filters },
    timer: { timeline, retryInterval },
    bookingInformation: { contactInformation, peopleInformation },
  } = useSelector((state: RootState) => state);
  const [targetDate, setTargetDate] = useState<Date>(
    moment(new Date()).add(retryInterval, 'minutes').toDate(),
  );

  const [searchStatus, setSearchStatus] = useState<SearchStatus>(
    SearchStatus.UNKNOW,
  );

  const pushToTimeLine = (timeline: TimeLineItem) =>
    dispatch(insertTimeLineItem(timeline));

  const performSearch = async () => {
    setSearchStatus(SearchStatus.SEARCHING_IN_PROGRESS);

    if (
      timeline.filter((item) => item.type === TimeLineType.ERROR).length > 10
    ) {
      pushToTimeLine({
        type: TimeLineType.MANY_FAILURES,
        ...getTimeLineHeadingAndDescription(TimeLineType.MANY_FAILURES),
        timestamp: new Date(),
      });

      setSearchStatus(SearchStatus.STOPPED);
      return;
    }

    try {
      const querySlots = await getAvailableSlotsForTimerView(filters);
      if (querySlots.matchingSlot !== undefined) {
        setSearchStatus(SearchStatus.BOOKING);
        const bookedSlot = await bookAppointment({
          slotWithId: querySlots.matchingSlot,
          persons: peopleInformation,
          contactInformation: contactInformation,
          appointmentType: filters.appointmentType,
        });

        dispatch(incrementStep());
        dispatch(updateBookedSlot(bookedSlot));
        return;
      }

      const timeLineType =
        querySlots.closestSlot === undefined
          ? TimeLineType.NO_RECORDS
          : TimeLineType.NO_RECORDS_WITH_CLOSEST;

      pushToTimeLine({
        type: timeLineType,
        ...getTimeLineHeadingAndDescription(
          timeLineType,
          querySlots.closestSlot,
        ),
        timestamp: new Date(),
      });
    } catch (e: any) {
      if (e.message === ErrorList.SIMILAR_APT_EXISTS) {
        pushToTimeLine({
          type: TimeLineType.SIMILAR_APT_EXISTS,
          ...getTimeLineHeadingAndDescription(TimeLineType.SIMILAR_APT_EXISTS),
          timestamp: new Date(),
        });

        setSearchStatus(SearchStatus.STOPPED);
        return;
      }

      pushToTimeLine({
        type: TimeLineType.ERROR,
        ...getTimeLineHeadingAndDescription(TimeLineType.ERROR),
        timestamp: new Date(),
      });
    }

    setTargetDate(moment(new Date()).add(retryInterval, 'minutes').toDate());
    setSearchStatus(SearchStatus.WAIT);
    if (scrollDivRef.current) {
      scrollDivRef.current.scrollTop = 0;
    }
  };

  const stopAndChangeInfo = () => {
    dispatch(stopTimerAndReset());
    dispatch(resetSlots());
  };

  const isMobile = useIsMobile();

  useEffect(() => {
    (async () => {
      if (!startTimerRef.current) {
        dispatch(
          insertTimeLineItem({
            type: TimeLineType.START_TIMER,
            ...getTimeLineHeadingAndDescription(TimeLineType.START_TIMER),
            timestamp: new Date(),
          }),
        );
        await performSearch();
      }
    })();

    startTimerRef.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Box
            sx={{
              marginLeft: { xs: '0', sm: '10%' },
              marginRight: { xs: '0', sm: '10%' },
            }}
          >
            <Alert
              variant="outlined"
              severity="warning"
              action={
                <Button
                  color="inherit"
                  size="small"
                  onClick={stopAndChangeInfo}
                >
                  Stop & change information
                </Button>
              }
            >
              Do not refresh the page, progress will be lost.
            </Alert>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{
              marginLeft: { xs: '0', sm: '10%' },
              marginRight: { xs: '0', sm: '10%' },
            }}
          >
            <Alert variant="outlined" severity="info">
              {makeFilterQueryText(filters)}
            </Alert>
          </Box>
        </Grid>
      </Grid>
      <Box
        ref={scrollDivRef}
        sx={{ margin: '20px', overflow: 'scroll', height: '70vh' }}
      >
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Timeline
              position={isMobile ? undefined : 'alternate'}
              sx={
                isMobile
                  ? {
                      [`& .${timelineItemClasses.root}:before`]: {
                        flex: 0,
                        padding: 0,
                      },
                    }
                  : {}
              }
            >
              <TopTimeLineElement
                searchStatus={searchStatus}
                targetDate={targetDate}
                onWaitComplete={performSearch}
              />
              {[...timeline]
                .sort((a, b) =>
                  a.timestamp.getTime() < b.timestamp.getTime() ? 1 : -1,
                )
                .map((timeline, index) => {
                  return (
                    <TimelineItem key={index}>
                      {!isMobile && (
                        <TimelineOppositeContent
                          sx={{ m: 'auto 0' }}
                          align="right"
                          variant="body2"
                          color="text.secondary"
                        >
                          {formatTimeLineDate(timeline.timestamp, 'LLLL')}
                        </TimelineOppositeContent>
                      )}

                      {TYPE_ICON_MAP[timeline.type]}
                      <TimelineContent sx={{ py: '12px', px: 2 }}>
                        <Typography variant="h6" component="span">
                          {timeline.heading}
                        </Typography>
                        <Typography>{timeline.description}</Typography>
                        {isMobile && (
                          <Typography variant="body2" color="text.secondary">
                            {formatTimeLineDate(timeline.timestamp, 'LLLL')}
                          </Typography>
                        )}
                      </TimelineContent>
                    </TimelineItem>
                  );
                })}
            </Timeline>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default TimerSearch;
