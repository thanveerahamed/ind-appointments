import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";

interface Props {
    onChangeFilter: () => void
}

const MobileLoading = ({onChangeFilter}: Props) => {
  return (
    <Box sx={{ textAlign: 'center', marginTop: "80px" }}>
      <Typography variant="h6">No slots found for current criteria.</Typography>
        <Button sx={{marginTop: "20px"}} variant="outlined" onClick={onChangeFilter}>Change filters</Button>
    </Box>
  );
};

export default MobileLoading;
