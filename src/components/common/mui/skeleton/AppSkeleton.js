import { forwardRef } from "react";
import PropTypes from "prop-types";
import { Skeleton, Box, Stack } from "@mui/material";

/**
 * Application styled Skeleton component
 * A reusable wrapper around MUI Skeleton for consistent loading states.
 *
 * @component AppSkeleton
 * @param {string} variant - Skeleton shape ('text' | 'rectangular' | 'circular')
 * @param {number|string} width - Width of the skeleton
 * @param {number|string} height - Height of the skeleton
 * @param {number} count - Number of skeleton lines/items
 * @param {string} animation - Animation style ('pulse' | 'wave' | false)
 * @param {boolean} rounded - Whether to apply rounded corners
 * @param {object} sx - Custom style overrides
 */
const AppSkeleton = forwardRef(
  (
    {
      variant = "text",
      width = "100%",
      height,
      count = 1,
      animation = "wave",
      rounded = true,
      sx = {},
      ...restOfProps
    },
    ref
  ) => {
    // Render multiple skeleton lines using Stack for spacing
    if (count > 1) {
      return (
        <Stack spacing={1}>
          {Array.from({ length: count }).map((_, i) => (
            <Skeleton
              key={i}
              ref={i === 0 ? ref : null}
              variant={variant}
              width={width}
              height={height}
              animation={animation}
              sx={{
                borderRadius: rounded && variant !== "circular" ? 2 : 0,
                ...sx,
              }}
              {...restOfProps}
            />
          ))}
        </Stack>
      );
    }

    // Single skeleton
    return (
      <Box ref={ref}>
        <Skeleton
          variant={variant}
          width={width}
          height={height}
          animation={animation}
          sx={{
            borderRadius: rounded && variant !== "circular" ? 2 : 0,
            ...sx,
          }}
          {...restOfProps}
        />
      </Box>
    );
  }
);

AppSkeleton.displayName = "AppSkeleton";

AppSkeleton.propTypes = {
  variant: PropTypes.oneOf(["text", "rectangular", "circular"]),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  count: PropTypes.number,
  animation: PropTypes.oneOf(["pulse", "wave", false]),
  rounded: PropTypes.bool,
  sx: PropTypes.object,
};

export default AppSkeleton;
