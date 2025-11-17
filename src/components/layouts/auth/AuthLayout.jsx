// import React from 'react';
// import AppPaper from '../../common/paper/AppPaper';
// import AppContainer from '../../common/container/AppContainer';
// import AppBox from '../../common/box/AppBox';
// import AppTypography from '../../common/typography/AppTypography';



// const AuthLayout = ({ children, title = 'Welcome Back' }) => {
//   return (
//     <AppContainer maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
//       <AppPaper elevation={3} sx={{ p: 4, width: '100%', borderRadius: 3 }}>
//         <AppTypography variant="h4" align="center" gutterBottom>
//           {title}
//         </AppTypography>
//         <AppBox mt={2}>{children}</AppBox>
//       </AppPaper>
//     </AppContainer>
//   );
// };

// export default AuthLayout;



// import React from 'react';
// import {
//   Drawer,
//   AppBar,
//   ListItemText,
// } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import { useColorMode } from '../../../theme/ThemeProvider';

// import AppBox from '../../common/box/AppBox';
// import AppTypography from '../../common/typography/AppTypography';
// import AppButton from '../../common/button/AppButton';
// import AppToolbar from '../../common/toolbar/AppToolbar';
// import AppIconButton from '../../common/iconButton/AppIconButton';
// import AppListItem from '../../common/listItem/AppListItem';
// import AppDivider from '../../common/divider/AppDivider';
// import AppList from '../../common/list';

// const drawerWidth = 240;

// const Aimport React from 'react';
// import AppPaper from '../../common/paper/AppPaper';
// import AppContainer from '../../common/container/AppContainer';
// import AppBox from '../../common/box/AppBox';
// import AppTypography from '../../common/typography/AppTypography';



// const AuthLayout = ({ children, title = 'Welcome Back' }) => {
//   return (
//     <AppContainer maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
//       <AppPaper elevation={3} sx={{ p: 4, width: '100%', borderRadius: 3 }}>
//         <AppTypography variant="h4" align="center" gutterBottom>
//           {title}
//         </AppTypography>
//         <AppBox mt={2}>{children}</AppBox>
//       </AppPaper>
//     </AppContainer>
//   );
// };

// export default AuthLayout;
import React from "react";
import { Outlet } from "react-router-dom";
import { Box, Container } from "@mui/material";

const AuthLayout = () => {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center" }}>
      <Container maxWidth="sm">
        <Outlet />
      </Container>
    </Box>
  );
};

export default AuthLayout;
