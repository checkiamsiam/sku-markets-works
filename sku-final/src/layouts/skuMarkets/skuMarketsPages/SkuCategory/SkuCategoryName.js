import { Box, Button, Card, Typography } from '@mui/material';
import LoadingScreen from 'components/loading-screen/LoadingScreen';
import SkuCategoryProduct from 'components/SkuMarket/SkuCategoryProduct';
import { NavLink } from 'react-router-dom';

const SkuCategoryName = ({ object, isLoading, isFetching, limit }) => {
  if (isLoading || isFetching) {
    return <LoadingScreen />;
  }

  return (
    <>
      {object?.slice(0, limit)?.map((type) => {
        return (
          <Card sx={{ p: 2, my: 4 }}>
            <Box
              sx={{
                borderBottom: '2px solid #f9f9f9',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                pb: 2,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <img
                  src={`/assets/images/marketplace/${type?.sku_marketplace
                    .split('/')
                    ?.join('-')
                    ?.toLowerCase()}.jpeg`}
                  width="50px"
                  alt=""
                />
                <Typography
                  component="p"
                  sx={{ fontSize: '16px', fontWeight: 'bold', mr: 2, paddingLeft: '15px' }}
                >
                  {type?.sku_type_en ?? type?.sku_sub_type_en}
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
                to={`/skuMarket?category=${encodeURIComponent(
                  type?.category
                )}&marketplace=${encodeURIComponent(type?.sku_marketplace)}&${
                  type?.sku_type_en ? 'type' : 'sub_type'
                }=${encodeURIComponent(type?.sku_type_en ?? type?.sku_sub_type_en)}`}
              >
                VIEW ALL
              </Button>
            </Box>
            <SkuCategoryProduct productsData={type?.products} />
          </Card>
        );
      })}
      <Card sx={{ p: 2, my: 4 }}>
        <Box
          sx={{
            borderBottom: '2px solid #f9f9f9',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            pb: 2,
          }}
        >
          <Button
            sx={{
              bgcolor: 'white',
              fontSize: '14px',
              color: (theme) => (theme.palette.mode === 'light' ? 'primary.main' : 'primary.main'),
              '&:hover': {
                bgcolor: 'primary.main',
                color: (theme) => (theme.palette.mode === 'light' ? 'white' : 'white'),
                border: (theme) => `1px solid ${theme.palette.primary.main}`,
              },
              border: (theme) => `1px solid ${theme.palette.primary.main}`,
            }}
            component={NavLink}
            to={`/skuMarket?category=${encodeURIComponent(
              object && object[0]?.category
            )}&marketplace=${encodeURIComponent(object && object[0]?.sku_marketplace)}`}
          >
            SHOW ALL
          </Button>
        </Box>
      </Card>
    </>
  );
};

export default SkuCategoryName;
