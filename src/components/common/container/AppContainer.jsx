import { forwardRef } from "react";
import PropTypes from "prop-types";
import { Container } from "@mui/material";

/**
 * Application styled Container component
 * A reusable wrapper for consistent page and section layouts.
 *
 * @component AppContainer
 * @param {node} children - Content inside the container
 * @param {string} variant - Visual style variant ('default', 'section', 'paper', 'outlined', 'card')
 * @param {boolean} maxWidth - MUI maxWidth breakpoint ('xs' | 'sm' | 'md' | 'lg' | 'xl' | false)
 * @param {boolean} disableGutters - Removes left/right padding
 * @param {boolean} center - Centers content both horizontally & vertically
 * @param {object} sx - Custom style overrides
 */
const AppContainer = forwardRef(
  (
    {
      children,
      variant = "default",
      maxWidth = "lg",
      disableGutters = false,
      center = false,
      sx = {},
      ...restOfProps
    },
    ref
  ) => {
    const variantStyles = {
      default: {
        py: 3,
      },
      section: {
        py: 5,
        backgroundColor: "background.default",
      },
      outlined: {
        py: 4,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        backgroundColor: "background.paper",
      },
      paper: {
        py: 4,
        borderRadius: 2,
        boxShadow: 1,
        backgroundColor: "background.paper",
      },
      card: {
        py: 3,
        borderRadius: 2,
        boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
        backgroundColor: "background.paper",
      },
    };

    return (
      <Container
        ref={ref}
        maxWidth={maxWidth}
        disableGutters={disableGutters}
        sx={{
          display: center ? "flex" : undefined,
          alignItems: center ? "center" : undefined,
          justifyContent: center ? "center" : undefined,
          minHeight: center ? "100vh" : undefined,
          transition: "all 0.3s ease",
          ...variantStyles[variant],
          ...sx,
        }}
        {...restOfProps}
      >
        {children}
      </Container>
    );
  }
);

AppContainer.displayName = "AppContainer";

AppContainer.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf([
    "default",
    "section",
    "paper",
    "outlined",
    "card",
  ]),
  maxWidth: PropTypes.oneOfType([
    PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"]),
    PropTypes.bool,
  ]),
  disableGutters: PropTypes.bool,
  center: PropTypes.bool,
  sx: PropTypes.object,
};

export default AppContainer;
