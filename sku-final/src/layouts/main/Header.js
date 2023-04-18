import { AppBar, Box, Container, Toolbar } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Stack } from '@mui/system';
import TopNav from 'components/common/TopNav';
import useAuth from 'hooks/useAuth';
import AccountPopover from 'layouts/dashboard/header/AccountPopover';
import CurrencyPopover from 'layouts/dashboard/header/CurrencyPopaver';
import LanguagePopover from 'layouts/dashboard/header/LanguagePopover';
import NotificationsPopover from 'layouts/dashboard/header/NotificationsPopover';
import { useNavigate } from 'react-router';
import style from 'styles/Naber.module.css';
import Logo from '../../components/logo';
import { HEADER } from '../../config-global';
import useOffSetTop from '../../hooks/useOffSetTop';
import useResponsive from '../../hooks/useResponsive';
import { bgBlur } from '../../utils/cssStyles';
import NavDesktop from './nav/desktop';
import NavMobile from './nav/mobile';

export default function Header() {
  const theme = useTheme();
  const auth = useAuth();
  const navigate = useNavigate();

  const isDesktop = useResponsive('up', 'md');

  const isOffset = useOffSetTop(HEADER.H_MAIN_DESKTOP);

  return (
    <AppBar color="transparent" sx={{ boxShadow: 0 }}>
      <TopNav isOffset={isOffset} />

      <Toolbar
        disableGutters
        sx={{
          height: {
            xs: HEADER.H_MOBILE,
            md: HEADER.H_MAIN_DESKTOP,
          },
          transition: theme.transitions.create(['height', 'background-color'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
          }),
          ...(isOffset && {
            ...bgBlur({ color: theme.palette.background.default }),
            height: {
              md: HEADER.H_MAIN_DESKTOP - 16,
            },
          }),
        }}
      >
        <Container
          sx={{ height: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <Logo />

          {isDesktop && (
            <>
              <NavDesktop isOffset={isOffset} />
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }}>
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
              </Stack>
            </>
          )}

          {!isDesktop && <NavMobile isOffset={isOffset} />}
        </Container>
      </Toolbar>

      {isOffset && <Shadow />}
    </AppBar>
  );
}

function Shadow({ sx, ...other }) {
  return (
    <Box
      sx={{
        left: 0,
        right: 0,
        bottom: 0,
        height: 24,
        zIndex: -1,
        m: 'auto',
        borderRadius: '50%',
        position: 'absolute',
        width: `calc(100% - 48px)`,
        boxShadow: (theme) => theme.customShadows.z8,
        ...sx,
      }}
      {...other}
    />
  );
}
