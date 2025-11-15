import { forwardRef } from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";

/**
 * Application styled Column layout component
 * Simplifies flex-column layouts with consistent gap, alignment, and spacing.
 *
 * @component AppColumn
 * @param {string|number} gap - Space between child elements (uses MUI spacing)
 * @param {string} align - Horizontal alignment (alignItems)
 * @param {string} justify - Vertical alignment (justifyContent)
 * @param {boolean} fullHeight - If true, column takes full height of parent
 * @param {boolean} fullWidth - If true, column takes full width of parent
 * @param {object} sx - Custom style overrides
 */
const AppColumn = forwardRef(
  (
    {
      children,
      gap = 2,
      align = "stretch",
      justify = "flex-start",
      fullHeight = false,
      fullWidth = true,
      sx = {},
      ...restOfProps
    },
    ref
  ) => {
    return (
      <Box
        ref={ref}
        display="flex"
        flexDirection="column"
        alignItems={align}
        justifyContent={justify}
        gap={gap}
        sx={{
          width: fullWidth ? "100%" : "auto",
          height: fullHeight ? "100%" : "auto",
          ...sx,
        }}
        {...restOfProps}
      >
        {children}
      </Box>
    );
  }
);

AppColumn.displayName = "AppColumn";

AppColumn.propTypes = {
  children: PropTypes.node,
  gap: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  align: PropTypes.oneOf([
    "stretch",
    "flex-start",
    "center",
    "flex-end",
    "baseline",
  ]),
  justify: PropTypes.oneOf([
    "flex-start",
    "center",
    "flex-end",
    "space-between",
    "space-around",
    "space-evenly",
  ]),
  fullHeight: PropTypes.bool,
  fullWidth: PropTypes.bool,
  sx: PropTypes.object,
};

export default AppColumn;
