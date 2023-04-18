import { Box, Button, Card, Grid, Typography } from '@mui/material';
import LoadingScreen from 'components/loading-screen/LoadingScreen';
import { Link, NavLink } from 'react-router-dom';

const CategoryBanner = ({ data, rows, next, md, isLoading, isFetching }) => {
  if (isLoading || isFetching) {
    return <LoadingScreen />;
  }

  return data?.slice(0, rows)?.map((category) => {
    return (
      <>
        <Card sx={{ p: 2 , mt: 2 }}>
          <Box
            sx={{
              borderBottom: '2px solid #f9f9f9',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              pb: 2,
            }}
          >
            {' '}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={`/assets/images/marketplace/${category.sku_marketplace
                  .split('/')
                  ?.join('-')
                  ?.toLowerCase()}.jpeg`}
                width="50px"
                alt=""
              />
              <Typography
                component="p"
                sx={{ fontSize: {md:'16px', xs:'12px'}, fontWeight: 'bold', paddingLeft: {md:'15px',xs:'8px'} }}
              >
                {category.category_en}
              </Typography>
            </Box>
            <Button
              sx={{
                bgcolor: 'white',
                fontSize: {md:'14px',xs:'12px'},
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
              to={`/skuMarket_category?name=${encodeURIComponent(
                category?.category_en
              )}&marketplace=${encodeURIComponent(category?.sku_marketplace)}`}
            >
              VIEW ALL
            </Button>
          </Box>

          <Box sx={{ flexGrow: 1, mt: 5 }}>
            <Grid container spacing={2}>
              {category.products?.slice(0, next)?.map(({ product, sellerIds }, i) => (
                <Grid key={i} xs={6} md={md} sx={{ pl: 2, height: '250px', width: '185px' }}>
                  <Card
                    sx={{
                      p: 1,
                      my: 1,
                      textAlign: 'center',
                      boxShadow: (theme) =>
                        theme.palette.mode === 'dark' ? '0px 3px 14px -2px #000000' : 0.5,
                    }}
                  >
                    <Box
                      component={NavLink}
                      to={`/skuMarket_category?name=${encodeURIComponent(
                        category?.category_en
                      )}&marketplace=${encodeURIComponent(category?.sku_marketplace)}`}
                      sx={{
                        textDecoration: 'none',
                        display: 'flex',
                        'flex-direction': 'column',
                        'align-items': 'center',
                      }}
                    >
                      <img
                        src={product?.all_images[0]}
                        alt=""
                        style={{ borderRadius: '20px', height: '140px', width: '100%' }}
                      />
                      <Typography
                        component={NavLink}
                        to={`/skuMarket?${
                          product?.sku_type_en ? 'type' : 'sub_type'
                        }=${encodeURIComponent(
                          product?.sku_type_en ?? product?.sku_sub_type_en
                        )}&marketplace=${encodeURIComponent(category?.sku_marketplace)}`}
                        sx={{
                          fontSize: '12px',
                          textDecoration: 'none',
                          width: '150px',
                          height: '20px',
                          display: 'block',
                          overflow: 'hidden',
                          'white-space': 'nowrap',
                          'text-overflow': 'ellipsis',
                          color: (theme) =>
                            theme.palette.mode === 'light' ? 'black' : 'common.white',
                        }}
                      >
                        {product?.sku_type_en ?? product?.sku_sub_type_en}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        mt: 2,
                      }}
                    >
                      <Link
                        to={`/skuMarket?marketplace=${encodeURIComponent(
                          product?.sku_marketplace
                        )}`}
                      >
                        <img
                          src={`/assets/images/marketplace/${product?.sku_marketplace
                            .split('/')
                            ?.join('-')
                            ?.toLowerCase()}.jpeg`}
                          alt={category?.sku_marketplace.replace('/', '-')}
                          style={{
                            height: `20px`,
                            width: `50px`,
                            display: 'inline-block',
                          }}
                        />
                      </Link>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Card>
      </>
    );
  });
};

export default CategoryBanner;
