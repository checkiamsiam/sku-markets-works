import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Box, Divider, Fade, IconButton, Modal, Typography } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import { modalStyle } from 'components/sellerboard/sellerboardAlerts/ConfirmationAlert';
import { _bankingContacts } from '_mock/arrays';
import BankingFundRequestInterface from './BankingFundRequestInterface';
import BankingQuickTransfer from './SendMoneyInterface';

const RequestFundModal = ({ open, handleClose }) => {
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
              Request Credit
            </Typography>
            <IconButton sx={{ color: 'text.main' }} onClick={handleClose}>
              <CloseOutlinedIcon />
            </IconButton>
          </Box>
          <Divider />
          <Box sx={{ my: 2 }}>
            <BankingFundRequestInterface list={_bankingContacts} />
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default RequestFundModal;
