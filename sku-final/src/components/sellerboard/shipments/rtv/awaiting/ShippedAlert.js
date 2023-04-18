import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Button, Divider, IconButton, TextField } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import InputBase from '@mui/material/InputBase';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/styles';
import { Stack } from '@mui/system';
import { useUpdateShipmentRTVAwaitingMutation } from 'features/shipment/shipmentAPI';
import { useRef, useState } from 'react';
import Swal from 'sweetalert2';
import ShippedRate from './ShippedRate';

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

// child confirmation modal

function ChildModal({
  btnTitle,
  item,
  childTitle,
  text,
  closeModal,
  delivered,
  shipmentId,
  refetch,
}) {
  // SuccessAlert
  const theme = useTheme();

  const [updateRTVAwaiting] = useUpdateShipmentRTVAwaitingMutation();
  const awbRef = useRef();

  const successAlrt = () => {
    if (awbRef?.current?.value == '') {
      return;
    }

    updateRTVAwaiting({ id: shipmentId, awb: awbRef?.current?.value }).then(() => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        text: text,
        showConfirmButton: false,
        timer: 1500,
        backdrop: false,
        width: '25em',
        background: theme.palette.mode === 'dark' ? '#212B36' : '#fff',
        color: theme.palette.mode === 'dark' ? '#fff' : '#212B36',
      });
      handleClose();
      closeModal();
    });

    refetch?.map((refetchFtn) => {
      refetchFtn();
    });
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  // Rating
  const [sellerStar, setSellerStar] = useState(4.5);
  const [starHover, setStarHover] = useState(-1);
  const [pdStar, setPdStar] = useState(5);
  const [starPdHover, setStarPdHover] = useState(-1);
  return (
    <>
      <Button
        sx={{
          bgcolor: 'primary.main',
          border: (theme) => `1px solid ${theme.palette.primary.main}`,
          color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
          '&:hover': {
            bgcolor: 'white',
            color: (theme) => (theme.palette.mode === 'light' ? 'primary.main' : 'primary.main'),
            border: (theme) => `1px solid ${theme.palette.primary.main}`,
          },
          mx: 2,
        }}
        onClick={handleOpen}
      >
        {btnTitle}
      </Button>
      <Modal
        // hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box
          sx={{
            ...style,
            width: { md: '35vw', xs: '85vw', sm: '85vw' },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant="h6" component="h2">
              {childTitle === 'Rate' ? 'Add Review' : 'Shipment Details'}
            </Typography>
            <IconButton sx={{ color: 'text.main' }} onClick={handleClose}>
              <CloseOutlinedIcon />
            </IconButton>
          </Box>
          <Divider sx={{ marginBottom: 2 }} />
          {childTitle === 'Rate' ? (
            <>
              <Stack diraction="column" sx={{ mb: 1 }}>
                <Typography sx={{ pt: 1, display: 'flex' }} component="div" variant="subtitle1">
                  Seller Rate :{' '}
                  <ShippedRate
                    starValue={sellerStar}
                    starHover={starHover}
                    setStarHover={setStarHover}
                    setStarValue={setSellerStar}
                  />
                </Typography>
                <Typography
                  sx={{ pt: 1, display: 'flex', mb: 2 }}
                  component="div"
                  variant="subtitle1"
                >
                  Your review about this product :
                  <ShippedRate
                    starValue={pdStar}
                    starHover={starPdHover}
                    setStarHover={setStarPdHover}
                    setStarValue={setPdStar}
                  />
                </Typography>
                <TextField
                  id="outlined-basic"
                  label="Review"
                  multiline
                  rows={3}
                  variant="outlined"
                />
              </Stack>
            </>
          ) : (
            <Box>
              {/* {delivered && (
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  size="small"
                  options={[
                    { label: 'Stock Damage' },
                    { label: 'Price Issue' },
                    { label: 'Mismatch Quantity' },
                    { label: 'Mismatch SKU' },
                    { label: 'Others' },
                  ]}
                  sx={{ width: '100%' }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      label="RTV Reasons"
                      placeholder="RTV Reasons"
                    />
                  )}
                />
              )} */}
              <Typography sx={{ pt: 1 }} component="div" variant="subtitle1">
                {childTitle} :
              </Typography>

              <InputBase
                sx={{
                  border: '1px solid #ced4da',
                  p: 0.5,
                  borderRadius: 1,
                  my: 2,
                  width: '100%',
                }}
                placeholder="SSASASSASA101019991A"
                inputProps={{ style: { fontSize: '12px' } }}
                inputRef={awbRef}
              />
              {/* <Typography variant="caption" sx={{ fontWeight: 600 }}>
                Packlist
              </Typography>
              <Box sx={{ height: 360 }}>
                {delivered ? (
                  <ThemeDataGrid
                    checkbox={false}
                    toolbar={false}
                    setPage={setPage}
                    columns={shipmentDataColumns}
                    rows={shipmentDataRow}
                    rowCount={shipmentDataRow.length}
                    page={page}
                    pageSize={pageSize}
                    setPageSize={setPageSize}
                  />
                ) : (
                  <ThemeDataGrid
                    checkbox={false}
                    toolbar={false}
                    setPage={setPage}
                    columns={shipmentPendingDataColumns}
                    rows={shipmentPendingDataRow}
                    rowCount={shipmentDataRow.length}
                    page={page}
                    pageSize={pageSize}
                    setPageSize={setPageSize}
                  />
                )}
              </Box> */}
            </Box>
          )}

          <Box sx={{ textAlign: 'end', mb: 1 }}>
            <Button
              variant="outlined"
              sx={{
                color: 'text.main',
                border: (theme) => `1px solid ${theme.palette.primary.main}`,
              }}
              onClick={handleClose}
            >
              Cancel
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
              {childTitle === 'Rate' ? 'Post Review' : 'Submit'}
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

const ShippedAlert = ({
  open,
  handleClose,
  item,
  title,
  btnTitle,
  alert,
  childTitle,
  text,
  delivered = false,
  shipmentId,
  refetch,
}) => {
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
              <ChildModal
                delivered={delivered}
                btnTitle={btnTitle}
                item={item}
                childTitle={childTitle}
                text={text}
                closeModal={handleClose}
                shipmentId={shipmentId}
                refetch={refetch}
              />
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default ShippedAlert;
