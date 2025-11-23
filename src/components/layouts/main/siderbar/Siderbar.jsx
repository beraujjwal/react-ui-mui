import React from 'react';
import { Drawer } from '@mui/material';
import SidebarMenu from './SidebarMenu';

import { Box, Typography, Button, Toolbar, IconButton, ListItem, Divider, List } from '../../../common/mui';

const drawerWidth = 240;

const Sidebar = ({ mobileOpen, onDrawerToggle }) => {
  const drawerContent = (
    <div>
      <Toolbar>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          My Dashboard
        </Typography>
      </Toolbar>
      <Divider />
      <SidebarMenu onItemClick={onDrawerToggle} />
    </div>
  );

  return (
    <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { width: drawerWidth },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': { width: drawerWidth },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
