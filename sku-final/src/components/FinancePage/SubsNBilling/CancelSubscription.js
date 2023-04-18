import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Button, IconButton, Box, Backdrop, Fade, Modal, Typography, useTheme } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { useCancelSubscriptionMutation } from 'features/subscription/subscriptionAPI';


// Styles
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { md: '40vw', xs: '95vw', sm: '95vw' },
  bgcolor: 'background.paper',
  borderRadius: 3,
  boxShadow: (theme) => (theme.palette.mode === 'dark' ? 5 : 0),
  px: 3,
  py: 1,
};

const CancelSubscription = ({open, handleClose, plan }) => {
  const [cancelSub, { isLoading }] = useCancelSubscriptionMutation();

  const theme = useTheme();
  const navigate = useNavigate();

	const handleClick = async () => {
    await cancelSub({_id: plan?._id});
    handleClose();
  }

  return (
    <>
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
               Subscription Cancellation
              </Typography>
              <IconButton sx={{ color: 'text.main' }} onClick={handleClose}>
                <CloseOutlinedIcon />
              </IconButton>
            </Box>
            <Typography variant="h6" component="h3" sx={{ mt: 2, mb: 5, color: 'GrayText' }}>
              Are you sure you want to cancel this Subscription?
            </Typography>
            <Box sx={{ textAlign: 'end', mb: 2 }}>
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
                loading={isLoading}
                disabled={isLoading}
                onClick={handleClick}
              >
                Confirm
              </LoadingButton>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default CancelSubscription;
