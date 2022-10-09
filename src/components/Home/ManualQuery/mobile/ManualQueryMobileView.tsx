import * as React from 'react';
import { Box, Fab } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import FilterDialog from './FilterDialog';
import { makeFilterQueryText } from '../../../../helpers/filters';

interface Props {
  loading: boolean;
  setLoading: (flag: boolean) => void;
}

const ManualQueryMobileView = ({ loading, setLoading }: Props) => {
  const [openFilterDialog, setOpenFilterDialog] = React.useState(false);
  const { filters } = useSelector((state: RootState) => state);

  return (
    <Box sx={{ margin: '5px' }}>
      <Typography variant="body1">{makeFilterQueryText(filters)}</Typography>
      <FilterDialog
        open={openFilterDialog}
        handleClose={() => setOpenFilterDialog(false)}
      />
      <Fab
        sx={{
          position: 'absolute',
          bottom: 16,
          right: 16,
        }}
        color="primary"
        aria-label="filter"
        onClick={() => setOpenFilterDialog(true)}
      >
        <FilterAltIcon />
      </Fab>
    </Box>
  );
};

export default ManualQueryMobileView;
