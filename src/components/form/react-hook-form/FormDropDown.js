import React from 'react';
import {
  Box,
  Grid,
  Typography,
  TextField,
  Container,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  InputAdornment,
} from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';
import PropTypes from 'prop-types';

function FormDropdown({ name, control, label, options, message, require }) {
  return (
    <Controller
      defaultValue=""
      render={({ field: { onChange, value }, fieldState: { error }, formState }) => (
        <TextField
          select
          fullWidth
          id={name}
          required
          onChange={onChange}
          value={value}
          label={label}
          error={!!error}
          helperText={error ? error.message : null}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      )}
      rules={require && { required: message }}
      control={control}
      name={name}
    />
  );
}

FormDropdown.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  message: PropTypes.string,
  control: PropTypes.any,
  require: PropTypes.any,
  options: PropTypes.any,
};
export default FormDropdown;
