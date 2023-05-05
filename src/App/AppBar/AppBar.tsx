import * as React from 'react';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Container, IconButton, Menu, Tooltip } from '@mui/material';
import { GitHub } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAnalyticsEventTracker } from '../../hooks/useAnalyticsEventTracker';

export default function AppBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const trackEvent = useAnalyticsEventTracker('Footer');
  const handleContributeClick = () => {
    trackEvent('button_contribute_clicked', '');
    window.open('https://github.com/thanveerahamed/ind-appointments', '_blank');
  };

  const handleOpenInNewTabClick = () => {
    trackEvent('button_open_in_new_tab_clicked', '');
    window.open('https://ind-appointments.web.app/', '_blank');
  };

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null,
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleMenuClicked = (path: string) => {
    navigate(path);
    setAnchorElNav(null);
  };

  const isEmbedded = () => window.location !== window.parent.location;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <MuiAppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                color: 'inherit',
                textDecoration: 'none',
                fontFamily: 'monospace',
              }}
            >
              IND Appointments
            </Typography>

            {location.pathname !== '/' && (
              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="contribute"
                  color="inherit"
                  onClick={handleOpenNavMenu}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
                  <MenuItem onClick={() => handleMenuClicked('/')}>
                    <Typography textAlign="center">Dashboard</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            )}

            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                color: 'inherit',
                fontFamily: 'monospace',
                textDecoration: 'none',
                fontSize: '16px',
              }}
            >
              IND Appointments
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {location.pathname !== '/' && (
                <Button
                  sx={{ my: 2, color: 'white', display: 'block' }}
                  onClick={() => handleMenuClicked('/')}
                >
                  Dashboard
                </Button>
              )}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              {isEmbedded() && (
                <Tooltip title="Open in new tab">
                  <IconButton
                    size="large"
                    aria-label="contribute"
                    color="inherit"
                    onClick={handleOpenInNewTabClick}
                  >
                    <OpenInNewIcon />
                  </IconButton>
                </Tooltip>
              )}

              <Tooltip title="Contribute">
                <IconButton
                  size="large"
                  aria-label="contribute"
                  color="inherit"
                  onClick={handleContributeClick}
                >
                  <GitHub />
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </Container>
      </MuiAppBar>
    </Box>
  );
}
