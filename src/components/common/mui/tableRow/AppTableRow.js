import { forwardRef } from "react";
import PropTypes from "prop-types";
import { TableRow, TableCell } from "@mui/material";

/**
 * Application styled TableRow component
 * Provides consistent row styling, hover behavior, and click actions.
 *
 * @component AppTableRow
 * @param {array} columns - Array of column definitions [{ field, align, render }]
 * @param {object} row - Data object for the current row
 * @param {number} rowIndex - Row index (used for zebra striping or keys)
 * @param {boolean} hover - Enables hover background color
 * @param {boolean} zebra - Enables alternating background color
 * @param {function} onClick - Callback when the row is clicked
 * @param {string} hoverColor - MUI color for hover background
 * @param {object} sx - Custom style overrides
 */
const AppTableRow = forwardRef(
  (
    {
      columns = [],
      row = {},
      rowIndex = 0,
      hover = true,
      zebra = false,
      onClick,
      hoverColor = "action.hover",
      sx = {},
      ...restOfProps
    },
    ref
  ) => {
    return (
      <TableRow
        ref={ref}
        onClick={() => onClick && onClick(row, rowIndex)}
        hover={hover}
        sx={{
          backgroundColor: zebra && rowIndex % 2 ? "action.hover" : "inherit",
          transition: "background-color 0.15s ease-in-out",
          cursor: onClick ? "pointer" : "default",
          "&:hover": hover
            ? {
                backgroundColor: hoverColor,
              }
            : {},
          ...sx,
        }}
        {...restOfProps}
      >
        {columns.map((col) => (
          <TableCell
            key={col.field}
            align={col.align || "left"}
            sx={{
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden",
              borderBottom: "1px solid",
              borderColor: "divider",
            }}
          >
            {typeof col.render === "function"
              ? col.render(row)
              : row[col.field] ?? "-"}
          </TableCell>
        ))}
      </TableRow>
    );
  }
);

AppTableRow.displayName = "AppTableRow";

AppTableRow.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired,
      align: PropTypes.oneOf(["left", "right", "center"]),
      render: PropTypes.func,
    })
  ),
  row: PropTypes.object,
  rowIndex: PropTypes.number,
  hover: PropTypes.bool,
  zebra: PropTypes.bool,
  onClick: PropTypes.func,
  hoverColor: PropTypes.string,
  sx: PropTypes.object,
};

export default AppTableRow;
