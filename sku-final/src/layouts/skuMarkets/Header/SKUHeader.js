import { AppBar, Box, Container, Toolbar } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Stack } from '@mui/system';
import TopNav from 'components/common/TopNav';
import Logo from 'components/logo/Logo';
import { useSettingsContext } from 'components/settings';
import { HEADER } from 'config-global';
import useAuth from 'hooks/useAuth';
import useOffSetTop from 'hooks/useOffSetTop';
import useResponsive from 'hooks/useResponsive';
import AccountPopover from 'layouts/dashboard/header/AccountPopover';
import LanguagePopover from 'layouts/dashboard/header/LanguagePopover';
import NotificationsPopover from 'layouts/dashboard/header/NotificationsPopover';
import { useNavigate } from 'react-router';
import style from 'styles/Naber.module.css';
import { bgBlur } from 'utils/cssStyles';
import SKUHeaderMob from './SKUHeaderMob';
import SkuBottomNav from './SkuBottomNav';
import SkuHeaderItems from './SkuHeaderItems';

export default function SKUHeader({ lng }) {
  const theme = useTheme();
  const auth = useAuth();
  const navigate = useNavigate();

  const isDesktop = useResponsive('up', 'md');
  const isOffset = useOffSetTop(HEADER.H_MAIN_SKU_DESKTOP);
  const { themeStretch } = useSettingsContext();
  return (
    <AppBar color="transparent" sx={{ boxShadow: 0, backdropFilter: 'blur(20px)' }}>
      <TopNav lng={lng} isOffset={isOffset} />
      {isDesktop && (
        <Toolbar
          disableGutters
          sx={{
            height: {
              md: HEADER.H_MAIN_SKU_DESKTOP,
            },
            transition: theme.transitions.create(['height', 'background-color'], {
              easing: theme.transitions.easing.easeInOut,
              duration: theme.transitions.duration.shorter,
            }),
            ...(isOffset && {
              ...bgBlur({ color: theme.palette.background.default }),
              height: {
                md: HEADER.H_MAIN_SKU_DESKTOP - 16,
              },
            }),
          }}
        >
          <Container
            maxWidth={themeStretch ? false : 'lg'}
            sx={{
              height: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mx: { md: 10, xs: 0, sm: 0 },
            }}
          >
            <Logo />
            <SkuHeaderItems lng={lng} />
            <Stack direction="row" spacing={2}>
              {/* <CurrencyPopover/> */}
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

            {/* {!isDesktop && <NavMobile isOffset={isOffset} />} */}
          </Container>
        </Toolbar>
      )}
      {!isDesktop && (
        <Toolbar disableGutters sx={{ height: { xs: HEADER.H_MOBILE, sm: HEADER.H_MOBILE } }}>
          <SKUHeaderMob lng={lng} />
        </Toolbar>
      )}

      <SkuBottomNav lng={lng} isOffset={isOffset} />
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
