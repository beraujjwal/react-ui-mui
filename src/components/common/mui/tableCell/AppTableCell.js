import { forwardRef } from "react";
import PropTypes from "prop-types";
import { TableCell, Typography, Chip, Tooltip } from "@mui/material";
import dayjs from "dayjs";

/**
 * Application styled TableCell component
 * A reusable wrapper for MUI TableCell with consistent styling and flexible formatting.
 *
 * @component AppTableCell
 * @param {any} value - Cell value to display
 * @param {string} type - Type of cell content ('text' | 'number' | 'date' | 'chip' | 'custom')
 * @param {function} render - Custom render function for complex content
 * @param {string} align - Text alignment ('left' | 'right' | 'center')
 * @param {boolean} truncate - Whether to truncate long text with ellipsis
 * @param {boolean} tooltip - Whether to show tooltip for truncated text
 * @param {object} sx - Custom style overrides
 * @param {object} chipProps - Props for chip type (color, size, variant, etc.)
 * @param {string} dateFormat - Format for date-type cells
 */
const AppTableCell = forwardRef(
  (
    {
      value,
      type = "text",
      render,
      align = "left",
      truncate = true,
      tooltip = false,
      sx = {},
      chipProps = {},
      dateFormat = "DD MMM YYYY",
      ...restOfProps
    },
    ref
  ) => {
    let content = value;

    if (render && typeof render === "function") {
      content = render(value);
    } else {
      switch (type) {
        case "date":
          content = value ? dayjs(value).format(dateFormat) : "-";
          break;
        case "number":
          content =
            typeof value === "number" ? value.toLocaleString() : value ?? "-";
          break;
        case "chip":
          content = value ? <Chip label={value} {...chipProps} /> : "-";
          break;
        case "custom":
          // Custom handled via render
          break;
        default:
          content = value ?? "-";
      }
    }

    const textCell = (
      <Typography
        variant="body2"
        noWrap={truncate}
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: truncate ? "nowrap" : "normal",
        }}
      >
        {content}
      </Typography>
    );

    return (
      <TableCell
        ref={ref}
        align={align}
        sx={{
          borderBottom: "1px solid",
          borderColor: "divider",
          verticalAlign: "middle",
          maxWidth: truncate ? 180 : "auto",
          ...sx,
        }}
        {...restOfProps}
      >
        {tooltip && typeof value === "string" && truncate ? (
          <Tooltip title={value}>{textCell}</Tooltip>
        ) : (
          textCell
        )}
      </TableCell>
    );
  }
);

AppTableCell.displayName = "AppTableCell";

AppTableCell.propTypes = {
  value: PropTypes.any,
  type: PropTypes.oneOf(["text", "number", "date", "chip", "custom"]),
  render: PropTypes.func,
  align: PropTypes.oneOf(["left", "right", "center"]),
  truncate: PropTypes.bool,
  tooltip: PropTypes.bool,
  sx: PropTypes.object,
  chipProps: PropTypes.object,
  dateFormat: PropTypes.string,
};

export default AppTableCell;
