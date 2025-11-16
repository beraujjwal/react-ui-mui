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



import React from 'react';
import {
  Drawer,
  AppBar,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useColorMode } from '../../../theme/ThemeProvider';

import AppBox from '../../common/box/AppBox';
import AppTypography from '../../common/typography/AppTypography';
import AppButton from '../../common/button/AppButton';
import AppToolbar from '../../common/toolbar/AppToolbar';
import AppIconButton from '../../common/iconButton/AppIconButton';
import AppListItem from '../../common/listItem/AppListItem';
import AppDivider from '../../common/divider/AppDivider';
import { AppList} from '../../common/list';



const drawerWidth = 240;

const AuthLayout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { toggleColorMode } = useColorMode();

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const drawer = (
    <div>
      <AppToolbar>
        <AppTypography variant="h6">My Dashboard</AppTypography>
      </AppToolbar>
      <AppDivider />
      <AppList>
        {['Home', 'Users', 'Settings'].map((text) => (
          <AppListItem button key={text}>
            <ListItemText primary={text} />
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

export default AuthLayout;
