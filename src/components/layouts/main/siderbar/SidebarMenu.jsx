// import React from 'react';
// import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
// import HomeIcon from '@mui/icons-material/Home';
// import PeopleIcon from '@mui/icons-material/People';
// import SettingsIcon from '@mui/icons-material/Settings';
// import { useNavigate, useLocation } from 'react-router-dom';

// const menuItems = [
//   { label: 'Home', path: '/dashboard/home', icon: <HomeIcon /> },
//   { label: 'Users', path: '/dashboard/users', icon: <PeopleIcon /> },
//   { label: 'Settings', path: '/dashboard/settings', icon: <SettingsIcon /> },
// ];

// const SidebarMenu = ({ onItemClick }) => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   return (
//     <List>
//       {menuItems.map(({ label, path, icon }) => (
//         <ListItem
//           button
//           key={label}
//           onClick={() => {
//             navigate(path);
//             if (onItemClick) onItemClick();
//           }}
//           sx={{
//             bgcolor: location.pathname === path ? 'action.selected' : 'inherit',
//             '&:hover': { bgcolor: 'action.hover' },
//           }}
//         >
//           <ListItemIcon>{icon}</ListItemIcon>
//           <ListItemText primary={label} />
//         </ListItem>
//       ))}
//     </List>
//   );
// };

// export default SidebarMenu;


import React, { useState } from 'react';
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from '@mui/material';
import {
  ExpandLess,
  ExpandMore,
  Home as HomeIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  Security as SecurityIcon,
  AccountCircle as AccountIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

// ----------------------------------
// Define your nested menu structure
// ----------------------------------
const menuItems = [
  { label: 'Home', path: '/dashboard/home', icon: <HomeIcon /> },
  {
    label: 'Users',
    icon: <PeopleIcon />,
    children: [
      { label: 'All Users', path: '/dashboard/users' },
      { label: 'Active Users', path: '/dashboard/users/active' },
      { label: 'Suspended Users', path: '/dashboard/users/suspended' },
    ],
  },
  {
    label: 'Settings',
    icon: <SettingsIcon />,
    children: [
      { label: 'Profile', path: '/dashboard/settings/profile', icon: <AccountIcon /> },
      { label: 'Security', path: '/dashboard/settings/security', icon: <SecurityIcon /> },
    ],
  },
];

// ----------------------------------
// Sidebar Menu Component
// ----------------------------------
const SidebarMenu = ({ onItemClick }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState({});

  const handleToggle = (label) => {
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const handleNavigate = (path) => {
    navigate(path);
    if (onItemClick) onItemClick(); // closes sidebar on mobile
  };

  // Recursive rendering
  const renderMenuItems = (items, level = 0) =>
    items.map(({ label, path, icon, children }) => {
      const isOpen = openMenus[label] || false;
      const isActive = location.pathname === path;

      return (
        <React.Fragment key={label}>
          <ListItemButton
            onClick={() => (children ? handleToggle(label) : handleNavigate(path))}
            sx={{
              pl: 2 + level * 2, // indent for nested levels
              bgcolor: isActive ? 'action.selected' : 'inherit',
              '&:hover': { bgcolor: 'action.hover' },
            }}
          >
            {icon && <ListItemIcon>{icon}</ListItemIcon>}
            <ListItemText primary={label} />
            {children && (isOpen ? <ExpandLess /> : <ExpandMore />)}
          </ListItemButton>

          {/* Render children recursively */}
          {children && (
            <Collapse in={isOpen} timeout="auto" unmountOnExit>
              <List disablePadding>
                {renderMenuItems(children, level + 1)}
              </List>
            </Collapse>
          )}
        </React.Fragment>
      );
    });

  return <List>{renderMenuItems(menuItems)}</List>;
};

export default SidebarMenu;
