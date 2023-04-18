import PropTypes from 'prop-types';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Button, Card, Divider, Stack, Typography, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
// components
import {
  useGetBillingInfoQuery,
  useUpdateDefaultAddressMutation,
} from 'features/billingInfo/billingInfoApi';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Iconify from 'components/iconify';
import AddNewAddress from './AddNewAddress';
import EditBillingAddress from './EditBillingAddress';
import { setActiveAddress } from 'features/billingInfo/billingInfoSlice';

import mapIcon from 'assets/images/map.png';

// ----------------------------------------------------------------------

AccountBillingAddressBook.propTypes = {
  addressBook: PropTypes.array,
};

export default function AccountBillingAddressBook({ addressBook }) {
  const dispatch = useDispatch();
  const { addresses, activeAddress, defaultAddress } = useSelector((state) => state.billingInfo);
  // Get Billing information's
  const { isLoading } = useGetBillingInfoQuery();
  //  Make an Address as Default
  const [makeDefault, { isLoading: defaultLoading }] = useUpdateDefaultAddressMutation();

  // handle make default address
  const handleDefault = (addressId) => {
    dispatch(setActiveAddress({_id: addressId}));
    makeDefault({addressId});
  };

  // new address
  const [openAddress, setOpenAddress] = useState(false);
  const handleCloseAddress = () => setOpenAddress(false);
  const handleShowAddress = () => setOpenAddress(true);

  // edit address
  const [openEdit, setOpenEdit] = useState(false);
  const handleCloseEdit = () => setOpenEdit(false);
  const handleShowEdit = (address) => {
    setOpenEdit(true);
    dispatch(setActiveAddress(address));
  };

  return (
    <>
      {/* <Card sx={{ p: 3 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
          <Typography variant="subtitle1">
            Warehouses
          </Typography>

          <Button
            onClick={handleShowAddress}
            size="small"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New Address
          </Button>
        </Stack> */}
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {addresses.length === 0 ? (
              <Typography variant="subtitle1" sx={{ mt: 5, mb: 2, textAlign: 'center' }}>
                No Address found
              </Typography>
            ) : (
              <Stack spacing={3} divider={<Divider sx={{ borderStyle: 'dashed' }} />}>
                {addresses?.map((address) => (
                  <Stack key={address._id} direction='row' alignItems='center' justifyContent='space-between' spacing={1}>

                  <Box>
                    <Stack direction="row" alignItems="center" sx={{pb: 1}}>
                      <Typography variant="subtitle1">
                        {address.title}
                      </Typography>
                      {defaultAddress === address._id && <Typography variant="caption" sx={{color: "info.darker", bgcolor: "info.lighter", px:1, borderRadius: 10, ml: 1 }}>
                        Default
                      </Typography>}
                    </Stack>

                    <Typography variant="body2">
                      <Box component="span" sx={{ color: 'text.secondary', mr: 0.5 }}>
                        Address:
                      </Box>
                      {`${address.address}, ${address.city}, ${address.state}, ${address.country} ${address.zipCode}`}
                    </Typography>

                    <Typography variant="body2">
                      <Box component="span" sx={{ color: 'text.secondary', mr: 0.5 }}>
                        Phone:
                      </Box>
                      {address.phone}
                    </Typography>

                    <Stack direction="row" spacing={1} sx={{mt: 1.5}}>
                      <Button
                        size="small"
                        startIcon={<Iconify icon="eva:edit-fill" />}
                        onClick={() => handleShowEdit(address)}
                      >
                        Edit
                      </Button>
                    </Stack>
                  </Box>

                  <Stack direction='column' alignItems='center' justifyContent='center' >
                    <Link
                      to={`https://google.com/maps/@${address?.location?.lat},${address?.location?.lng},20z`}
                      target="_blank"
                      rel="noreffer"
                    >
                      <Box component="img" src={mapIcon} width="40px" height="40px" sx={{mx: 'auto'}} />
                    </Link>

                    <LoadingButton
                      size='small'
                      onClick={() => handleDefault(address?._id)}
                      loading={defaultLoading && activeAddress?._id === address?._id}
                      variant='outlined'
                      disabled={(address?._id === defaultAddress ? true : false || address.isApproved ? false : true)}
                      sx={{
                        my: 1,
                        '&:hover': {
                          bgcolor: 'primary.main',
                          color: 'white',
                        }
                      }}
                    >
                      Set Default
                    </LoadingButton>

                    <Button
                      size='small'
                      sx={{
                        px: 1,
                        fontWeight: 600,
                        color: `${address.isApproved ? 'success.main' : 'warning.dark'}`,
                        bgcolor: `${address.isApproved ? 'rgba(120, 240, 80, 0.2)' : 'rgba(255, 193, 7, 0.2)'}`,
                        '&:hover': {bgcolor: `${address.isApproved ? 'rgba(120, 240, 80, 0.2)' : 'rgba(255, 193, 7, 0.2)'}`}
                      }}
                    >
                      {address?.isApproved ? 'Approved' : 'Pending Approval'}
                    </Button>

                    </Stack>
                  </Stack>
                ))}
              </Stack>
            )}
          </>
        )}
      {/* </Card> */}

      
      <EditBillingAddress
        open={openEdit}
        handleClose={handleCloseEdit}
        address={activeAddress}
        defaultAddress={defaultAddress}
        text={'Address Edited Successfully'}
        title="Edit Billing Address"
      />
    </>
  );
}
