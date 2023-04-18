import { Box, Button, Card, Typography } from '@mui/material';
import SkuCategoryProduct from 'components/SkuMarket/SkuCategoryProduct';
import MPLogo from 'components/common/MPLogo';
import { NavLink } from 'react-router-dom';
import '../../components/SkuMarket/SkuMarketStyle.css';

const FrequentlyBuyedSkuForBuyAgainPage = () => {
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
  ];

  return (
    <>
      <Card sx={{ p: 2, my: 2 }}>
        <Box
          sx={{
            borderBottom: '2px solid #f9f9f9',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            pb: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <MPLogo marketplace="noon/ksa" link={false} />
            <Typography
              component="p"
              sx={{
                fontSize: { md: '16px', xs: '12px' },
                fontWeight: 'bold',
                pl: { md: '15px', xs: '8px' },
              }}
            >
              Frequently Purchased SKUs
            </Typography>
          </Box>

          <Button
            sx={{
              bgcolor: 'white',
              width: { sm: '25%', md: 'auto' },
              fontSize: { md: '14px', xs: '12px' },
              color: (theme) => (theme.palette.mode === 'light' ? 'primary.main' : 'primary.main'),
              '&:hover': {
                bgcolor: 'primary.main',
                color: (theme) => (theme.palette.mode === 'light' ? 'white' : 'white'),
                border: (theme) => `1px solid ${theme.palette.primary.main}`,
              },
              border: (theme) => `1px solid ${theme.palette.primary.main}`,
            }}
            component={NavLink}
            to="/"
          >
            VIEW ALL
          </Button>
        </Box>
        <SkuCategoryProduct productsData={productDummyData} />
      </Card>
    </>
  );
};

export default FrequentlyBuyedSkuForBuyAgainPage;
