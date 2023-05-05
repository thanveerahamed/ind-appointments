import { Box, Divider, Link } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { useAnalyticsEventTracker } from '../../hooks/useAnalyticsEventTracker';

const AppFooter = () => {
  const navigate = useNavigate();
  const trackEvent = useAnalyticsEventTracker('Footer');

  return (
    <>
      <Divider />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          margin: '10px',
        }}
      >
        <Typography variant="subtitle1">
          Created by{' '}
          {/*
          eslint-disable-next-line react/jsx-no-target-blank
           */}
          <a
            href="https://github.com/thanveerahamed"
            target="_blank"
            style={{
              textDecoration: 'none',
              fontWeight: 'bold',
              color: 'inherit',
            }}
            onClick={() => trackEvent('profile_opened', '')}
          >
            Thanveer
          </a>
        </Typography>
        <Link
          sx={{
            textDecoration: 'none',
            fontWeight: 'bold',
            color: 'inherit',
            cursor: 'pointer',
          }}
          onClick={() => navigate('/privacy')}
        >
          Privacy
        </Link>
      </Box>
    </>
  );
};

export default AppFooter;
