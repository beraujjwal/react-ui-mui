import { forwardRef } from "react";
import PropTypes from "prop-types";
import { TableHead } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import { AppBox } from "../box";
import { AppTableRow } from "../tableRow";
import { AppTableCell } from "../tableCell";
import { AppTypography } from "../typography";

/**
 * Application styled TableHead component
 * A reusable wrapper for MUI TableHead with sorting support.
 *
 * @component AppTableHead
 * @param {array} columns - Column definitions [{ field, label, align, width, sortable }]
 * @param {string} sortField - Currently sorted column key
 * @param {'asc'|'desc'} sortOrder - Current sort direction
 * @param {function} onSort - Callback when a sortable column header is clicked
 * @param {object} sx - Custom style overrides
 */
const AppTableHead = forwardRef(
  (
    {
      columns = [],
      sortField,
      sortOrder = "asc",
      onSort,
      sx = {},
      ...restOfProps
    },
    ref
  ) => {
    const handleSort = (col) => {
      if (onSort && col.sortable) {
        const nextOrder = sortField === col.field && sortOrder === "asc" ? "desc" : "asc";
        onSort(col.field, nextOrder);
      }
    };

    return (
      <TableHead
        ref={ref}
        sx={{
          backgroundColor: "background.default",
          "& th": {
            fontWeight: 600,
            whiteSpace: "nowrap",
            borderBottom: "1px solid",
            borderColor: "divider",
            cursor: (col) => (col.sortable ? "pointer" : "default"),
          },
          ...sx,
        }}
        {...restOfProps}
      >
        <AppTableRow>
          {columns.map((col) => (
            <AppTableCell
              key={col.field}
              align={col.align || "left"}
              width={col.width}
              onClick={() => handleSort(col)}
              sx={{
                userSelect: "none",
                ...(col.sortable && {
                  "&:hover": { backgroundColor: "action.hover" },
                }),
              }}
            >
              <AppBox
                display="flex"
                alignItems="center"
                justifyContent={
                  col.align === "right"
                    ? "flex-end"
                    : col.align === "center"
                    ? "center"
                    : "flex-start"
                }
                gap={0.5}
              >
                <AppTypography variant="body2" fontWeight={600}>
                  {col.label}
                </AppTypography>

                {col.sortable && sortField === col.field && (
                  <>
                    {sortOrder === "asc" ? (
                      <ArrowUpwardIcon fontSize="inherit" sx={{ fontSize: 16 }} />
                    ) : (
                      <ArrowDownwardIcon fontSize="inherit" sx={{ fontSize: 16 }} />
                    )}
                  </>
                )}
              </AppBox>
            </AppTableCell>
          ))}
        </AppTableRow>
      </TableHead>
    );
  }
);

AppTableHead.displayName = "AppTableHead";

AppTableHead.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      align: PropTypes.oneOf(["left", "right", "center"]),
      width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      sortable: PropTypes.bool,
    })
  ),
  sortField: PropTypes.string,
  sortOrder: PropTypes.oneOf(["asc", "desc"]),
  onSort: PropTypes.func,
  sx: PropTypes.object,
};

export default AppTableHead;
