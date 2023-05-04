import * as React from 'react';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import { GitHub } from '@mui/icons-material';

export default function AppBar() {
  const handleContributeClick = () => {
    window.open('https://github.com/thanveerahamed/ind-appointments', '_blank');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <MuiAppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            IND Appointments
          </Typography>
          <Box sx={{ display: { md: 'flex' } }}>
            <IconButton
              size="large"
              aria-label="contribute"
              color="inherit"
              onClick={handleContributeClick}
            >
              <GitHub />
            </IconButton>
          </Box>
        </Toolbar>
      </MuiAppBar>
    </Box>
  );
}
