import { forwardRef } from "react";
import PropTypes from "prop-types";
import { Breadcrumbs, Link, Typography, Box } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

/**
 * Application styled Breadcrumb component
 * Consistent navigation trail across the app.
 * 
 * @component AppBreadcrumb
 * @param {array} items - List of breadcrumb items ({ label, href, icon, onClick })
 * @param {string} separator - Custom separator (default: NavigateNextIcon)
 * @param {boolean} capitalize - Whether to capitalize breadcrumb labels
 * @param {object} sx - Custom style overrides
 */
const AppBreadcrumb = forwardRef(
  (
    {
      items = [],
      separator = <NavigateNextIcon fontSize="small" />,
      capitalize = true,
      sx = {},
      ...restOfProps
    },
    ref
  ) => {
    return (
      <Box ref={ref} sx={{ display: "flex", alignItems: "center", ...sx }}>
        <Breadcrumbs
          separator={separator}
          aria-label="breadcrumb"
          sx={{
            "& .MuiBreadcrumbs-separator": {
              mx: 1,
            },
          }}
          {...restOfProps}
        >
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            const labelText = capitalize
              ? item.label?.toString().replace(/\b\w/g, (c) => c.toUpperCase())
              : item.label;

            if (isLast) {
              return (
                <Box
                  key={index}
                  sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                >
                  {item.icon && item.icon}
                  <Typography color="text.primary" fontWeight={600}>
                    {labelText}
                  </Typography>
                </Box>
              );
            }

            return (
              <Link
                key={index}
                color="inherit"
                underline="hover"
                href={item.href || "#"}
                onClick={item.onClick}
                sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
              >
                {item.icon && item.icon}
                {labelText}
              </Link>
            );
          })}
        </Breadcrumbs>
      </Box>
    );
  }
);

AppBreadcrumb.displayName = "AppBreadcrumb";

AppBreadcrumb.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string,
      icon: PropTypes.node,
      onClick: PropTypes.func,
    })
  ).isRequired,
  separator: PropTypes.node,
  capitalize: PropTypes.bool,
  sx: PropTypes.object,
};

export default AppBreadcrumb;
