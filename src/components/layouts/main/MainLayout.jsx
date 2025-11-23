// import React from 'react';
// import {
//   Drawer,
//   AppBar,
//   ListItemText,
// } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import { useColorMode } from '../../../theme/ThemeProvider';
// import InboxIcon from "@mui/icons-material/Inbox";


// import { Box, Typography, Button, Toolbar, IconButton, ListItem, Divider, List } from '../../common/mui';



// const drawerWidth = 240;

// const DashboardLayout = ({ children }) => {
//   const [mobileOpen, setMobileOpen] = React.useState(false);
//   const { toggleColorMode } = useColorMode();

//   const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

//   const drawer = (
//     <div>
//       <Toolbar>
//         <Typography variant="h6">My Dashboard</Typography>
//       </Toolbar>
//       <Divider />
//       <List variant="hoverable">
//         {['Home', 'Users', 'Settings'].map((text) => (
//           <ListItem label={text} active icon={<InboxIcon />} key={text}>
//             <ListItemText label={text}  primary={text} />
//           </ListItem>
//         ))}
//       </List>
//     </div>
//   );

//   return (
//     <Box sx={{ display: 'flex' }}>
//       <AppBar position="fixed" sx={{ zIndex: 1201 }}>
//         <Toolbar>
//           <IconButton color="inherit" edge="start" onClick={handleDrawerToggle}>
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" sx={{ flexGrow: 1 }}>
//             Dashboard
//           </Typography>
//           <Button color="inherit" onClick={toggleColorMode}>
//             Toggle Theme
//           </Button>
//         </Toolbar>
//       </AppBar>

//       <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
//         <Drawer
//           variant="temporary"
//           open={mobileOpen}
//           onClose={handleDrawerToggle}
//           ModalProps={{ keepMounted: true }}
//           sx={{
//             display: { xs: 'block', md: 'none' },
//             '& .MuiDrawer-paper': { width: drawerWidth },
//           }}
//         >
//           {drawer}
//         </Drawer>
//         <Drawer
//           variant="permanent"
//           sx={{
//             display: { xs: 'none', md: 'block' },
//             '& .MuiDrawer-paper': { width: drawerWidth },
//           }}
//           open
//         >
//           {drawer}
//         </Drawer>
//       </Box>

//       <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
//         {children}
//       </Box>
//     </Box>
//   );
// };

// export default DashboardLayout;


import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import Header from './header/Header';
import Sidebar from './siderbar/Siderbar';
import Content from './content/Content';
import { Outlet } from 'react-router-dom'; // if using nested routes

import useIdleTime from "../../../hooks/useIdleTimer"; // adjust the path

const DashboardLayout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  // const handleUserIdle = () => {
  //   alert("You have been idle for too long. Logging out...");
  //   localStorage.removeItem("auth_token");
  //   window.location.href = "/login";
  // };

  // const { getRemainingTime, getLastActiveTime, isIdle } = useIdleTime({
  //   onIdle: handleUserIdle,
  //   idleTime: 1,
  // });

  // useEffect(() => {
  //   if (isIdle) {
  //     let timer = setTimeout(() => {
  //       handleUserIdle();
  //     }, 10000); // give 10 seconds before logout
  //     return () => clearTimeout(timer);
  //   }
  // }, [isIdle]);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Header */}
      <Header onMenuClick={handleDrawerToggle} />

      {/* Sidebar */}
      <Sidebar mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} />

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        {/* Either Outlet (for routes) or children (manual) */}
        <Content>
          {children || <Outlet />}
        </Content>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
