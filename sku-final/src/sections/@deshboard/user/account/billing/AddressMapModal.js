import React, { useState, useEffect} from 'react';

import { LoadingButton } from '@mui/lab';
import { Modal, Fade, Backdrop, Box, Stack, Button, Typography, IconButton } from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

// import { useAddBillingAddressMutation } from 'features/billingInfo/billingInfoApi';

import GMap from 'sections/auth/registration/GMap.js'

// styles
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { md: '50vw', xs: '95vw', sm: '95vw' },
    maxHeight: '90vh',
    overflow: 'auto',
    bgcolor: 'background.paper',
    borderRadius: 3,
    boxShadow: (theme) => (theme.palette.mode === 'dark' ? 5 : 0),
    px: 3,
    py: 1,
};

const AddressMapModal = ({openMap, onClose, handleParentClose, addressData, useFunction, location}) => {
  const [setAddress, {isLoading, isSuccess}] = useFunction();
  const [center, setCenter] = useState({lat: Number(location?.lat), lng: Number(location?.lng)} || { lat: 48.858093, lng: 2.294694 });

  const [marker, setMarker] = useState(center);

  useEffect(() => {
    if (isSuccess) {
      onClose();
      handleParentClose();
    }
  }, [isSuccess, onClose, handleParentClose]);

  // Handle Submit
  const handleSubmit = () => {
    const info = { ...addressData, location: marker };
    setAddress(info);
  };
return (
  <Modal
      open={openMap}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
          timeout: 500,
      }}
  >
      <Fade in={openMap}>
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
                      Choose on Map
                  </Typography>
                  <IconButton sx={{ color: 'text.main' }} onClick={onClose}>
                      <CloseOutlinedIcon />
                  </IconButton>
              </Box>


              <GMap center={center} setCenter={setCenter} marker={marker} setMarker={setMarker} height='400px' location={location ? true : false} />


              <Stack direction='row' alignItems='center' justifyContent='flex-end' spacing={2} sx={{mt: 2}} >
                <Button
                    variant="outlined"
                    sx={{
                        color: 'text.main',
                        border: (theme) => `1px solid ${theme.palette.primary.main}`,
                    }}
                    onClick={onClose}
                >
                    Back
                </Button>
                <LoadingButton
                  type="submit"
                  loading={isLoading}
                  onClick={handleSubmit}
                    sx={{
                      bgcolor: 'primary.main',
                      border: (theme) => `1px solid ${theme.palette.primary.main}`,
                      color: (theme) => theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
                      '&:hover': {
                        bgcolor: 'white',
                        color: (theme) => theme.palette.mode === 'light' ? 'primary.main' : 'primary.main',
                        border: (theme) => `1px solid ${theme.palette.primary.main}`,
                      },
                      ml: 2,
                    }}
                >
                    Submit
                </LoadingButton>
              </Stack>

            </Box>
          </Fade>
        </Modal>
)};

export default AddressMapModal;
