import { forwardRef } from "react";
import PropTypes from "prop-types";
import { FormControlLabel } from "@mui/material";

/**
 * Application styled FormControlLabel component
 * Note: forwardRef is needed for compatibility with MUI forms and transitions.
 * @component AppFormControlLabel
 * @param {object} control - The control element (Checkbox, Radio, or Switch)
 * @param {string|node} label - The label displayed next to the control
 * @param {string} labelPlacement - Label position ("end", "start", "top", "bottom")
 * @param {object} sx - Additional system style overrides
 * @param {boolean} disabled - Whether the control is disabled
 */
const AppFormControlLabel = forwardRef(
  (
    {
      control,
      label,
      labelPlacement = "end",
      disabled = false,
      sx = {},
      ...restOfProps
    },
    ref
  ) => {
    return (
      <FormControlLabel
        ref={ref}
        control={control}
        label={label}
        labelPlacement={labelPlacement}
        disabled={disabled}
        sx={{
          // Default styling
          margin: 0,
          gap: 1,
          color: disabled ? "text.disabled" : "text.primary",
          "& .MuiFormControlLabel-label": {
            fontSize: "0.95rem",
            fontWeight: 500,
          },
          "&:hover .MuiFormControlLabel-label": {
            color: "primary.main",
          },
          ...sx,
        }}
        {...restOfProps}
      />
    );
  }
);

AppFormControlLabel.displayName = "AppFormControlLabel";

AppFormControlLabel.propTypes = {
  control: PropTypes.node.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  labelPlacement: PropTypes.oneOf(["end", "start", "top", "bottom"]),
  disabled: PropTypes.bool,
  sx: PropTypes.object,
};

export default AppFormControlLabel;
