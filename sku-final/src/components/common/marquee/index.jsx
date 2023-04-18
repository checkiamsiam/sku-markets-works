import { useTheme } from '@emotion/react';
import { Container, Link, Stack, Typography } from '@mui/material';
import LoadingScreen from 'components/loading-screen/LoadingScreen';
import { lightGray } from 'components/sellerboard/rfq/new/SellTable';
import { useGetAllProductsQuery } from 'features/product/productAPI';
import Marquee from 'react-fast-marquee';
import { NavLink } from 'react-router-dom';
import MPLogo from '../MPLogo';

const SKUMarquee = () => {
  const query = `fields=sku_marketplace,sku,current_price,price_change&sort=-sku_rank&limit=10`;
  const { data, isLoading } = useGetAllProductsQuery(query);

  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Container
      sx={{
        border: (theme) => `1px solid ${theme.palette.divider}`,
        borderRight: 0,
        borderLeft: 0,
        py: 1,
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
        {data &&
          data?.data.map((item) => (
            <Stack
              sx={{
                borderRight: (theme) => `1px solid ${theme.palette.divider}`,
                px: 2,
              }}
              spacing={2}
              direction="row"
              key={item._id}
            >
              <MPLogo width={35} hight={15} marketplace={item.sku_marketplace} />
              <Link fontSize={12} component={NavLink} to={`/product/${item._id}`}>
                {item.sku}
              </Link>
              <Typography fontSize={12}>SAR {item.current_price} </Typography>
              <Typography
                fontSize={12}
                color={
                  item.price_change >= 0 ? (item.price_change === 0 ? lightGray : 'green') : 'error'
                }
              >
                {item.price_change} %
              </Typography>
            </Stack>
          ))}
      </Marquee>
    </Container>
  );
};

export default SKUMarquee;
