import { useTheme } from '@emotion/react';
import Label from 'components/label/Label';

const FulfillmentColumn = ({ row }) => {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';
  return (
    <Label variant={isLight ? 'soft' : 'filled'} color={'warning'} sx={{ mx: 'auto' }}>
      {row?.buy_box_sku_fulfillment_type === 'Fulfilled by MP'
        ? 'Express'
        : row?.buy_box_sku_fulfillment_type === 'Fulfilled by Stores'
        ? 'Stores'
        : 'Not Available'}
    </Label>
  );
};

export default FulfillmentColumn;
