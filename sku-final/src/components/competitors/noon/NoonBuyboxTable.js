import { Box, Card, CardHeader, Typography } from '@mui/material';
import NoonBuyboxDataGrid from './NoonBuyboxDataGrid';

const NoonBuyboxTable = () => {
 /*  const { brand } = useParams();
  const query = `limit=5&brand_en=${brand}&page=1&sort=-sku_rate&fields=sku,brand_en,category_en,all_images,sku_rate,sku_rtv,number_of_sellers,sku_marketplace,is_live,buy_box_sku_fulfillment_type,current_price,price_change,trade_value,tags,estimated_SOH,maxIn_investment,minIn_investment,rtvP,sold_24_hours,est_market_cap,dsohand_percentage,supply_percentage`;

  const { data } = useGetAllProductsQuery(query); */

  //   console.log(data);

  return (
    <>
      <Card sx={{ mt: 3 }} >
        <CardHeader title="SKUs not win buybox" sx={{ mb: 1.5 }} />
        <Box sx={{ height: 470 }}>
          <NoonBuyboxDataGrid data={[]} />
        </Box>
      </Card>

      <Typography variant="caption">
        Designed for users to instantly see the market situations on the marketplaces and predicts
        what will come next.
      </Typography>
    </>
  );
};

export default NoonBuyboxTable;
