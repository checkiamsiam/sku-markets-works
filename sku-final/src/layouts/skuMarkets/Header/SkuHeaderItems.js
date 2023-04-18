import PlaceIcon from '@mui/icons-material/Place';
import { Button, Stack } from '@mui/material';
import axios from 'axios';
import SearchBarInSku from 'components/SkuMarket/SearchBarInSku';
import { useGetBillingInfoQuery } from 'features/billingInfo/billingInfoApi';
import useResponsive from 'hooks/useResponsive';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AddNewAddress from 'sections/@deshboard/user/account/billing/AddNewAddress';
import AdressModal from './AdressModal';

const SkuHeaderItems = ({ lng }) => {
  const { isLoading } = useGetBillingInfoQuery();
  const loggedInUserId = useSelector((state) => state.user._id);
  const navigate = useNavigate();
  // Handle adress
  const [title, setTitle] = useState('');
  const [adressMenu, setAdressMenu] = useState(null);
  const adressListMenuOpen = Boolean(adressMenu);
  const handleOpenAdressList = (event) => {
    if (loggedInUserId) {
      setAdressMenu(event.currentTarget);
    }
  };
  const handleCloseAdressList = () => {
    setAdressMenu(null);
  };

  const [addAdressModal, setAddAdressModal] = useState(false);

  const [deliveryCountry, setDeliveryCountry] = useState();

  const handleAdressListModalOpen = () => {
    setAddAdressModal(true);
  };

  const handleAdressModalClose = () => {
    setAddAdressModal(false);
  };

  useEffect(() => {
    // if (loggedInUserId) {
    //   setDeliveryCountry('Jordan');
    // } else {
    axios.get('https://1.1.1.1/cdn-cgi/trace').then((resp) => {
      let loc = resp?.data?.substring(resp?.data?.indexOf('loc=') + 4);
      loc = loc.substring(0, loc.indexOf('\n'));
      axios.get(`https://restcountries.com/v2/alpha/${loc}`).then((resp) => {
        setDeliveryCountry(resp?.data?.name);
      });
    });
    // }
  }, [loggedInUserId]);

  const isMd = useResponsive('up', 'md');

  return (
    <>
      <Stack
        direction={{ md: 'row', sm: 'column', xs: 'column' }}
        justifyContent={{ md: 'space-around', sm: 'flex-start', xs: 'flex-start' }}
        alignItems={{ md: 'center', sm: 'flex-start', xs: 'flex-start' }}
        spacing={2}
        sx={{ pl: { md: 0, sm: 1, xs: 1 } }}
      >
        {!isMd && <SearchBarInSku lng={lng} />}
        <Button
          variant="text"
          color="inherit"
          sx={{
            color: (theme) => (theme.palette.mode === 'light' ? 'black' : 'white'),
            fontSize: { lg: '14px', md: '12px', sm: '12px', xs: '12px' },
            px: { lg: 1, md: 0, sm: 1, xs: 1 },
          }}
          startIcon={<PlaceIcon />}
          onClick={handleOpenAdressList}
        >
          {lng ? 'تسليم الى' : 'Deliver to'} {deliveryCountry}
        </Button>

        {isMd && <SearchBarInSku lng={lng} />}

        <Button
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
            px: { lg: 1, md: 0, sm: 1, xs: 1 },
            fontSize: { lg: '14px', md: '12px', sm: '12px', xs: '12px' },
          }}
          onClick={() => navigate('/become_partner')}
        >
          {lng ? 'كن شريكنا ' : 'Become a Partner'}
        </Button>
        <Button
          variant="text"
          color="inherit"
          sx={{
            color: (theme) => (theme.palette.mode === 'light' ? 'black' : 'white'),
            px: { lg: 1, md: 0, sm: 1, xs: 1 },
            fontSize: { lg: '14px', md: '12px', sm: '12px', xs: '12px' },
          }}
          onClick={() => navigate('/sellerboard')}
        >
          {lng ? 'المرتجعات والطلبات' : 'Returns & Orders'}
        </Button>
      </Stack>

      <AdressModal
        loading={isLoading}
        handleAdressListModalOpen={handleAdressListModalOpen}
        handleCloseAdressList={handleCloseAdressList}
        adressListMenuOpen={adressListMenuOpen}
        adressMenu={adressMenu}
      />

      <AddNewAddress
        open={addAdressModal}
        handleClose={handleAdressModalClose}
        text={'New Address Added Successfully'}
        title="Add New Billing Address"
      />
    </>
  );
};

export default SkuHeaderItems;
