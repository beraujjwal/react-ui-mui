import React from 'react';
import { Box, Container } from '@mui/material';

const Content = ({ children }) => {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        mt: 8,           // space for AppBar height
        p: 3,            // default padding
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.background.default,
        minHeight: '100vh',
      }}
    >
      <Container maxWidth="xl">{children}</Container>
    </Box>
  );
};

export default Content;
