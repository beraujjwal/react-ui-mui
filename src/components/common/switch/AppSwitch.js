import { forwardRef } from "react";
import PropTypes from "prop-types";
import { Switch, FormControlLabel, Box, Typography } from "@mui/material";

/**
 * Application styled Switch component
 * A reusable wrapper around MUI Switch for consistent design and behavior.
 *
 * @component AppSwitch
 * @param {boolean} checked - Whether the switch is on or off
 * @param {function} onChange - Callback when value changes
 * @param {string|node} label - Optional label for the switch
 * @param {string} labelPosition - Label placement ('start' | 'end' | 'top' | 'bottom')
 * @param {string} color - MUI color name ('primary', 'secondary', 'success', etc.)
 * @param {string} size - Switch size ('small' | 'medium')
 * @param {boolean} disabled - Disable the switch
 * @param {object} sx - Custom style overrides
 * @param {object} labelSx - Custom style for the label text
 */
const AppSwitch = forwardRef(
  (
    {
      checked = false,
      onChange,
      label,
      labelPosition = "end",
      color = "primary",
      size = "medium",
      disabled = false,
      sx = {},
      labelSx = {},
      ...restOfProps
    },
    ref
  ) => {
    const switchElement = (
      <Switch
        ref={ref}
        checked={checked}
        onChange={onChange}
        color={color}
        size={size}
        disabled={disabled}
        sx={{
          "& .MuiSwitch-switchBase.Mui-checked": {
            color: `${color}.main`,
          },
          "& .MuiSwitch-track": {
            borderRadius: 2,
            opacity: 1,
            backgroundColor: (theme) =>
              checked
                ? theme.palette[color]?.main || theme.palette.primary.main
                : theme.palette.grey[400],
          },
          ...sx,
        }}
        {...restOfProps}
      />
    );

    // If label is provided, wrap with FormControlLabel
    if (label) {
      return (
        <FormControlLabel
          control={switchElement}
          label={
            typeof label === "string" ? (
              <Typography
                variant="body2"
                color={disabled ? "text.disabled" : "text.primary"}
                sx={labelSx}
              >
                {label}
              </Typography>
            ) : (
              label
            )
          }
          labelPlacement={labelPosition}
          sx={{
            userSelect: "none",
            gap: 1,
          }}
        />
      );
    }

    return <Box>{switchElement}</Box>;
  }
);

AppSwitch.displayName = "AppSwitch";

AppSwitch.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  labelPosition: PropTypes.oneOf(["start", "end", "top", "bottom"]),
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "error",
    "info",
    "warning",
  ]),
  size: PropTypes.oneOf(["small", "medium"]),
  disabled: PropTypes.bool,
  sx: PropTypes.object,
  labelSx: PropTypes.object,
};

export default AppSwitch;
