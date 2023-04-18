import { Button, Card, Grid, Typography, useTheme } from '@mui/material';
import { NavLink } from 'react-router-dom';
import '../../../components/SkuMarket/SkuMarketStyle.css';
import ClearanceAreaSlider from './ClearanceAreaSlider';

const ClearanceAreaMain = () => {
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
      <Card sx={{ p: 2, my: 2 }}>
        <div>
          <Grid container spacing={5}>
            <Grid item md={8.7}>
              <Typography
                component="p"
                sx={{ fontSize: '16px', fontWeight: 'bold', mr: 2, paddingLeft: '15px' }}
              >
                Clearance Valid for Those SKUs
              </Typography>
            </Grid>
            <Grid item md={0.5}></Grid>
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
            <Grid item md={8.7}>
              <ClearanceAreaSlider productsData={productDummyData} />
            </Grid>
            <Grid item md={0.5}></Grid>
            <Grid item md={2.8} sx={{ position: 'relative' }}></Grid>
          </Grid>
        </div>
      </Card>
    </>
  );
};

export default ClearanceAreaMain;
