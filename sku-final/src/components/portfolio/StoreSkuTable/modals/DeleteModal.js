import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Button, Stack, useTheme } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Swal from 'sweetalert2';

const DeleteModal = ({ openDeleteModal, handleCloseDeleteModal, product }) => {
  const theme = useTheme();
  const handleRemove = () => {
    handleCloseDeleteModal();
    Swal.fire({
      position: 'center',
      icon: 'success',
      text: "SKU removed successfully",
      showConfirmButton: false,
      timer: 1500,
      backdrop: false,
      width: '23em',
      background: theme.palette.mode === 'dark' ? '#212B36' : '#fff',
      color: theme.palette.mode === 'dark' ? '#fff' : '#212B36',
    });
  };
  return (
    <Modal
      open={openDeleteModal}
      onClose={handleCloseDeleteModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={openDeleteModal}>
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
              Remove This SKU?
            </Typography>
            <IconButton sx={{ color: 'text.main' }} onClick={handleCloseDeleteModal}>
              <CloseOutlinedIcon />
            </IconButton>
          </Box>
          <Stack sx={{ mb: 2 }}>
            <Button
              sx={{
                width: '100%',
                bgcolor: 'primary.main',
                border: (theme) => `1px solid ${theme.palette.primary.main}`,
                color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
                '&:hover': {
                  bgcolor: 'white',
                  color: (theme) =>
                    theme.palette.mode === 'light' ? 'primary.main' : 'primary.main',
                  border: (theme) => `1px solid ${theme.palette.primary.main}`,
                },
              }}
              onClick={handleRemove}
            >
              Remove
            </Button>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  );
};

export default DeleteModal;
