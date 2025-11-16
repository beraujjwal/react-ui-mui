import { forwardRef } from "react";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";

/**
 * Application styled Grid component
 * A reusable wrapper around MUI Grid for consistent layouts.
 *
 * @component AppGrid
 * @param {boolean} container - Whether this grid is a container
 * @param {boolean} item - Whether this grid is an item
 * @param {number} xs - Grid size on extra-small screens
 * @param {number} sm - Grid size on small screens
 * @param {number} md - Grid size on medium screens
 * @param {number} lg - Grid size on large screens
 * @param {number} xl - Grid size on extra-large screens
 * @param {number} spacing - Spacing between grid items
 * @param {string} justify - Justify content direction
 * @param {string} align - Align items vertically
 * @param {boolean} center - Center both horizontally and vertically
 * @param {boolean} wrap - Enable/disable wrapping
 * @param {object} sx - Custom style overrides
 */
const AppGrid = forwardRef(
  (
    {
      children,
      container = false,
      item = false,
      xs,
      sm,
      md,
      lg,
      xl,
      spacing = 2,
      justify = "flex-start",
      align = "stretch",
      center = false,
      wrap = true,
      sx = {},
      ...restOfProps
    },
    ref
  ) => {
    return (
      <Grid
        ref={ref}
        container={container}
        item={item}
        xs={xs}
        sm={sm}
        md={md}
        lg={lg}
        xl={xl}
        spacing={container ? spacing : undefined}
        justifyContent={center ? "center" : justify}
        alignItems={center ? "center" : align}
        wrap={wrap ? "wrap" : "nowrap"}
        sx={{
          width: "100%",
          transition: "all 0.2s ease",
          ...sx,
        }}
        {...restOfProps}
      >
        {children}
      </Grid>
    );
  }
);

AppGrid.displayName = "AppGrid";

AppGrid.propTypes = {
  children: PropTypes.node,
  container: PropTypes.bool,
  item: PropTypes.bool,
  xs: PropTypes.number,
  sm: PropTypes.number,
  md: PropTypes.number,
  lg: PropTypes.number,
  xl: PropTypes.number,
  spacing: PropTypes.number,
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
  sx: PropTypes.object,
};

export default AppGrid;
