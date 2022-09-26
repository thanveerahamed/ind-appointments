import { Box, Grid } from "@mui/material";
import ErrorImage from "../../assets/images/error.png";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";

const ErrorBoundaryContent = () => {
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <div
          style={{
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            width: "250px",
          }}
        >
          <img src={ErrorImage} width="100%" height="100%" alt="error"></img>
        </div>
      </Grid>
      <Grid item xs={12}>
        <Box
          sx={{
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            width: "50%",
          }}
        >
          <Typography variant="h4">Oh crap!!! IND hates you! :) </Typography>
          <LoadingButton
            sx={{ marginTop: "10px" }}
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
