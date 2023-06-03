import React, { useEffect, useState } from 'react';
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
  FormControlLabel,
  Switch,
  InputAdornment,
} from '@mui/material';
import { useForm, Controller, useFormState } from 'react-hook-form';
import PropTypes from 'prop-types';
import Label from '../../../../label';

function CampaignSwitch({ defaultValueSent, control }) {
  const { register, reset, setValue, handleSubmit } = useForm();

  const [isDefaultchecked, setIsDefaultChecked] = useState();
  const [isDefaultcheckedDef, setIsDefaultCheckedDef] = useState();

  const handleChangeDefault = (event) => {
    setIsDefaultChecked(event.target.checked);
    setIsDefaultCheckedDef(event.target.checked);
  };

  useEffect(() => {
    setIsDefaultChecked(defaultValueSent);
    setIsDefaultCheckedDef(defaultValueSent);
  }, [defaultValueSent]);
  return (
    <Controller
      control={control}
      name="status"
      render={({ field: { onChange, value }, fieldState: { error }, formState }) => (
        <FormControlLabel
          labelPlacement="start"
          name="status"
          control={
            <Switch
              onChange={onChange}
              onClick={handleChangeDefault}
              checked={isDefaultchecked}
              value={isDefaultchecked ? 'active' : 'banned'}
            />
          }
          label={
            <>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                <Label
                  color={isDefaultcheckedDef ? 'success' : 'error'}
                  sx={{ textTransform: 'uppercase' }}
                >
                  {isDefaultcheckedDef ? 'Active' : 'Bannned'}
                </Label>
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Campaign Status
              </Typography>
            </>
          }
          sx={{ mx: 0, mb: 3, width: 1, justifyContent: 'space-between' }}
        />
      )}
    />
  );
}

CampaignSwitch.propTypes = {
  control: PropTypes.any,
  defaultValueSent: PropTypes.any,
};

export default CampaignSwitch;
