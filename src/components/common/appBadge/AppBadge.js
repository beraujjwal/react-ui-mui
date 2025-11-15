import { forwardRef } from "react";
import PropTypes from "prop-types";
import { Badge } from "@mui/material";

/**
 * Application styled Badge component
 * Note: forwardRef allows AppBadge to be used inside icons, toolbars, or transitions.
 * @component AppBadge
 *
 * @param {number|string} badgeContent - Content inside the badge (e.g. number or text)
 * @param {string} color - Color of the badge (primary, secondary, error, info, success, warning)
 * @param {string} variant - Variant of the badge ('standard' | 'dot')
 * @param {object} sx - Custom style overrides for Badge
 * @param {node} children - The wrapped child (e.g. Icon, Avatar, Button)
 */
const AppBadge = forwardRef(
  (
    {
      badgeContent,
      color = "primary",
      variant = "standard",
      anchorOrigin = { vertical: "top", horizontal: "right" },
      overlap = "rectangular",
      sx = {},
      children,
      ...restOfProps
    },
    ref
  ) => {
    return (
      <Badge
        ref={ref}
        badgeContent={badgeContent}
        color={color}
        variant={variant}
        overlap={overlap}
        anchorOrigin={anchorOrigin}
        sx={{
          "& .MuiBadge-badge": {
            fontWeight: 600,
            fontSize: "0.75rem",
            minWidth: 20,
            height: 20,
            border: "2px solid #fff",
          },
          ...sx,
        }}
        {...restOfProps}
      >
        {children}
      </Badge>
    );
  }
);

AppBadge.displayName = "AppBadge";

AppBadge.propTypes = {
  badgeContent: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.oneOf([
    "default",
    "primary",
    "secondary",
    "error",
    "info",
    "success",
    "warning",
  ]),
  variant: PropTypes.oneOf(["standard", "dot"]),
  anchorOrigin: PropTypes.shape({
    vertical: PropTypes.oneOf(["top", "bottom"]),
    horizontal: PropTypes.oneOf(["left", "right"]),
  }),
  overlap: PropTypes.oneOf(["rectangular", "circular"]),
  sx: PropTypes.object,
  children: PropTypes.node.isRequired,
};

export default AppBadge;
