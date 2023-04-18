import LoadingButton from '@mui/lab/LoadingButton';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  StepConnector as MUIStepConnector,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Iconify from 'components/iconify/Iconify';
import { useSettingsContext } from 'components/settings';
import CartBillingAddress from 'components/subscriptionPage/CartBillingAddress';
import CartSummery from 'components/subscriptionPage/CartSummery';
import CheckoutCartProductList from 'components/subscriptionPage/CheckoutCartProductList';
import CheckoutPayment from 'components/subscriptionPage/CheckoutPayment';
import {
  useInitializePaymentMutation,
  usePaymentUpdateMutation,
} from 'features/payment/paymentAPI';
import { clearPlan, updateCryptoChargeId } from 'features/plan/planSlice';
import useAuth from 'hooks/useAuth';
import usePlan from 'hooks/usePlan';

import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
// import Box from '@mui/material/Box';

import noonPayment from '../assets/images/noon_payments.svg';
import sabbBank from '../assets/images/SABB_Bank_Logo.png';

import axios from 'axios';
import BlankWindow from 'components/common/BlankWindow';
import SKUWalletLogo from 'components/common/SKUWalletLogo';
import CoinbaseCommerceButton from 'react-coinbase-commerce';
import 'react-coinbase-commerce/dist/coinbase-commerce-button.css';

const StepConnector = styled(MUIStepConnector)(({ theme }) => ({
  top: 10,
  left: 'calc(-50% + 20px)',
  right: 'calc(50% + 20px)',
  '& .MuiStepConnector-line': {
    borderTopWidth: 2,
    borderColor: theme.palette.divider,
  },
  '&.Mui-active, &.Mui-completed': {
    '& .MuiStepConnector-line': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

const STEPS = ['Cart', 'Billing & address', 'Payment'];

function StepIcon({ active, completed }) {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{
        width: 24,
        height: 24,
        color: 'text.disabled',
        ...(active && {
          color: 'primary.main',
        }),
      }}
    >
      {completed ? (
        <Iconify icon="eva:checkmark-fill" sx={{ color: 'primary.main' }} />
      ) : (
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: 'currentColor',
          }}
        />
      )}
    </Stack>
  );
}

const SubscriptionPage = () => {
  const cryptoCheckbox = useRef();
  const noonCheckbox = useRef();
  const { state } = useLocation();
  const search = useLocation().search;
  const orderId = new URLSearchParams(search).get('orderId');
  const paymentType = new URLSearchParams(search).get('paymentType');
  const paymentId = new URLSearchParams(search).get('paymentId');

  const [openBtn, setOpenBtn] = useState(false);
  const [isCryptoPayment, setIsCryptoPayment] = useState(false);
  // const [openNoonModal, setOpenNoonModal] = useState(false);
  const [showCryptoPayment, setShowCryptoPayment] = useState(true);

  const navigate = useNavigate();

  const handleOpen = () => {
    if (isCryptoPayment) {
      if (plan.cryptoChargeId) {
        document.getElementById('coinbase-button')?.click();
      } else {
        initializeCoinbasePayment();
      }
    } else {
      initializeNoonPayment();
      // setOpenNoonModal(true);
    }
  };
  const [checkboxChecked, setCheckboxChecked] = useState('');

  const handleClose = () => {
    // setOpenNoonModal(false);
    setIsCryptoPayment(false);
    setOpenBtn(false);
    setCheckboxChecked('');
    // cryptoCheckbox.current.click();
  };

  const style = {
    position: 'absolute',

    left: 'auto',
    right: 0,
    // transform: "translate(-50%, -50%)",
    borderRadius: '8px',
  };
  const { themeStretch } = useSettingsContext();
  const [onCreateBilling, setOnCreateBilling] = useState({});
  const dispatch = useDispatch();

  const plan = usePlan();
  const user = useAuth();

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  let vat;
  if (state?.orders?.currency === 'EGP') {
    vat = 14;
  } else if (state?.orders?.currency === 'AED') {
    vat = 5;
  } else {
    vat = 15;
  }

  const [InitializePayment, { isLoading, data }] = useInitializePaymentMutation();
  const [paymentUpdate, { isSuccess }] = usePaymentUpdateMutation();

  const initializeNoonPayment = async () => {
    await InitializePayment({
      plan: plan.plan ? plan?.plan : 'Products Order',
      billing: onCreateBilling,
      amount: state?.orders?.totalAmount
        ? Number(
            (
              state?.orders?.totalAmount * (state?.orders?.vat / 100) +
              state?.orders?.totalAmount
            ).toFixed(2)
          )
        : plan?.total,
      offer: plan?.plan ? plan?.plan : 'New Product Order',
      currency: state?.orders?.currency ?? plan?.currency,
      description: plan?.title ?? '',
      returnUrl: `http://localhost:3000/checkout?paymentId=${state?.orders?._id}`,
      // returnUrl: "https://sku-final.vercel.app/",
    });
  };

  const initializeCoinbasePayment = async () => {
    // Creating a new charge
    let data = JSON.stringify({
      name: plan.plan,
      description: plan.title,
      pricing_type: 'fixed_price',
      local_price: {
        amount: plan.total,
        currency: plan.currency,
      },
      metadata: {
        customer_id: user.id,
        customer_name: user.email,
      },
    });

    let config = {
      method: 'post',
      url: 'https://api.commerce.coinbase.com/charges',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-CC-Version': '2018-03-22',
        // "X-CC-Api-Key": COINBASE_API_KEY,
        'X-CC-Api-Key': 'ced89957-66f2-4741-9bf1-4c832538d72f',
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        let id = response.data.data.hosted_url.split('/');
        id = id[id.length - 1];
        dispatch(updateCryptoChargeId({ chargeId: id }));
        document.getElementById('coinbase-button')?.click();
      })
      .catch((error) => {
        console.log(error);
        handleClose();
      });
  };

  const handlerPaymentUpdate = async (orderId, paymentType, paymentId) => {
    await paymentUpdate({
      orderId,
      paymentType,
      paymentId,
    });
  };

  useEffect(() => {
    if (data?.postUrl) {
      handleReset();
      dispatch(clearPlan());
    }

    // Expire Crypto Payment Charge ID every 60 minutes
    const interval = setInterval(() => {
      dispatch(updateCryptoChargeId({ chargeId: '' }));
    }, 3600000);

    return () => {
      clearInterval(interval);
    };
  }, [data, dispatch]);

  useEffect(() => {
    if (orderId && paymentType && paymentId) {
      handlerPaymentUpdate(orderId, paymentType, paymentId);
    }
  }, [orderId, paymentType, paymentId]);

  useEffect(() => {
    if (isSuccess) {
      navigate('/sellerboard', { replace: true });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (state?.orders) {
      setShowCryptoPayment(false);
    }
  }, []);

  return (
    <>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography sx={{ my: 2 }}>Checkout</Typography>
        <Grid container spacing={2}>
          <Grid item lg={8}>
            <Box>
              <Stepper
                activeStep={activeStep}
                alternativeLabel
                connector={<StepConnector />}
                sx={{ mb: 5 }}
              >
                {STEPS.map((label, i) => (
                  <Step key={i}>
                    <StepLabel
                      StepIconComponent={StepIcon}
                      sx={{
                        '& .MuiStepLabel-label': {
                          typography: 'subtitle2',
                        },
                      }}
                    >
                      {label}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
          </Grid>
          <Grid item lg={8}>
            {/* {/ stepper components /} */}

            {plan.plan === '' && (!state?.orders || state?.orders?.orders?.length == 0) ? (
              <BlankWindow
                title="Cart is empty"
                description="Look like you have no items in your shopping cart."
              />
            ) : (
              <>
                {activeStep === 0 && (
                  <CheckoutCartProductList
                    products={plan.plan ? [plan] : state?.orders}
                    backStep={handleBack}
                  />
                )}
                {activeStep === 1 && (
                  <CartBillingAddress
                    activeStep={handleNext}
                    backStep={handleBack}
                    setOnCreateBilling={setOnCreateBilling}
                  />
                )}
                {activeStep === 2 && (
                  <CheckoutPayment
                    openBtn={openBtn}
                    setOpenBtn={setOpenBtn}
                    billing={onCreateBilling}
                    backStep={handleBack}
                    setIsCryptoPayment={setIsCryptoPayment}
                    cryptoCheckbox={cryptoCheckbox}
                    noonCheckbox={noonCheckbox}
                    checkboxChecked={checkboxChecked}
                    setCheckboxChecked={setCheckboxChecked}
                    showCryptoPayment={showCryptoPayment}
                    product={plan?.plan ? plan : state?.orders}
                  />
                )}
              </>
            )}
          </Grid>
          <Grid item lg={3.5} sx={{ position: 'fixed', right: 35, top: 80 }}>
            <Card sx={{ mb: 1 }}>
              <CardHeader title="Order Summary" />
              <CartSummery product={plan?.plan ? plan : state?.orders} activeStep={activeStep} />
            </Card>

            <Card sx={{ mb: 1, py: 0 }}>
              <CardContent
                sx={{
                  color: (theme) => (theme.palette.mode === 'light' ? 'black' : 'white'),
                }}
              >
                <Box
                  sx={{
                    fontSize: '15px',
                    textAlign: 'center',
                  }}
                >
                  Payment Info
                </Box>

                <Box
                  sx={{
                    fontSize: '10px',
                    px: 2,
                    mt: 1,
                    textAlign: 'center',
                  }}
                >
                  By clicking "Checkout" you agree to our terms of services.
                </Box>

                <Box
                  sx={{
                    fontSize: '10px',
                    px: 2,
                    mt: 1,
                    textAlign: 'center',
                  }}
                >
                  Our checkout is safe and secure by Noon Payment Gateway. Your personal and payment
                  information is securely transmitted via 128-bit encryption. We do not store any
                  payment card information on our systems.
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 5,
                    mt: 1,
                  }}
                >
                  <SKUWalletLogo width={30} height={30} />
                  <img
                    // component={Image}
                    src={noonPayment}
                    alt="marketplace"
                    style={{ maxWidth: '70px', height: '40px' }}
                  />

                  <img
                    // component={Image}
                    src={sabbBank}
                    alt="marketplace"
                    style={{ maxWidth: '70px', height: '30px' }}
                  />
                </Box>
              </CardContent>
            </Card>
            {activeStep < 1 && (plan?.plan || state?.orders) && (
              <Button
                fullWidth
                size="large"
                type="submit"
                sx={{
                  bgcolor: 'primary.main',
                  border: (theme) => `1px solid ${theme.palette.primary.main}`,
                  color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
                  '&:hover': {
                    bgcolor: 'white',
                    color: (theme) =>
                      theme.palette.mode === 'light' ? 'primary.main' : 'primary.main',
                    border: (theme) => `1px solid ${theme.palette.primary.main}`,
                  },
                }}
                // disabled={!cart.length}
                // onClick={onNextStep}
                onClick={handleNext}
              >
                Checkout
              </Button>
            )}

            {activeStep === 2 ? (
              <>
                {openBtn && (
                  <LoadingButton
                    fullWidth
                    size="large"
                    type="submit"
                    sx={{
                      bgcolor: 'primary.main',
                      border: (theme) => `1px solid ${theme.palette.primary.main}`,
                      color: (theme) =>
                        theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
                      '&:hover': {
                        bgcolor: 'white',
                        color: (theme) =>
                          theme.palette.mode === 'light' ? 'primary.main' : 'primary.main',
                        border: (theme) => `1px solid ${theme.palette.primary.main}`,
                      },
                    }}
                    loading={isLoading}
                    onClick={handleOpen}
                  >
                    Complete Order
                  </LoadingButton>
                )}
              </>
            ) : (
              ''
            )}
          </Grid>
        </Grid>
      </Container>

      {/* {/ -----------------------Modal--------------------------- /} */}
      {/* <Modal
        open={openNoonModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} id="overflowSet">
          <iframe
            ref={noonPaymentIframe}
            src={data?.postUrl}
            height="1480"
            // maxWidth="480px"
            width="550px"
            title=""
            id="noonBox"
            frameborder="0"
            style={{
              padding: '0px',
              overflow: 'hidden',
            }}
          ></iframe>
        </Box>
      </Modal> */}

      <CoinbaseCommerceButton
        id="coinbase-button"
        chargeId={plan.cryptoChargeId}
        onModalClosed={handleClose}
        style={{ display: 'none' }}
        onChargeSuccess={(MessageData) => {
          handlerPaymentUpdate(plan.cryptoChargeId, 'Coinbase', state?.orders?._id);
        }}
        onChargeFailure={(MessageData) => {
          console.log('FAILED');
        }}
      />
    </>
  );
};

export default SubscriptionPage;
