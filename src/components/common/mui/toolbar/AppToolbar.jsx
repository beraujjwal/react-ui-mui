import { forwardRef } from "react";
import PropTypes from "prop-types";
import { Toolbar } from "@mui/material";
import { AppPaper } from "../paper";

/**
 * Application styled Toolbar component
 * A reusable wrapper around MUI Toolbar for consistent app bar and action layouts.
 *
 * @component AppToolbar
 * @param {node} children - Toolbar content (buttons, title, etc.)
 * @param {string} variant - Visual style ('default', 'dense', 'outlined', 'elevated', 'flat')
 * @param {number} elevation - Shadow depth (for elevated variant)
 * @param {string} justify - Horizontal alignment
 * @param {string} align - Vertical alignment
 * @param {boolean} disableGutters - Remove default left/right padding
 * @param {boolean} sticky - Make toolbar sticky to top
 * @param {object} sx - Custom style overrides
 */
const AppToolbar = forwardRef(
  (
    {
      children,
      variant = "default",
      elevation = 1,
      justify = "space-between",
      align = "center",
      disableGutters = false,
      sticky = false,
      sx = {},
      ...restOfProps
    },
    ref
  ) => {
    const variantStyles = {
      default: {
        backgroundColor: "background.paper",
        borderBottom: "1px solid",
        borderColor: "divider",
      },
      dense: {
        minHeight: 48,
        py: 0.5,
        backgroundColor: "background.paper",
        borderBottom: "1px solid",
        borderColor: "divider",
      },
      outlined: {
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        backgroundColor: "background.paper",
      },
      elevated: {
        backgroundColor: "background.paper",
        boxShadow: (theme) => theme.shadows[elevation],
        borderRadius: 2,
      },
      flat: {
        backgroundColor: "transparent",
        boxShadow: "none",
      },
    };

    const toolbarElement = (
      <Toolbar
        ref={ref}
        disableGutters={disableGutters}
        sx={{
          display: "flex",
          justifyContent: justify,
          alignItems: align,
          px: disableGutters ? 0 : 2,
          transition: "all 0.2s ease",
          ...variantStyles[variant],
          ...sx,
        }}
        {...restOfProps}
      >
        {children}
      </Toolbar>
    );

    // For elevated or outlined variants, wrap with AppPaper for shadow & rounded corners
    if (["outlined", "elevated"].includes(variant)) {
      return (
        <AppPaper
          elevation={variant === "elevated" ? elevation : 0}
          sx={{
            position: sticky ? "sticky" : "static",
            top: sticky ? 0 : undefined,
            zIndex: sticky ? (theme) => theme.zIndex.appBar : undefined,
            ...variantStyles[variant],
            ...sx,
          }}
        >
          {toolbarElement}
        </AppPaper>
      );
    }

    return (
      <AppPaper
        elevation={0}
        sx={{
          position: sticky ? "sticky" : "static",
          top: sticky ? 0 : undefined,
          zIndex: sticky ? (theme) => theme.zIndex.appBar : undefined,
          ...variantStyles[variant],
        }}
      >
        {toolbarElement}
      </AppPaper>
    );
  }
);

AppToolbar.displayName = "AppToolbar";

AppToolbar.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf([
    "default",
    "dense",
    "outlined",
    "elevated",
    "flat",
  ]),
  elevation: PropTypes.number,
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
  disableGutters: PropTypes.bool,
  sticky: PropTypes.bool,
  sx: PropTypes.object,
};

export default AppToolbar;
