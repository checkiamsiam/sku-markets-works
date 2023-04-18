import { Box, Card, IconButton, Typography } from '@mui/material';
import Label from 'components/label/Label';
import { lightGray } from 'components/sellerboard/rfq/new/SellTable';
import { useGetProductDetailQuery } from 'features/product/productAPI';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { Link, NavLink } from 'react-router-dom';
import productImg from '../../../../../assets/images/product.jpg';

const SellerProductCard = ({
  product,
  watchListMenuOpen,
  handleStarClick,
  seller,
  productsWatchlist,
}) => {
  const { data } = useGetProductDetailQuery(product?.productId);

  return (
    <Card
      sx={{
        p: 1,
        my: 1,
        position: 'relative',
        boxShadow: (theme) => (theme.palette.mode === 'dark' ? '0px 3px 14px -2px #000000' : 0.5),
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          justifyContent: 'space-between',
          top: ' 10px',
          left: '15px',
        }}
      >
        <Label sx={{ borderRadius: 2 }} variant={'filled'} color="default">
          Normal
        </Label>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          justifyContent: 'space-between',
          right: '20px',
          top: '10px',
        }}
      >
        <IconButton
          sx={{
            justifyContent: 'end',
            background: ' transparent',
            color: '#0d6efd',
            fontSize: '18px',
          }}
          className="btnHoverEffct"
          id="star-button"
          onClick={(e) => {
            handleStarClick(e, data?._id);
          }}
        >
          {productsWatchlist?.data?.find((prod) => prod.product.includes(data?._id)) ? (
            <AiFillStar style={{ color: '#0d6efd' }} />
          ) : (
            <AiOutlineStar style={{ color: '#0d6efd' }} />
          )}
        </IconButton>
      </Box>
      <Box
        component={NavLink}
        to={`/skuMarket/${data?._id}/${seller}`}
        sx={{ textDecoration: 'none' }}
      >
        <img
          src={data?.all_images[0] ? data?.all_images[0] : productImg}
          alt=""
          style={{ borderRadius: '20px', height: '200px' }}
        />
        <Typography
          component={NavLink}
          to={`/skuMarket/${data?._id}/${seller}`}
          sx={{
            fontSize: '12px',
            mt: '8px',
            textDecoration: 'none',
            color: (theme) => (theme.palette.mode === 'light' ? 'black' : 'common.white'),
          }}
        >
          {data?.sku}
        </Typography>
        <br />
        <Typography
          component={NavLink}
          to={`/skuMarket?brand=${encodeURIComponent(data?.brand_en)}`}
          sx={{
            fontSize: '12px',
            textDecoration: 'none',
            color: (theme) => (theme.palette.mode === 'light' ? 'black' : 'common.white'),
          }}
        >
          {data?.brand_en}
        </Typography>

        <Typography
          sx={{
            fontSize: '13px',
            fontWeight: 'bold',
            color: (theme) => (theme.palette.mode === 'light' ? 'black' : 'common.white'),
          }}
          component="p"
        >
          {`${data?.buy_box_currency} ${data?.current_price ? data?.current_price : 0}`}
        </Typography>
        <Typography sx={{ fontSize: '12px', color: 'red' }} component="p">
          <span
            style={{
              color:
                data?.price_change >= 0 ? (data?.price_change === 0 ? lightGray : 'green') : 'red',
            }}
          >
            {data?.price_change} %
          </span>
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mt: 2,
        }}
      >
        {/* <img height={30} width={50} src={SkuImge} alt="" /> */}
        <Link to={`/skuMarket?marketplace=${encodeURIComponent(data?.sku_marketplace)}`}>
          <img
            src={`/assets/images/marketplace/${data?.sku_marketplace
              .split('/')
              ?.join('-')
              ?.toLowerCase()}.jpeg`}
            alt={data?.sku_marketplace.replace('/', '-')}
            style={{
              height: `20px`,
              width: `50px`,
              display: 'inline-block',
            }}
          />
        </Link>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '2px',
            }}
          >
            <Typography
              sx={{
                backgroundColor: '#37ae02',
                fontSize: '10px',
                color: 'white',
                fontWeight: '400',
                padding: '1px 7px 1px 7px',
                borderRadius: '10px',
                textAlign: 'center',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mx: '5px',
              }}
              variant="p"
            >
              {data?.sku_rate} <AiFillStar />
            </Typography>
            <Typography sx={{ color: 'text.main', fontSize: '12px', mx: '5px' }} variant="p">
              ({data?.sku_rank})
            </Typography>
          </div>
        </div>
      </Box>
    </Card>
  );
};

export default SellerProductCard;
