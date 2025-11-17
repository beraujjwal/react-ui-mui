import { forwardRef } from "react";
import PropTypes from "prop-types";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";

/**
 * Application styled ListItem component
 * A reusable wrapper around MUI ListItem for consistent navigation and action lists.
 *
 * @component AppListItem
 * @param {string|node} label - Text label of the list item
 * @param {node} icon - Optional icon element
 * @param {boolean} active - Highlight item as active
 * @param {boolean} dense - Compact spacing
 * @param {boolean} disabled - Disable interaction
 * @param {boolean} divider - Adds a bottom border divider
 * @param {boolean} button - Makes item clickable
 * @param {function} onClick - Click handler
 * @param {string} tooltip - Optional tooltip text
 * @param {string|node} secondary - Secondary text under main label
 * @param {object} sx - Custom style overrides
 */
const AppListItem = forwardRef(
  (
    {
      label,
      icon,
      active = false,
      dense = false,
      disabled = false,
      divider = false,
      button = true,
      onClick,
      tooltip,
      secondary,
      sx = {},
      ...restOfProps
    },
    ref
  ) => {
    const content = (
      <ListItemButton
        ref={ref}
        disabled={disabled}
        selected={active}
        onClick={onClick}
        dense={dense}
        sx={{
          borderRadius: 1,
          py: dense ? 0.5 : 1,
          px: 2,
          minHeight: dense ? 40 : 48,
          backgroundColor: active ? "action.selected" : "transparent",
          "&:hover": {
            backgroundColor: !disabled && "action.hover",
          },
          "&.Mui-selected": {
            backgroundColor: "action.selected",
            "&:hover": {
              backgroundColor: "action.selectedHover",
            },
          },
          "& .MuiListItemIcon-root": {
            minWidth: 36,
            color: active ? "primary.main" : "text.secondary",
          },
          "& .MuiListItemText-primary": {
            fontWeight: active ? 600 : 400,
            color: active ? "primary.main" : "text.primary",
          },
          transition: "all 0.15s ease",
          ...sx,
        }}
        {...restOfProps}
      >
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        <ListItemText
          primary={label}
          secondary={secondary}
          primaryTypographyProps={{
            variant: "body2",
            noWrap: true,
          }}
          secondaryTypographyProps={{
            variant: "caption",
            color: "text.secondary",
          }}
        />
      </ListItemButton>
    );

    return (
      <ListItem
        disablePadding
        divider={divider}
        sx={{
          "&.MuiListItem-divider": {
            borderColor: "divider",
          },
        }}
      >
        {tooltip ? <Tooltip title={tooltip}>{content}</Tooltip> : content}
      </ListItem>
    );
  }
);

AppListItem.displayName = "AppListItem";

AppListItem.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  icon: PropTypes.node,
  active: PropTypes.bool,
  dense: PropTypes.bool,
  disabled: PropTypes.bool,
  divider: PropTypes.bool,
  button: PropTypes.bool,
  onClick: PropTypes.func,
  tooltip: PropTypes.string,
  secondary: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  sx: PropTypes.object,
};

export default AppListItem;
