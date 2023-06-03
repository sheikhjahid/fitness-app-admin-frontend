import React from 'react';
import {
  Box,
  Grid,
  Switch,
  Typography,
  FormControlLabel,
  FormGroup,
  Container,
  TextField,
} from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import PropTypes from 'prop-types';

function FormInputtext({ name, label, type, message, control, defaultValueSent, require }) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValueSent !== undefined ? defaultValueSent : ''}
      render={({ field: { onChange, value }, fieldState: { error }, formState }) => (
        <TextField
          type={type}
          fullWidth
          id={name}
          InputProps={{ inputProps: { min: 0, max: 10 } }}
          required
          onChange={onChange}
          value={value}
          label={label}
          error={!!error}
          helperText={error ? error.message : null}
        />
      )}
      rules={require && { required: message }}
    />
  );
}

FormInputtext.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  message: PropTypes.string,
  control: PropTypes.any,
  defaultValueSent: PropTypes.any,
  require: PropTypes.any,
};
export default FormInputtext;
