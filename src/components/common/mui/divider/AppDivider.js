import { forwardRef } from "react";
import PropTypes from "prop-types";
import { Divider, Typography, Box } from "@mui/material";

/**
 * Application styled Divider component
 * A reusable wrapper around MUI Divider with consistent spacing, optional text, and theming.
 *
 * @component AppDivider
 * @param {string|node} label - Optional label text or element to display on the divider
 * @param {string} orientation - Divider orientation ('horizontal' | 'vertical')
 * @param {string} variant - MUI variant ('fullWidth' | 'inset' | 'middle')
 * @param {string} color - Divider color (uses MUI theme palette)
 * @param {object} sx - Custom style overrides
 */
const AppDivider = forwardRef(
  (
    {
      label,
      orientation = "horizontal",
      variant = "fullWidth",
      color = "divider",
      textAlign = "center",
      sx = {},
      ...restOfProps
    },
    ref
  ) => {
    const hasLabel = Boolean(label);

    if (hasLabel) {
      return (
        <Box
          ref={ref}
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            my: 1.5,
            ...sx,
          }}
          {...restOfProps}
        >
          <Divider
            sx={{
              flexGrow: 1,
              bgcolor: color,
              borderBottomWidth: 2,
            }}
          />
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              px: 1.5,
              textTransform: "uppercase",
              fontWeight: 500,
              whiteSpace: "nowrap",
              textAlign,
            }}
          >
            {label}
          </Typography>
          <Divider
            sx={{
              flexGrow: 1,
              bgcolor: color,
              borderBottomWidth: 2,
            }}
          />
        </Box>
      );
    }

    return (
      <Divider
        ref={ref}
        orientation={orientation}
        variant={variant}
        sx={{
          my: orientation === "horizontal" ? 1.5 : 0,
          mx: orientation === "vertical" ? 1.5 : 0,
          bgcolor: color,
          borderBottomWidth: 2,
          ...sx,
        }}
        {...restOfProps}
      />
    );
  }
);

AppDivider.displayName = "AppDivider";

AppDivider.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  orientation: PropTypes.oneOf(["horizontal", "vertical"]),
  variant: PropTypes.oneOf(["fullWidth", "inset", "middle"]),
  color: PropTypes.string,
  textAlign: PropTypes.oneOf(["center", "left", "right"]),
  sx: PropTypes.object,
};

export default AppDivider;
