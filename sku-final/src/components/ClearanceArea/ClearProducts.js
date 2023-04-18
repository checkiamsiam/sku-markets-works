import { Box, Button, Card, Typography } from '@mui/material';
import SkuCategoryProduct from 'components/SkuMarket/SkuCategoryProduct';
import { NavLink } from 'react-router-dom';
import '../../components/SkuMarket/SkuMarketStyle.css';

const ClearProducts = () => {
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
      <Card>
        <div className="clearance-container">
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mt: 6,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography
                component="p"
                sx={{ fontSize: '16px', fontWeight: 'bold', mr: 2, paddingLeft: '15px' }}
              >
                Clearance Valid for Those SKUs
              </Typography>
            </Box>

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
              }}
              component={NavLink}
              to="/"
            >
              VIEW ALL
            </Button>
          </Box>
          <SkuCategoryProduct productsData={productDummyData} />
        </div>
      </Card>
    </>
  );
};

export default ClearProducts;
