import { forwardRef } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Divider,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

/**
 * Application styled Modal/Dialog component
 * Provides a consistent modal layout with title, content, and action sections.
 *
 * @component AppModal
 * @param {boolean} open - Whether the modal is open
 * @param {function} onClose - Callback when modal closes
 * @param {string|node} title - Modal title
 * @param {node} children - Modal body content
 * @param {node} actions - Optional action buttons (footer)
 * @param {boolean} closable - Whether to show the close (X) button
 * @param {boolean} divider - Whether to show divider between sections
 * @param {string} maxWidth - MUI maxWidth ('xs' | 'sm' | 'md' | 'lg' | 'xl' | false)
 * @param {boolean} fullWidth - If true, modal takes full width up to maxWidth
 * @param {object} sx - Custom style overrides
 */
const AppModal = forwardRef(
  (
    {
      open,
      onClose,
      title,
      children,
      actions,
      closable = true,
      divider = true,
      maxWidth = "sm",
      fullWidth = true,
      sx = {},
      titleSx = {},
      contentSx = {},
      actionsSx = {},
      ...restOfProps
    },
    ref
  ) => {
    return (
      <Dialog
        ref={ref}
        open={open}
        onClose={onClose}
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: 2,
            boxShadow: "0px 8px 24px rgba(0,0,0,0.1)",
            ...sx,
          },
        }}
        {...restOfProps}
      >
        {title && (
          <Box sx={{ position: "relative" }}>
            <DialogTitle
              sx={{
                pr: closable ? 6 : 2,
                fontWeight: 600,
                fontSize: "1.1rem",
                ...titleSx,
              }}
            >
              {typeof title === "string" ? (
                <Typography variant="h6">{title}</Typography>
              ) : (
                title
              )}
            </DialogTitle>

            {closable && (
              <IconButton
                onClick={onClose}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                  color: "text.secondary",
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            )}
            {divider && <Divider />}
          </Box>
        )}

        <DialogContent
          dividers={divider}
          sx={{
            p: 2.5,
            ...contentSx,
          }}
        >
          {children}
        </DialogContent>

        {actions && (
          <>
            {divider && <Divider />}
            <DialogActions
              sx={{
                px: 2,
                py: 1.5,
                gap: 1,
                justifyContent: "flex-end",
                ...actionsSx,
              }}
            >
              {actions}
            </DialogActions>
          </>
        )}
      </Dialog>
    );
  }
);

AppModal.displayName = "AppModal";

AppModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  children: PropTypes.node.isRequired,
  actions: PropTypes.node,
  closable: PropTypes.bool,
  divider: PropTypes.bool,
  maxWidth: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl", false]),
  fullWidth: PropTypes.bool,
  sx: PropTypes.object,
  titleSx: PropTypes.object,
  contentSx: PropTypes.object,
  actionsSx: PropTypes.object,
};

export default AppModal;
