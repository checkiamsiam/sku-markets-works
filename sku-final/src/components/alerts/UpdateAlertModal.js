import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { styled } from '@mui/material/styles';
import { 
  CircularProgress,
  Backdrop,
  Button,
  Fade,
  FormControl,
  Grid,
  IconButton,
  InputBase,
  MenuItem,
  Modal,
  OutlinedInput,
  Paper,
  Select,
  TextField,
  Typography,
  Box,
  Stack,
  FormHelperText,
  } from '@mui/material';
import MPLogo from 'components/common/MPLogo';
import { useAddOrUpdateAlertMutation, useGetSingleAlertQuery } from 'features/alert/alertAPI';
import {
  useGetAllNotificationsQuery,
  useGetUnReadNotificationsQuery,
} from 'features/notification/notificationAPI';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

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

const UpdateAlertModal = ({ openModal, CloseModal, product, skipAlertDetail }) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const { data, isLoading: alertLoading } = useGetSingleAlertQuery(product?.alert_id, { skip: skipAlertDetail });
  const alertData = data?.data || {};
  const [addOrUpdateAlert] = useAddOrUpdateAlertMutation();

  const [Summery, setSummery] = useState('');

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
    top,
    type,
    bottom,
    product,
    price_move_above,
    price_move_below,
    stock_move_above,
    stock_move_below,
    stores_move_above,
    stores_move_below,
    sku_to_fulfillment,
    sku_to_store,
    watch,
  ]);

  const onSubmit = async (data) => {
    if (type === 'Price Range') {
      const payload = {
        product: product?._id || product?.id,
        price_range: {
          top: data.top,
          bottom: data.bottom,
        },
      };
      await addOrUpdateAlert(payload);
    } else if (type === 'Stock Range') {
      const payload = {
        product: product?._id || product?.id,
        stock_range: {
          top: data.top,
          bottom: data.bottom,
        },
      };
      await addOrUpdateAlert(payload);
    } else if (type === 'Stores Range') {
      const payload = {
        product: product?._id || product?.id,
        stores_range: {
          top: data.top,
          bottom: data.bottom,
        },
      };
      await addOrUpdateAlert(payload);
    } else {
      const payload = {
        product: product?._id || product?.id,
        ...data,
      };
      await addOrUpdateAlert(payload);
    }

    unRefetch();
    alertRefetch();
    CloseModal();
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={openModal}
      onClose={CloseModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={openModal}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={styleM}>
        {alertLoading ? (
          <Stack direction='row' alignItems='center' justifyContent='center' sx={{minHeight: '100px'}}>
            <CircularProgress/>
          </Stack>
        )
        : <>
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
            <IconButton sx={{ color: 'text.main' }} onClick={CloseModal}>
              <CloseOutlinedIcon />
            </IconButton>
          </Box>

          <Box sx={{ width: '100%' }}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={6}>
                <Item>
                  <label>SKU/ASIAN/MPN</label>
                  <TextField size="small" sx={{ width: '100%' }} value={product?.sku} disabled />
                </Item>
              </Grid>

              <Grid item xs={6} />

              <Grid item xs={6}>
                {product && (
                  <>
                    <Typography
                      sx={{
                        px: 1,
                      }}
                    >
                      {(type === 'Price Range' || type === 'Price Moves Above' || type === 'Price Moves Below') && product?.price}
                      {(type === 'Stock Range' || type === 'Stock Moves Above' || type === 'Stock Moves Below') && product?.stock}
                      {(type === 'Stores Range' || type === 'Stores Moves Above' || type === 'Stores Moves Below') && product?.store}
                      {(type === 'SKU to Store' || type === 'SKU to Fulfillment') && product?.sku_rate}
                    </Typography>
                    <Typography
                      sx={{
                        px: 1,
                      }}
                    >
                      {(type === 'Price Range' || type === 'Price Moves Above' || type === 'Price Moves Below') && "Buy Box Price"}
                      {(type === 'Stock Range' || type === 'Stock Moves Above' || type === 'Stock Moves Below') && "Estimated Stock"}
                      {(type === 'Stores Range' || type === 'Stores Moves Above' || type === 'Stores Moves Below') && "Stores"}
                      {(type === 'SKU to Store' || type === 'SKU to Fulfillment') && "SKU Rate"}
                    </Typography>
                  </>
                )}
              </Grid>

              <Grid item xs={6}>
                {product && (
                  <>
                    <MPLogo marketplace={product.sku_marketplace} link={false} />
                    <Typography
                      sx={{
                        px: 1,
                      }}
                    >
                      {product?.sku_marketplace}
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
                          disabled={
                            (mi.label === 'Select an alert type') ? true
                            : (mi.label === 'Price Range' && alertData?.price_range?.top && alertData?.price_range?.bottom) ? true
                            : (mi.label === 'Price Moves Above' && alertData?.price_move_above) ? true
                            : (mi.label === 'Price Moves Below' && alertData?.price_move_below) ? true
                            : (mi.label === 'Stock Range' && alertData?.stock_range?.top && alertData?.stock_range?.bottom) ? true
                            : (mi.label === 'Stock Moves Above' && alertData?.stock_move_above) ? true
                            : (mi.label === 'Stock Moves Below' && alertData?.stock_move_below) ? true
                            : (mi.label === 'Stores Range' && alertData?.store_range?.top && alertData?.store_range?.bottom) ? true
                            : (mi.label === 'Stores Moves Above' && alertData?.store_move_above) ? true
                            : (mi.label === 'Stores Moves Below' && alertData?.store_move_below) ? true : false
                            }
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

            <Stack direction='row' alignItems='center' spacing={1} sx={{mt: 3, mb: 2, mx: 1}}>
              <Typography>
                Existing alerts: 
              </Typography>
              <Typography variant='body1' sx={{fontWeight: 400, fontSize: '14px'}}>
                {(alertData?.price_range?.top || alertData?.price_range?.bottom) ? "Price range change" : null }
                {(alertData?.price_move_below) ? ", Price Moves Below" : null}
                {(alertData?.price_move_above) ? ", Price Moves Above" : null}
                {(alertData?.stock_range?.top || alertData?.stock_range?.bottom) ? ", Stock range change" : null}
                {(alertData?.stock_move_below) ? ", Stock Moves Below" : null}
                {(alertData?.stock_move_above) ? ", Stock Moves Above" : null}
                {(alertData?.store_range?.top || alertData?.store_range?.bottom) ? ", Stores range change" : null}
                {(alertData?.store_move_below) ? ", Stores Moves Below" : null}
                {(alertData?.store_move_above) ? ", Stores Moves Above" : null}
              </Typography>
            </Stack>

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
            <Button variant="outlined" sx={{ color: 'text.main' }} onClick={CloseModal}>
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
          </>}
        </Box>
      </Fade>
    </Modal>
  );
};

export default UpdateAlertModal;
