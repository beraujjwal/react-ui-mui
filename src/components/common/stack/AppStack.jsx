import { forwardRef } from "react";
import PropTypes from "prop-types";
import { Stack } from "@mui/material";

/**
 * Application styled Stack component
 * A reusable wrapper around MUI Stack for consistent vertical/horizontal layout.
 *
 * @component AppStack
 * @param {node} children - Content inside the stack
 * @param {string} direction - Layout direction ('row' | 'column' | responsive object)
 * @param {number|object} spacing - Space between items
 * @param {string} justify - Justify content direction
 * @param {string} align - Align items vertically
 * @param {boolean} center - Centers items both horizontally & vertically
 * @param {boolean} wrap - Allow wrapping in row direction
 * @param {boolean} fullWidth - Makes the stack take full width
 * @param {object} sx - Custom style overrides
 */
const AppStack = forwardRef(
  (
    {
      children,
      direction = "column",
      spacing = 2,
      justify = "flex-start",
      align = "stretch",
      center = false,
      wrap = true,
      fullWidth = true,
      sx = {},
      ...restOfProps
    },
    ref
  ) => {
    return (
      <Stack
        ref={ref}
        direction={direction}
        spacing={spacing}
        justifyContent={center ? "center" : justify}
        alignItems={center ? "center" : align}
        flexWrap={wrap ? "wrap" : "nowrap"}
        width={fullWidth ? "100%" : "auto"}
        sx={{
          transition: "all 0.2s ease",
          ...sx,
        }}
        {...restOfProps}
      >
        {children}
      </Stack>
    );
  }
);

AppStack.displayName = "AppStack";

AppStack.propTypes = {
  children: PropTypes.node,
  direction: PropTypes.oneOfType([
    PropTypes.oneOf(["row", "column"]),
    PropTypes.object, // responsive direction, e.g. { xs: "column", sm: "row" }
  ]),
  spacing: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  justify: PropTypes.oneOf([
    "flex-start",
    "flex-end",
    "center",
    "space-between",
    "space-around",
    "space-evenly",
  ]),
  align: PropTypes.oneOf([
    "stretch",
    "flex-start",
    "flex-end",
    "center",
    "baseline",
  ]),
  center: PropTypes.bool,
  wrap: PropTypes.bool,
  fullWidth: PropTypes.bool,
  sx: PropTypes.object,
};

export default AppStack;
