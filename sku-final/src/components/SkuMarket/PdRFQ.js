import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Button, IconButton, TextField } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/styles';
import { useCreateOrderMutation } from 'features/order/orderAPI';
import { useState } from 'react';
import { useSelector } from 'react-redux';
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
  boxShadow: (theme) => (theme.palette.mode === 'dark' ? 5 : 0),
  px: 3,
  py: 1,
};

const PdRFQ = ({
  text,
  btnTitle,
  handleClose,
  open,
  qty,
  unit,
  item,
  seller,
  productId,
  totalSellers,
}) => {
  const [createOrder] = useCreateOrderMutation();
  const theme = useTheme();
  const [checkAllSellers, setCheckAllSellers] = useState(false);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const successAlrt = async () => {
    Swal.fire({
      position: 'center',
      icon: 'success',
      text: text,
      showConfirmButton: false,
      timer: 1500,
      backdrop: false,
      width: '23em',
      background: theme.palette.mode === 'dark' ? '#212B36' : '#fff',
      color: theme.palette.mode === 'dark' ? '#fff' : '#212B36',
    });
    /// Here call order Api
    const orderDetail = {
      sellerId: seller,
      productId: productId,
      quantity: qty,
      price: unit,
    };
    // console.log(checkAllSellers);
    try {
      const order = await createOrder({ data: orderDetail });
      if (order) {
        navigate('/sellerboard', { replace: true });
        handleClose();
      }
    } catch (error) {
      console.log('order error', error);
    }
  };
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
              Send New Request
            </Typography>

            <IconButton sx={{ color: 'text.main' }} onClick={handleClose}>
              <CloseOutlinedIcon />
            </IconButton>
          </Box>
          <Typography variant="h6" component="h3" sx={{ my: 2, color: 'GrayText' }}>
            Are you sure you want to send new request?
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              textAlign: 'end',
              mb: 1.5,
              mt: 1,
            }}
          >
            <Box sx={{ mr: 10 }}>
              <TextField
                id="outlined-number"
                size="small"
                type="number"
                disabled
                defaultValue={qty}
                InputLabelProps={{
                  shrink: true,
                  sx: { color: 'text.primary' },
                }}
                inputProps={{ style: { textAlign: 'center' } }}
                label="Quantity"
                variant="outlined"
                sx={{ fontSize: '12px', width: 75 }}
              />
              <TextField
                id="outlined-number"
                size="small"
                type="number"
                disabled
                defaultValue={unit}
                InputLabelProps={{
                  shrink: true,
                  sx: { color: 'text.primary' },
                }}
                inputProps={{ style: { textAlign: 'center' } }}
                label="Bid/Unit"
                variant="outlined"
                sx={{ mx: 1.5, fontSize: '12px', width: 75 }}
              />
            </Box>
            <Box sx={{ textAlign: 'end' }}>
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
                Send
              </Button>
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default PdRFQ;
