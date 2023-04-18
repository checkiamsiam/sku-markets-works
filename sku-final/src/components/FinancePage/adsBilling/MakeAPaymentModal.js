import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { LoadingButton } from '@mui/lab';
import {
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
import Backdrop from '@mui/material/Backdrop';
import SelectPaymentOption from 'components/common/SelectPaymentOption';
import { modalStyle } from 'components/sellerboard/sellerboardAlerts/ConfirmationAlert';
import { useState } from 'react';

const MakeAPaymentModal = ({ open, handleClose }) => {
  const [selectedPayMethod, setSelectedPayMethod] = useState('');
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

              <Typography variant="subtitle1">SAR 5000.00</Typography>
            </Stack>

            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={1}
              sx={{ mt: 2 }}
            >
              <Typography variant="subtitle1">Specify your payment amount</Typography>
              <TextField size="small" name="amount" label="Amount" required />
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
                '&:hover': {
                  bgcolor: 'white',
                  color: (theme) =>
                    theme.palette.mode === 'light' ? 'primary.main' : 'primary.main',
                  border: (theme) => `1px solid ${theme.palette.primary.main}`,
                },
                mx: 2,
              }}
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
