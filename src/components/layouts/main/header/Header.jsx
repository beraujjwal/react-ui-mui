// 

import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Tooltip,
  Box,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  Stack,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useColorMode } from '../../../../theme/ThemeProvider';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch } from '../../../../hooks/reduxHooks';
import { doLogout } from '../../../../store/slices/authSlice';

const Header = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { toggleColorMode } = useColorMode();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // You can get this from context, redux, or API
  const user = { name: 'Ujjwal Bera', avatar: '' };

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleProfile = () => {
    console.log('Go to profile');
    handleMenuClose();
  };

  const handleSettings = () => {
    console.log('Go to settings');
    handleMenuClose();
  };

  const handleLogout = () => {
    console.log('Logging out...');
    handleMenuClose();
    dispatch(doLogout());
    navigate('/auth/login');
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        {/* Mobile Menu Icon */}
        <IconButton
          color="inherit"
          edge="start"
          onClick={onMenuClick}
          sx={{ mr: 2, display: { md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>

        {/* App Title */}
        <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
          Dashboard
        </Typography>

        {/* Right Side - User */}
        <Box>
          <Tooltip title="Account settings">
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{
                cursor: 'pointer',
                color: 'inherit',
              }}
              onClick={handleMenuOpen}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <Avatar
                sx={{ width: 32, height: 32 }}
                src={user.avatar}
                alt={user.name}
              >
                {!user.avatar && <AccountCircleIcon />}
              </Avatar>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 500,
                  display: { xs: 'none', sm: 'block' }, // hide name on small screens
                }}
              >
                {user.name}
              </Typography>
            </Stack>
          </Tooltip>

          {/* Dropdown Menu */}
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleMenuClose}
            onClick={handleMenuClose}
            PaperProps={{
              elevation: 3,
              sx: {
                mt: 1.5,
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.2))',
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={toggleColorMode}>
              <ListItemIcon>
                <Brightness4Icon fontSize="small" />
              </ListItemIcon>
              Toggle Theme
            </MenuItem>

            <MenuItem onClick={handleProfile}>
              <ListItemIcon>
                <AccountCircleIcon fontSize="small" />
              </ListItemIcon>
              Profile
            </MenuItem>

            <MenuItem onClick={handleSettings}>
              <ListItemIcon>
                <SettingsIcon fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>

            <Divider />

            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" color="error" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

