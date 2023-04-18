import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Box, Divider, Fade, IconButton, Modal, Typography } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import { modalStyle } from 'components/sellerboard/sellerboardAlerts/ConfirmationAlert';
import { _bankingContacts } from '_mock/arrays';
import BankingQuickTransfer from './SendMoneyInterface';

const SendFundTransModal = ({ open, handleClose }) => {
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
              Send Credit
            </Typography>
            <IconButton sx={{ color: 'text.main' }} onClick={handleClose}>
              <CloseOutlinedIcon />
            </IconButton>
          </Box>
          <Divider />
          <Box sx={{ my: 2 }}>
            <BankingQuickTransfer list={_bankingContacts} />
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default SendFundTransModal;
