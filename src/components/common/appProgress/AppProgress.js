import { forwardRef } from "react";
import PropTypes from "prop-types";
import {
  Box,
  LinearProgress,
  CircularProgress,
  Typography,
} from "@mui/material";

/**
 * Application styled Progress component
 * Wraps MUI LinearProgress or CircularProgress for consistent appearance and labeling.
 *
 * @component AppProgress
 * @param {string} type - Type of progress indicator ('linear' | 'circular')
 * @param {number} value - Progress value (0–100)
 * @param {boolean} showLabel - Whether to show percentage label
 * @param {string} color - MUI color palette ('primary', 'secondary', etc.)
 * @param {string} size - Size for circular progress (default: 40)
 * @param {boolean} indeterminate - If true, shows indeterminate loader
 * @param {object} sx - Custom styling overrides
 */
const AppProgress = forwardRef(
  (
    {
      type = "linear",
      value = 0,
      showLabel = false,
      color = "primary",
      size = 40,
      indeterminate = false,
      sx = {},
      ...restOfProps
    },
    ref
  ) => {
    const renderLinear = () => (
      <Box ref={ref} sx={{ width: "100%", display: "flex", alignItems: "center", ...sx }}>
        <Box sx={{ flexGrow: 1, mr: showLabel ? 1.5 : 0 }}>
          <LinearProgress
            variant={indeterminate ? "indeterminate" : "determinate"}
            value={value}
            color={color}
            sx={{
              borderRadius: 4,
              height: 6,
              "& .MuiLinearProgress-bar": {
                borderRadius: 4,
              },
            }}
            {...restOfProps}
          />
        </Box>
        {showLabel && (
          <Typography variant="body2" color="text.secondary" sx={{ minWidth: 35 }}>
            {`${Math.round(value)}%`}
          </Typography>
        )}
      </Box>
    );

    const renderCircular = () => (
      <Box
        ref={ref}
        sx={{
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          ...sx,
        }}
      >
        <CircularProgress
          variant={indeterminate ? "indeterminate" : "determinate"}
          value={value}
          color={color}
          size={size}
          thickness={4}
          {...restOfProps}
        />
        {showLabel && !indeterminate && (
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: "absolute",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="caption"
              color="text.secondary"
              fontWeight={600}
            >{`${Math.round(value)}%`}</Typography>
          </Box>
        )}
      </Box>
    );

    return type === "circular" ? renderCircular() : renderLinear();
  }
);

AppProgress.displayName = "AppProgress";

AppProgress.propTypes = {
  type: PropTypes.oneOf(["linear", "circular"]),
  value: PropTypes.number,
  showLabel: PropTypes.bool,
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "error",
    "info",
    "warning",
  ]),
  size: PropTypes.number,
  indeterminate: PropTypes.bool,
  sx: PropTypes.object,
};

export default AppProgress;
