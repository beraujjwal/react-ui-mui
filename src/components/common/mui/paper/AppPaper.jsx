import { forwardRef } from "react";
import PropTypes from "prop-types";
import { Paper } from "@mui/material";

/**
 * Application styled Paper component
 * A reusable wrapper around MUI Paper with consistent styling and elevation.
 *
 * @component AppPaper
 * @param {node} children - Content inside the paper
 * @param {string} variant - Visual variant ('default', 'outlined', 'elevated', 'flat', 'hoverable')
 * @param {number} elevation - Custom MUI elevation (0–24)
 * @param {boolean} square - Remove border radius
 * @param {boolean} center - Center content horizontally and vertically
 * @param {object} sx - Custom style overrides
 */
const AppPaper = forwardRef(
  (
    {
      children,
      variant = "default",
      elevation = 1,
      square = false,
      center = false,
      sx = {},
      ...restOfProps
    },
    ref
  ) => {
    const variantStyles = {
      default: {
        p: 2.5,
        borderRadius: 2,
        backgroundColor: "background.paper",
        boxShadow: (theme) => theme.shadows[elevation],
      },
      outlined: {
        p: 2.5,
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        backgroundColor: "background.paper",
        boxShadow: "none",
      },
      elevated: {
        p: 2.5,
        borderRadius: 2,
        backgroundColor: "background.paper",
        boxShadow: (theme) => theme.shadows[Math.min(elevation, 8)],
      },
      flat: {
        p: 2,
        borderRadius: 2,
        backgroundColor: "transparent",
        boxShadow: "none",
      },
      hoverable: {
        p: 2.5,
        borderRadius: 2,
        backgroundColor: "background.paper",
        boxShadow: (theme) => theme.shadows[elevation],
        transition: "all 0.2s ease",
        "&:hover": {
          boxShadow: (theme) => theme.shadows[elevation + 2],
          transform: "translateY(-2px)",
        },
      },
    };

    return (
      <Paper
        ref={ref}
        elevation={variant === "outlined" ? 0 : elevation}
        square={square}
        sx={{
          display: center ? "flex" : undefined,
          alignItems: center ? "center" : undefined,
          justifyContent: center ? "center" : undefined,
          ...variantStyles[variant],
          ...sx,
        }}
        {...restOfProps}
      >
        {children}
      </Paper>
    );
  }
);

AppPaper.displayName = "AppPaper";

AppPaper.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf([
    "default",
    "outlined",
    "elevated",
    "flat",
    "hoverable",
  ]),
  elevation: PropTypes.number,
  square: PropTypes.bool,
  center: PropTypes.bool,
  sx: PropTypes.object,
};

export default AppPaper;
