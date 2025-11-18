import { forwardRef } from "react";
import PropTypes from "prop-types";
import { Box, Pagination, Typography } from "@mui/material";

/**
 * Application styled Pagination component
 * A reusable wrapper around MUI Pagination for consistent pagination UI and behavior.
 *
 * @component AppPagination
 * @param {number} page - Current page number
 * @param {number} count - Total number of pages
 * @param {function} onChange - Callback when page changes (event, newPage)
 * @param {string} color - MUI color scheme ('primary', 'secondary', etc.)
 * @param {string} shape - Shape of pagination buttons ('circular' | 'rounded')
 * @param {string} size - Size of pagination ('small' | 'medium' | 'large')
 * @param {boolean} showInfo - Whether to show page info text
 * @param {number} totalItems - Total number of items (optional)
 * @param {number} itemsPerPage - Number of items per page (optional)
 * @param {object} sx - Custom style overrides
 */
const AppPagination = forwardRef(
  (
    {
      page = 1,
      count = 1,
      onChange,
      color = "primary",
      shape = "rounded",
      size = "medium",
      showInfo = false,
      totalItems,
      itemsPerPage,
      sx = {},
      ...restOfProps
    },
    ref
  ) => {
    const startItem =
      totalItems && itemsPerPage
        ? (page - 1) * itemsPerPage + 1
        : null;
    const endItem =
      totalItems && itemsPerPage
        ? Math.min(page * itemsPerPage, totalItems)
        : null;

    return (
      <Box
        ref={ref}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
        gap={2}
        sx={{ width: "100%", py: 1, ...sx }}
      >
        {showInfo && totalItems && itemsPerPage && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ whiteSpace: "nowrap" }}
          >
            Showing {startItem}–{endItem} of {totalItems}
          </Typography>
        )}

        <Pagination
          count={count}
          page={page}
          color={color}
          shape={shape}
          size={size}
          onChange={onChange}
          siblingCount={1}
          boundaryCount={1}
          sx={{
            "& .MuiPaginationItem-root": {
              borderRadius: shape === "rounded" ? "8px" : "50%",
              fontWeight: 500,
            },
          }}
          {...restOfProps}
        />
      </Box>
    );
  }
);

AppPagination.displayName = "AppPagination";

AppPagination.propTypes = {
  page: PropTypes.number,
  count: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "standard",
    "success",
    "error",
    "info",
    "warning",
  ]),
  shape: PropTypes.oneOf(["circular", "rounded"]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  showInfo: PropTypes.bool,
  totalItems: PropTypes.number,
  itemsPerPage: PropTypes.number,
  sx: PropTypes.object,
};

export default AppPagination;
