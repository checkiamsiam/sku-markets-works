import { Backdrop, Box, Button, Fade, IconButton, Modal, Stack, TextField, Typography, useTheme } from '@mui/material';
import  { modalStyle } from 'components/sellerboard/sellerboardAlerts/ConfirmationAlert';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const ActionColumn = ({ row }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  /* Accept Alert */
  const [openAccept, setOpenAccept] = useState(false);
  const handleCloseAccept = () => setOpenAccept(false);
  const handleShowAccept = () => setOpenAccept(true);

  const handleSubmitSell = () => {
    Swal.fire({
      position: 'center',
      icon: 'success',
      text: "SKU Sell Successfull",
      showConfirmButton: false,
      timer: 1500,
      backdrop: false,
      width: '23em',
      background: theme.palette.mode === 'dark' ? '#212B36' : '#fff',
      color: theme.palette.mode === 'dark' ? '#fff' : '#212B36',
    });
    navigate(`/skuMarket/${row._id}/${row.sellerId}`)
  }
  return (
    <>
      <Stack direction="row" spacing={2}>
        <Stack direction="row" spacing={1}>
          <TextField
            sx={{ width: '180px', fontSize: '12px' }}
            size="small"
            id="outlined-basic"
            placeholder="Partner SKU"
            variant="outlined"
          />
          <TextField
            sx={{ width: '100px', fontSize: '12px' }}
            size="small"
            id="outlined-basic"
            placeholder="Min Cost"
            variant="outlined"
          />
          <TextField
            sx={{ width: '100px', fontSize: '12px' }}
            size="small"
            id="outlined-basic"
            placeholder="Min Qty"
            variant="outlined"
          />
        </Stack>
        <Button
          onClick={handleShowAccept}
          sx={{
            bgcolor: 'primary.main',
            border: (theme) => `1px solid ${theme.palette.primary.main}`,
            color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
            '&:hover': {
              bgcolor: 'white',
              transition: 'ease-in-out 0.7s',
              color: (theme) => (theme.palette.mode === 'light' ? 'primary.main' : 'primary.main'),
              border: (theme) => `1px solid ${theme.palette.primary.main}`,
            },
            px: 1,
          }}
        >
          Sell It
        </Button>
      </Stack>
      <Modal
        open={openAccept}
        onClose={handleCloseAccept}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openAccept}>
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
              Sku Sell Confirmation
              </Typography>
              <IconButton sx={{ color: 'text.main' }} onClick={handleCloseAccept}>
                <CloseOutlinedIcon />
              </IconButton>
            </Box>
            <Typography variant="h6" component="h3" sx={{ mt: 2, mb: 5, color: 'GrayText' }}>
            Are you sure you want to Sell this ?
            </Typography>
            <Box sx={{ textAlign: 'end', mb: 2 }}>
              <Button
                variant="outlined"
                sx={{
                  color: 'text.main',
                  border: (theme) => `1px solid ${theme.palette.primary.main}`,
                }}
                onClick={handleCloseAccept}
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
                onClick={handleSubmitSell}
              >
                {'Sell'}
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default ActionColumn;
