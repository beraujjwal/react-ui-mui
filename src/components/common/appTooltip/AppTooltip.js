import { forwardRef } from "react";
import PropTypes from "prop-types";
import { Tooltip, Box } from "@mui/material";

/**
 * Application styled Tooltip component
 * A reusable wrapper around MUI Tooltip for consistent tooltips across the app.
 *
 * @component AppTooltip
 * @param {node} title - Tooltip text or node to display
 * @param {node} children - The element that triggers the tooltip
 * @param {string} placement - Tooltip position ('top' | 'bottom' | 'left' | 'right' | etc.)
 * @param {boolean} arrow - Whether to show an arrow
 * @param {number} enterDelay - Delay in ms before tooltip appears
 * @param {number} leaveDelay - Delay in ms before tooltip hides
 * @param {boolean} disabled - Disables tooltip
 * @param {object} sx - Custom style overrides
 */
const AppTooltip = forwardRef(
  (
    {
      title,
      children,
      placement = "top",
      arrow = true,
      enterDelay = 300,
      leaveDelay = 100,
      disabled = false,
      sx = {},
      ...restOfProps
    },
    ref
  ) => {
    if (disabled || !title) {
      // If disabled or no title, render children as-is
      return <Box ref={ref}>{children}</Box>;
    }

    return (
      <Tooltip
        ref={ref}
        title={title}
        arrow={arrow}
        placement={placement}
        enterDelay={enterDelay}
        leaveDelay={leaveDelay}
        slotProps={{
          tooltip: {
            sx: {
              borderRadius: 1.5,
              fontSize: "0.75rem",
              fontWeight: 400,
              lineHeight: 1.3,
              px: 1.2,
              py: 0.6,
              bgcolor: "grey.900",
              color: "common.white",
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
              ...sx,
            },
          },
          arrow: {
            sx: {
              color: "grey.900",
            },
          },
        }}
        {...restOfProps}
      >
        <Box
          component="span"
          sx={{ display: "inline-flex", alignItems: "center" }}
        >
          {children}
        </Box>
      </Tooltip>
    );
  }
);

AppTooltip.displayName = "AppTooltip";

AppTooltip.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  children: PropTypes.node.isRequired,
  placement: PropTypes.oneOf([
    "bottom-end",
    "bottom-start",
    "bottom",
    "left-end",
    "left-start",
    "left",
    "right-end",
    "right-start",
    "right",
    "top-end",
    "top-start",
    "top",
  ]),
  arrow: PropTypes.bool,
  enterDelay: PropTypes.number,
  leaveDelay: PropTypes.number,
  disabled: PropTypes.bool,
  sx: PropTypes.object,
};

export default AppTooltip;
