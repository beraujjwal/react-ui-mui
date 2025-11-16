import { forwardRef, useState } from "react";
import PropTypes from "prop-types";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

/**
 * Application styled Password component
 * A reusable, theme-consistent password input with show/hide toggle.
 *
 * @component AppPassword
 * @param {string} label - Input label
 * @param {string} value - Password value
 * @param {function} onChange - Change handler
 * @param {boolean} error - Display error state
 * @param {string|node} helperText - Helper or error message
 * @param {string} placeholder - Input placeholder
 * @param {boolean} fullWidth - Whether to occupy full width
 * @param {object} sx - Custom styling
 * @param {boolean} disabled - Disable input field
 * @param {object} iconProps - Props for visibility icons
 */
const AppPassword = forwardRef(
  (
    {
      label = "Password",
      value,
      onChange,
      error = false,
      helperText,
      placeholder = "Enter your password",
      fullWidth = true,
      sx = {},
      disabled = false,
      size = "medium",
      color = "primary",
      iconProps = {},
      ...restOfProps
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleToggle = () => setShowPassword((prev) => !prev);

    return (
      <TextField
        ref={ref}
        label={label}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={showPassword ? "text" : "password"}
        fullWidth={fullWidth}
        error={error}
        helperText={helperText}
        disabled={disabled}
        size={size}
        color={color}
        variant="outlined"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={handleToggle}
                edge="end"
                size="small"
                tabIndex={-1}
                {...iconProps}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
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
          ...sx,
        }}
        {...restOfProps}
      />
    );
  }
);

AppPassword.displayName = "AppPassword";

AppPassword.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  error: PropTypes.bool,
  helperText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  placeholder: PropTypes.string,
  fullWidth: PropTypes.bool,
  sx: PropTypes.object,
  disabled: PropTypes.bool,
  size: PropTypes.oneOf(["small", "medium"]),
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "error",
    "info",
    "success",
    "warning",
  ]),
  iconProps: PropTypes.object,
};

export default AppPassword;
