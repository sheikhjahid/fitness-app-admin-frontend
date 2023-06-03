import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// @mui
import {
  Box,
  Grid,
  Typography,
  TextField,
  Container,
  MenuItem,
  InputAdornment,
  Button,
} from '@mui/material';
import { useForm, Controller, useFormState } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  setOfferFormData_checkout,
  setOfferFormData_globalsettings,
} from '../../../../store/slice/offerFormSlice';
import { useSettingsContext } from '../../../settings';

import FormInputtext from './react-hook-form/FormInputtext';
import FormDropdown from './react-hook-form/FormDropDown';
import CheckoutProductsJson from '../../../../helpers/json/master.json';

// ----------------------------------------------------------------------

const StatusTimer = [
  { value: 'true', label: 'On' },
  { value: 'false', label: 'Off' },
];
const StatusBenefit = [
  { value: 'true', label: 'On' },
  { value: 'false', label: 'Off' },
];
const StatusHeader = [
  { value: 'true', label: 'On' },
  { value: 'false', label: 'Off' },
];

const CheckoutProducts = [
  { value: 1, label: '4x Boxes of Detox Patches' },
  { value: 2, label: '3x Boxes of Detox Patches' },
  { value: 3, label: '2x Boxes of Detox Patches' },
  { value: 4, label: '1x Boxes of Detox Patches' },
];

export default function CheckoutForm({ validateCheckoutForm }) {
  const { themeStretch } = useSettingsContext();
  const [statusTm, setStatus] = useState('off');
  const [statusBen, setStatusBenefit] = useState('on');
  const [statusHead, setStatusHeader] = useState('off');

  const dispatch = useDispatch();
  const formData = useSelector(setOfferFormData_checkout);

  const { register, reset, control, setValue, handleSubmit } = useForm();

  const { errors } = useFormState({
    control,
  });

  useEffect(() => {
    validateCheckoutForm.current = validateCurrentForm;
    autofillData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const autofillData = () => {
    // // console.log('autofilled called');
    const obj1 = formData.payload.offerForm.offerConfigurations.checkoutPage.settings;
    const arr = formData.payload.offerForm.offerConfigurations.checkoutPage.items;
    if (Object.keys(obj1).length !== 0) {
      const keys = Object.keys(obj1);
      // // console.log(obj1.showBenefit);
      keys.forEach((key, index) => {
        if (key === 'showBenefit') {
          const sb = obj1.showBenefit === true ? 'true' : 'false';
          setValue(key, sb);
        } else if (key === 'showHeader') {
          const sh = obj1.showHeader === true ? 'true' : 'false';
          setValue(key, sh);
        } else if (key === 'showTimer') {
          const st = obj1.showTimer === true ? 'true' : 'false';
          setValue(key, st);
        } else {
          setValue(key, obj1[key]);
        }
      });
    }
    for (let i = 0; i < arr.length; i += 1) {
      const obj2 = arr[i];
      // // console.log(obj2);
      if (i === 0) {
        if (Object.keys(obj2).length !== 0) {
          const keys = Object.keys(obj2);
          keys.forEach((key, index) => {
            setValue('prod1_name', obj2.name);
            setValue('prod1_id', obj2.id);
            setValue('prod1_qty', obj2.quantity);
            setValue('prod1_description', obj2.description);
            setValue('prod1_old_price', obj2.oldPrice);
            setValue('prod1_show_price', obj2.showPrice);
            setValue('prod1_price', obj2.price);
          });
        }
      }
      if (i === 1) {
        if (Object.keys(obj2).length !== 0) {
          const keys = Object.keys(obj2);
          keys.forEach((key, index) => {
            setValue('prod2_name', obj2.name);
            setValue('prod2_id', obj2.id);
            setValue('prod2_qty', obj2.quantity);
            setValue('prod2_description', obj2.description);
            setValue('prod2_old_price', obj2.oldPrice);
            setValue('prod2_show_price', obj2.showPrice);
            setValue('prod2_price', obj2.price);
          });
        }
      }
      if (i === 2) {
        if (Object.keys(obj2).length !== 0) {
          const keys = Object.keys(obj2);
          keys.forEach((key, index) => {
            setValue('prod3_name', obj2.name);
            setValue('prod3_id', obj2.id);
            setValue('prod3_qty', obj2.quantity);
            setValue('prod3_description', obj2.description);
            setValue('prod3_old_price', obj2.oldPrice);
            setValue('prod3_show_price', obj2.showPrice);
            setValue('prod3_price', obj2.price);
          });
        }
      }
      if (i === 3) {
        if (Object.keys(obj2).length !== 0) {
          const keys = Object.keys(obj2);
          keys.forEach((key, index) => {
            setValue('prod4_name', obj2.name);
            setValue('prod4_id', obj2.id);
            setValue('prod4_description', obj2.description);
            setValue('prod4_qty', obj2.quantity);
            setValue('prod4_old_price', obj2.oldPrice);
            setValue('prod4_show_price', obj2.showPrice);
            setValue('prod4_price', obj2.price);
          });
        }
      }
    }
  };

  const onSubmit = async (data) => {
    const settings = {
      discount: data.discount,
      showTimer: data.showTimer === 'true',
      showBenefit: data.showBenefit === 'true',
      showHeader: data.showHeader === 'true',
      fomoId: data.fomoId,
      ctaButton: data.ctaButton,
      forcePaypalId: data.forcePaypalId,
      forceCardId: data.forceCardId,
      shippingPrice: data.shippingPrice,
      // layoutId: data.layoutId,
    };
    const items = [
      {
        name: data.prod1_name,
        id: data.prod1_id,
        description: data.prod1_description,
        quantity: data.prod1_qty,
        oldPrice: data.prod1_old_price,
        showPrice: data.prod1_show_price,
        price: data.prod1_price,
      },
      {
        name: data.prod2_name,
        id: data.prod2_id,
        description: data.prod2_description,
        quantity: data.prod2_qty,
        oldPrice: data.prod2_old_price,
        showPrice: data.prod2_show_price,
        price: data.prod2_price,
      },
      {
        name: data.prod3_name,
        id: data.prod3_id,
        description: data.prod3_description,
        quantity: data.prod3_qty,
        oldPrice: data.prod3_old_price,
        showPrice: data.prod3_show_price,
        price: data.prod3_price,
      },
      {
        name: data.prod4_name,
        id: data.prod4_id,
        description: data.prod4_description,
        quantity: data.prod4_qty,
        oldPrice: data.prod4_old_price,
        showPrice: data.prod4_show_price,
        price: data.prod4_price,
      },
    ];
    const arr = [];
    arr.push(settings);
    arr.push(items);
    if ((await Object.keys(errors).length) === 0) {
      await dispatch(setOfferFormData_checkout(arr));
    }
  };

  const validateCurrentForm = async () => {
    await handleSubmit(onSubmit)();
    const errorLen = (await Object.keys(errors).length) === 0;
    return errorLen;
  };

  const handleChangeProd1 = (e) => {
    e.preventDefault();
    for (let i = 0; i < CheckoutProductsJson.checkout_products.length; i += 1) {
      if (CheckoutProductsJson.checkout_products[i].id === e.target.value) {
        setValue('prod1_name', CheckoutProductsJson.checkout_products[i].name);
        setValue('prod1_id', CheckoutProductsJson.checkout_products[i].id);
        setValue('prod1_qty', CheckoutProductsJson.checkout_products[i].qty);
        setValue('prod1_old_price', CheckoutProductsJson.checkout_products[i].original_price);
        setValue('prod1_show_price', CheckoutProductsJson.checkout_products[i].offer_price);
        setValue('prod1_price', CheckoutProductsJson.checkout_products[i].price);
        setValue('prod1_description', CheckoutProductsJson.checkout_products[i].description);
      }
    }
  };
  const handleChangeProd2 = (e) => {
    e.preventDefault();

    for (let i = 0; i < CheckoutProductsJson.checkout_products.length; i += 1) {
      if (CheckoutProductsJson.checkout_products[i].id === e.target.value) {
        setValue('prod2_name', CheckoutProductsJson.checkout_products[i].name);
        setValue('prod2_id', CheckoutProductsJson.checkout_products[i].id);
        setValue('prod2_qty', CheckoutProductsJson.checkout_products[i].qty);
        setValue('prod2_old_price', CheckoutProductsJson.checkout_products[i].original_price);
        setValue('prod2_show_price', CheckoutProductsJson.checkout_products[i].offer_price);
        setValue('prod2_price', CheckoutProductsJson.checkout_products[i].price);
        setValue('prod2_description', CheckoutProductsJson.checkout_products[i].description);
      }
    }
  };
  const handleChangeProd3 = (e) => {
    e.preventDefault();

    for (let i = 0; i < CheckoutProductsJson.checkout_products.length; i += 1) {
      if (CheckoutProductsJson.checkout_products[i].id === e.target.value) {
        setValue('prod3_name', CheckoutProductsJson.checkout_products[i].name);
        setValue('prod3_id', CheckoutProductsJson.checkout_products[i].id);
        setValue('prod3_qty', CheckoutProductsJson.checkout_products[i].qty);
        setValue('prod3_old_price', CheckoutProductsJson.checkout_products[i].original_price);
        setValue('prod3_show_price', CheckoutProductsJson.checkout_products[i].offer_price);
        setValue('prod3_price', CheckoutProductsJson.checkout_products[i].price);
        setValue('prod3_description', CheckoutProductsJson.checkout_products[i].description);
      }
    }
  };
  const handleChangeProd4 = (e) => {
    e.preventDefault();

    for (let i = 0; i < CheckoutProductsJson.checkout_products.length; i += 1) {
      if (CheckoutProductsJson.checkout_products[i].id === e.target.value) {
        setValue('prod4_name', CheckoutProductsJson.checkout_products[i].name);
        setValue('prod4_id', CheckoutProductsJson.checkout_products[i].id);
        setValue('prod4_qty', CheckoutProductsJson.checkout_products[i].qty);
        setValue('prod4_old_price', CheckoutProductsJson.checkout_products[i].original_price);
        setValue('prod4_show_price', CheckoutProductsJson.checkout_products[i].offer_price);
        setValue('prod4_price', CheckoutProductsJson.checkout_products[i].price);
        setValue('prod4_description', CheckoutProductsJson.checkout_products[i].description);
      }
    }
  };

  return (
    <Container maxWidth={themeStretch ? false : 'xl'}>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { my: 1 },
        }}
        noValidate
        autoComplete="off"
      >
        <Typography variant="h4" mb={3}>
          Settings:
        </Typography>
        <Grid container spacing={2}>
          <Grid item md={6}>
            <FormInputtext
              control={control}
              name="discount"
              label="Discount"
              type="number"
              message="Discount is required"
              require
            />
          </Grid>
          <Grid item md={6}>
            <FormDropdown
              control={control}
              name="showTimer"
              label="Show Timer"
              message="Required"
              options={StatusTimer}
              require
            />
          </Grid>
          <Grid item md={6}>
            <FormDropdown
              control={control}
              name="showBenefit"
              label="Show Benefit"
              message="Required"
              options={StatusBenefit}
              require
            />
          </Grid>
          <Grid item md={6}>
            <FormDropdown
              control={control}
              name="showHeader"
              label="Show Header"
              message="Required"
              options={StatusHeader}
              require
            />
          </Grid>
          <Grid item md={6}>
            <FormInputtext control={control} name="fomoId" label="Fomo Id" type="text" />
          </Grid>
          <Grid item md={6}>
            <FormInputtext
              control={control}
              name="ctaButton"
              label="CTA Button Text"
              type="text"
              message="Required"
            />
          </Grid>
          <Grid item md={6}>
            <FormInputtext
              control={control}
              name="forcePaypalId"
              label="Force Paypal ID"
              type="number"
              message="Required"
            />
          </Grid>
          <Grid item md={6}>
            <FormInputtext
              control={control}
              name="forceCardId"
              label="Force Card ID"
              type="number"
              message="Required"
            />
          </Grid>
          <Grid item md={6}>
            <FormInputtext
              control={control}
              name="shippingPrice"
              label="Shipping Price"
              type="number"
              message="Required"
              require
            />
          </Grid>
          {/* <Grid item md={6}>
            <FormInputtext
              control={control}
              name="layoutId"
              label="Layout Id"
              type="number"
              message="Required"
            />
          </Grid> */}
        </Grid>
        <Grid container spacing={2}>
          <Grid item md={6}>
            <Typography variant="h4" my={3}>
              Product 1:
            </Typography>
            <TextField
              select
              fullWidth
              label="Select product 1"
              defaultValue=""
              onChange={handleChangeProd1}
            >
              {CheckoutProducts.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <FormInputtext
              control={control}
              name="prod1_name"
              label="Name"
              type="text"
              message="Required"
              require
            />
            <FormInputtext
              control={control}
              name="prod1_id"
              label="Id"
              type="text"
              message="Required"
              require
            />
            <FormInputtext
              control={control}
              name="prod1_qty"
              label="Quantity"
              type="number"
              message="Required"
              require
            />
            <FormInputtext
              control={control}
              name="prod1_old_price"
              label="Old Price"
              type="number"
              message="Required"
              require
            />
            <FormInputtext
              control={control}
              name="prod1_show_price"
              label="Show Price"
              type="number"
              message="Required"
              require
            />
            <FormInputtext
              control={control}
              name="prod1_price"
              label="Price"
              type="number"
              message="Required"
              require
            />
          </Grid>
          {/* <Button onClick={handleSubmit(onSubmit)}>Submit</Button> */}
          <Grid item md={6}>
            <Typography variant="h4" my={3}>
              Product 2:
            </Typography>

            <TextField
              select
              fullWidth
              label="Select product 1"
              defaultValue=""
              onChange={handleChangeProd2}
            >
              {CheckoutProducts.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <FormInputtext
              control={control}
              name="prod2_name"
              label="Name"
              type="text"
              message="Required"
              require
            />
            <FormInputtext
              control={control}
              name="prod2_id"
              label="Id"
              type="text"
              message="Required"
              require
            />
            <FormInputtext
              control={control}
              name="prod2_qty"
              label="Quantity"
              type="number"
              message="Required"
              require
            />
            <FormInputtext
              control={control}
              name="prod2_old_price"
              label="Old Price"
              type="number"
              message="Required"
              require
            />
            <FormInputtext
              control={control}
              name="prod2_show_price"
              label="Show Price"
              type="number"
              message="Required"
              require
            />
            <FormInputtext
              control={control}
              name="prod2_price"
              label="Price"
              type="number"
              message="Required"
              require
            />
          </Grid>
          <Grid item md={6}>
            <Typography variant="h4" my={3}>
              Product 3:
            </Typography>

            <TextField
              select
              fullWidth
              label="Select product 1"
              defaultValue=""
              onChange={handleChangeProd3}
            >
              {CheckoutProducts.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <FormInputtext
              control={control}
              name="prod3_name"
              label="Name"
              type="text"
              message="Required"
              require
            />
            <FormInputtext
              control={control}
              name="prod3_id"
              label="Id"
              type="text"
              message="Required"
              require
            />
            <FormInputtext
              control={control}
              name="prod3_qty"
              label="Quantity"
              type="number"
              message="Required"
              require
            />
            <FormInputtext
              control={control}
              name="prod3_old_price"
              label="Old Price"
              type="number"
              message="Required"
              require
            />
            <FormInputtext
              control={control}
              name="prod3_show_price"
              label="Show Price"
              type="number"
              message="Required"
              require
            />
            <FormInputtext
              control={control}
              name="prod3_price"
              label="Price"
              type="number"
              message="Required"
              require
            />
          </Grid>
          <Grid item md={6}>
            <Typography variant="h4" my={3}>
              Product 4:
            </Typography>

            <TextField
              select
              fullWidth
              label="Select product 1"
              defaultValue=""
              onChange={handleChangeProd4}
            >
              {CheckoutProducts.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <FormInputtext
              control={control}
              name="prod4_name"
              label="Name"
              type="text"
              message="Required"
              require
            />
            <FormInputtext
              control={control}
              name="prod4_id"
              label="Id"
              type="text"
              message="Required"
              require
            />
            <FormInputtext
              control={control}
              name="prod4_qty"
              label="Quantity"
              type="number"
              message="Required"
              require
            />
            <FormInputtext
              control={control}
              name="prod4_old_price"
              label="Old Price"
              type="number"
              message="Required"
              require
            />
            <FormInputtext
              control={control}
              name="prod4_show_price"
              label="Show Price"
              type="number"
              message="Required"
              require
            />
            <FormInputtext
              control={control}
              name="prod4_price"
              label="Price"
              type="number"
              message="Required"
              require
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

CheckoutForm.propTypes = {
  validateCheckoutForm: PropTypes.any,
};
