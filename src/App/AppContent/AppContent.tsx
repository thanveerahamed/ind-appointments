import Box from '@mui/material/Box';
import Home from '../../components/Home/Home';
import { useEffect } from 'react';
import ReactGA from 'react-ga';

const AppContent = () => {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <Box sx={{ margin: '10px' }}>
      <Home />
    </Box>
  );
};

export default AppContent;
