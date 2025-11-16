import { forwardRef } from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";

/**
 * Application styled Box component
 * A reusable wrapper around MUI Box for consistent styling and spacing.
 *
 * @component AppBox
 * @param {node} children - Child elements inside the box
 * @param {string} variant - Visual variant ('default', 'card', 'section', 'outlined', 'paper')
 * @param {boolean} center - Centers children both horizontally and vertically
 * @param {number|string|array|object} p - Padding shorthand
 * @param {number|string|array|object} m - Margin shorthand
 * @param {object} sx - Custom style overrides
 */
const AppBox = forwardRef(
  (
    {
      children,
      variant = "default",
      center = false,
      p = 2,
      m = 0,
      sx = {},
      ...restOfProps
    },
    ref
  ) => {
    const variantStyles = {
      default: {},
      card: {
        p: 2.5,
        borderRadius: 2,
        boxShadow: 1,
        backgroundColor: "background.paper",
      },
      section: {
        p: 3,
        borderRadius: 2,
        backgroundColor: "background.default",
      },
      outlined: {
        p: 2,
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        backgroundColor: "background.paper",
      },
      paper: {
        p: 2.5,
        borderRadius: 2,
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        backgroundColor: "background.paper",
      },
    };

    return (
      <Box
        ref={ref}
        p={p}
        m={m}
        display={center ? "flex" : undefined}
        alignItems={center ? "center" : undefined}
        justifyContent={center ? "center" : undefined}
        sx={{
          transition: "all 0.2s ease",
          ...variantStyles[variant],
          ...sx,
        }}
        {...restOfProps}
      >
        {children}
      </Box>
    );
  }
);

AppBox.displayName = "AppBox";

AppBox.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(["default", "card", "section", "outlined", "paper"]),
  center: PropTypes.bool,
  p: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.array,
    PropTypes.object,
  ]),
  m: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.array,
    PropTypes.object,
  ]),
  sx: PropTypes.object,
};

export default AppBox;
