import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
// @mui
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Slider,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import InputAmount from 'components/common/InputAmount';
import { fCurrency } from 'utils/formatNumber';

// ----------------------------------------------------------------------

const STEP = 50;

const MIN_AMOUNT = 0;

const MAX_AMOUNT = 1000;

// ----------------------------------------------------------------------

BankingQuickTransfer.propTypes = {
  sx: PropTypes.object,
  list: PropTypes.array,
  title: PropTypes.string,
  subheader: PropTypes.string,
};

export default function BankingQuickTransfer({ title, subheader, list, sx, ...other }) {
  const theme = useTheme();

  const [autoWidth, setAutoWidth] = useState(24);

  const [amount, setAmount] = useState(0);

  const [openConfirm, setOpenConfirm] = useState(false);

  const [selectContact, setSelectContact] = useState(0);

  const getContactInfo = list.find((_, index) => index === selectContact);

  useEffect(() => {
    if (amount) {
      handleAutoWidth();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount]);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleAutoWidth = () => {
    const getNumberLength = amount.toString().length;
    setAutoWidth(getNumberLength * 22);
  };

  const handleChangeSlider = (event, newValue) => {
    setAmount(newValue);
  };

  const handleChangeInput = (event) => {
    setAmount(event.target.value === '' ? '' : Number(event.target.value));
  };

  const handleBlur = () => {
    if (amount < 0) {
      setAmount(0);
    } else if (amount > MAX_AMOUNT) {
      setAmount(MAX_AMOUNT);
    }
  };
  return (
    <>
      <Box>
        <TextField
          size="medium"
          fullWidth
          label="Company Email"
          placeholder="skumarkets@sku.com"
          id="psn-top"
          required
        />
      </Box>

      <Stack spacing={3} sx={{ mt: 2 }}>
        <Typography variant="overline" sx={{ color: 'text.secondary' }}>
          insert amount
        </Typography>

        <InputAmount
          amount={amount}
          onBlur={handleBlur}
          autoWidth={autoWidth}
          onChange={handleChangeInput}
        />

        <Slider
          value={typeof amount === 'number' ? amount : 0}
          valueLabelDisplay="auto"
          step={STEP}
          marks
          min={MIN_AMOUNT}
          max={MAX_AMOUNT}
          onChange={handleChangeSlider}
        />

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
            Your Balance
          </Typography>
          <Typography variant="subtitle1">{fCurrency(34212)}</Typography>
        </Stack>

        <Button
          sx={{
            bgcolor: 'primary.main',
            border: (theme) => `1px solid ${theme.palette.primary.main}`,
            color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
            '&:hover': {
              bgcolor: 'white',
              color: (theme) => (theme.palette.mode === 'light' ? 'primary.main' : 'primary.main'),
              border: (theme) => `1px solid ${theme.palette.primary.main}`,
            },
          }}
          size="large"
          disabled={amount === 0}
          onClick={handleOpenConfirm}
        >
          Send Now
        </Button>
      </Stack>

      <ConfirmTransferDialog
        open={openConfirm}
        autoWidth={autoWidth}
        amount={amount}
        contactInfo={getContactInfo}
        onClose={handleCloseConfirm}
        onBlur={handleBlur}
        onChange={handleChangeInput}
      />
    </>
  );
}

ConfirmTransferDialog.propTypes = {
  open: PropTypes.bool,
  onBlur: PropTypes.func,
  onClose: PropTypes.func,
  amount: PropTypes.number,
  onChange: PropTypes.func,
  autoWidth: PropTypes.number,
  contactInfo: PropTypes.object,
};

function ConfirmTransferDialog({
  open,
  amount,
  autoWidth,
  contactInfo,
  onClose,
  onBlur,
  onChange,
}) {
  return (
    <Dialog open={open} fullWidth maxWidth="xs" onClose={onClose}>
      <DialogTitle>Send to</DialogTitle>

      <Stack spacing={3} sx={{ p: 3, pb: 0 }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar src={contactInfo?.avatar} sx={{ width: 48, height: 48 }} />

          <div>
            <Typography variant="subtitle2">Company Name</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {contactInfo?.email}
            </Typography>
          </div>
        </Stack>

        <InputAmount
          onBlur={onBlur}
          onChange={onChange}
          autoWidth={autoWidth}
          amount={amount}
          disableUnderline={false}
          sx={{ justifyContent: 'flex-end' }}
        />

        <TextField fullWidth multiline rows={2} placeholder="Write a message..." />
      </Stack>

      <DialogActions>
        <Button
          sx={{
            bgcolor: 'primary.main',
            border: (theme) => `1px solid ${theme.palette.primary.main}`,
            color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
            '&:hover': {
              bgcolor: 'white',
              color: (theme) => (theme.palette.mode === 'light' ? 'primary.main' : 'primary.main'),
              border: (theme) => `1px solid ${theme.palette.primary.main}`,
            },
          }}
          size="medium"
          disabled={amount === 0}
          onClick={onClose}
        >
          Confirm and Send
        </Button>

        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
