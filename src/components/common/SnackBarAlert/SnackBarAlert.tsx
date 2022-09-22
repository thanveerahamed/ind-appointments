import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../store/store";
import { hideSnackbar } from "../../../store/reducers/alerts";

const SnackBarAlert = () => {
  const dispatch = useAppDispatch();
  const { showSnackBar, snackBarSeverity, snackBarMessage, snackBarOrigin } =
    useSelector((state: RootState) => state.alerts);

  const handleClose = () => {
    dispatch(hideSnackbar());
  };

  return (
    showSnackBar ? (
      <Snackbar
        open={showSnackBar}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={snackBarOrigin}
      >
        <Alert
          onClose={handleClose}
          severity={snackBarSeverity}
          sx={{ width: "100%" }}
        >
          {snackBarMessage}
        </Alert>
      </Snackbar>
    ) : null
  );
};

export default SnackBarAlert;
