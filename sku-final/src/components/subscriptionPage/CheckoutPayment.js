import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { Button, Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import Iconify from 'components/iconify/Iconify';
import apple from '../../assets/images/Apple_Pay_logo.png';
// import btcIcon from '../../assets/images/btcIcon.png';
import payment from '../../assets/images/payment-cards2.png';

import SKUWalletLogo from 'components/common/SKUWalletLogo';
import '../../styles/cardStyle.css';

const CheckoutPayment = ({
  billing,
  backStep,
  openBtn,
  setOpenBtn,
  setIsCryptoPayment,
  cryptoCheckbox,
  noonCheckbox,
  checkboxChecked,
  setCheckboxChecked,
  showCryptoPayment,
  product,
}) => {
  let vat = 0;

  if (product?.currency === 'EGP') {
    vat = 14;
  } else if (product?.currency === 'AED') {
    vat = 5;
  } else if (product?.currency == 'SAR') {
    vat = 15;
  }
  const totalAmmount = product
    ? product?.orders
      ? (product?.totalAmount * (product?.vat / 100) + product?.totalAmount).toFixed(2)
      : Number((product?.price * product?.qty * (vat / 100)).toFixed(2)) + Number(product?.price)
    : 0;
  const handleChangeNoon = (e) => {
    var checkBox = e.target.checked;
    setCheckboxChecked('noon');

    if (checkBox == true) {
      setOpenBtn(true);
    } else {
      setOpenBtn(false);
    }
  };

  // const handleChangeCrypto = (e) => {
  //   // var cryptoFrame = document.getElementById('cryptoBox');
  //   var CryptoCheckBox = e.target.checked;
  //   setCheckboxChecked('crypto');

  //   if (CryptoCheckBox == true) {
  //     setIsCryptoPayment(true);

  //     setOpenBtn(true);
  //   } else {
  //     setIsCryptoPayment(false);
  //     setOpenBtn(false);
  //   }
  // };
  const handleChangeSkuwallet = (e) => {
    var CryptoCheckBox = e.target.checked;
    setCheckboxChecked('skuWallet');
    if (CryptoCheckBox == true) {
      setIsCryptoPayment(true);

      setOpenBtn(true);
    } else {
      setIsCryptoPayment(false);
      setOpenBtn(false);
    }
  };
  // const [openCrypto, setOpenCrypto] = useState(false);
  // const handleClose = () => {
  //   setOpenBtn(false);
  //   setOpenCrypto(false);
  // };

  // const style = {
  //   position: 'absolute',
  //   top: '55%',
  //   right: '-19%',
  //   transform: 'translate(-50%, -50%)',
  //   borderRadius: '8px',
  //   p: 4,
  // };
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card sx={{ mb: 3 }}>
            <CardHeader
              title="Billing Address"
              action={
                <Button
                  size="small"
                  startIcon={<Iconify icon="eva:edit-fill" />}
                  onClick={backStep}
                >
                  Edit
                </Button>
              }
            />
            <CardContent>
              <Typography variant="subtitle2" gutterBottom>
                {billing?.title}&nbsp;
                {/* <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
                  ({billing?.addressType})
                </Typography> */}
              </Typography>

              <Typography variant="body2" gutterBottom>
                {billing?.fullAddress}
              </Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {billing?.phone}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={12}>
          <Card sx={{}}>
            <CardHeader title="Payment Options" />
            <Typography sx={{ mx: 3 }} fontSize="12px">
              Use SKU Markets Wallet to get 1% cashback.
            </Typography>
            <Grid item xs={12} sx={{ p: 3 }} md={12}>
              <Card sx={{}}>
                <div className="card_inner_main">
                  <div className="card_inner">
                    <div className="card_inner_checkbox">
                      <Checkbox
                        id="skuWalletCheckbox"
                        onChange={handleChangeSkuwallet}
                        checked={checkboxChecked === 'skuWallet'}
                        // inputRef={noonCheckbox}
                        icon={<RadioButtonUncheckedIcon />}
                        checkedIcon={<CheckCircleIcon />}
                      />
                    </div>
                    <div>
                      <h3>Pay With SKU Markets Wallet</h3>

                      <h5>
                        Balance: <span style={{ fontWeight: 700 }}>SAR 5000</span>
                      </h5>
                    </div>
                  </div>
                  <div className="card_inner_image">
                    <SKUWalletLogo />
                  </div>
                </div>
              </Card>
            </Grid>
          { totalAmmount <= 50000 && <Grid item xs={12} sx={{ p: 3 }} md={12}>
              <Card sx={{}}>
                <div className="card_inner_main">
                  <div className="card_inner">
                    <div className="card_inner_checkbox">
                      <Checkbox
                        id="noonCheckbox"
                        onChange={handleChangeNoon}
                        checked={checkboxChecked === 'noon'}
                        // inputRef={noonCheckbox}
                        icon={<RadioButtonUncheckedIcon />}
                        checkedIcon={<CheckCircleIcon />}
                      />
                    </div>
                    <div>
                      <h3>
                        Pay with noon <span className="">payments</span>
                      </h3>

                      <h5>You will redirect to noon payment to complete your purchase securely.</h5>
                    </div>
                  </div>
                  <div className="card_inner_image">
                    {/* {/ <img src={noonSvg} width={50} alt="payment_icon" /> /} */}
                    <img width={49} height={20} src={apple} alt="apple" />
                    <img width={160} height={20} src={payment} alt="apple" />
                  </div>
                </div>
              </Card>
            </Grid>}
            {/* {showCryptoPayment && (
              <Grid item xs={12} sx={{ p: 3 }} md={12}>
                <Card sx={{ mb: 3 }}>
                  <div className="card_inner_main">
                    <div className="card_inner">
                      <div className="card_inner_checkbox">
                        <Checkbox
                          id="cryptoCheckbox"
                          inputRef={cryptoCheckbox}
                          checked={checkboxChecked === 'crypto'}
                          icon={<RadioButtonUncheckedIcon />}
                          checkedIcon={<CheckCircleIcon />}
                          onChange={handleChangeCrypto}
                        />
                      </div>
                      <div>
                        <h3>Pay with Crypto</h3>

                        <h5>We also support crypto wallet.</h5>
                      </div>
                    </div>
                    <div className="card_inner_image">
                      <img src={btcIcon} width={50} height={50} alt="payment_icon" />
                    </div>
                  </div>
                </Card>
              </Grid>
            )} */}
          </Card>
        </Grid>

        <Button
          size="small"
          color="inherit"
          onClick={backStep}
          startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
        >
          Back
        </Button>
      </Grid>
    </>
  );
};

export default CheckoutPayment;
