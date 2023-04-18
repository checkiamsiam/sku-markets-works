import React, { useEffect, useState } from 'react';
import { Box, Button, Stack, Typography, Modal, Fade, Backdrop, IconButton, Link } from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useNavigate, Link as RLink } from 'react-router-dom';
import useAuth from 'hooks/useAuth';
import emailIcon from '../assets/images/email.png';
// import CancelAlert from 'components/sellerboard/sellerboardAlerts/CancelAlert';
import { useSendEmailVerificationTokenQuery } from 'features/auth/authAPI';
import { Helmet } from 'react-helmet-async';

const EmailConfirmation = () => {
  const user = useAuth();
  const navigate = useNavigate();
  const [skip, setSkip] = useState(true);
  const { isSuccess, isLoading } = useSendEmailVerificationTokenQuery('', { skip });

  useEffect(() => {
    if (!user.email) {
      navigate('/login');
    } else if (user.isEmailVerified) {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
   if(isSuccess) handleCloseAlert();
  }, [isSuccess])

  const [openAlert, setOpenAlert] = useState(false);
  const handleCloseAlert = () => setOpenAlert(false);

  const handleResend = async () => {
    setSkip(false);
  };

  return (
    <>
      <Helmet>
        <title>Email Verification | SKU Markets</title>
      </Helmet>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          justifyItems: 'center',
          px: '10px',
        }}
      >
        <Box sx={{ height: 'fit-content' }}>
          <Typography
            variant="subtitle1"
            sx={{
              fontSize: 25,
              fontWeight: 700,
              textAlign: 'center',
            }}
          >
            Please check your email
          </Typography>

          <Stack direction="row" justifyContent="center" alignItems="center" sx={{ mt: 2, mb: 6 }}>
            <Box component="img" src={emailIcon} width="120px" />
          </Stack>

          <Box
            sx={{
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              fontSize: 14,
              width: { xs: '95%', md: 350 },
            }}
          >
            <Typography variant="paragraph">
              A verification link sent to: <b>{user.email}</b> from SKU Markets. It will expire
              shortly.
            </Typography>

            <Typography variant="paragraph">Also don't forget to check the spam folder.</Typography>
          </Box>

          <Box
            sx={{
              my: 3,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Button
              color="inherit"
              size="large"
              type="submit"
              variant="contained"
              onClick={() => setOpenAlert(true)}
              sx={{
                px: 6,
                bgcolor: 'primary.main',
                color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
                '&:hover': {
                  bgcolor: 'white',
                  color: (theme) =>
                    theme.palette.mode === 'light' ? 'primary.main' : 'primary.main',
                  border: (theme) => `1px solid ${theme.palette.primary.main}`,
                },
              }}
            >
              Resend Email
            </Button>
          </Box>

          <Typography variant="paragraph" sx={{ fontSize: 12, maxWidth: 350 }}>
            Need to change the email? Logout and{' '}
            <Link to="/" component={RLink}>
              Create an account
            </Link>
          </Typography>
        </Box>
      </Box>

      {/* <CancelAlert
           open={openAlert}
           handleClose={handleCloseAlert}
           item={''}
           alert={'Are you sure you want to resend verification email'}
           title={'Resend verification email'}
           btnTitle={'Resend'}
           text={'Resend Email successfully'}
           handleConfirm={handleResend}
           notSuccess={true}
         /> */}
      <Modal
        open={openAlert}
        onClose={handleCloseAlert}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openAlert}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: { md: '40vw', xs: '90vw', sm: '90vw' },
              bgcolor: 'background.paper',
              borderRadius: 3,
              boxShadow: (theme) => (theme.palette.mode === 'dark' ? 5 : 0),
              px: 3,
              py: 1,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 1,
              }}
            >
              <Typography id="transition-modal-title" variant="h6" component="h2">
                Resend verification email
              </Typography>
              <IconButton sx={{ color: 'text.main' }} onClick={handleCloseAlert}>
                <CloseOutlinedIcon />
              </IconButton>
            </Box>
            <Typography variant="h6" component="h3" sx={{ mt: 2, mb: 5, color: 'GrayText' }}>
              Are you sure you want to resend verification email?
            </Typography>
            <Box sx={{ textAlign: 'end', mb: 2 }}>
              <Button variant="outlined" sx={{ color: 'text.main' }} onClick={handleCloseAlert}>
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
                disabled={isLoading}
                onClick={handleResend}
              >
                Resend
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default EmailConfirmation;
