import React from "react";
import AppBar from "../AppBar/AppBar";
import AppContent from "../AppContent/AppContent";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import store from "../../store/store";
import { Provider } from "react-redux";
import ErrorBoundary from "./ErrorBoundary";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <AppBar></AppBar>
          <AppContent></AppContent>
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
