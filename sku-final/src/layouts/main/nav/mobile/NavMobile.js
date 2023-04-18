import { Drawer, IconButton, Link, List } from '@mui/material';
import { Stack } from '@mui/system';
import TopNav from 'components/common/TopNav';
import useAuth from 'hooks/useAuth';
import AccountPopover from 'layouts/dashboard/header/AccountPopover';
import CurrencyPopover from 'layouts/dashboard/header/CurrencyPopaver';
import LanguagePopover from 'layouts/dashboard/header/LanguagePopover';
import NotificationsPopover from 'layouts/dashboard/header/NotificationsPopover';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { HashLink } from 'react-router-hash-link';
import style from 'styles/Naber.module.css';
import Iconify from '../../../../components/iconify';
import Logo from '../../../../components/logo';
import Scrollbar from '../../../../components/scrollbar';
import { NAV } from '../../../../config-global';

export default function NavMobile({ isOffset, data }) {
  const links = [
    {
      title: 'Home',
      path: '/#home',
    },
    {
      title: 'SKU Markets',
      path: '/become_partner/#TrySkuMarket',
    },
    {
      title: 'How it works!',
      path: '/become_partner/#MarketSolution',
    },
    {
      title: 'FAQ',
      path: '/become_partner/#FAQSection',
    },
    {
      title: 'Pricing Plans',
      path: '/become_partner/#PricingPlans',
    },
    {
      title: 'Contact Us',
      path: '/become_partner/#ContactUs',
    },
  ];

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const auth = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <TopNav />
      <Stack direction="row" spacing={1}>
        <CurrencyPopover />
        <LanguagePopover />
        <NotificationsPopover />
        {auth.token ? (
          <AccountPopover />
        ) : (
          <button onClick={() => navigate('/login')} className={style.navSign}>
            Log In
          </button>
        )}
        <IconButton
          onClick={handleOpen}
          sx={{
            ml: 1,
            ...(isOffset && {
              color: 'text.primary',
            }),
          }}
        >
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>
      </Stack>

      <Drawer
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            pb: 5,
            width: NAV.W_BASE,
          },
        }}
      >
        <Scrollbar>
          <Logo sx={{ mx: 2.5, my: 3 }} />

          <List component="nav" disablePadding>
            <Stack
              direction={{ xs: 'column', sm: 'column' }}
              spacing={{ xs: 2, sm: 2 }}
              sx={{ ml: 2 }}
            >
              {links.map((link, i) => (
                <Link
                  sx={{ color: '#0d6efd' }}
                  component={HashLink}
                  to={link.path || `/`}
                  underline="none"
                  color="inherit"
                >
                  {link.title}
                </Link>
              ))}
            </Stack>
          </List>
        </Scrollbar>
      </Drawer>
    </>
  );
}
