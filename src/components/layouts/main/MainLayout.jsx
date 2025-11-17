import React from 'react';
import {
  Drawer,
  AppBar,
  ListItemText,
  List,
  ListItem
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useColorMode } from '../../../theme/ThemeProvider';
import InboxIcon from "@mui/icons-material/Inbox";
import AppBox from '../../common/box/AppBox';
import AppTypography from '../../common/typography/AppTypography';
import AppButton from '../../common/button/AppButton';
import AppToolbar from '../../common/toolbar/AppToolbar';
import AppIconButton from '../../common/iconButton/AppIconButton';
import AppListItem from '../../common/listItem/AppListItem';
import AppDivider from '../../common/divider/AppDivider';
import AppList from '../../common/list/AppList';



const drawerWidth = 240;

const DashboardLayout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { toggleColorMode } = useColorMode();

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const drawer = (
    <div>
      <AppToolbar>
        <AppTypography variant="h6">My Dashboard</AppTypography>
      </AppToolbar>
      <AppDivider />
      <AppList variant="hoverable">
        {['Home', 'Users', 'Settings'].map((text) => (
          <AppListItem label={text} active icon={<InboxIcon />} key={text}>
            <ListItemText label={text}  primary={text} />
          </AppListItem>
        ))}
      </AppList>
    </div>
  );

  return (
    <AppBox sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: 1201 }}>
        <AppToolbar>
          <AppIconButton color="inherit" edge="start" onClick={handleDrawerToggle}>
            <MenuIcon />
          </AppIconButton>
          <AppTypography variant="h6" sx={{ flexGrow: 1 }}>
            Dashboard
          </AppTypography>
          <AppButton color="inherit" onClick={toggleColorMode}>
            Toggle Theme
          </AppButton>
        </AppToolbar>
      </AppBar>

      <AppBox component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </AppBox>

      <AppBox component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        {children}
      </AppBox>
    </AppBox>
  );
};

export default DashboardLayout;
