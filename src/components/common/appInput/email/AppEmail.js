import { forwardRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import ClearIcon from "@mui/icons-material/Clear";

/**
 * Application styled Email input component
 * A reusable, theme-consistent email input with validation and icon support.
 *
 * @component AppEmail
 * @param {string} label - Input label
 * @param {string} value - Input value
 * @param {function} onChange - Change handler
 * @param {boolean} validate - Whether to validate email format
 * @param {string|node} helperText - Helper or error text
 * @param {boolean} error - Error state
 * @param {boolean} fullWidth - Whether to occupy full width
 * @param {boolean} disabled - Disable input field
 * @param {boolean} clearable - Show clear button when text is present
 * @param {node} startIcon - Icon before input
 * @param {object} sx - Custom style overrides
 */
const AppEmail = forwardRef(
  (
    {
      label = "Email Address",
      value,
      onChange,
      validate = true,
      helperText,
      error: propError = false,
      fullWidth = true,
      disabled = false,
      placeholder = "you@example.com",
      size = "medium",
      color = "primary",
      clearable = true,
      startIcon = <EmailIcon color="action" />,
      sx = {},
      ...restOfProps
    },
    ref
  ) => {
    const [error, setError] = useState(false);
    const [helper, setHelper] = useState(helperText || "");

    useEffect(() => {
      if (validate && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(value);
        setError(!isValid);
        setHelper(
          !isValid ? "Please enter a valid email address." : helperText || ""
        );
      } else {
        setError(propError);
        setHelper(helperText || "");
      }
    }, [value, validate, helperText, propError]);

    const handleClear = () => {
      onChange && onChange("");
    };

    return (
      <TextField
        ref={ref}
        label={label}
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        type="email"
        placeholder={placeholder}
        fullWidth={fullWidth}
        disabled={disabled}
        error={error}
        helperText={helper}
        size={size}
        color={color}
        variant="outlined"
        InputProps={{
          startAdornment: startIcon && (
            <InputAdornment position="start">{startIcon}</InputAdornment>
          ),
          endAdornment:
            clearable && value ? (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClear}
                  edge="end"
                  size="small"
                  tabIndex={-1}
                >
                  <ClearIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ) : null,
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
          ...sx,
        }}
        {...restOfProps}
      />
    );
  }
);

AppEmail.displayName = "AppEmail";

AppEmail.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  validate: PropTypes.bool,
  helperText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  error: PropTypes.bool,
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
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
  clearable: PropTypes.bool,
  startIcon: PropTypes.node,
  sx: PropTypes.object,
};

export default AppEmail;
