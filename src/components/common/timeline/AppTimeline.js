import { forwardRef } from "react";
import PropTypes from "prop-types";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
  Typography,
  Box,
} from "@mui/material";

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
      >
        {items.map((item, index) => (
          <TimelineItem key={index}>
            {showTime && (
              <TimelineOppositeContent
                sx={{ m: "auto 0", flex: 0.2 }}
                align={position === "right" ? "right" : "left"}
                variant="body2"
                color="text.secondary"
              >
                {item.time}
              </TimelineOppositeContent>
            )}

            <TimelineSeparator>
              <TimelineDot color={item.color || "primary"}>
                {item.icon}
              </TimelineDot>
              {item.connector !== false &&
                index < items.length - 1 && <TimelineConnector />}
            </TimelineSeparator>

            <TimelineContent sx={{ py: 1.5 }}>
              <Typography variant="subtitle1" fontWeight={600}>
                {item.title}
              </Typography>
              {item.description && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 0.5 }}
                >
                  {item.description}
                </Typography>
              )}
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
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
