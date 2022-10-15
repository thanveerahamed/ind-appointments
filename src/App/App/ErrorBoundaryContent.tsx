import { Box, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import Lottie from 'lottie-react';
import errorAnimation from '../../assets/lottie/errorMessage.json';

const ErrorBoundaryContent = () => {
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Lottie
          animationData={errorAnimation}
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            width: '50%',
          }}
        />
      </Grid>
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
          <Typography variant="h4">Oh crap!!! IND hates you! :) </Typography>
          <LoadingButton
            sx={{ marginTop: '10px' }}
            variant="contained"
            loading={loading}
            onClick={() => {
              setLoading(true);
              window.location.reload();
            }}
          >
            Try again.
          </LoadingButton>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ErrorBoundaryContent;
