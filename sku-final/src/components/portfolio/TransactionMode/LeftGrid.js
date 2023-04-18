import { Box, Stack, Typography } from '@mui/material';
import MPLogo from 'components/common/MPLogo';
import Label from 'components/label/Label';

const LeftGrid = ({img , product}) => {
  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <img src={img} width="120px" height="120px" alt="" />
      <Stack alignItems="center" spacing={1} justifyContent="center">
        <MPLogo marketplace={product?.sku_marketplace} />
        <Box
          component="a"
          href={`/product/${product?._id}`}
          rel="noreferrer"
          sx={{ textDecoration: 'none', color: '#0d6efd', fontSize: '12px' }}
        >
          {product?.sku}
        </Box>
        <Typography variant="caption">
          <span style={{ fontWeight: 700, marginRight: '5px' }}>Fulfillment Type: </span>{' '}
          {product?.buy_box_sku_fulfillment_type}
        </Typography>
        <Typography variant="caption">
          <span style={{ fontWeight: 700, marginRight: '5px' }}>Tag: </span>{' '}
          <span style={{ color: 'text.main' }}>
            {product?.tags.length > 0 ? (
              <Label sx={{ borderRadius: 2 }} variant={'filled'} color="default">
                {product?.tags[0]}
              </Label>
            ) : (
              <Label sx={{ borderRadius: 2 }} variant={'filled'} color="default">
                Normal
              </Label>
            )}
          </span>
        </Typography>
      </Stack>
    </Stack>
  );
};

export default LeftGrid;
