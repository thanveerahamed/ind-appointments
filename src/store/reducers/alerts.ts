import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SnackbarOrigin } from "@mui/material/Snackbar";
import { AlertColor } from "@mui/material/Alert/Alert";

const defaultAlertSeverity: AlertColor = "error";
const defaultSnackBarOrigin: SnackbarOrigin = {
  vertical: "top",
  horizontal: "center",
};

const initialState: {
  showSnackBar: boolean;
  snackBarMessage: string;
  snackBarOrigin: SnackbarOrigin;
  snackBarSeverity: AlertColor;
  snackBarAutoHideDuration: number;
} = {
  showSnackBar: false,
  snackBarMessage: "",
  snackBarOrigin: defaultSnackBarOrigin,
  snackBarSeverity: defaultAlertSeverity,
  snackBarAutoHideDuration: 3000,
};

export const alertsSlice = createSlice({
  name: "alerts",
  initialState,
  reducers: {
    showSnackbar: (
      state,
      action: PayloadAction<{
        message: string;
        origin?: SnackbarOrigin;
        severity?: AlertColor;
      }>
    ) => {
      state.showSnackBar = true;
      state.snackBarMessage = action.payload.message;
      if (action.payload.origin !== undefined) {
        state.snackBarOrigin = action.payload.origin;
      }
      if (action.payload.severity !== undefined) {
        state.snackBarSeverity = action.payload.severity;
      }
    },
    hideSnackbar: (state) => {
      state.showSnackBar = false;
      state.snackBarMessage = "";
      state.snackBarOrigin = defaultSnackBarOrigin;
      state.snackBarSeverity = defaultAlertSeverity;
    },
  },
});

// Action creators are generated for each case reducer function
export const { showSnackbar, hideSnackbar } = alertsSlice.actions;
