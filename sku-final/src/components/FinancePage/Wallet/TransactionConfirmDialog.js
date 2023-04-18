// @mui
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Divider,
  Input,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import UploadLogoImage from 'components/PartnerStore-Dashboard/AddPartnerStore/uploadImage';
import TransactionFileUpload from './TransactionFileUpload';

// ----------------------------------------------------------------------

const STEP = 50;

const MIN_AMOUNT = 0;

const MAX_AMOUNT = 1000;

// ----------------------------------------------------------------------

function TrasactionConfirmModal({ open, onClose, amount }) {
  return (
    <Dialog open={open} fullWidth maxWidth="xs" onClose={onClose}>
      <DialogTitle>Give Transaction Information</DialogTitle>
      <Divider />

      <Stack spacing={2} sx={{ p: 3, pb: 0 }}>
        <Stack
          direction="row"
          justifyContent="center"
          spacing={1}
          sx={{ justifyContent: 'flex-end' }}
        >
          <Typography variant="h5">SAR</Typography>

          <Input
            disableUnderline={false}
            size="small"
            value={amount}
            disabled
            inputProps={{ step: STEP, min: MIN_AMOUNT, max: MAX_AMOUNT, type: 'number' }}
            sx={{
              '& input': {
                fontSize: '2rem',
                p: 0,
                textAlign: 'center',
                width: 'auto',
              },
            }}
          />
        </Stack>
        <Stack>
          <Typography variant="subtitle1" fontSize="14px">Transfer User Name</Typography>
          <TextField size="small" name="name" required placeholder="Transfer Account Holder Name" />
        </Stack>
        <Stack>
          <Typography variant="subtitle1" fontSize="14px">Transaction ID</Typography>
          <TextField size="small" name="name" required placeholder="Enter Transaction ID" />
        </Stack>
        <Stack>
          <Typography variant="subtitle1" fontSize="14px">Transaction Receipt</Typography>
          <TransactionFileUpload />
        </Stack>
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
          onClick={onClose}
        >
          Confirm and Add
        </Button>

        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}

export default TrasactionConfirmModal;
