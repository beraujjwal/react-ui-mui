import { forwardRef } from "react";
import PropTypes from "prop-types";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { TextField } from "@mui/material";

/**
 * Application styled DatePicker component
 * A reusable wrapper around MUI DatePicker with consistent defaults and styling.
 *
 * @component AppDatePicker
 * @param {Date|null} value - Current selected date
 * @param {function} onChange - Callback when date changes
 * @param {string} label - Label for the input field
 * @param {string} format - Display format (e.g. 'dd/MM/yyyy')
 * @param {boolean} disableFuture - Disable future dates
 * @param {boolean} disablePast - Disable past dates
 * @param {object} textFieldProps - Additional props for underlying TextField
 * @param {object} sx - Custom styling overrides
 */
const AppDatePicker = forwardRef(
  (
    {
      value,
      onChange,
      label = "Select Date",
      format = "dd/MM/yyyy",
      disableFuture = false,
      disablePast = false,
      textFieldProps = {},
      sx = {},
      ...restOfProps
    },
    ref
  ) => {
    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          ref={ref}
          label={label}
          value={value}
          onChange={onChange}
          format={format}
          disableFuture={disableFuture}
          disablePast={disablePast}
          slotProps={{
            textField: {
              fullWidth: true,
              size: "small",
              ...textFieldProps,
            },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
            },
            ...sx,
          }}
          {...restOfProps}
        />
      </LocalizationProvider>
    );
  }
);

AppDatePicker.displayName = "AppDatePicker";

AppDatePicker.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  format: PropTypes.string,
  disableFuture: PropTypes.bool,
  disablePast: PropTypes.bool,
  textFieldProps: PropTypes.object,
  sx: PropTypes.object,
};

export default AppDatePicker;
