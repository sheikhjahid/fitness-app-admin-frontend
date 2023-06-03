import { useState, useEffect } from 'react';
// @mui
import {
  Box,
  Grid,
  Typography,
  TextField,
  Container,
  MenuItem,
  InputAdornment,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useForm, Controller, useFormState } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setOfferFormData_upsells } from '../../../../store/slice/offerFormSlice';
import FormInputtext from './react-hook-form/FormInputtext';
import FormDropdown from './react-hook-form/FormDropDown';
import Upsell2ProductsJson from '../../../../helpers/json/master.json';
import { useSettingsContext } from '../../../settings';
// ----------------------------------------------------------------------

const StatusBenefit = [
  { value: 'true', label: 'On' },
  { value: 'false', label: 'Off' },
];
const StatusHeader = [
  { value: 'true', label: 'On' },
  { value: 'false', label: 'Off' },
];
const StatusTimer = [
  { value: 'true', label: 'On' },
  { value: 'false', label: 'Off' },
];

const URL = [
  { value: 'url1', label: 'url1' },
  { value: 'url2', label: 'url2' },
  { value: 'url3', label: 'url3' },
  { value: 'url4', label: 'url4' },
];

const Upsell2Products = [
  { value: 123, label: '3x Months supply' },
  { value: 124, label: '2x Months supply' },
  { value: 125, label: '1x Months supply' },
];

export default function Upsell2Form({ validateUpsell2Form }) {
  const { register, reset, control, setValue, getValues, watch, formState, handleSubmit } =
    useForm();
  const watchUrl = watch('url');
  const dispatch = useDispatch();
  const formData = useSelector(setOfferFormData_upsells);
  const { themeStretch } = useSettingsContext();
  const [productsArr, setProductsArr] = useState([]);
  const [productsOptionArr, setProductsOptionArr] = useState([]);
  const [oldUrlValue, setOldUrlValue] = useState();

  useEffect(() => {
    validateUpsell2Form.current = validateCurrentForm;
    autofillData();
    setOldUrlValue(getValues('url'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const urlVal = getValues('url');
    // console.log(urlVal, oldUrlValue);
    if (urlVal !== oldUrlValue && oldUrlValue !== undefined) {
      emptyProductValue();
    }
    for (let i = 0; i < Upsell2ProductsJson.upsells.length; i += 1) {
      if (Upsell2ProductsJson.upsells[i].url === urlVal) {
        const arr = Upsell2ProductsJson.upsells[i].products;
        setProductsArr(arr);
        setProductsOptionArr([]);
        for (let j = 0; j < arr.length; j += 1) {
          setProductsOptionArr((prev) => [...prev, { value: arr[j].id, label: arr[j].name }]);
        }
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchUrl]);

  const emptyProductValue = () => {
    for (let i = 1; i <= 4; i += 1) {
      setValue(`prod${i}_name`, '');
      setValue(`prod${i}_id`, '');
      setValue(`prod${i}_description`, '');
      setValue(`prod${i}_qty`, '');
      setValue(`prod${i}_old_price`, '');
      setValue(`prod${i}_show_price`, '');
      setValue(`prod${i}_price`, '');
    }
  };

  const autofillData = () => {
    // console.log('autofilled called');
    const arr = formData.payload.offerForm.offerConfigurations.upsells;
    if (arr.length >= 2) {
      const obj1 = arr[1];
      const settings = arr[1].settings;
      const items = arr[1].items;
      setValue('name', obj1.name);
      setValue('url', obj1.url);
      setValue('gtmProductKey', obj1.gtmProductKey);

      if (Object.keys(settings).length !== 0) {
        const keys = Object.keys(settings);
        // console.log(settings.showBenefit);
        keys.forEach((key, index) => {
          if (key === 'showBenefit') {
            const sb = settings.showBenefit === true ? 'true' : 'false';
            setValue(key, sb);
          } else if (key === 'showHeader') {
            const sh = settings.showHeader === true ? 'true' : 'false';
            setValue(key, sh);
          } else if (key === 'showTimer') {
            const st = settings.showTimer === true ? 'true' : 'false';
            setValue(key, st);
          } else {
            setValue(key, settings[key]);
          }
        });
      }
      for (let i = 0; i < items.length; i += 1) {
        const obj2 = items[i];
        // // console.log(obj2);
        if (i === 0) {
          if (Object.keys(obj2).length !== 0) {
            const keys = Object.keys(obj2);
            keys.forEach((key, index) => {
              setValue('prod1_name', obj2.name);
              setValue('prod1_id', obj2.id);
              setValue('prod1_description', obj2.description);
              setValue('prod1_qty', obj2.quantity);
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
              setValue('prod2_description', obj2.description);
              setValue('prod2_qty', obj2.quantity);
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
              setValue('prod3_description', obj2.description);
              setValue('prod3_qty', obj2.quantity);
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
    }
  };

  const { errors } = useFormState({
    control,
  });

  const onSubmit = async (data) => {
    const obj = {
      name: data.name,
      url: data.url,
      gtmProductKey: data.gtmProductKey,
      settings: {
        discount: data.discount,
        showBenefit: data.showBenefit === 'true',
        showHeader: data.showHeader === 'true',
        showTimer: data.showTimer === 'true',
        fomoId: data.fomoId,
        ctaButton: data.ctaButton,
        forcePaypalId: data.forcePaypalId,
        forceCardId: data.forceCardId,
        shippingPrice: data.shippingPrice,
        // layoutId: data.layoutId,
      },
      items: [
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
          quantity: data.prod4_qty,
          description: data.prod4_description,
          oldPrice: data.prod4_old_price,
          showPrice: data.prod4_show_price,
          price: data.prod4_price,
        },
      ],
    };
    const arr = [];
    arr.push(obj, 1);
    if ((await Object.keys(errors).length) === 0) {
      await dispatch(setOfferFormData_upsells(arr));
    }
  };
  const validateCurrentForm = async () => {
    await handleSubmit(onSubmit)();
    const errorLen = (await Object.keys(errors).length) === 0;
    return errorLen;
  };

  useEffect(() => {
    const urlVal = getValues('url');
    for (let i = 0; i < Upsell2ProductsJson.upsells.length; i += 1) {
      if (Upsell2ProductsJson.upsells[i].url === urlVal) {
        const arr = Upsell2ProductsJson.upsells[i].products;
        setProductsArr(arr);
        setProductsOptionArr([]);
        for (let j = 0; j < arr.length; j += 1) {
          setProductsOptionArr((prev) => [...prev, { value: arr[j].id, label: arr[j].name }]);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchUrl]);

  const handleChangeProd1 = (e) => {
    e.preventDefault();
    for (let i = 0; i < productsArr.length; i += 1) {
      if (productsArr[i].id === e.target.value) {
        setValue('prod1_name', productsArr[i].name);
        setValue('prod1_id', productsArr[i].id);
        setValue('prod1_description', productsArr[i].description);
        setValue('prod1_qty', productsArr[i].qty);
        setValue('prod1_old_price', productsArr[i].original_price);
        setValue('prod1_show_price', productsArr[i].offer_price);
        setValue('prod1_price', productsArr[i].price);
      }
    }
  };
  const handleChangeProd2 = (e) => {
    e.preventDefault();
    for (let i = 0; i < productsArr.length; i += 1) {
      if (productsArr[i].id === e.target.value) {
        setValue('prod2_name', productsArr[i].name);
        setValue('prod2_id', productsArr[i].id);
        setValue('prod2_description', productsArr[i].description);
        setValue('prod2_qty', productsArr[i].qty);
        setValue('prod2_old_price', productsArr[i].original_price);
        setValue('prod2_show_price', productsArr[i].offer_price);
        setValue('prod2_price', productsArr[i].price);
      }
    }
  };
  const handleChangeProd3 = (e) => {
    e.preventDefault();
    for (let i = 0; i < productsArr.length; i += 1) {
      if (productsArr[i].id === e.target.value) {
        setValue('prod3_name', productsArr[i].name);
        setValue('prod3_id', productsArr[i].id);
        setValue('prod3_description', productsArr[i].description);
        setValue('prod3_qty', productsArr[i].qty);
        setValue('prod3_old_price', productsArr[i].original_price);
        setValue('prod3_show_price', productsArr[i].offer_price);
        setValue('prod3_price', productsArr[i].price);
      }
    }
  };
  const handleChangeProd4 = (e) => {
    e.preventDefault();
    for (let i = 0; i < productsArr.length; i += 1) {
      if (productsArr[i].id === e.target.value) {
        setValue('prod4_name', productsArr[i].name);
        setValue('prod4_id', productsArr[i].id);
        setValue('prod4_qty', productsArr[i].qty);
        setValue('prod4_description', productsArr[i].description);
        setValue('prod4_old_price', productsArr[i].original_price);
        setValue('prod4_show_price', productsArr[i].offer_price);
        setValue('prod4_price', productsArr[i].price);
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
              name="name"
              label="Upsell name"
              type="text"
              message="Upsell name is required"
              require
            />
          </Grid>
          <Grid item md={6}>
            <FormDropdown
              control={control}
              name="url"
              label="Select your url"
              message="Required"
              options={Upsell2ProductsJson.urls}
              require
            />
          </Grid>

          <Grid item md={6}>
            <FormInputtext
              control={control}
              name="gtmProductKey"
              label="GTM Product Key"
              type="text"
              message="Required"
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
            <FormInputtext
              control={control}
              name="discount"
              label="discount"
              type="number"
              message="Discount is required"
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
              require
            />
          </Grid>
          <Grid item md={6}>
            <FormInputtext
              control={control}
              name="forcePaypalId"
              label="Force Paypal ID"
              type="number"
              message="Required"
              require
            />
          </Grid>
          <Grid item md={6}>
            <FormInputtext
              control={control}
              name="forceCardId"
              label="Force Card ID"
              type="number"
              message="Required"
              require
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
        </Grid>
        <Grid container spacing={2}>
          <Grid item md={6}>
            <Typography variant="h4" my={3}>
              Product 1:
            </Typography>
            <TextField
              select
              fullWidth
              label="Select upsell product 1"
              defaultValue=""
              onChange={handleChangeProd1}
            >
              {productsOptionArr.map((option) => (
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
              name="prod1_description"
              label="Description"
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
          <Grid item md={6}>
            <Typography variant="h4" my={3}>
              Product 2:
            </Typography>
            <TextField
              select
              fullWidth
              label="Select upsell product 2"
              defaultValue=""
              onChange={handleChangeProd2}
            >
              {productsOptionArr.map((option) => (
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
              name="prod2_description"
              label="Description"
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
              label="Select upsell product 3"
              defaultValue=""
              onChange={handleChangeProd3}
            >
              {productsOptionArr.map((option) => (
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
              name="prod3_description"
              label="Description"
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
              label="Select product 4"
              defaultValue=""
              onChange={handleChangeProd4}
            >
              {productsOptionArr.map((option) => (
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
              name="prod4_description"
              label="Description"
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
Upsell2Form.propTypes = {
  validateUpsell2Form: PropTypes.any,
};
