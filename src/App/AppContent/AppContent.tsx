import Box from '@mui/material/Box';
import Home from '../../views/Home/Home';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Privacy from '../../views/Privacy/Privacy';
import AppBar from '../AppBar/AppBar';
import React from 'react';
import { Container } from '@mui/material';
import AppFooter from '../AppFooter/AppFooter';
import ScrollToTop from '../../components/common/ScrollToTop/ScrollToTop';

const AppContent = () => {
  return (
    <Box sx={{ margin: '10px' }}>
      <BrowserRouter>
        <ScrollToTop />
        <AppBar />
        <Container maxWidth="xl">
          <Routes>
            <Route element={<Home />} path="/"></Route>
            <Route element={<Privacy />} path="/privacy"></Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Container>
        <AppFooter />
      </BrowserRouter>
    </Box>
  );
};

export default AppContent;
