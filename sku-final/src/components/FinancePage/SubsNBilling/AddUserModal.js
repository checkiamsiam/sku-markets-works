import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Box, Button, Divider, Fade, IconButton, Modal, Stack, TextField, Typography } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import { modalStyle } from 'components/sellerboard/sellerboardAlerts/ConfirmationAlert';

const AddUserModal = ({ open, handleClose }) => {
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
              Add New User
            </Typography>
            <IconButton sx={{ color: 'text.main' }} onClick={handleClose}>
              <CloseOutlinedIcon />
            </IconButton>
          </Box>
          <Divider />
          <Box sx={{ my: 2 }}>
          <Stack direction="column" spacing={2}>
              <TextField
                size="small"
                fullWidth
                label="User Contact Name"
                placeholder="User Contact Name"
                id="psn-top"
                required
              />
              <TextField
              type="email"
                size="small"
                fullWidth
                label="User Email Adress"
                placeholder="user@gmail.com"
                id="psn-top"
                required
              />
              </Stack>
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
            <Button
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
              // disabled={isLoading}
              onClick={handleClose}
            >
              Invite
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default AddUserModal;
