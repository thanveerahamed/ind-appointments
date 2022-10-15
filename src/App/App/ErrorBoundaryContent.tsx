import { Box, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import Lottie from 'lottie-react';
import errorAnimation from '../../assets/lottie/errorMessage.json';
import loadingAnimation from '../../assets/lottie/loading.json';

const ErrorBoundaryContent = () => {
  const [loading, setLoading] = useState<boolean>(false);
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
              <Typography variant="h4">
                Oh crap!!! IND hates you! 😅
              </Typography>
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
