import * as Yup from 'yup';
import { useState, useEffect, useRef } from 'react';

// form
import { useForm, Controller, useFormState } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
// @mui
import {
  Box,
  Grid,
  Switch,
  Typography,
  FormControlLabel,
  FormGroup,
  Button,
  Container,
  TextField,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
// import DefaultSwitch from './react-hook-form/DefaultSwitch';
import { Route, Link, Routes, useLocation, useParams } from 'react-router-dom';
import CampaignSwitch from './react-hook-form/CampaignSwitch';

import {
  setOfferFormData_globalsettings,
  setOfferFormData_name_and_id,
  rowValidation,
} from '../../../../store/slice/offerFormSlice';
import { useSettingsContext } from '../../../settings';
// components
import Label from '../../../label';
import FormProvider, { RHFTextField } from '../../../hook-form';
import FormInputtext from './react-hook-form/FormInputtext';
import { useSnackbar } from '../../../snackbar';

// ----------------------------------------------------------------------

export default function GlobalSettingsForm({ validateGSForm }) {
  const { register, reset, control, setValue, getValues, handleSubmit, setError } = useForm();
  const { themeStretch } = useSettingsContext();
  const dispatch = useDispatch();
  const formData = useSelector(setOfferFormData_globalsettings);
  // // console.log(formData);
  const { id } = useParams();
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();
  const [campaignstatuschecked, setCampaignStatusChecked] = useState(false);
  const [campaignstatuscheckedDef, setCampaignStatusCheckedDef] = useState(false);

  const [isDefaultchecked, setIsDefaultChecked] = useState(false);
  const [isDefaultcheckedDef, setIsDefaultCheckedDef] = useState(false);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    validateGSForm.current = validateCurrentForm;
    autofillData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const autofillData = () => {
    const obj = formData.payload.offerForm.offerConfigurations.globalSettings;
    const name = formData.payload.offerForm.offerConfigurations.name;
    const rowUniqueId = formData.payload.offerForm.offerConfigurations.rowUniqueId;
    setValue('name', name);
    setValue('rowUniqueId', rowUniqueId);

    if (Object.keys(obj).length !== 0) {
      const keys = Object.keys(obj);
      keys.forEach((key, index) => {
        setValue(key, obj[key]);
        // if (key === 'is_default') {
        //   setIsDefaultChecked(obj[key]);
        // }
        if (key === 'status') {
          setCampaignStatusChecked(obj[key]);
        }
      });
    }
  };

  const { errors } = useFormState({
    control,
  });

  const onSubmit = async (data) => {
    if ((await Object.keys(errors).length) === 0) {
      // if (data.is_default === undefined) {
      //   data.is_default = false;
      // }
      if (data.status === undefined) {
        data.status = false;
      }

      const obj = {
        campaignId: data.campaignId,
        currency: data.currency,
        currencySymbol: data.currencySymbol,
        status: data.status,
      };

      const obj2 = {
        name: data.name,
        rowUniqueId: data.rowUniqueId,
      };
      const obj3 = {
        id: id || '',
        rowUniqueId: data.rowUniqueId,
      };

      if (location.pathname.split('/')[3] === 'duplicate') {
        obj3.id = '';
      }

      await dispatch(rowValidation(obj3)).then(async (res) => {
        if (res.payload.statusCode === 201) {
          setValid(true);
          // enqueueSnackbar(res.payload.message, { variant: 'success' });
        } else {
          setError('rowUniqueId', { type: 'custom', message: res.payload.message });
          // enqueueSnackbar(res.payload.message, { variant: 'error' });
        }
      });

      await dispatch(setOfferFormData_name_and_id(obj2));
      await dispatch(setOfferFormData_globalsettings(obj));
    }
  };

  const validateCurrentForm = async () => {
    await handleSubmit(onSubmit)();
    const errorLen = (await Object.keys(errors).length) === 0;
    return errorLen;
  };

  const handleChange = (event) => {
    setCampaignStatusChecked(event.target.checked);
  };
  const handleChangeDefault = (event) => {
    setIsDefaultCheckedDef(event.target.checked);
  };
  return (
    <Container maxWidth={themeStretch ? false : 'xl'}>
      <Box
        sx={{
          '& .MuiTextField-root': { my: 1 },
        }}
      >
        <FormProvider>
          <Grid container spacing={2}>
            <Grid item md={6}>
              <FormInputtext
                control={control}
                name="rowUniqueId"
                label="Row Unique Id"
                type="text"
                message="Row Unique Id required"
                require
              />
            </Grid>
            <Grid item md={6}>
              <FormInputtext
                control={control}
                name="name"
                label="Offer Name"
                type="text"
                message="Rule name is required"
                require
              />
            </Grid>
            <Grid item md={6}>
              <FormInputtext
                control={control}
                name="campaignId"
                label="Campaign Id"
                type="number"
                message="Campaign Id is required"
                require
              />
            </Grid>
            <Grid item md={6}>
              <FormInputtext
                control={control}
                name="currencySymbol"
                label="Currency as Symbol"
                type="text"
                message="Currency symbol is required"
                require
              />
            </Grid>
            <Grid item md={6}>
              <FormInputtext
                control={control}
                name="currency"
                label="Currency as text"
                type="text"
                message="Currency text is required"
                require
              />
            </Grid>

            <Grid item md={6} mt={3}>
              <CampaignSwitch defaultValueSent={getValues('status')} control={control} />
            </Grid>
            {/* <Grid item md={6} mt={3}>
              <DefaultSwitch defaultValueSent={getValues('is_default')} control={control} />
            </Grid> */}
          </Grid>
        </FormProvider>
      </Box>
    </Container>
  );
}

GlobalSettingsForm.propTypes = {
  validateGSForm: PropTypes.any,
};
