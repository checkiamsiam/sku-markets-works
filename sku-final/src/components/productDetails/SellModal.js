import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Button, IconButton } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/styles';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { md: '40vw', xs: '95vw', sm: '95vw' },
  bgcolor: 'background.paper',
  borderRadius: 3,
  boxShadow:(theme)=> theme.palette.mode === 'dark' ? 5 : 0 ,
  px: 3,
  py: 1,
};

const ConfirmSellAlert = ({ open, handleClose, item, title, btnTitle, alert, text }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const successAlrt = () => {
    if (btnTitle === 'Pay') {
      navigate('/subscription');
    } else {
      Swal.fire({
        position: 'center',
        icon: 'success',
        text: text,
        showConfirmButton: false,
        timer: 1500,
        backdrop: false,
        width:'23em',
        background: theme.palette.mode === 'dark' ? '#212B36' : '#fff',
        color: theme.palette.mode === 'dark' ?'#fff'  : '#212B36',
      });
      handleClose();
    }
  };
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
          <Box sx={style}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 1,
              }}
            >
              <Typography id="transition-modal-title" variant="h6" component="h2">
                {title}
              </Typography>
              <IconButton sx={{ color: 'text.main' }} onClick={handleClose}>
                <CloseOutlinedIcon />
              </IconButton>
            </Box>
            <Typography variant="h6" component="h3" sx={{ mt: 2, mb: 5, color: 'GrayText' }}>
              {alert} <br /> {item}?
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
                onClick={successAlrt}
              >
                {btnTitle}
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default ConfirmSellAlert;
