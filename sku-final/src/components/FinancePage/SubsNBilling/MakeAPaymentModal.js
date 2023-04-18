import { useEffect } from 'react';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { LoadingButton } from '@mui/lab';
import {
  Backdrop,
  Box,
  Button,
  CardHeader,
  Divider,
  Fade,
  IconButton,
  Modal,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { modalStyle } from 'components/sellerboard/sellerboardAlerts/ConfirmationAlert';
import { useState } from 'react';

import SelectPaymentOption from 'components/common/SelectPaymentOption';
import { format } from 'date-fns';
import { useMakePaymentMutation } from 'features/subscription/subscriptionAPI';
import useFormatCurrency from 'hooks/useFormatCurrency';

const MakeAPaymentModal = ({ open, handleClose, data }) => {
  const formatCurrency = useFormatCurrency();
  const [payment, { isLoading }] = useMakePaymentMutation();
  const [amount, setAmount] = useState(data?.ending_balance);
  const [selectedPayMethod, setSelectedPayMethod] = useState('');

  useEffect(() => {
    setAmount(data?.ending_balance);
  }, [data?.ending_balance])

  const handleSetAmount = (e) => {
    setAmount(e.target.value);
  };

  const handleClick = async () => {
    const date = format(Date.now(), 'T');
    const info = { _id: data?._id, amount, date };
    await payment(info);
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box sx={modalStyle}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 1,
            }}
          >
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Make a payment
            </Typography>
            <IconButton sx={{ color: 'text.main' }} onClick={handleClose}>
              <CloseOutlinedIcon />
            </IconButton>
          </Box>
          <Divider />
          <Box sx={{ my: 3 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
              <Typography variant="subtitle1">Payment due</Typography>

              <Typography variant="subtitle1">{formatCurrency(data?.ending_balance)}</Typography>
            </Stack>

            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={1}
              sx={{ mt: 2 }}
            >
              <Typography variant="subtitle1">Specify your payment amount</Typography>
              <TextField
                size="small"
                name="amount"
                label="Amount"
                value={amount}
                onChange={handleSetAmount}
                required
              />
            </Stack>
            <Box sx={{ my: 2 }}>
              <CardHeader title="Payment Options" />
              <Typography sx={{ mx: 3 }} fontSize="12px">
                Use SKU Markets Wallet to get 1% cashback.
              </Typography>
              <SelectPaymentOption
                checkboxChecked={selectedPayMethod}
                setCheckboxChecked={setSelectedPayMethod}
              />
            </Box>
          </Box>
          <Box sx={{ textAlign: 'end', my: 2 }}>
            <Button
              variant="outlined"
              sx={{
                color: 'text.main',
                border: (theme) => `1px solid ${theme.palette.primary.main}`,
              }}
              onClick={handleClose}
            >
              Close
            </Button>
            <LoadingButton
              sx={{
                bgcolor: 'primary.main',
                border: (theme) => `1px solid ${theme.palette.primary.main}`,
                color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
                '&:disabled': { 
                  bgcolor: 'grey.200', cursor: 'not-allowed',
                  border: (theme) => `1px solid ${theme.palette.grey[600]}`,
                },
                '&:hover': {
                  bgcolor: 'white',
                  color: (theme) =>
                    theme.palette.mode === 'light' ? 'primary.main' : 'primary.main',
                  border: (theme) => `1px solid ${theme.palette.primary.main}`,
                },
                mx: 2,
              }}
              disabled={!amount || amount > data?.ending_balance || amount <= 0 || isLoading}
              onClick={handleClick}
            >
              Pay Now
            </LoadingButton>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default MakeAPaymentModal;
