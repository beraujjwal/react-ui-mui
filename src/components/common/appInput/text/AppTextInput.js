import { forwardRef } from "react";
import PropTypes from "prop-types";
import { TextField, InputAdornment, IconButton } from "@mui/material";

/**
 * Application styled TextInput component
 * A reusable wrapper around MUI TextField for consistent input styling.
 *
 * @component AppTextInput
 * @param {string} label - Input label
 * @param {string} value - Input value
 * @param {function} onChange - Change handler
 * @param {string} type - Input type ('text', 'number', 'password', etc.)
 * @param {string} placeholder - Placeholder text
 * @param {boolean} fullWidth - Make input take full width
 * @param {boolean} multiline - Enable multiline input
 * @param {number} rows - Number of rows for multiline
 * @param {boolean} error - Display error state
 * @param {string|node} helperText - Helper or error text below input
 * @param {node} startIcon - Icon or element before input
 * @param {node} endIcon - Icon or element after input
 * @param {function} onEndIconClick - Callback for end icon click
 * @param {object} sx - Custom style overrides
 */
const AppTextInput = forwardRef(
  (
    {
      label,
      value,
      onChange,
      type = "text",
      placeholder,
      fullWidth = true,
      multiline = false,
      rows,
      error = false,
      helperText,
      startIcon,
      endIcon,
      onEndIconClick,
      size = "medium",
      variant = "outlined",
      color = "primary",
      disabled = false,
      sx = {},
      ...restOfProps
    },
    ref
  ) => {
    return (
      <TextField
        ref={ref}
        label={label}
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        fullWidth={fullWidth}
        multiline={multiline}
        rows={rows}
        error={error}
        helperText={helperText}
        size={size}
        variant={variant}
        color={color}
        disabled={disabled}
        InputProps={{
          startAdornment: startIcon && (
            <InputAdornment position="start">{startIcon}</InputAdornment>
          ),
          endAdornment:
            endIcon &&
            (onEndIconClick ? (
              <InputAdornment position="end">
                <IconButton
                  onClick={onEndIconClick}
                  edge="end"
                  size="small"
                  tabIndex={-1}
                >
                  {endIcon}
                </IconButton>
              </InputAdornment>
            ) : (
              <InputAdornment position="end">{endIcon}</InputAdornment>
            )),
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

AppTextInput.displayName = "AppTextInput";

AppTextInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  fullWidth: PropTypes.bool,
  multiline: PropTypes.bool,
  rows: PropTypes.number,
  error: PropTypes.bool,
  helperText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  startIcon: PropTypes.node,
  endIcon: PropTypes.node,
  onEndIconClick: PropTypes.func,
  size: PropTypes.oneOf(["small", "medium"]),
  variant: PropTypes.oneOf(["outlined", "filled", "standard"]),
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "error",
    "info",
    "success",
    "warning",
  ]),
  disabled: PropTypes.bool,
  sx: PropTypes.object,
};

export default AppTextInput;
