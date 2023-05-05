import { SearchStatus } from "../../../types";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineDot from "@mui/lab/TimelineDot";
import PageviewIcon from "@mui/icons-material/Pageview";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import Typography from "@mui/material/Typography";
import TimelineItem from "@mui/lab/TimelineItem";
import * as React from "react";
import TimerIcon from "@mui/icons-material/Timer";
import Countdown from "react-countdown";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";

interface Props {
  searchStatus: SearchStatus;
  targetDate: Date;
  onWaitComplete: () => void;
}

const TopTimeLineElement = ({
  searchStatus,
  targetDate,
  onWaitComplete,
}: Props) => {
  if (searchStatus === SearchStatus.WAIT) {
    return (
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color="warning">
            <TimerIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: "12px", px: 2 }}>
          <Typography variant="h6" component="span">
            Next search in
          </Typography>
          <Typography>
            <Countdown
              date={targetDate}
              onComplete={onWaitComplete}
            ></Countdown>
          </Typography>
        </TimelineContent>
      </TimelineItem>
    );
  }

  if (searchStatus === SearchStatus.SEARCHING_IN_PROGRESS) {
    return (
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color="success">
            <PageviewIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: "12px", px: 2 }}>
          <Typography variant="h6" component="span">
            Searching....
          </Typography>
        </TimelineContent>
      </TimelineItem>
    );
  }

  if (searchStatus === SearchStatus.BOOKING) {
    return (
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color="success">
            <BookOnlineIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: "12px", px: 2 }}>
          <Typography variant="h6" component="span">
            Booking in progress...
          </Typography>
        </TimelineContent>
      </TimelineItem>
    );
  }

  if (searchStatus === SearchStatus.STOPPED) {
    return (
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color="error">
            <DoNotDisturbAltIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: "12px", px: 2 }}>
          <Typography variant="h6" component="span">
            Scheduler is stopped..
          </Typography>
        </TimelineContent>
      </TimelineItem>
    );
  }
  return <></>;
};

export default TopTimeLineElement;
