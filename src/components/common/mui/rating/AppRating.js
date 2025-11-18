import { forwardRef } from "react";
import PropTypes from "prop-types";
import { Rating, Box, Typography, Tooltip } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

/**
 * Application styled Rating component
 * A reusable wrapper around MUI Rating for consistent UI and behavior.
 *
 * @component AppRating
 * @param {number} value - Current rating value
 * @param {function} onChange - Callback when rating changes
 * @param {boolean} readOnly - If true, disables interaction
 * @param {boolean} showLabel - Whether to show numeric label beside rating
 * @param {number} precision - Decimal precision (e.g. 0.5)
 * @param {number} max - Maximum rating value
 * @param {node} icon - Custom icon for rating
 * @param {string} color - MUI color name ('primary', 'secondary', etc.)
 * @param {string} size - Size of icons ('small' | 'medium' | 'large')
 * @param {object} sx - Custom style overrides
 */
const AppRating = forwardRef(
  (
    {
      value = 0,
      onChange,
      readOnly = false,
      showLabel = false,
      precision = 0.5,
      max = 5,
      icon = <StarIcon />,
      emptyIcon = <StarIcon style={{ opacity: 0.3 }} />,
      color = "primary",
      size = "medium",
      labels,
      sx = {},
      ...restOfProps
    },
    ref
  ) => {
    const label = showLabel ? `${value} / ${max}` : null;

    const getTooltipTitle = (val) => {
      if (labels && labels[val]) return labels[val];
      return `${val} Star${val > 1 ? "s" : ""}`;
    };

    const RatingComponent = (
      <Rating
        ref={ref}
        name="app-rating"
        value={value}
        precision={precision}
        max={max}
        onChange={onChange}
        readOnly={readOnly}
        icon={icon}
        emptyIcon={emptyIcon}
        size={size}
        sx={{
          color: (theme) => theme.palette[color]?.main,
          ...sx,
        }}
        {...restOfProps}
      />
    );

    return (
      <Box display="flex" alignItems="center" gap={1}>
        {labels ? (
          <Tooltip title={getTooltipTitle(value)} placement="top">
            {RatingComponent}
          </Tooltip>
        ) : (
          RatingComponent
        )}
        {showLabel && (
          <Typography variant="body2" color="text.secondary">
            {label}
          </Typography>
        )}
      </Box>
    );
  }
);

AppRating.displayName = "AppRating";

AppRating.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func,
  readOnly: PropTypes.bool,
  showLabel: PropTypes.bool,
  precision: PropTypes.number,
  max: PropTypes.number,
  icon: PropTypes.node,
  emptyIcon: PropTypes.node,
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "error",
    "warning",
    "info",
  ]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  labels: PropTypes.object,
  sx: PropTypes.object,
};

export default AppRating;
