import { forwardRef } from "react";
import PropTypes from "prop-types";
import {
  Checkbox,
  FormControlLabel,
  Tooltip,
  Typography,
  Box,
} from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";

/**
 * Application styled Checkbox component
 * A reusable wrapper around MUI Checkbox with consistent styling and behavior.
 *
 * @component AppCheckbox
 * @param {string|node} label - Text label beside checkbox
 * @param {boolean} checked - Checked state
 * @param {function} onChange - Callback when toggled
 * @param {boolean} indeterminate - Show indeterminate (partial) state
 * @param {string} color - MUI color variant ('primary', 'secondary', etc.)
 * @param {boolean} disabled - Disable checkbox
 * @param {node} icon - Custom unchecked icon
 * @param {node} checkedIcon - Custom checked icon
 * @param {node} indeterminateIcon - Custom icon for indeterminate state
 * @param {string} size - Checkbox size ('small' | 'medium')
 * @param {string} tooltip - Tooltip text
 * @param {string} labelPlacement - Label position ('end' | 'start' | 'top' | 'bottom')
 * @param {object} sx - Custom style overrides
 */
const AppCheckbox = forwardRef(
  (
    {
      label,
      checked = false,
      onChange,
      indeterminate = false,
      color = "primary",
      disabled = false,
      icon = <CheckBoxOutlineBlankIcon />,
      checkedIcon = <CheckBoxIcon />,
      indeterminateIcon = <IndeterminateCheckBoxIcon />,
      size = "medium",
      tooltip,
      labelPlacement = "end",
      sx = {},
      ...restOfProps
    },
    ref
  ) => {
    const checkbox = (
      <Checkbox
        ref={ref}
        checked={checked}
        onChange={onChange}
        indeterminate={indeterminate}
        color={color}
        disabled={disabled}
        icon={icon}
        checkedIcon={checkedIcon}
        indeterminateIcon={indeterminateIcon}
        size={size}
        sx={{
          "&.Mui-checked": {
            color: (theme) => theme.palette[color]?.main,
          },
          "&.Mui-disabled": {
            color: (theme) => theme.palette.action.disabled,
          },
          ...sx,
        }}
        {...restOfProps}
      />
    );

    const labeledCheckbox = label ? (
      <FormControlLabel
        control={checkbox}
        label={
          <Typography variant="body2" fontWeight={500}>
            {label}
          </Typography>
        }
        labelPlacement={labelPlacement}
        disabled={disabled}
        sx={{
          gap: 0.5,
          cursor: disabled ? "not-allowed" : "pointer",
          "& .MuiTypography-root": {
            color: disabled ? "text.disabled" : "text.primary",
          },
        }}
      />
    ) : (
      checkbox
    );

    return tooltip ? (
      <Tooltip title={tooltip} arrow>
        <Box component="span">{labeledCheckbox}</Box>
      </Tooltip>
    ) : (
      labeledCheckbox
    );
  }
);

AppCheckbox.displayName = "AppCheckbox";

AppCheckbox.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  indeterminate: PropTypes.bool,
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "error",
    "info",
    "warning",
  ]),
  disabled: PropTypes.bool,
  icon: PropTypes.node,
  checkedIcon: PropTypes.node,
  indeterminateIcon: PropTypes.node,
  size: PropTypes.oneOf(["small", "medium"]),
  tooltip: PropTypes.string,
  labelPlacement: PropTypes.oneOf(["end", "start", "top", "bottom"]),
  sx: PropTypes.object,
};

export default AppCheckbox;
