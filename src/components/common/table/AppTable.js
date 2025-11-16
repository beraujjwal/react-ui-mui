import { forwardRef } from "react";
import PropTypes from "prop-types";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TablePagination,
  Typography,
  Paper,
  Box,
} from "@mui/material";

/**
 * Application styled Table component
 * A reusable wrapper around MUI Table for consistent data display.
 *
 * @component AppTable
 * @param {array} columns - Table column definitions [{ field, label, align, width }]
 * @param {array} rows - Table data array
 * @param {boolean} pagination - Enable pagination
 * @param {number} page - Current page index
 * @param {number} rowsPerPage - Rows displayed per page
 * @param {function} onPageChange - Page change handler
 * @param {function} onRowsPerPageChange - Rows-per-page change handler
 * @param {boolean} dense - Compact row spacing
 * @param {string} emptyMessage - Message when no rows are available
 * @param {object} sx - Custom style overrides
 */
const AppTable = forwardRef(
  (
    {
      columns = [],
      rows = [],
      pagination = false,
      page = 0,
      rowsPerPage = 10,
      onPageChange,
      onRowsPerPageChange,
      dense = false,
      emptyMessage = "No data available",
      sx = {},
      ...restOfProps
    },
    ref
  ) => {
    // Determine visible rows for pagination
    const paginatedRows = pagination
      ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      : rows;

    return (
      <Paper
        ref={ref}
        sx={{
          width: "100%",
          overflow: "hidden",
          borderRadius: 2,
          boxShadow: "0px 2px 8px rgba(0,0,0,0.05)",
          ...sx,
        }}
        {...restOfProps}
      >
        <TableContainer>
          <Table size={dense ? "small" : "medium"}>
            {/* Table Header */}
            {columns.length > 0 && (
              <TableHead>
                <TableRow
                  sx={{
                    backgroundColor: "background.default",
                    "& th": { fontWeight: 600 },
                  }}
                >
                  {columns.map((col) => (
                    <TableCell
                      key={col.field}
                      align={col.align || "left"}
                      width={col.width}
                    >
                      {col.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
            )}

            {/* Table Body */}
            <TableBody>
              {paginatedRows.length > 0 ? (
                paginatedRows.map((row, index) => (
                  <TableRow
                    key={index}
                    hover
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    {columns.map((col) => (
                      <TableCell key={col.field} align={col.align || "left"}>
                        {typeof col.render === "function"
                          ? col.render(row)
                          : row[col.field]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
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
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        {pagination && rows.length > 0 && (
          <TablePagination
            component="div"
            count={rows.length}
            page={page}
            onPageChange={onPageChange}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={onRowsPerPageChange}
            rowsPerPageOptions={[5, 10, 25, 50]}
          />
        )}
      </Paper>
    );
  }
);

AppTable.displayName = "AppTable";

AppTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      align: PropTypes.oneOf(["left", "right", "center"]),
      width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      render: PropTypes.func, // Custom cell render function
    })
  ),
  rows: PropTypes.arrayOf(PropTypes.object),
  pagination: PropTypes.bool,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  dense: PropTypes.bool,
  emptyMessage: PropTypes.string,
  sx: PropTypes.object,
};

export default AppTable;
