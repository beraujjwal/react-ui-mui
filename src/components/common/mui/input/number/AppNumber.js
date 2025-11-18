import { forwardRef } from "react";
import PropTypes from "prop-types";
import {
  TextField,
  InputAdornment,
  IconButton,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

/**
 * Application styled Number component
 * A reusable, theme-consistent numeric input with min/max & step handling.
 *
 * @component AppNumber
 * @param {string} label - Field label
 * @param {number|string} value - Current value
 * @param {function} onChange - Callback on value change
 * @param {number} min - Minimum allowed value
 * @param {number} max - Maximum allowed value
 * @param {number} step - Increment/decrement step
 * @param {boolean} allowDecimal - Allow decimal input
 * @param {boolean} showStepper - Show +/- buttons
 * @param {string|node} helperText - Helper or error message
 * @param {boolean} error - Error state
 * @param {boolean} disabled - Disable input
 * @param {object} sx - Custom style overrides
 */
const AppNumber = forwardRef(
  (
    {
      label = "Number",
      value,
      onChange,
      min,
      max,
      step = 1,
      allowDecimal = true,
      showStepper = true,
      helperText,
      error = false,
      disabled = false,
      fullWidth = true,
      placeholder = "",
      size = "medium",
      color = "primary",
      sx = {},
      ...restOfProps
    },
    ref
  ) => {
    // Handle manual typing
    const handleInputChange = (e) => {
      let val = e.target.value;
      if (!allowDecimal) val = val.replace(/\./g, ""); // block decimal
      if (/^-?\d*\.?\d*$/.test(val)) {
        onChange && onChange(val);
      }
    };

    // Handle increment/decrement
    const handleStep = (dir) => {
      if (disabled) return;

      let current = parseFloat(value || 0);
      let next = dir === "inc" ? current + step : current - step;

      if (typeof min === "number" && next < min) next = min;
      if (typeof max === "number" && next > max) next = max;

      onChange && onChange(next);
    };

    return (
      <Box sx={{ display: "flex", alignItems: "center", ...sx }}>
        <TextField
          ref={ref}
          label={label}
          type="text"
          value={value ?? ""}
          onChange={handleInputChange}
          placeholder={placeholder}
          error={error}
          helperText={helperText}
          disabled={disabled}
          fullWidth={fullWidth}
          size={size}
          color={color}
          variant="outlined"
          InputProps={{
            inputMode: allowDecimal ? "decimal" : "numeric",
            endAdornment: showStepper && (
              <InputAdornment position="end">
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <IconButton
                    size="small"
                    onClick={() => handleStep("inc")}
                    disabled={disabled || (typeof max === "number" && value >= max)}
                    sx={{ p: 0.3 }}
                  >
                    <AddIcon fontSize="inherit" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleStep("dec")}
                    disabled={disabled || (typeof min === "number" && value <= min)}
                    sx={{ p: 0.3 }}
                  >
                    <RemoveIcon fontSize="inherit" />
                  </IconButton>
                </Box>
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              backgroundColor: disabled ? "action.disabledBackground" : "white",
              "&:hover fieldset": {
                borderColor: "primary.light",
              },
              "&.Mui-focused fieldset": {
                borderColor: "primary.main",
                borderWidth: 2,
              },
            },
            "& .MuiInputLabel-root": {
              fontWeight: 500,
            },
            "& .MuiFormHelperText-root": {
              mt: 0.5,
              fontSize: "0.75rem",
            },
          }}
          {...restOfProps}
        />
      </Box>
    );
  }
);

AppNumber.displayName = "AppNumber";

AppNumber.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  allowDecimal: PropTypes.bool,
  showStepper: PropTypes.bool,
  helperText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  error: PropTypes.bool,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  placeholder: PropTypes.string,
  size: PropTypes.oneOf(["small", "medium"]),
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "error",
    "info",
    "success",
    "warning",
  ]),
  sx: PropTypes.object,
};

export default AppNumber;
