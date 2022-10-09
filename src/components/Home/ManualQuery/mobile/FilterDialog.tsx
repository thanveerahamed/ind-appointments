import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SlideTransition from '../../../common/transition/Slide';
import { Box } from '@mui/material';
import FilterForm from '../../../common/FilterSection/FilterForm';

interface Props {
  open: boolean;
  handleClose: () => void;
}

const FilterDialog = ({ open, handleClose }: Props) => {
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={SlideTransition}
    >
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Filters
          </Typography>
          <Button autoFocus color="inherit" onClick={handleClose}>
            close
          </Button>
        </Toolbar>
      </AppBar>
      <Box sx={{
          margin: "20px 5px 0"
      }}>
        <FilterForm />
      </Box>
    </Dialog>
  );
};

export default FilterDialog;
