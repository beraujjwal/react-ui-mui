import { forwardRef } from "react";
import PropTypes from "prop-types";
import { Autocomplete, TextField } from "@mui/material";

/**
 * Application styled Autocomplete component
 * Note: forwardRef is required if used within forms or MUI wrappers (e.g. Dialog, Popper, etc.)
 * @component AppAutocomplete
 *
 * @param {array} options - List of autocomplete options
 * @param {string} label - Label for the input field
 * @param {string} placeholder - Placeholder text for the input
 * @param {boolean} multiple - Enables multiple selection
 * @param {function} onChange - Callback when selection changes
 * @param {function} renderOption - Custom render function for options
 * @param {object} textFieldProps - Additional props for the underlying TextField
 * @param {object} sx - Custom styling overrides for the Autocomplete
 */
const AppAutocomplete = forwardRef(
  (
    {
      options = [],
      label = "",
      placeholder = "",
      multiple = false,
      onChange = () => {},
      value = multiple ? [] : null,
      renderOption,
      textFieldProps = {},
      sx = {},
      ...restOfProps
    },
    ref
  ) => {
    return (
      <Autocomplete
        ref={ref}
        multiple={multiple}
        options={options}
        value={value}
        onChange={onChange}
        renderOption={renderOption}
        sx={{
          width: "100%",
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
          },
          "& .MuiInputLabel-root": {
            fontWeight: 500,
          },
          ...sx,
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            placeholder={placeholder}
            {...textFieldProps}
          />
        )}
        {...restOfProps}
      />
    );
  }
);

AppAutocomplete.displayName = "AppAutocomplete";

AppAutocomplete.propTypes = {
  options: PropTypes.array.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  multiple: PropTypes.bool,
  value: PropTypes.any,
  onChange: PropTypes.func,
  renderOption: PropTypes.func,
  textFieldProps: PropTypes.object,
  sx: PropTypes.object,
};

export default AppAutocomplete;
