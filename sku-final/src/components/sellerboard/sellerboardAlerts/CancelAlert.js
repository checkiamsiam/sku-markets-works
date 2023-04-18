import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Button, IconButton } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/styles';
import { useUpdateOrderMutation } from 'features/order/orderAPI';
import { usePaymentCancelMutation } from 'features/payment/paymentAPI';
import Swal from 'sweetalert2';

const style = {
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
};

const CancelAlert = ({
  open,
  handleClose,
  item,
  order,
  orderStatus,
  title,
  btnTitle,
  alert,
  text,
  handleConfirm,
  notSuccess,
  refetch,
}) => {
  const theme = useTheme();
  const [updateOrder] = useUpdateOrderMutation();
  const [cancelPayment] = usePaymentCancelMutation();

  const handleSwalAndRefetch = () => {
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

    handleClose();

    refetch?.map((refetchFtn) => {
      refetchFtn();
    });
  };

  const cancelAlrt = async () => {
    if (title?.includes('Payment')) {
      cancelPayment(order?._id).then(() => {
        handleSwalAndRefetch();
      });
    } else {
      const data = {
        id: order,
        reviewOrder: {
          status: orderStatus,
        },
      };

      updateOrder(data)
        .then(() => {
          handleSwalAndRefetch();
        })
        .catch(() => {});
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
              {alert} {item}?
            </Typography>
            <Box sx={{ textAlign: 'end', mb: 2 }}>
              <Button variant="outlined" sx={{ color: 'text.main' }} onClick={handleClose}>
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
                onClick={cancelAlrt}
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

export default CancelAlert;
