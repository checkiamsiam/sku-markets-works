import { useState } from 'react';
// @mui
import { alpha, Box, IconButton, MenuItem, Stack, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import Iconify from 'components/iconify/Iconify';
import Image from 'components/image/Image';
import MenuPopover from 'components/menu-popover/MenuPopover';
import Carousel from 'react-slick';
import { bgGradient } from 'utils/cssStyles';
import skuLogo from '../../../assets/images/svg/SKU Market Patt 20x15-01.png';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
// @mui

// ----------------------------------------------------------------------

const StyledRootDots = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'rounded',
})(({ rounded, theme }) => ({
  zIndex: 9,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.primary.main,
  '& li': {
    width: 18,
    height: 18,
    opacity: 0.32,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    '&.slick-active': {
      opacity: 1,
      ...(rounded && {
        '& span': {
          width: 16,
          borderRadius: 6,
        },
      }),
    },
  },
}));

const StyledDot = styled('span')(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.short,
  }),
}));

// ----------------------------------------------------------------------

export function CarouselDots(props) {
  const rounded = props?.rounded || false;

  const sx = props?.sx;

  return {
    appendDots: (dots) => (
      <StyledRootDots component="ul" rounded={rounded} sx={sx} {...props}>
        {dots}
      </StyledRootDots>
    ),
    customPaging: () => (
      <Stack
        component="div"
        alignItems="center"
        justifyContent="center"
        sx={{ width: 1, height: 1 }}
      >
        <StyledDot
          sx={{
            bgcolor: 'currentColor',
          }}
        />
      </Stack>
    ),
  };
}

// ----------------------------------------------------------------------

const HEIGHT = '100%';

const StyledRoot = styled('div')(({ theme }) => ({
  position: 'relative',
  height: HEIGHT,
  '& .slick-list': {
    borderRadius: Number(theme.shape.borderRadius) * 2,
  },
}));

const StyledCard = styled('div')(({ theme }) => ({
  ...bgGradient({
    color: alpha(theme.palette.grey[700], 0.9),
    imgUrl: '/assets/background/overlay_2.jpg',
  }),
  position: 'relative',
  height: HEIGHT,
  padding: theme.spacing(3),
  backgroundRepeat: 'no-repeat',
  color: theme.palette.common.white,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
}));

const shadowStyle = {
  mx: 'auto',
  width: 'calc(100% - 16px)',
  borderRadius: 2,
  position: 'absolute',
  //   height: HEIGHT,
  zIndex: 8,
  bottom: 8,
  left: 0,
  right: 0,
  bgcolor: 'grey.500',
  opacity: 0.32,
};

export default function BankingCurrentBalance({ list, sx }) {
  const theme = useTheme();

  const carouselSettings = {
    dots: true,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    ...CarouselDots({
      sx: {
        right: 16,
        bottom: 16,
        position: 'absolute',
      },
    }),
  };

  return (
    <StyledRoot sx={sx}>
      <Box sx={{ position: 'relative', zIndex: 9 }}>
        <Carousel {...carouselSettings}>
          {list.map((card) => (
            <CardItem key={card.id} card={card} />
          ))}
        </Carousel>
      </Box>

      <Box sx={{ ...shadowStyle }} />

      <Box
        sx={{
          ...shadowStyle,
          opacity: 0.16,
          bottom: 0,
          zIndex: 7,
          width: 'calc(100% - 40px)',
        }}
      />
    </StyledRoot>
  );
}

function CardItem({ card }) {
  const { id, cardType, balance, cardHolder, cardNumber, cardValid } = card;

  const [showCurrency, setShowCurrency] = useState(false);

  const [openPopover, setOpenPopover] = useState(null);

  const handleShowCurrency = () => {
    setShowCurrency(!showCurrency);
  };

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleDelete = () => {
    handleClosePopover();
    console.log('DELETE', id);
  };

  const handleEdit = () => {
    handleClosePopover();
    console.log('EDIT', id);
  };

  return (
    <>
      <StyledCard>
        <IconButton
          color="inherit"
          onClick={handleOpenPopover}
          sx={{
            top: 16,
            right: 16,
            zIndex: 9,
            opacity: 0.48,
            position: 'absolute',
            ...(openPopover && {
              opacity: 1,
            }),
          }}
        >
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>

        <div>
          <Typography sx={{ mb: 2, typography: 'subtitle2', opacity: 0.72 }}>
            SKU MARKETS BALANCE
          </Typography>

          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography sx={{ typography: 'h3' }}>
              {showCurrency ? '********' : `SAR 2300.56`}
            </Typography>

            <IconButton color="inherit" onClick={handleShowCurrency} sx={{ opacity: 0.48 }}>
              <Iconify icon={showCurrency ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
            </IconButton>
          </Stack>
        </div>

        <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={1}>
          <Image disabledEffect alt="credit-card" src={skuLogo} sx={{ height: 24 }} />

          <Typography sx={{ typography: 'subtitle1', textAlign: 'right' }}>{cardNumber}</Typography>
        </Stack>
      </StyledCard>

      <MenuPopover open={openPopover} onClose={handleClosePopover}>
        <MenuItem onClick={handleDelete} >
        <CurrencyExchangeIcon/>
          Exchange
        </MenuItem>
      </MenuPopover>
    </>
  );
}
