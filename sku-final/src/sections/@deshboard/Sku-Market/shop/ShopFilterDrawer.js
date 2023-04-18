import PropTypes from 'prop-types';
// form

// @mui
import { alpha } from '@mui/material/styles';

import {
  Autocomplete,
  Badge,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Input,
  Slider,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Iconify from 'components/iconify/Iconify';
import Scrollbar from 'components/scrollbar/Scrollbar';
import { NAV } from 'config-global';
import { useRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
// config
// components
// ----------------------------------------------------------------------

ShopFilterDrawer.propTypes = {
  open: PropTypes.bool,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  isDefault: PropTypes.bool,
  onResetFilter: PropTypes.func,
};

export default function ShopFilterDrawer({
  open,
  onOpen,
  onClose,
  isDefault,
  onResetFilter,
  products,
  setProducts,
  filtersHandler,
  dropDownData,
  searchParams,
  setSearchParams,
}) {
  const { control } = useFormContext();

  const minPrice = useRef();
  const maxPrice = useRef();

  const minRank = useRef();
  const maxRank = useRef();

  const minRate = useRef();
  const maxRate = useRef();

  const minStores = useRef();
  const maxStores = useRef();

  const minStock = useRef();
  const maxStock = useRef();

  const marketplaceRef = useRef();
  const categoryRef = useRef();
  const brandRef = useRef();
  const typeRef = useRef();
  const subTypeRef = useRef();

  const marksLabel = [...Array(21)].map((_, index) => {
    const value = index * 10;

    const firstValue = index === 0 ? `${value}` : `${value}`;

    return {
      value,
      label: index % 4 ? '' : firstValue,
    };
  });

  const ratingMarksLabel = [...Array(6)].map((_, index) => {
    const value = index * 1;

    const firstValue = index === 0 ? `${value}` : `${value}`;

    return {
      value,
      label: firstValue,
    };
  });

  const getSelected = (selectedItems, item) =>
    selectedItems.includes(item)
      ? selectedItems.filter((value) => value !== item)
      : [...selectedItems, item];

  const handleApplyFilter = () => {
    const fields = {
      priceRange: [minPrice.current.value, maxPrice.current.value],
      rankRange: [minRank.current.value, maxRank.current.value],
      ratingRange: [minRate.current.value, maxRate.current.value],
      storesRange: [minStores.current.value, maxStores.current.value],
      stockRange: [minStock.current.value, maxStock.current.value],
      marketplace: marketplaceRef.current.value,
      category: categoryRef.current.value,
      brand: brandRef.current.value,
      type: typeRef.current.value,
      subType: subTypeRef.current.value,
    };

    // Setting Search Params
    const urlParams = {
      marketplace: fields.marketplace,
      category: fields.category,
      brand: fields.brand,
      type: fields.type,
      sub_type: fields.subType,
      minPrice: minPrice.current.value,
      maxPrice: maxPrice.current.value,
      minRank: minRank.current.value,
      maxRank: maxRank.current.value,
      minRate: minRate.current.value,
      maxRate: maxRate.current.value,
      minStores: minStores.current.value,
      maxStores: maxStores.current.value,
      minStock: minStock.current.value,
      maxStock: maxStock.current.value,
    };

    setSearchParams(urlParams, { replace: true });

    const tempProducts = filtersHandler(products, fields);
    setProducts(tempProducts);
  };

  return (
    <>
      <Button
        disableRipple
        color="inherit"
        endIcon={<Iconify icon="ic:round-filter-list" />}
        onClick={onOpen}
      >
        Filters
      </Button>

      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        BackdropProps={{
          invisible: true,
        }}
        PaperProps={{
          sx: { width: NAV.W_BASE },
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ pl: 2, pr: 1, py: 2 }}
        >
          <Typography variant="subtitle1">Filters</Typography>

          <IconButton onClick={onClose}>
            <Iconify icon="eva:close-fill" />
          </IconButton>
        </Stack>

        <Divider />

        <Scrollbar>
          <Stack spacing={3} sx={{ p: 2.5 }}>
            <Stack spacing={1}>
              <Stack direction="column" spacing={2}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  size="small"
                  options={dropDownData[0]}
                  sx={{ width: '100%' }}
                  defaultValue={
                    searchParams.get('marketplace') ? searchParams.get('marketplace') : ''
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      label="Marketplace"
                      placeholder="Marketplace"
                      inputRef={marketplaceRef}
                    />
                  )}
                />

                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  size="small"
                  options={dropDownData[1]}
                  sx={{ width: '100%' }}
                  defaultValue={searchParams.get('category') ? searchParams.get('category') : ''}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      label="Category"
                      placeholder="Category"
                      inputRef={categoryRef}
                    />
                  )}
                />
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  size="small"
                  options={dropDownData[2]}
                  sx={{ width: '100%' }}
                  defaultValue={searchParams.get('brand') ? searchParams.get('brand') : ''}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      label="Brand"
                      placeholder="Brand"
                      inputRef={brandRef}
                    />
                  )}
                />
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  size="small"
                  options={dropDownData[3]}
                  sx={{ width: '100%' }}
                  defaultValue={searchParams.get('type') ? searchParams.get('type') : ''}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      label="Type"
                      placeholder="Type"
                      inputRef={typeRef}
                    />
                  )}
                />
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  size="small"
                  options={dropDownData[4]}
                  sx={{ width: '100%' }}
                  defaultValue={searchParams.get('sub_type') ? searchParams.get('sub_type') : ''}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      label="Sub- Type"
                      placeholder="Sub- Type"
                      inputRef={subTypeRef}
                    />
                  )}
                />
              </Stack>
            </Stack>

            <Stack spacing={1} sx={{ pb: 2 }}>
              <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
                Price
              </Typography>

              <Stack direction="row" spacing={2}>
                <InputRange
                  type="min"
                  inputRef={minPrice}
                  searchParams={searchParams}
                  paramName={'minPrice'}
                  minVal={0}
                />
                <InputRange
                  type="max"
                  inputRef={maxPrice}
                  searchParams={searchParams}
                  paramName={'maxPrice'}
                  maxVal={200}
                />
              </Stack>

              <Slider
                name="priceRange"
                step={10}
                min={0}
                max={200}
                marks={marksLabel}
                onChange={(e, v) => {
                  e.preventDefault();
                  maxPrice.current.value = v;
                }}
                getAriaValueText={(value) => `${value}`}
                valueLabelFormat={(value) => `${value}`}
                sx={{ alignSelf: 'center', width: `calc(100% - 20px)` }}
              />
            </Stack>

            <Stack spacing={1} sx={{ pb: 2 }}>
              <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
                Rank
              </Typography>

              <Stack direction="row" spacing={2}>
                <InputRange
                  type="min"
                  inputRef={minRank}
                  searchParams={searchParams}
                  paramName={'minRank'}
                  minVal={0}
                />
                <InputRange
                  type="max"
                  inputRef={maxRank}
                  searchParams={searchParams}
                  paramName={'maxRank'}
                  maxVal={200}
                />
              </Stack>

              <Slider
                name="priceRange"
                step={10}
                min={0}
                max={200}
                marks={marksLabel}
                onChange={(e, v) => {
                  e.preventDefault();
                  maxRank.current.value = v;
                }}
                getAriaValueText={(value) => `${value}`}
                valueLabelFormat={(value) => `${value}`}
                sx={{ alignSelf: 'center', width: `calc(100% - 20px)` }}
              />
            </Stack>
            <Stack spacing={1} sx={{ pb: 2 }}>
              <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
                Rate
              </Typography>

              <Stack direction="row" spacing={2}>
                <InputRange
                  type="min"
                  inputRef={minRate}
                  searchParams={searchParams}
                  paramName={'minRate'}
                  minVal={0}
                />
                <InputRange
                  type="max"
                  inputRef={maxRate}
                  searchParams={searchParams}
                  paramName={'maxRate'}
                  maxVal={5}
                />
              </Stack>

              <Slider
                name="priceRange"
                step={1}
                min={0}
                max={5}
                marks={ratingMarksLabel}
                onChange={(e, v) => {
                  e.preventDefault();
                  maxRate.current.value = v;
                }}
                getAriaValueText={(value) => `${value}`}
                valueLabelFormat={(value) => `${value}`}
                sx={{ alignSelf: 'center', width: `calc(100% - 20px)` }}
              />
            </Stack>
            <Stack spacing={1} sx={{ pb: 2 }}>
              <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
                No. of Stores
              </Typography>

              <Stack direction="row" spacing={2}>
                <InputRange
                  type="min"
                  inputRef={minStores}
                  searchParams={searchParams}
                  paramName={'minStores'}
                  minVal={0}
                />
                <InputRange
                  type="max"
                  inputRef={maxStores}
                  searchParams={searchParams}
                  paramName={'maxStores'}
                  maxVal={200}
                />
              </Stack>

              <Slider
                name="priceRange"
                step={10}
                min={0}
                max={200}
                marks={marksLabel}
                onChange={(e, v) => {
                  e.preventDefault();
                  maxStores.current.value = v;
                }}
                getAriaValueText={(value) => `${value}`}
                valueLabelFormat={(value) => `${value}`}
                sx={{ alignSelf: 'center', width: `calc(100% - 20px)` }}
              />
            </Stack>
            <Stack spacing={1} sx={{ pb: 2 }}>
              <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
                Stock On Hand
              </Typography>

              <Stack direction="row" spacing={2}>
                <InputRange
                  type="min"
                  inputRef={minStock}
                  searchParams={searchParams}
                  paramName={'minStock'}
                  minVal={0}
                />
                <InputRange
                  type="max"
                  inputRef={maxStock}
                  searchParams={searchParams}
                  paramName={'maxStock'}
                  maxVal={200}
                />
              </Stack>

              <Slider
                name="priceRange"
                step={10}
                min={0}
                max={200}
                marks={marksLabel}
                onChange={(e, v) => {
                  e.preventDefault();
                  maxStock.current.value = v;
                }}
                getAriaValueText={(value) => `${value}`}
                valueLabelFormat={(value) => `${value}`}
                sx={{ alignSelf: 'center', width: `calc(100% - 20px)` }}
              />
            </Stack>
          </Stack>
        </Scrollbar>

        <Box sx={{ p: 2.5 }}>
          <Button
            fullWidth
            size="large"
            type="submit"
            color="inherit"
            variant="outlined"
            onClick={(e) => {
              e.preventDefault();
              handleApplyFilter();
              onClose();
            }}
            startIcon={<Iconify icon="eva:checkmark-outline" />}
          >
            Apply
          </Button>
          <Badge
            color="error"
            variant="dot"
            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
            invisible={isDefault}
            sx={{ width: 1 }}
          >
            <Button
              fullWidth
              size="large"
              type="submit"
              color="inherit"
              variant="outlined"
              onClick={(e) => {
                e.preventDefault();
                onResetFilter();
                onClose();
              }}
              startIcon={<Iconify icon="eva:trash-2-outline" />}
              sx={{ mt: 1 }}
            >
              Clear
            </Button>
          </Badge>
        </Box>
      </Drawer>
    </>
  );
}

// ----------------------------------------------------------------------

InputRange.propTypes = {
  type: PropTypes.oneOf(['min', 'max']),
};

function InputRange({ type, inputRef, minVal, maxVal, searchParams, paramName }) {
  const { control, setValue } = useFormContext();

  const handleBlurInputRange = (value) => {
    const min = value[0];

    const max = value[1];

    if (min < 0) {
      setValue('priceRange', [0, max]);
    }
    if (min > 1000) {
      setValue('priceRange', [1000, max]);
    }
    if (max < 0) {
      setValue('priceRange', [min, 0]);
    }
    if (max > 1000) {
      setValue('priceRange', [min, 1000]);
    }
  };

  return (
    <Controller
      name="priceRange"
      control={control}
      render={({ field }) => {
        const isMin = type === 'min';

        const min = minVal;

        const max = maxVal;

        return (
          <Stack direction="row" spacing={0.5} alignItems="center" sx={{ width: 1 }}>
            <Typography
              variant="caption"
              sx={{
                flexShrink: 0,
                color: 'text.disabled',
                textTransform: 'capitalize',
                fontWeight: 'fontWeightBold',
              }}
            >
              {`${type} `}
            </Typography>

            <Input
              inputRef={inputRef}
              disableUnderline
              fullWidth
              size="small"
              value={searchParams.get(paramName) ?? inputRef?.current?.value ?? 0}
              onChange={(event) =>
                isMin
                  ? field.onChange([Number(event.target.value), max])
                  : field.onChange([min, Number(event.target.value)])
              }
              onBlur={() => handleBlurInputRange(field.value)}
              inputProps={{
                step: 10,
                min: 0,
                max: 200,
                type: 'number',
                'aria-labelledby': 'input-slider',
              }}
              sx={{
                pr: 1,
                py: 0.5,
                borderRadius: 0.75,
                typography: 'body2',
                bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
                '& .MuiInput-input': { p: 0, textAlign: 'right' },
              }}
            />
          </Stack>
        );
      }}
    />
  );
}

const platfrom = [
  { label: 'noon/ksa' },
  { label: 'noon/uae' },
  { label: 'noon/egypt' },
  { label: 'amazon/ksa' },
  { label: 'amazon/uae' },
  { label: 'amazon/egypt' },
  { label: 'jumia/egypt' },
];

const Category = [
  { label: 'Amazon' },
  { label: 'google' },
  { label: 'asus' },
  { label: 'microsft' },
  { label: 'iphone' },
];

const SkuType = [
  { label: 'Amazon' },
  { label: 'google' },
  { label: 'asus' },
  { label: 'microsft' },
  { label: 'iphone' },
];

const SkuSubtype = [
  { label: 'Amazon' },
  { label: 'google' },
  { label: 'asus' },
  { label: 'microsft' },
  { label: 'iphone' },
];

// const Fulfilment = [
//   { label: 'Amazon' },
//   { label: 'google' },
//   { label: 'asus' },
//   { label: 'microsft' },
//   { label: 'iphone' },
// ];

const Brand = [
  { label: 'Rockstar Games' },
  { label: 'Sony' },
  { label: 'EZVIZ' },
  { label: 'microsft' },
  { label: 'iphone' },
];
