import { Box, Button, Stack, useMediaQuery } from '@mui/material';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useEffect, useState } from 'react';
import { HiMenu } from 'react-icons/hi';
import { useLocation } from 'react-router';
import { HashLink } from 'react-router-hash-link';
import SkuCategoriesDrawer from './SkuCategoriesDrawer';

const NavList = ({ links }) => {
  const location = useLocation();

  const [value, setValue] = useState();

  useEffect(() => {
    const path = location.pathname;
    const index = links.findIndex((link) => link.path === path);
    setValue(index);
  }, [links, location.pathname, value]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        maxWidth: '100vw',
        backgroundColor: 'transparent',
        overflow: 'hidden',
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        textColor="primary"
        aria-label="scrollable auto tabs example"
        indicatorColor="transparent"
        sx={{
          '& .MuiTab-root': {
            color: '#0d6efd',
            fontWeight: 400,
            mr: { xs: 2, md: 3 },
            fontSize: { xs: '12px', sm: '14px', md: '14px' },
          },
        }}
      >
        {links.map((link, i) => (
          <Tab
            key={i}
            component={HashLink}
            smooth
            to={link?.path}
            label={link?.title}
            sx={{ color: '#0d6efd' }}
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default function SkuBottomNav({ isOffset, data, lng }) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const links = [
    {
      title: `${lng ? 'اشتره مجددًا' : 'Buy Again'}`,
      path: '/buy_again',
    },
    {
      title: `${lng ? 'أبرز الصفقات' : 'Top Deals'}`,
      path: '/top_deals',
    },
    {
      title: `${lng ? 'منطقة الكوبونات' : 'Coupon Area'}`,
      path: '/coupon_area',
    },
    {
      title: `${lng ? 'التصفيات' : 'Clearance Area'}`,
      path: '/clearance_area',
    },
    {
      title: `${lng ? 'الصندوق المفتوح' : 'Open Box'}`,
      path: '/open_box',
    },
    {
      title: `${lng ? 'شركاء موثوقون' : 'Verified Partners'}`,
      path: '/verified_partners',
    },
    {
      title: `${lng ? 'متاجر شركائنا' : 'Partner stores'}`,
      path: '/partner_stores',
    },
    {
      title: `${lng ? 'مركز المساعدة' : 'Help Center'}`,
      path: '/help_center',
    },
    {
      title: `${lng ? 'باقات الأسعار' : 'Pricing Plans'}`,
      path: '/become_partner/#PricingPlans',
    },
  ];
  const handleOpen = () => setOpenDrawer(true);
  const handleClose = () => setOpenDrawer(false);

  const isMd = useMediaQuery((theme) => theme.breakpoints.up('md'));

  return (
    <>
      {isMd && (
        <Stack component="nav" direction="row" alignItems="center" spacing={4} sx={{ ml: 5 }}>
          <Button onClick={handleOpen} variant="text" startIcon={<HiMenu />}>
            {lng ? 'جميع الفئات' : 'All Categories'}
          </Button>
          <NavList links={links} />
        </Stack>
      )}
      {!isMd && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
          <Button
            onClick={handleOpen}
            variant="text"
            startIcon={<HiMenu />}
            sx={{ width: { xs: '100%', sm: '40%' }, fontSize: { xs: '12px', sm: '14px' } }}
          >
            {lng ? 'جميع الفئات' : 'All Categories'}
          </Button>
          <NavList links={links} />
        </Box>
      )}
      <SkuCategoriesDrawer open={openDrawer} onClose={handleClose} />
    </>
  );
}
