import { Box, Button, Card, Grid, Typography, useTheme } from '@mui/material';
import { NavLink } from 'react-router-dom';
import '../../../components/SkuMarket/SkuMarketStyle.css';
import './couponArea.css';
import CouponAreaSlider from './CouponAreaSlider';

const SponsoredSkus = () => {
  const theme = useTheme();
  const productDummyData = [
    {
      product: {
        all_images: [
          'https://storage.googleapis.com/sku_markets_noon/N31172715A-8590.jpg',
          'https://storage.googleapis.com/sku_markets_noon/N31172715A-9198.jpg',
        ],
        brand_en: 'EZVIZ',
        buy_box_currency: 'SAR',
        category_en: 'Electronics & Mobiles',
        estimated_SOH: 0,
        id: '63d80bef7075dddb93112a09',
        price_change: 0,
        sku: 'N31172715A',
        sku_marketplace: 'noon/egypt',
        sku_rank: 0,
        sku_rate: 0,
        sku_sub_type_en: 'Surveillance Cameras',
        sold_24_hours: 0,
        stores: [],
        tags: [],
        updatedAt: '2023-03-13T03:50:37.717Z',
        _id: '63d80bef7075dddb93112a09',
      },
      sellerIds: ['63ea1cad52e991873e20c2df', '63e47ee4fe695957a46ea794'],
    },
    {
      product: {
        all_images: [
          'https://storage.googleapis.com/sku_markets_noon/N31172715A-8590.jpg',
          'https://storage.googleapis.com/sku_markets_noon/N31172715A-9198.jpg',
        ],
        brand_en: 'EZVIZ',
        buy_box_currency: 'SAR',
        category_en: 'Electronics & Mobiles',
        estimated_SOH: 0,
        id: '63d80bef7075dddb93112a09',
        price_change: 0,
        sku: 'N31172715A',
        sku_marketplace: 'noon/egypt',
        sku_rank: 0,
        sku_rate: 0,
        sku_sub_type_en: 'Surveillance Cameras',
        sold_24_hours: 0,
        stores: [],
        tags: [],
        updatedAt: '2023-03-13T03:50:37.717Z',
        _id: '63d80bef7075dddb93112a09',
      },
      sellerIds: ['63ea1cad52e991873e20c2df', '63e47ee4fe695957a46ea794'],
    },
    {
      product: {
        all_images: [
          'https://storage.googleapis.com/sku_markets_noon/N31172715A-8590.jpg',
          'https://storage.googleapis.com/sku_markets_noon/N31172715A-9198.jpg',
        ],
        brand_en: 'EZVIZ',
        buy_box_currency: 'SAR',
        category_en: 'Electronics & Mobiles',
        estimated_SOH: 0,
        id: '63d80bef7075dddb93112a09',
        price_change: 0,
        sku: 'N31172715A',
        sku_marketplace: 'noon/egypt',
        sku_rank: 0,
        sku_rate: 0,
        sku_sub_type_en: 'Surveillance Cameras',
        sold_24_hours: 0,
        stores: [],
        tags: [],
        updatedAt: '2023-03-13T03:50:37.717Z',
        _id: '63d80bef7075dddb93112a09',
      },
      sellerIds: ['63ea1cad52e991873e20c2df', '63e47ee4fe695957a46ea794'],
    },
    {
      product: {
        all_images: [
          'https://storage.googleapis.com/sku_markets_noon/N31172715A-8590.jpg',
          'https://storage.googleapis.com/sku_markets_noon/N31172715A-9198.jpg',
        ],
        brand_en: 'EZVIZ',
        buy_box_currency: 'SAR',
        category_en: 'Electronics & Mobiles',
        estimated_SOH: 0,
        id: '63d80bef7075dddb93112a09',
        price_change: 0,
        sku: 'N31172715A',
        sku_marketplace: 'noon/egypt',
        sku_rank: 0,
        sku_rate: 0,
        sku_sub_type_en: 'Surveillance Cameras',
        sold_24_hours: 0,
        stores: [],
        tags: [],
        updatedAt: '2023-03-13T03:50:37.717Z',
        _id: '63d80bef7075dddb93112a09',
      },
      sellerIds: ['63ea1cad52e991873e20c2df', '63e47ee4fe695957a46ea794'],
    },
    {
      product: {
        all_images: [
          'https://storage.googleapis.com/sku_markets_noon/N31172715A-8590.jpg',
          'https://storage.googleapis.com/sku_markets_noon/N31172715A-9198.jpg',
        ],
        brand_en: 'EZVIZ',
        buy_box_currency: 'SAR',
        category_en: 'Electronics & Mobiles',
        estimated_SOH: 0,
        id: '63d80bef7075dddb93112a09',
        price_change: 0,
        sku: 'N31172715A',
        sku_marketplace: 'noon/egypt',
        sku_rank: 0,
        sku_rate: 0,
        sku_sub_type_en: 'Surveillance Cameras',
        sold_24_hours: 0,
        stores: [],
        tags: [],
        updatedAt: '2023-03-13T03:50:37.717Z',
        _id: '63d80bef7075dddb93112a09',
      },
      sellerIds: ['63ea1cad52e991873e20c2df', '63e47ee4fe695957a46ea794'],
    },
    {
      product: {
        all_images: [
          'https://storage.googleapis.com/sku_markets_noon/N31172715A-8590.jpg',
          'https://storage.googleapis.com/sku_markets_noon/N31172715A-9198.jpg',
        ],
        brand_en: 'EZVIZ',
        buy_box_currency: 'SAR',
        category_en: 'Electronics & Mobiles',
        estimated_SOH: 0,
        id: '63d80bef7075dddb93112a09',
        price_change: 0,
        sku: 'N31172715A',
        sku_marketplace: 'noon/egypt',
        sku_rank: 0,
        sku_rate: 0,
        sku_sub_type_en: 'Surveillance Cameras',
        sold_24_hours: 0,
        stores: [],
        tags: [],
        updatedAt: '2023-03-13T03:50:37.717Z',
        _id: '63d80bef7075dddb93112a09',
      },
      sellerIds: ['63ea1cad52e991873e20c2df', '63e47ee4fe695957a46ea794'],
    },
  ];

  return (
    <>
      <Card>
        <div
          className={
            theme.palette.mode === 'dark' ? 'coupon-container-dark' : 'coupon-container-lite'
          }
        >
          <Grid container spacing={5}>
            <Grid item xs={8.7}>
              <Typography
                component="p"
                sx={{ fontSize: '16px', fontWeight: 'bold', mr: 2, paddingLeft: '15px' }}
              >
                Coupon Valid for Those SKUs
              </Typography>
            </Grid>
            <Grid item xs={0.5}></Grid>
            <Grid
              item
              md={2.8}
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <Button
                sx={{
                  bgcolor: 'white',
                  fontSize: '14px',
                  color: (theme) =>
                    theme.palette.mode === 'light' ? 'primary.main' : 'primary.main',
                  '&:hover': {
                    bgcolor: 'primary.main',
                    color: (theme) => (theme.palette.mode === 'light' ? 'white' : 'white'),
                    border: (theme) => `1px solid ${theme.palette.primary.main}`,
                  },
                  border: (theme) => `1px solid ${theme.palette.primary.main}`,
                  position: 'relative',
                  zIndex: 50,
                }}
                component={NavLink}
                to="/"
              >
                VIEW ALL
              </Button>
            </Grid>
          </Grid>
          <Grid container spacing={5}>
            <Grid item xs={8.7}>
              <CouponAreaSlider productsData={productDummyData} />
            </Grid>
            <Grid item xs={0.5}></Grid>
            <Grid item xs={2.8} sx={{ position: 'relative' }}>
              <Box>
                <Typography
                  textAlign="center"
                  component="p"
                  sx={{ fontSize: '20px', fontWeight: 'bold', mr: 2, paddingLeft: '15px', mt: 8 }}
                >
                  Coupon Code:
                </Typography>
              </Box>
              <Typography
                textAlign="center"
                component="p"
                sx={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  position: 'absolute',
                  top: '54%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              >
                JLS0062
              </Typography>
              <Button
                sx={{
                  bgcolor: 'primary.main',
                  fontSize: '14px',
                  color: (theme) => (theme.palette.mode === 'light' ? 'white' : 'white'),
                  '&:hover': {
                    bgcolor: 'white',
                    color: (theme) =>
                      theme.palette.mode === 'light' ? 'primary.main' : 'primary.main',
                    border: (theme) => `1px solid ${theme.palette.primary.main}`,
                  },
                  border: (theme) => `1px solid ${theme.palette.primary.main}`,
                  position: 'absolute',
                  bottom: '20px',
                  left: '54%',
                  transform: 'translate(-50%, -50%)',
                }}
              >
                Copy
              </Button>
            </Grid>
          </Grid>
        </div>
      </Card>
    </>
  );
};

export default SponsoredSkus;
