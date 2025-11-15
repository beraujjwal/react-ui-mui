import { forwardRef } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Typography,
  Box,
} from "@mui/material";

/**
 * Application styled Card component
 * A reusable wrapper around MUI Card with consistent padding, shadow, and optional header/actions.
 *
 * @component AppCard
 * @param {string} title - Card title text
 * @param {string|node} subheader - Optional subtitle text or node
 * @param {node} actions - Optional footer actions (buttons, icons, etc.)
 * @param {boolean} divider - Whether to show a divider below the header
 * @param {object} sx - Custom style overrides
 */
const AppCard = forwardRef(
  (
    {
      title,
      subheader,
      children,
      actions,
      divider = true,
      sx = {},
      contentSx = {},
      headerSx = {},
      actionsSx = {},
      ...restOfProps
    },
    ref
  ) => {
    const hasHeader = Boolean(title || subheader);

    return (
      <Card
        ref={ref}
        elevation={2}
        sx={{
          borderRadius: 2,
          boxShadow: "0px 2px 8px rgba(0,0,0,0.06)",
          overflow: "hidden",
          backgroundColor: "background.paper",
          ...sx,
        }}
        {...restOfProps}
      >
        {hasHeader && (
          <>
            <CardHeader
              titleTypographyProps={{ variant: "h6", fontWeight: 600 }}
              title={title}
              subheader={subheader}
              sx={{
                pb: divider ? 0 : 1,
                "& .MuiCardHeader-title": {
                  fontSize: "1rem",
                },
                "& .MuiCardHeader-subheader": {
                  color: "text.secondary",
                },
                ...headerSx,
              }}
            />
            {divider && <Divider />}
          </>
        )}

        <CardContent sx={{ p: 2, ...contentSx }}>{children}</CardContent>

        {actions && (
          <>
            <Divider />
            <CardActions
              sx={{
                px: 2,
                py: 1,
                display: "flex",
                justifyContent: "flex-end",
                ...actionsSx,
              }}
            >
              {actions}
            </CardActions>
          </>
        )}
      </Card>
    );
  }
);

AppCard.displayName = "AppCard";

AppCard.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  subheader: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  children: PropTypes.node.isRequired,
  actions: PropTypes.node,
  divider: PropTypes.bool,
  sx: PropTypes.object,
  contentSx: PropTypes.object,
  headerSx: PropTypes.object,
  actionsSx: PropTypes.object,
};

export default AppCard;
