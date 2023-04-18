import { Container, Drawer, IconButton, Stack } from '@mui/material';
import TopNav from 'components/common/TopNav';
import Iconify from 'components/iconify/Iconify';
import Logo from 'components/logo/Logo';
import Scrollbar from 'components/scrollbar/Scrollbar';
import { NAV } from 'config-global';
import useAuth from 'hooks/useAuth';
import AccountPopover from 'layouts/dashboard/header/AccountPopover';
import LanguagePopover from 'layouts/dashboard/header/LanguagePopover';
import NotificationsPopover from 'layouts/dashboard/header/NotificationsPopover';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import style from 'styles/Naber.module.css';
import SkuHeaderItems from './SkuHeaderItems';

const SKUHeaderMob = ({ lng }) => {
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

  const navigate = useNavigate();
  const auth = useAuth();
  return (
    <>
      <TopNav lng={lng} />
      <Container
        sx={{ height: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <Logo />

        <Stack direction="row" justifyContent="flex-end" spacing={2}>
          <LanguagePopover />
          <NotificationsPopover />
          {auth.token ? (
            <AccountPopover />
          ) : (
            <button onClick={() => navigate('/login')} className={style.navSign}>
              Log In
            </button>
          )}
          <IconButton onClick={handleOpen}>
            <Iconify icon="eva:menu-2-fill" />
          </IconButton>
        </Stack>
      </Container>

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
          <SkuHeaderItems lng={lng} />
        </Scrollbar>
      </Drawer>
    </>
  );
};

export default SKUHeaderMob;
