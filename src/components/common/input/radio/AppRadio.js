import { forwardRef } from "react";
import PropTypes from "prop-types";
import { Radio, FormControlLabel, Tooltip, Typography } from "@mui/material";

/**
 * Application styled Radio component
 * A reusable, theme-consistent wrapper around MUI Radio.
 *
 * @component AppRadio
 * @param {string} label - Label text displayed beside the radio
 * @param {any} value - Radio value
 * @param {any} checked - Whether the radio is selected
 * @param {function} onChange - Callback when radio changes
 * @param {string} color - MUI color variant ('primary', 'secondary', 'success', etc.)
 * @param {boolean} disabled - Disable the radio
 * @param {node} icon - Custom unselected icon
 * @param {node} checkedIcon - Custom selected icon
 * @param {boolean} tooltip - Tooltip text shown on hover
 * @param {string} size - Radio size ('small' | 'medium')
 * @param {object} sx - Custom style overrides
 * @param {boolean} labelPlacement - Label placement ('end' | 'start' | 'top' | 'bottom')
 */
const AppRadio = forwardRef(
  (
    {
      label,
      value,
      checked,
      onChange,
      color = "primary",
      disabled = false,
      icon,
      checkedIcon,
      tooltip,
      size = "medium",
      sx = {},
      labelPlacement = "end",
      ...restOfProps
    },
    ref
  ) => {
    const radioControl = (
      <Radio
        ref={ref}
        value={value}
        checked={checked}
        onChange={onChange}
        color={color}
        disabled={disabled}
        icon={icon}
        checkedIcon={checkedIcon}
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

    const labeledRadio = (
      <FormControlLabel
        value={value}
        label={
          label ? (
            <Typography variant="body2" fontWeight={500}>
              {label}
            </Typography>
          ) : (
            ""
          )
        }
        control={radioControl}
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
    );

    return tooltip ? (
      <Tooltip title={tooltip} arrow>
        <span>{labeledRadio}</span>
      </Tooltip>
    ) : (
      labeledRadio
    );
  }
);

AppRadio.displayName = "AppRadio";

AppRadio.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  value: PropTypes.any,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
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
  tooltip: PropTypes.string,
  size: PropTypes.oneOf(["small", "medium"]),
  sx: PropTypes.object,
  labelPlacement: PropTypes.oneOf(["end", "start", "top", "bottom"]),
};

export default AppRadio;
