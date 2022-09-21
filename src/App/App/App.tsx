import React from "react";
import AppBar from "../AppBar/AppBar";
import AppContent from "../AppContent/AppContent";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import store from "../../store/store";
import { Provider } from "react-redux";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <AppBar></AppBar>
        <AppContent></AppContent>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
