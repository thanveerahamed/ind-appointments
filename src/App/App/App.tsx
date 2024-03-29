import React from 'react';
import AppContent from '../AppContent/AppContent';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import store from '../../store/store';
import { Provider } from 'react-redux';
import ErrorBoundary from './ErrorBoundary';
import ReactGA from 'react-ga';

const TRACKING_ID = 'UA-264554107-1';
ReactGA.initialize(TRACKING_ID);

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <AppContent></AppContent>
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
