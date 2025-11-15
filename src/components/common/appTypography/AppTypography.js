import { forwardRef } from "react";
import PropTypes from "prop-types";
import { Typography } from "@mui/material";

/**
 * Application styled Typography component
 * A reusable wrapper around MUI Typography for consistent text styling.
 *
 * @component AppTypography
 * @param {string} variant - MUI typography variant ('h1', 'h2', 'body1', etc.)
 * @param {string} color - MUI color ('primary', 'secondary', 'textPrimary', etc.)
 * @param {number|string} fontWeight - Font weight (e.g., 400, 500, 'bold')
 * @param {string|number} gutterBottom - Add space below text
 * @param {boolean} noWrap - Whether to truncate text with ellipsis
 * @param {boolean} underline - Underline text
 * @param {boolean} italic - Italicize text
 * @param {boolean} uppercase - Transform text to uppercase
 * @param {object} sx - Custom style overrides
 * @param {node} children - Text or node to display
 */
const AppTypography = forwardRef(
  (
    {
      variant = "body1",
      color = "text.primary",
      fontWeight = "normal",
      gutterBottom = false,
      noWrap = false,
      underline = false,
      italic = false,
      uppercase = false,
      align = "inherit",
      sx = {},
      children,
      ...restOfProps
    },
    ref
  ) => {
    return (
      <Typography
        ref={ref}
        variant={variant}
        color={color}
        align={align}
        gutterBottom={gutterBottom}
        noWrap={noWrap}
        sx={{
          fontWeight,
          textDecoration: underline ? "underline" : "none",
          fontStyle: italic ? "italic" : "normal",
          textTransform: uppercase ? "uppercase" : "none",
          lineHeight: 1.4,
          letterSpacing: "0.01em",
          ...sx,
        }}
        {...restOfProps}
      >
        {children}
      </Typography>
    );
  }
);

AppTypography.displayName = "AppTypography";

AppTypography.propTypes = {
  variant: PropTypes.oneOf([
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "subtitle1",
    "subtitle2",
    "body1",
    "body2",
    "caption",
    "button",
    "overline",
  ]),
  color: PropTypes.string,
  fontWeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  gutterBottom: PropTypes.bool,
  noWrap: PropTypes.bool,
  underline: PropTypes.bool,
  italic: PropTypes.bool,
  uppercase: PropTypes.bool,
  align: PropTypes.oneOf(["inherit", "left", "center", "right", "justify"]),
  sx: PropTypes.object,
  children: PropTypes.node.isRequired,
};

export default AppTypography;
