import { useTheme } from '@emotion/react';
import { Container, Link, Stack, Typography } from '@mui/material';
import { lightGray } from 'components/sellerboard/rfq/new/SellTable';
import { useGetAllSellerProductsQuery } from 'features/product/productAPI';
import Marquee from 'react-fast-marquee';
import { NavLink } from 'react-router-dom';

const ActiveSKUProductsMarquee = () => {

  const queryTemp =
    'fields=sku_marketplace,buy_box_currency,sku,current_price,price_change&sort=-sku_rank&limit=100&page=1';
  const { data: productsData } = useGetAllSellerProductsQuery(queryTemp);

  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  return (
    <Container
      sx={{
        border: (theme) => `1px solid ${theme.palette.divider}`,
        borderRight: 0,
        borderLeft: 0,
        py: 1,
        marginTop: '10px',
      }}
      maxWidth="xl"
    >
      <Marquee
        pauseOnHover={true}
        pauseOnClick={true}
        gradientColor={isDarkMode ? [22, 28, 36] : [255, 255, 255]}
        loop={0}
        speed={50}
      >
        {productsData &&
          productsData?.data.map(({ product, sellerIds }) => (
            <Stack
              sx={{
                borderRight: (theme) => `1px solid ${theme.palette.divider}`,
                px: 2,
              }}
              spacing={2}
              direction="row"
              key={product?._id}
            >
              <a
                href={`/skuMarket?marketplace=${encodeURIComponent(product?.sku_marketplace)}`}
              >
                <img
                  src={`/assets/images/marketplace/${product?.sku_marketplace
                    .split('/')
                    ?.join('-')
                    ?.toLowerCase()}.jpeg`}
                  alt={product?.sku_marketplace.replace('/', '-')}
                  style={{
                    height: `15px`,
                    width: `35px`,
                    display: 'inline-block',
                  }}
                />
              </a>
              <Link fontSize={12} component={NavLink} to={`/skuMarket/${product?.id}/${sellerIds[0]}`}>
                {product?.sku}
              </Link>
              <Typography fontSize={12}>{product?.buy_box_currency} {product?.current_price} </Typography>
              <Typography
                fontSize={12}
                color={
                  product?.price_change >= 0 ? (product?.price_change === 0 ? lightGray : 'green') : 'error'
                }
              >
                {product?.price_change} %
              </Typography>
            </Stack>
          ))}
      </Marquee>
    </Container>
  );
};

export default ActiveSKUProductsMarquee;
