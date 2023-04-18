import { Stack } from '@mui/material';

const RightGrid = ({ product }) => {
  return (
    <Stack direction="column" spacing={1.5} fontSize="12px">
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <span style={{ width: '60%', fontWeight: 'bold', color: 'text.main', marginLeft: '70px' }}>
          Estimated SOH:{' '}
        </span>
        <span style={{ width: '40%', color: 'text.main', textAlign: 'right' }}>
          {Math.ceil(product?.estimated_SOH || 0)}
        </span>
      </Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <span style={{ width: '60%', fontWeight: 'bold', color: 'text.main', marginLeft: '70px' }}>
          Sales volume L 24 H:{' '}
        </span>
        <span style={{ width: '40%', color: 'text.main', textAlign: 'right' }}>
          {Math.ceil(product?.sold_24_hours || 0)}
        </span>
      </Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <span style={{ width: '60%', fontWeight: 'bold', color: 'text.main', marginLeft: '70px' }}>
          Rank:{' '}
        </span>
        <span style={{ width: '40%', color: 'text.main', textAlign: 'right' }}>
          {product?.sku_rank}
        </span>
      </Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <span style={{ width: '60%', fontWeight: 'bold', color: 'text.main', marginLeft: '70px' }}>
          Rate:{' '}
        </span>
        <span style={{ width: '40%', color: 'text.main', textAlign: 'right' }}>
          {product?.sku_rate}
        </span>
      </Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <span style={{ width: '60%', fontWeight: 'bold', color: 'text.main', marginLeft: '70px' }}>
          No. Of Sellers:{' '}
        </span>
        <span style={{ width: '40%', color: 'text.main', textAlign: 'right' }}>
          {product?.number_of_sellers}
        </span>
      </Stack>
    </Stack>
  );
};

export default RightGrid;
