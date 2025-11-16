import { forwardRef, useState } from "react";
import PropTypes from "prop-types";
import {
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  Typography,
  IconButton,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

/**
 * Application styled Menu component
 * Wraps MUI Menu for consistent styling and behavior.
 *
 * @component AppMenu
 * @param {array} items - Menu item list (label, icon, onClick, divider)
 * @param {node} trigger - Custom trigger element (optional, defaults to IconButton)
 * @param {string} anchorOrigin - Menu anchor origin (MUI position object)
 * @param {string} transformOrigin - Menu transform origin (MUI position object)
 * @param {object} sx - Custom style overrides
 */
const AppMenu = forwardRef(
  (
    {
      items = [],
      trigger,
      anchorOrigin = { vertical: "bottom", horizontal: "right" },
      transformOrigin = { vertical: "top", horizontal: "right" },
      sx = {},
      menuItemSx = {},
      iconButtonProps = {},
      ...restOfProps
    },
    ref
  ) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleOpen = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const handleItemClick = (action) => {
      handleClose();
      if (typeof action === "function") action();
    };

    return (
      <>
        {trigger ? (
          <span ref={ref} onClick={handleOpen}>
            {trigger}
          </span>
        ) : (
          <IconButton
            ref={ref}
            onClick={handleOpen}
            color="inherit"
            {...iconButtonProps}
          >
            <MoreVertIcon />
          </IconButton>
        )}

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={anchorOrigin}
          transformOrigin={transformOrigin}
          PaperProps={{
            elevation: 4,
            sx: {
              borderRadius: 2,
              minWidth: 180,
              mt: 1,
              py: 0.5,
              ...sx,
            },
          }}
          {...restOfProps}
        >
          {items.map((item, index) => {
            if (item.divider) {
              return <Divider key={`divider-${index}`} />;
            }

            return (
              <MenuItem
                key={index}
                onClick={() => handleItemClick(item.onClick)}
                disabled={item.disabled}
                sx={{
                  px: 2,
                  py: 1,
                  gap: 1.5,
                  "&:hover": {
                    backgroundColor: "action.hover",
                  },
                  ...menuItemSx,
                }}
              >
                {item.icon && (
                  <ListItemIcon sx={{ minWidth: 30 }}>{item.icon}</ListItemIcon>
                )}
                <Typography variant="body2" fontWeight={500}>
                  {item.label}
                </Typography>
              </MenuItem>
            );
          })}
        </Menu>
      </>
    );
  }
);

AppMenu.displayName = "AppMenu";

AppMenu.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      icon: PropTypes.node,
      onClick: PropTypes.func,
      disabled: PropTypes.bool,
      divider: PropTypes.bool,
    })
  ).isRequired,
  trigger: PropTypes.node,
  anchorOrigin: PropTypes.object,
  transformOrigin: PropTypes.object,
  sx: PropTypes.object,
  menuItemSx: PropTypes.object,
  iconButtonProps: PropTypes.object,
};

export default AppMenu;
