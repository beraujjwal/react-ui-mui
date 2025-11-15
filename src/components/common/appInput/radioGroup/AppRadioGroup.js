import { forwardRef } from "react";
import PropTypes from "prop-types";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
  Box,
} from "@mui/material";

/**
 * Application styled RadioGroup component
 * A reusable wrapper around MUI RadioGroup for consistent radio button UI.
 *
 * @component AppRadioGroup
 * @param {string} label - Group label (optional)
 * @param {array} options - Array of radio options [{ label, value, disabled }]
 * @param {any} value - Current selected value
 * @param {function} onChange - Callback for value change
 * @param {string} direction - Layout direction ('row' | 'column')
 * @param {boolean} error - Error state
 * @param {string|node} helperText - Helper or error message
 * @param {string} color - MUI color ('primary', 'secondary', 'success', etc.)
 * @param {object} sx - Custom style overrides
 * @param {object} radioSx - Style overrides for individual radio buttons
 */
const AppRadioGroup = forwardRef(
  (
    {
      label,
      options = [],
      value,
      onChange,
      direction = "column",
      error = false,
      helperText,
      color = "primary",
      sx = {},
      radioSx = {},
      size = "medium",
      required = false,
      ...restOfProps
    },
    ref
  ) => {
    return (
      <FormControl
        ref={ref}
        component="fieldset"
        error={error}
        required={required}
        sx={{ width: "100%", ...sx }}
        {...restOfProps}
      >
        {label && (
          <FormLabel
            component="legend"
            sx={{
              mb: 1,
              fontWeight: 600,
              fontSize: "0.9rem",
              color: error ? "error.main" : "text.primary",
            }}
          >
            {label}
          </FormLabel>
        )}

        <RadioGroup
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
          row={direction === "row"}
          sx={{
            gap: 1,
          }}
        >
          {options.map((opt) => (
            <FormControlLabel
              key={opt.value}
              value={opt.value}
              label={opt.label}
              disabled={opt.disabled}
              control={
                <Radio
                  color={color}
                  size={size}
                  sx={{
                    "&.Mui-checked": {
                      color: (theme) => theme.palette[color].main,
                    },
                    ...radioSx,
                  }}
                />
              }
            />
          ))}
        </RadioGroup>

        {helperText && (
          <FormHelperText sx={{ mt: 0.5 }}>{helperText}</FormHelperText>
        )}
      </FormControl>
    );
  }
);

AppRadioGroup.displayName = "AppRadioGroup";

AppRadioGroup.propTypes = {
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
      value: PropTypes.any.isRequired,
      disabled: PropTypes.bool,
    })
  ),
  value: PropTypes.any,
  onChange: PropTypes.func,
  direction: PropTypes.oneOf(["row", "column"]),
  error: PropTypes.bool,
  helperText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "error",
    "info",
    "warning",
  ]),
  sx: PropTypes.object,
  radioSx: PropTypes.object,
  size: PropTypes.oneOf(["small", "medium"]),
  required: PropTypes.bool,
};

export default AppRadioGroup;
