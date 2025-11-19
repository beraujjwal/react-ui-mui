import { forwardRef } from "react";
import PropTypes from "prop-types";
import {
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { AppBox } from "../box";
import { AppTypography } from "../typography";
import { AppTooltip } from "../tooltip";

/**
 * Application styled Toggle component
 * A reusable wrapper around MUI ToggleButtonGroup and ToggleButton
 * for consistent toggling UI across the app.
 *
 * @component AppToggle
 * @param {array} options - Toggle options [{ label, value, icon, tooltip, disabled }]
 * @param {any} value - Selected value(s)
 * @param {function} onChange - Callback when selection changes
 * @param {boolean} multiple - Allow multiple selections
 * @param {string} color - MUI color ('primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning')
 * @param {string} size - Button size ('small' | 'medium' | 'large')
 * @param {boolean} exclusive - Exclusive selection (for single mode)
 * @param {object} sx - Custom style overrides
 * @param {object} buttonSx - Custom style overrides for individual buttons
 */
const AppToggle = forwardRef(
  (
    {
      options = [],
      value,
      onChange,
      multiple = false,
      color = "primary",
      size = "medium",
      exclusive = !multiple,
      sx = {},
      buttonSx = {},
      ...restOfProps
    },
    ref
  ) => {
    const handleChange = (_, newValue) => {
      if (onChange) onChange(newValue);
    };

    return (
      <AppBox ref={ref} sx={{ display: "flex", justifyContent: "center", ...sx }}>
        <ToggleButtonGroup
          value={value}
          exclusive={exclusive}
          onChange={handleChange}
          color={color}
          size={size}
          {...restOfProps}
        >
          {options.map((option) => {
            const button = (
              <ToggleButton
                key={option.value}
                value={option.value}
                disabled={option.disabled}
                sx={{
                  textTransform: "none",
                  px: 2,
                  py: 0.8,
                  fontWeight: 500,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  borderRadius: 2,
                  "&.Mui-selected": {
                    backgroundColor: (theme) =>
                      theme.palette[color]?.main + "22",
                    color: (theme) => theme.palette[color]?.main,
                    fontWeight: 600,
                  },
                  "&.Mui-selected:hover": {
                    backgroundColor: (theme) =>
                      theme.palette[color]?.main + "33",
                  },
                  ...buttonSx,
                }}
              >
                {option.icon && (
                  <AppBox
                    component="span"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {option.icon}
                  </AppBox>
                )}
                {option.label && (
                  <AppTypography variant="body2">{option.label}</AppTypography>
                )}
              </ToggleButton>
            );

            return option.tooltip ? (
              <AppTooltip key={option.value} title={option.tooltip} arrow>
                {button}
              </AppTooltip>
            ) : (
              button
            );
          })}
        </ToggleButtonGroup>
      </AppBox>
    );
  }
);

AppToggle.displayName = "AppToggle";

AppToggle.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.any.isRequired,
      icon: PropTypes.node,
      tooltip: PropTypes.string,
      disabled: PropTypes.bool,
    })
  ).isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func,
  multiple: PropTypes.bool,
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "error",
    "info",
    "warning",
  ]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  exclusive: PropTypes.bool,
  sx: PropTypes.object,
  buttonSx: PropTypes.object,
};

export default AppToggle;
