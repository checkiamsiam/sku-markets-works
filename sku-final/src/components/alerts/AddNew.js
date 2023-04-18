import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import {
  Autocomplete,
  Backdrop,
  Button,
  Fade,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputBase,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import MPLogo from 'components/common/MPLogo';
import { useAddOrUpdateAlertMutation } from 'features/alert/alertAPI';
import {
  useGetAllNotificationsQuery,
  useGetUnReadNotificationsQuery,
} from 'features/notification/notificationAPI';
import { useSearchProductQuery } from 'features/product/productAPI';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import getFullName from 'utils/getFullName';

const alert_type = [
  { label: 'Price Range' },
  { label: 'Price Moves Above' },
  { label: 'Price Moves Below' },
  { label: 'Stock Range' },
  { label: 'Stock Moves Above' },
  { label: 'Stock Moves Below' },
  { label: 'Stores Range' },
  { label: 'Stores Moves Above' },
  { label: 'Stores Moves Below' },
  { label: 'SKU to Store' },
  { label: 'SKU to Fulfillment' },
];

const styleM = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { md: '47vw', xs: '95vw', sm: '95vw' },
  bgcolor: 'background.paper',
  borderRadius: 3,
  boxShadow: 0,
  px: 3,
  py: 1,
};

const Item = styled(Paper)(({ theme }) => ({
  bgcolor: 'background.paper',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.main,
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const AddNew = ({ openAddNew, handleCloseNewAdd, product }) => {
  const [query, setQuery] = useState(
    'search=N41&fields=sku,sku_marketplace,sku_rank,buy_box_currency,current_price&limit=5'
  );
  const { data, refetch, isLoading, isFetching } = useSearchProductQuery(query);
  const [sku, setSku] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const [addOrUpdateAlert] = useAddOrUpdateAlertMutation();

  const [Summery, setSummery] = useState('');

  const searchHandler = async (sku) => {
    setQuery(
      `search=${sku}&fields=sku,sku_marketplace,sku_rank,buy_box_currency,current_price&limit=5`
    );
    refetch();
  };

  const { refetch: unRefetch } = useGetUnReadNotificationsQuery();
  const { refetch: alertRefetch } = useGetAllNotificationsQuery();

  const [type, setType] = useState('Select an alert type');
  const [view, setView] = useState(false);

  const top = watch('top');
  const bottom = watch('bottom');
  const price_move_above = watch('price_move_above');
  const price_move_below = watch('price_move_below');
  const stock_move_above = watch('stock_move_above');
  const stock_move_below = watch('stock_move_below');
  const stores_move_above = watch('stores_move_above');
  const stores_move_below = watch('stores_move_below');
  const sku_to_fulfillment = watch('sku_to_fulfillment');
  const sku_to_store = watch('sku_to_store');

  useEffect(() => {
    if (type === 'Price Range') {
      setSummery(`Alert me when the price is >= ${top ? top : 0} or <= ${bottom ? bottom : 0}`);
    } else if (type === 'Stock Range') {
      setSummery(`Alert me when the stock is >= ${top ? top : 0} or <= ${bottom ? bottom : 0}`);
    } else if (type === 'Stores Range') {
      setSummery(`Alert me when the stores is >= ${top ? top : 0} or <= ${bottom ? bottom : 0}`);
    } else if (type === 'Price Moves Above') {
      setSummery(`Alert me when the price is >= ${price_move_above ? price_move_above : 0}`);
    } else if (type === 'Price Moves Below') {
      setSummery(`Alert me when the price is <= ${price_move_below ? price_move_below : 0}`);
    } else if (type === 'Stock Moves Above') {
      setSummery(`Alert me when the stock is >= ${stock_move_above ? stock_move_above : 0}`);
    } else if (type === 'Stock Moves Below') {
      setSummery(`Alert me when the stock is <= ${stock_move_below ? stock_move_below : 0}`);
    } else if (type === 'Stores Moves Above') {
      setSummery(`Alert me when the stores is >= ${stores_move_above ? stores_move_above : 0}`);
    } else if (type === 'Stores Moves Below') {
      setSummery(`Alert me when the stores is <= ${stores_move_below ? stores_move_below : 0}`);
    } else if (type === 'SKU to Store') {
      setSummery(`Alert me when the SKU is in ${sku_to_store ? sku_to_store : ''}`);
    } else if (type === 'SKU to Fulfillment') {
      setSummery(`Alert me when the SKU is in ${sku_to_fulfillment ? sku_to_fulfillment : ''}`);
    }
  }, [
    bottom,
    price_move_above,
    price_move_below,
    sku_to_fulfillment,
    sku_to_store,
    stock_move_above,
    stock_move_below,
    stores_move_above,
    stores_move_below,
    top,
    type,
  ]);

  const onSubmit = async (data) => {
    if (type === 'Price Range') {
      const payload = {
        product: sku._id || sku.id,
        price_range: {
          top: data.top,
          bottom: data.bottom,
        },
      };
      await addOrUpdateAlert(payload);
      handleCloseNewAdd()
    } else if (type === 'Stock Range') {
      const payload = {
        product: sku._id || sku.id,
        stock_range: {
          top: data.top,
          bottom: data.bottom,
        },
      };
      await addOrUpdateAlert(payload);
      handleCloseNewAdd()
    } else if (type === 'Stores Range') {
      const payload = {
        product: sku._id || sku.id,
        stores_range: {
          top: data.top,
          bottom: data.bottom,
        },
      };
      await addOrUpdateAlert(payload);
      handleCloseNewAdd()
    } else {
      const payload = {
        product: sku._id || sku.id,
        ...data,
      };
      await addOrUpdateAlert(payload);
      handleCloseNewAdd()
    }

    unRefetch();
    alertRefetch();
  };

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openAddNew}
        onClose={handleCloseNewAdd}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openAddNew}>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={styleM}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 1,
              }}
            >
              <Typography id="transition-modal-title" variant="h6" component="h2">
                Add New Alert
              </Typography>
              <IconButton sx={{ color: 'text.main' }} onClick={handleCloseNewAdd}>
                <CloseOutlinedIcon />
              </IconButton>
            </Box>

            <Box sx={{ width: '100%' }}>
              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={12}>
                  <Item>
                    <FormControl sx={{ width: '48%' }} size="small">
                      <label>SKU/ASIAN/MPN</label>
                      <Autocomplete
                        value={sku}
                        disablePortal
                        options={data || []}
                        id="SKU-ASIAN-MPN-search-input"
                        loading={isLoading || isFetching}
                        getOptionLabel={(option) => option.sku}
                        onChange={(_, newValue) => setSku(newValue)}
                        groupBy={(option) =>
                          getFullName(option.sku_marketplace.split('/').join('-'))
                        }
                        renderOption={(props, option) => (
                          <Stack {...props} direction="row" alignItems="space-between">
                            <Stack sx={{ ml: -3 }} direction="row" alignItems="space-between">
                              <MPLogo marketplace={option?.sku_marketplace} link={false} />
                              <Typography component="span" ml={1}>
                                {option?.sku}
                              </Typography>
                            </Stack>
                            <Typography component="span" ml={10}>
                              #{option?.sku_rank}
                            </Typography>
                          </Stack>
                        )}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            size="small"
                            onChange={(e) => searchHandler(e.target.value)}
                            InputProps={{
                              ...params.InputProps,
                              endAdornment: (
                                <>
                                  {isLoading || isFetching ? (
                                    <CircularProgress color="inherit" size={20} />
                                  ) : null}
                                  {params.InputProps.endAdornment}
                                </>
                              ),
                            }}
                          />
                        )}
                      />
                      {
                        <FormHelperText
                          sx={{
                            color: 'red',
                          }}
                        >
                          {!sku && 'SKU is required'}
                        </FormHelperText>
                      }
                    </FormControl>
                  </Item>
                </Grid>

                <Grid item xs={6}>
                  {sku && (
                    <>
                      <Typography
                        sx={{
                          px: 1,
                        }}
                      >
                        {sku.buy_box_currency} {sku.current_price}
                      </Typography>
                      <Typography
                        sx={{
                          px: 1,
                        }}
                      >
                        Buy Box Price
                      </Typography>
                    </>
                  )}
                </Grid>

                <Grid item xs={6}>
                  {sku && (
                    <>
                      <MPLogo marketplace={sku.sku_marketplace} link={false} />
                      <Typography
                        sx={{
                          px: 1,
                        }}
                      >
                        {sku.sku_marketplace}
                      </Typography>
                    </>
                  )}
                </Grid>

                <Grid item xs={6}>
                  <Item>
                    <FormControl sx={{ width: '100%' }} size="small">
                      <label>Alert Type</label>
                      <Select
                        sx={{
                          fontSize: '15px',
                          textTransform: 'capitalize',
                          borderRadius: 1,
                        }}
                        displayEmpty
                        value={type}
                        input={<OutlinedInput />}
                        MenuProps={MenuProps}
                        renderValue={(selected) => {
                          if (selected.length === 0) {
                            return <>{alert_type[0].label}</>;
                          }
                          return selected;
                        }}
                        inputProps={{ 'aria-label': 'Without label' }}
                        onChange={(e) => {
                          setType(e.target.value);
                        }}
                      >
                        {alert_type?.map((mi) => (
                          <MenuItem
                            onClick={() => {
                              setView(mi);
                              reset();
                            }}
                            key={mi.label}
                            value={mi.label}
                          >
                            {mi.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>
                    <Typography>
                      Description <br />
                      <span style={{ fontSize: '12px' }}>
                        {type === 'Price Range' || type === 'Stock Range' || type === 'Stores Range'
                          ? ` Notifies when ${
                              type === 'Price Range'
                                ? 'price'
                                : type === 'Stock Range'
                                ? 'stock'
                                : 'stores'
                            } exiting the range.`
                          : `Notifies when the ${
                              type === 'Price Moves Below' || type === 'Price Moves Above'
                                ? 'price'
                                : type === 'Stock Moves Below' || type === 'Stock Moves Above'
                                ? 'stock'
                                : type === 'Stores Moves Below' || type === 'Stores Moves Above'
                                ? 'stores'
                                : 'SKU'
                            } reaches the condition value.`}
                      </span>
                    </Typography>
                  </Item>
                </Grid>
                {type === 'Price Range' || type === 'Stock Range' || type === 'Stores Range' ? (
                  <>
                    <Grid item xs={6}>
                      <Item>
                        <FormControl sx={{ width: '100%' }}>
                          <label>
                            {type === 'Price Range'
                              ? 'Price'
                              : type === 'Stock Range'
                              ? 'Stock'
                              : 'Stores'}{' '}
                            moves below
                          </label>
                          <InputBase
                            sx={{
                              px: 1,
                              flex: 1,
                              width: '100%',
                              boxShadow: 0,
                              border: '1px solid gray',
                              borderRadius: 1,
                            }}
                            {...register('bottom')}
                            type="number"
                          />
                          {
                            <FormHelperText
                              sx={{
                                color: 'red',
                              }}
                            >
                              {errors.bottom?.message}
                            </FormHelperText>
                          }
                        </FormControl>
                      </Item>
                    </Grid>
                    <Grid item xs={6}>
                      <Item>
                        <FormControl sx={{ width: '100%' }}>
                          <label>
                            {type === 'Price Range'
                              ? 'Price'
                              : type === 'Stock Range'
                              ? 'Stock'
                              : 'Stores'}{' '}
                            Moves Above
                          </label>
                          <InputBase
                            sx={{
                              px: 1,
                              flex: 1,
                              width: '100%',
                              boxShadow: 0,
                              border: '1px solid gray',
                              borderRadius: 1,
                            }}
                            {...register('top')}
                            type="number"
                          />
                          {
                            <FormHelperText
                              sx={{
                                color: 'red',
                              }}
                            >
                              {errors.top?.message}
                            </FormHelperText>
                          }
                        </FormControl>
                      </Item>
                    </Grid>
                  </>
                ) : (
                  <>
                    {type === 'SKU to Store' || type === 'SKU to Fulfillment' || type === 'Select an alert type' ? (
                      <> </>
                    ) : (
                      <>
                        {type === 'Price Moves Below' ||
                        type === 'Stock Moves Below' ||
                        type === 'Stores Moves Below' ? (
                          <Grid item xs={6}>
                            <Item>
                              <FormControl sx={{ width: '100%' }}>
                                <label>
                                  {type === 'Price Moves Below'
                                    ? 'Price'
                                    : type === 'Stock Moves Below'
                                    ? 'Stock'
                                    : 'Stores'}
                                  moves below
                                </label>
                                <InputBase
                                  sx={{
                                    px: 1,
                                    flex: 1,
                                    width: '100%',
                                    boxShadow: 0,
                                    border: '1px solid gray',
                                    borderRadius: 1,
                                  }}
                                  {...register(
                                    view.label === 'Price Moves Below'
                                      ? 'price_move_below'
                                      : view.label === 'Stock Moves Below'
                                      ? 'stock_move_below'
                                      : 'store_move_below'
                                  )}
                                  type="number"
                                />
                              </FormControl>
                            </Item>
                          </Grid>
                        ) : (
                          <Grid item xs={6}>
                            <Item>
                              <FormControl sx={{ width: '100%' }}>
                                <label>
                                  {type === 'Price Moves Above'
                                    ? 'Price'
                                    : type === 'Stock Moves Above'
                                    ? 'Stock'
                                    : 'Stores'}
                                  moves above
                                </label>
                                <InputBase
                                  sx={{
                                    px: 1,
                                    flex: 1,
                                    width: '100%',
                                    boxShadow: 0,
                                    border: '1px solid gray',
                                    borderRadius: 1,
                                  }}
                                  {...register(
                                    view.label === 'Price Moves Above'
                                      ? 'price_move_above'
                                      : view.label === 'Stock Moves Above'
                                      ? 'stock_move_above'
                                      : 'store_move_above'
                                  )}
                                  type="number"
                                />
                              </FormControl>
                            </Item>
                          </Grid>
                        )}
                      </>
                    )}
                  </>
                )}
              </Grid>

              <Box
                sx={{
                  p: 2,
                  border: '1px solid gray',
                  borderRadius: 1,
                  my: 2,
                  color: '#a9d5de',
                }}
              >
                <Typography sx={{ fontWeight: 'bold' }}>Summery</Typography>
                <Typography variant="caption" sx={{ fontSize: '14px' }}>
                  {Summery}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ textAlign: 'end', mb: 2 }}>
              <Button variant="outlined" sx={{ color: 'text.main' }} onClick={handleCloseNewAdd}>
                Cancel
              </Button>

              <Button
                sx={{
                  border: (theme) => `1px solid ${theme.palette.primary.main}`,
                  bgcolor: 'primary.main',
                  color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
                  '&:hover': {
                    bgcolor: 'white',
                    color: (theme) =>
                      theme.palette.mode === 'light' ? 'primary.main' : 'primary.main',
                    border: (theme) => `1px solid ${theme.palette.primary.main}`,
                  },
                  mx: 2,
                }}
                type="submit"
              >
                Create
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default AddNew;
