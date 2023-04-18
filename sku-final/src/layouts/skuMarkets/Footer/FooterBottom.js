import { Box, Stack, Typography } from '@mui/material';
import SKUWalletLogo from 'components/common/SKUWalletLogo';
import useResponsive from 'hooks/useResponsive';
import { Link } from 'react-router-dom';
import apple from '../../../assets/images/Apple_Pay_logo.png';
import btcIcon from '../../../assets/images/btcIcon.png';
import payment from '../../../assets/images/payment-cards2.png';

const FooterBottom = ({ lng }) => {
  const ITEMS = [
    { label: `{${lng ? 'كن شريكنا' : 'Become A Partner'}}`, path: '/become_partner' },
    { label: `{${lng ? 'خطط الأسعار' : 'Pricing Plans'}}`, path: '/become_partner' },
    { label: `{${lng ? 'تواصل معنا ' : 'Contact Us'}}`, path: '/become_partner' },
    { label: `{${lng ? 'مركز المساعدة ' : 'Help Center'}}`, path: '/help_center' },
  ];

  const year = new Date().getFullYear();
  const isMd = useResponsive('up', 'md');

  const renderItems = () => {
    return ITEMS.map((link, i) => (
      <Box
        key={i}
        component={Link}
        to={link.path}
        sx={{
          textDecoration: 'none',
          color: '#0d6efd',
          fontSize: '13px',
          fontWeight: 600,
          pl: { xs: 2, md: 0 },
        }}
      >
        {link.label}
      </Box>
    ));
  };

  const renderPaymentIcons = () => (
    <Box sx={{ display: 'flex', gap: '3px', justifyContent: 'center', alignItems: 'center' }}>
      <SKUWalletLogo />
      <img width={49} height={20} src={apple} alt="apple" />
      <img width={160} height={20} src={payment} alt="apple" />
      <img src={btcIcon} width={25} height={25} alt="payment_icon" />
    </Box>
  );

  const dateYear = () => (
    <Typography sx={{ fontWeight: 'bold', fontSize: '12px', py: { xs: 1 } }} component="p">
      <span>&copy;</span> All rights reserved {year}
    </Typography>
  );

  return (
    <>
      {isMd && (
        <Stack
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
          spacing={2}
          sx={{ pb: 2 }}
        >
          {renderItems()}
          {dateYear()}
          {renderPaymentIcons()}
        </Stack>
      )}
      {!isMd && (
        <Stack direction="column" justifyContent="center" alignItems="center">
          <Stack
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
            spacing={1}
            sx={{ pb: 2 }}
          >
            {renderItems()}
          </Stack>
          {renderPaymentIcons()}
          {dateYear()}
        </Stack>
      )}
    </>
  );
};

export default FooterBottom;
