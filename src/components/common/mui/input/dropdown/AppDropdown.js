import { forwardRef } from "react";
import PropTypes from "prop-types";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  IconButton,
  InputAdornment,
  Box,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

/**
 * Application styled Dropdown component
 * A reusable, theme-consistent wrapper around MUI Select.
 *
 * @component AppDropdown
 * @param {string} label - Label for the dropdown
 * @param {array} options - Array of options [{ label, value, icon, disabled }]
 * @param {any} value - Selected value
 * @param {function} onChange - Callback for value change
 * @param {boolean} multiple - Allow multiple selections
 * @param {boolean} error - Error state
 * @param {string|node} helperText - Helper or error message
 * @param {boolean} disabled - Disable input
 * @param {boolean} fullWidth - Whether to occupy full width
 * @param {boolean} clearable - Show clear icon when selected
 * @param {string} placeholder - Placeholder text when no selection
 * @param {object} sx - Custom style overrides
 */
const AppDropdown = forwardRef(
  (
    {
      label,
      options = [],
      value,
      onChange,
      multiple = false,
      error = false,
      helperText,
      disabled = false,
      fullWidth = true,
      clearable = false,
      placeholder = "Select an option",
      size = "medium",
      color = "primary",
      sx = {},
      ...restOfProps
    },
    ref
  ) => {
    const handleClear = () => {
      onChange && onChange(multiple ? [] : "");
    };

    return (
      <FormControl
        ref={ref}
        fullWidth={fullWidth}
        size={size}
        error={error}
        disabled={disabled}
        sx={{ minWidth: 160, ...sx }}
      >
        {label && <InputLabel>{label}</InputLabel>}

        <Select
          label={label}
          value={value ?? (multiple ? [] : "")}
          onChange={(e) => onChange && onChange(e.target.value)}
          multiple={multiple}
          color={color}
          displayEmpty
          renderValue={(selected) => {
            if (!selected || (Array.isArray(selected) && selected.length === 0)) {
              return (
                <Box sx={{ color: "text.disabled" }}>
                  {placeholder}
                </Box>
              );
            }

            if (Array.isArray(selected)) {
              const selectedLabels = options
                .filter((opt) => selected.includes(opt.value))
                .map((opt) => opt.label)
                .join(", ");
              return selectedLabels;
            }

            const found = options.find((opt) => opt.value === selected);
            return found?.label ?? selected;
          }}
          endAdornment={
            clearable && value ? (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  onClick={handleClear}
                  tabIndex={-1}
                  disabled={disabled}
                >
                  <ClearIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ) : null
          }
          {...restOfProps}
          sx={{
            borderRadius: 2,
            "& .MuiSelect-select": {
              py: 1.2,
              px: 1.5,
              display: "flex",
              alignItems: "center",
              gap: 1,
            },
            "& fieldset": {
              borderColor: error ? "error.main" : "divider",
            },
            "&:hover fieldset": {
              borderColor: error ? "error.main" : "primary.light",
            },
            "&.Mui-focused fieldset": {
              borderColor: "primary.main",
              borderWidth: 2,
            },
          }}
        >
          {options.map((opt) => (
            <MenuItem
              key={opt.value}
              value={opt.value}
              disabled={opt.disabled}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              {opt.icon && <Box>{opt.icon}</Box>}
              {opt.label}
            </MenuItem>
          ))}
        </Select>

        {helperText && (
          <FormHelperText sx={{ mt: 0.5 }}>{helperText}</FormHelperText>
        )}
      </FormControl>
    );
  }
);

AppDropdown.displayName = "AppDropdown";

AppDropdown.propTypes = {
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
      value: PropTypes.any.isRequired,
      icon: PropTypes.node,
      disabled: PropTypes.bool,
    })
  ),
  value: PropTypes.any,
  onChange: PropTypes.func,
  multiple: PropTypes.bool,
  error: PropTypes.bool,
  helperText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  clearable: PropTypes.bool,
  placeholder: PropTypes.string,
  size: PropTypes.oneOf(["small", "medium"]),
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "error",
    "info",
    "warning",
  ]),
  sx: PropTypes.object,
};

export default AppDropdown;
