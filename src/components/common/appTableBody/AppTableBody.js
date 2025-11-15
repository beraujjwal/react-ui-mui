import { forwardRef } from "react";
import PropTypes from "prop-types";
import { TableBody, TableRow, TableCell, Typography } from "@mui/material";

/**
 * Application styled TableBody component
 * A reusable wrapper around MUI TableBody for consistent row rendering and styling.
 *
 * @component AppTableBody
 * @param {array} columns - Table column definitions [{ field, render, align }]
 * @param {array} rows - Array of row data objects
 * @param {function} onRowClick - Optional row click handler (row, index)
 * @param {string} hoverColor - Background color for hovered rows
 * @param {boolean} zebra - Alternate row background colors
 * @param {string} emptyMessage - Message to display when no rows
 * @param {object} sx - Custom style overrides
 */
const AppTableBody = forwardRef(
  (
    {
      columns = [],
      rows = [],
      onRowClick,
      hoverColor = "action.hover",
      zebra = false,
      emptyMessage = "No records found",
      sx = {},
      ...restOfProps
    },
    ref
  ) => {
    if (!rows || rows.length === 0) {
      return (
        <TableBody ref={ref}>
          <TableRow>
            <TableCell
              colSpan={columns.length || 1}
              align="center"
              sx={{ py: 4 }}
            >
              <Typography variant="body2" color="text.secondary">
                {emptyMessage}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      );
    }

    return (
      <TableBody
        ref={ref}
        sx={{
          "& .MuiTableRow-root:hover": {
            backgroundColor: hoverColor,
            cursor: onRowClick ? "pointer" : "default",
          },
          ...sx,
        }}
        {...restOfProps}
      >
        {rows.map((row, index) => (
          <TableRow
            key={index}
            onClick={() => onRowClick && onRowClick(row, index)}
            sx={{
              backgroundColor:
                zebra && index % 2 !== 0 ? "action.hover" : "inherit",
              transition: "background-color 0.15s ease-in-out",
            }}
          >
            {columns.map((col) => (
              <TableCell
                key={col.field}
                align={col.align || "left"}
                sx={{
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                {typeof col.render === "function"
                  ? col.render(row)
                  : row[col.field] ?? "-"}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    );
  }
);

AppTableBody.displayName = "AppTableBody";

AppTableBody.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired,
      render: PropTypes.func,
      align: PropTypes.oneOf(["left", "right", "center"]),
    })
  ),
  rows: PropTypes.arrayOf(PropTypes.object),
  onRowClick: PropTypes.func,
  hoverColor: PropTypes.string,
  zebra: PropTypes.bool,
  emptyMessage: PropTypes.string,
  sx: PropTypes.object,
};

export default AppTableBody;
