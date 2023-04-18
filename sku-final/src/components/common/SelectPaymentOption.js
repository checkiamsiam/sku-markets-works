import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { Card, Checkbox, Stack, Typography } from '@mui/material';
import apple from '../../assets/images/Apple_Pay_logo.png';
import btcIcon from '../../assets/images/btcIcon.png';
import noonIcon from '../../assets/images/payment-cards2.png';

import SKUWalletLogo from 'components/common/SKUWalletLogo';

const SelectPaymentOption = ({ checkboxChecked, setCheckboxChecked }) => {
  const handleChangeNoon = (e) => {
    setCheckboxChecked('noon');
  };

  const handleChangeCrypto = (e) => {
    setCheckboxChecked('crypto');
  };
  const handleChangeSkuwallet = (e) => {
    setCheckboxChecked('skuWallet');
  };
  return (
    <>
      <Card sx={{ p: 2, mt: 1 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Stack direction="row" spacing={1} alignItems="center">
            <div>
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
              <Typography variant="body1">Pay With SKU Markets Wallet</Typography>

              <Typography variant="subtitle1">
                Balance: <span style={{ fontWeight: 700 }}>SAR 5000</span>
              </Typography>
            </div>
          </Stack>
          <div>
            <SKUWalletLogo />
          </div>
        </Stack>
      </Card>
      <Card sx={{ p: 2, mt: 1 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Stack direction="row" spacing={1} alignItems="center">
            <div>
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
              <Typography variant="body1">Pay with noon payments</Typography>

              <Typography variant="subtitle1">You will redirect to noon payment.</Typography>
            </div>
          </Stack>
          <Stack direction="row">
            <img width={49} height={20} src={apple} alt="apple" />
            <img width={120} height={20} src={noonIcon} alt="noon" />
          </Stack>
        </Stack>
      </Card>
      <Card sx={{ p: 2, mt: 1 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Stack direction="row" spacing={1} alignItems="center">
            <div>
              <Checkbox
                id="cryptoCheckbox"
                checked={checkboxChecked === 'crypto'}
                icon={<RadioButtonUncheckedIcon />}
                checkedIcon={<CheckCircleIcon />}
                onChange={handleChangeCrypto}
              />
            </div>
            <div>
              <Typography variant="body1">Pay with Crypto</Typography>

              <Typography variant="subtitle1">We also support crypto wallet.</Typography>
            </div>
          </Stack>
          <div>
            <img src={btcIcon} width={40} height={40} alt="payment_icon" />
          </div>
        </Stack>
      </Card>
    </>
  );
};

export default SelectPaymentOption;
