import { forwardRef } from "react";
import PropTypes from "prop-types";
import { Timeline } from "@mui/lab";

/**
 * Application styled Timeline component
 * A reusable wrapper around MUI Timeline for consistent event visualization.
 *
 * @component AppTimeline
 * @param {array} items - Array of timeline items [{ title, description, time, color, icon, connector }]
 * @param {string} position - Timeline layout ('left' | 'right' | 'alternate')
 * @param {boolean} showTime - Whether to show the timestamp
 * @param {boolean} dense - Compact layout spacing
 * @param {object} sx - Custom style overrides
 */
const AppTimeline = forwardRef(
  (
    {
      items = [],
      position = "right",
      showTime = true,
      dense = false,
      sx = {},
      ...restOfProps
    },
    ref
  ) => {
    return (
      <Timeline
        ref={ref}
        position={position}
        sx={{
          p: dense ? 0 : 2,
          "& .MuiTimelineItem-root:before": {
            flex: 0,
            padding: 0,
          },
          ...sx,
        }}
        {...restOfProps}
      />
    );
  }
);

AppTimeline.displayName = "AppTimeline";

AppTimeline.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      time: PropTypes.string,
      color: PropTypes.oneOf([
        "inherit",
        "primary",
        "secondary",
        "success",
        "error",
        "info",
        "warning",
      ]),
      icon: PropTypes.node,
      connector: PropTypes.bool,
    })
  ),
  position: PropTypes.oneOf(["left", "right", "alternate"]),
  showTime: PropTypes.bool,
  dense: PropTypes.bool,
  sx: PropTypes.object,
};

export default AppTimeline;
