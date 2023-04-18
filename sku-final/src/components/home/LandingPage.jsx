import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { useNavigate } from 'react-router';
import heroJumpLgo from '../../assets/images/svg/SKU Market Patt 20x15-01.png';
// import GifHero from '../../assets/images/Web GIF 3_2.gif';
import { m, useScroll } from 'framer-motion';
import { useEffect, useState } from 'react';
import style from './styles/landingPage.module.css';

// @mui
import { Box, Button, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { varFade } from 'components/animate';
import Iconify from 'components/iconify/Iconify';
import { HEADER } from 'config-global';
import useResponsive from 'hooks/useResponsive';

const LandingPage = () => {
  const navigate = useNavigate();
  const isDesktop = useResponsive('up', 'md');

  const { scrollYProgress } = useScroll();

  const [hide, setHide] = useState(false);

  useEffect(
    () =>
      scrollYProgress.onChange((scrollHeight) => {
        if (scrollHeight > 0.8) {
          setHide(true);
        } else {
          setHide(false);
        }
      }),
    [scrollYProgress]
  );

  if (hide) {
    return null;
  }

  return (
    <Container sx={{ position: 'relative', zIndex: 1, mt:15 }} maxWidth="lg" id='#home'>
      <Grid container spacing={2} sx={{ mt:{ md:`${HEADER.H_MAIN_DESKTOP}px`}, height: {md:'55vh'} }}>
        <Grid item xs={12} lg={6} sx={{ my: 'auto' }}>
          <div className={style.landingFirstSectionTxt}>
            <div onClick={() => navigate('/signup')} className={style.jumpingPort}>
              <img width={15} height={15} src={heroJumpLgo} alt=" hero jump logo" />{' '}
              <span style={{fontSize:'14px'}}> Jump start your portfolio </span>
              <HiOutlineArrowNarrowRight />
            </div>
            <div>
              <h1 className={style.Landingh1text}>
                A Complete Insights, Analytics, Statistics, Management & Selling Platform Built to
                Supercharge Your Ecommerce
              </h1>
              <h6 className={style.disFontStyle}>
                Track it, Get Notified, Added it, Manage to Sell it to grow your Ecommerce
              </h6>
              <p className="">SKU Markets is the easiest place to scale your Ecommerce</p>

              <h6 className={style.disFontStyle}>Powered By AI, Sign up and get started today</h6>
            </div>
            <Button 
            sx={{
              bgcolor: 'primary.main',
              border: (theme) => `1px solid ${theme.palette.primary.main}`,
              color: (theme) =>
                theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
              '&:hover': {
                bgcolor: 'white',
                transition: 'ease-in-out 0.7s',
                color: (theme) =>
                  theme.palette.mode === 'light' ? 'primary.main' : 'primary.main',
                border: (theme) => `1px solid ${theme.palette.primary.main}`,
              },
              px:1
            }}
            onClick={() => navigate('/signup')}
            startIcon={<Iconify icon="eva:external-link-fill" width={22} />}
            >Sign Up</Button>
          </div>
        </Grid>
        {isDesktop && (
          <Grid item xs={12} lg={6} sx={{ overflow: 'hidden' }}>
            {/* <div className="">
            <img
              className={style.landingFirstSectionGif}
              src={GifHero}
              alt="Gif for searching "
            />
          </div> */}
            <Content />
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default LandingPage;

function Content() {
  const theme = useTheme();

  const isLight = theme.palette.mode === 'light';

  const transition = {
    repeatType: 'loop',
    ease: 'linear',
    duration: 60 * 4,
    repeat: Infinity,
  };

  return (
    <Stack
      direction="row"
      alignItems="flex-start"
      sx={{
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        // mt: `${HEADER.H_MAIN_DESKTOP}px`,
      }}
    >
      <Stack component={m.div} variants={varFade().in} sx={{ width: '22vw', position: 'relative' }}>
        <Box
          component={m.img}
          animate={{ y: ['0%', '100%'] }}
          transition={transition}
          alt={`sku_market_${isLight ? 'light' : 'dark'}_1`}
          src={`/assets/images/home/sku_market_${isLight ? 'light' : 'dark'}_1.png`}
          sx={{ position: 'absolute' }}
        />
        <Box
          component={m.img}
          animate={{ y: ['-100%', '0%'] }}
          transition={transition}
          alt={`sku_market_${isLight ? 'light' : 'dark'}_1`}
          src={`/assets/images/home/sku_market_${isLight ? 'light' : 'dark'}_1.png`}
          sx={{ position: 'absolute' }}
        />
      </Stack>

      <Stack
        component={m.div}
        variants={varFade().in}
        sx={{ width:'28vw', position: 'relative', ml: -2 }}
      >
        <Box
          component={m.img}
          animate={{ y: ['100%', '0%'] }}
          transition={transition}
          alt={`sku_market_${isLight ? 'light' : 'dark'}_2`}
          src={`/assets/images/home/sku_market_${isLight ? 'light' : 'dark'}_2.png`}
          sx={{ position: 'absolute' }}
        />
        <Box
          component={m.img}
          animate={{ y: ['0%', '-100%'] }}
          transition={transition}
          alt={`sku_market_${isLight ? 'light' : 'dark'}_2`}
          src={`/assets/images/home/sku_market_${isLight ? 'light' : 'dark'}_2.png`}
          sx={{ position: 'absolute' }}
        />
      </Stack>
    </Stack>
  );
}
