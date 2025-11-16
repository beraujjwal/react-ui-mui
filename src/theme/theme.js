// import { createTheme } from "@mui/material/styles";

// const theme = createTheme({
//   palette: {
//     mode: "light", // or 'dark'
//     primary: {
//       main: "#1976d2",
//     },
//     secondary: {
//       main: "#9c27b0",
//     },
//   },
//   typography: {
//     fontFamily: "Roboto, Arial, sans-serif",
//   },
// });

// export default theme;

import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          primary: { main: '#1976d2' },
          secondary: { main: '#9c27b0' },
          background: { default: '#f4f6f8', paper: '#ffffff' },
          text: { primary: '#111827', secondary: '#6b7280' },
        }
      : {
          primary: { main: '#90caf9' },
          secondary: { main: '#ce93d8' },
          background: { default: '#0f172a', paper: '#1e293b' },
          text: { primary: '#f1f5f9', secondary: '#94a3b8' },
        }),
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h1: { fontSize: '2rem', fontWeight: 600 },
    h2: { fontSize: '1.5rem', fontWeight: 600 },
    body1: { fontSize: '1rem' },
  },
  shape: { borderRadius: 12 },
});

const createAppTheme = (mode = 'light') => responsiveFontSizes(createTheme(getDesignTokens(mode)));

export default createAppTheme;
