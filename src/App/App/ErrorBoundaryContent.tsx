import { Box, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { ErrorInfo, useEffect, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import Lottie from 'lottie-react';
import errorAnimation from '../../assets/lottie/errorMessage.json';
import loadingAnimation from '../../assets/lottie/loading.json';
import ReactGA from 'react-ga';
import * as amplitude from '@amplitude/analytics-browser';
import { useAnalyticsExceptionTracker } from '../../hooks/useAnalyticsExceptionTracker';

interface Props {
  error?: Error;
  errorInfo?: ErrorInfo;
}

const ErrorBoundaryContent = ({ error, errorInfo }: Props) => {
  const trackException = useAnalyticsExceptionTracker();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    ReactGA.pageview('error-screen');
    if (error !== undefined || errorInfo !== undefined) {
      trackException(error?.message ?? 'Unknown error');

      const eventName = 'Appointment type changed';
      const eventProperties = {
        error,
        errorInfo,
      };
      amplitude.logEvent(eventName, eventProperties);
      amplitude.track(eventName, eventProperties);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box
          sx={{
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
            width: '50%',
            textAlign: 'center',
          }}
        >
          {loading ? (
            <>
              <Lottie
                animationData={loadingAnimation}
                style={{
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              />
            </>
          ) : (
            <>
              <Lottie
                animationData={errorAnimation}
                style={{
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              />
              <Typography variant="h4">Oh crap!!! IND hates you! 😅</Typography>
              <LoadingButton
                sx={{ marginTop: '10px' }}
                variant="contained"
                loading={loading}
                onClick={() => {
                  setLoading(true);
                  setTimeout(() => window.location.reload(), 2000);
                }}
              >
                Try again.
              </LoadingButton>
            </>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default ErrorBoundaryContent;
