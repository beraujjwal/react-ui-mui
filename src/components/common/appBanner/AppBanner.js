import { forwardRef, useState } from "react";
import PropTypes from "prop-types";
import { Box, Typography, IconButton, Slide } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import WarningIcon from "@mui/icons-material/Warning";

/**
 * Application styled Banner component
 * Used for system notifications or announcements across the app
 *
 * @component AppBanner
 * @param {string} message - Banner message text
 * @param {string} color - MUI color scheme ('primary', 'secondary', 'success', 'error', 'warning', 'info')
 * @param {node} icon - Optional custom icon
 * @param {boolean} closable - Whether the banner can be dismissed
 * @param {string} position - 'top' or 'bottom' (placement)
 * @param {string} variant - 'filled' | 'outlined' | 'soft' style variants
 * @param {object} sx - Custom style overrides
 */
const AppBanner = forwardRef(
  (
    {
      message,
      color = "info",
      icon,
      closable = true,
      position = "top",
      variant = "filled",
      sx = {},
      onClose,
      ...restOfProps
    },
    ref
  ) => {
    const [open, setOpen] = useState(true);

    const handleClose = () => {
      setOpen(false);
      if (onClose) onClose();
    };

    const getColorStyles = (theme) => {
      const palette = theme.palette[color] || theme.palette.info;

      switch (variant) {
        case "outlined":
          return {
            border: `1px solid ${palette.main}`,
            color: palette.main,
            backgroundColor: palette.background?.default || "transparent",
          };
        case "soft":
          return {
            backgroundColor: palette.light,
            color: palette.contrastText,
          };
        default:
          return {
            backgroundColor: palette.main,
            color: palette.contrastText,
          };
      }
    };

    const defaultIcon = {
      success: <CheckCircleIcon />,
      error: <ErrorIcon />,
      warning: <WarningIcon />,
      info: <InfoIcon />,
    }[color] || <InfoIcon />;

    return (
      <Slide direction={position === "top" ? "down" : "up"} in={open} mountOnEnter unmountOnExit>
        <Box
          ref={ref}
          sx={(theme) => ({
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2,
            py: 1.2,
            gap: 1.2,
            ...getColorStyles(theme),
            position: "fixed",
            left: 0,
            right: 0,
            zIndex: 1200,
            top: position === "top" ? 0 : "auto",
            bottom: position === "bottom" ? 0 : "auto",
            ...sx,
          })}
          {...restOfProps}
        >
          <Box display="flex" alignItems="center" gap={1}>
            {icon || defaultIcon}
            <Typography variant="body1" fontWeight={500}>
              {message}
            </Typography>
          </Box>

          {closable && (
            <IconButton color="inherit" size="small" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          )}
        </Box>
      </Slide>
    );
  }
);

AppBanner.displayName = "AppBanner";

AppBanner.propTypes = {
  message: PropTypes.string.isRequired,
  color: PropTypes.oneOf([
    "default",
    "primary",
    "secondary",
    "success",
    "error",
    "warning",
    "info",
  ]),
  variant: PropTypes.oneOf(["filled", "outlined", "soft"]),
  icon: PropTypes.node,
  closable: PropTypes.bool,
  position: PropTypes.oneOf(["top", "bottom"]),
  sx: PropTypes.object,
  onClose: PropTypes.func,
};

export default AppBanner;
