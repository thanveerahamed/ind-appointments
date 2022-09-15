import React from "react";
import AppBar from "../AppBar/AppBar";
import AppContent from "../AppContent/AppContent";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AppBar></AppBar>
      <AppContent></AppContent>
    </ThemeProvider>
  );
}

export default App;
