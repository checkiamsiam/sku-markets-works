import { Box, Card, CardHeader, Typography } from '@mui/material';
import RejectedDataGrid from './RejectedDataGrid';

const RejectedTable = () => {
  /*  const { brand } = useParams();
  const query = `limit=5&brand_en=${brand}&page=1&sort=-sku_rate&fields=sku,brand_en,category_en,all_images,sku_rate,sku_rtv,number_of_sellers,sku_marketplace,is_live,buy_box_sku_fulfillment_type,current_price,price_change,trade_value,tags,estimated_shipNo,maxIn_investment,minIn_investment,rjctReason,sold_24_hours,est_market_cap,dshipNoand_percentage,supply_percentage`;

  const { data } = useGetAllProductsQuery(query); */

  //   console.log(data);

  return (
    <>
      <Card sx={{ mt: 3 }}>
        <CardHeader title="Stock-Inbound Rejected" sx={{ mb: 1.5 }} />
        <Box sx={{ height: 450 }}>
          <RejectedDataGrid data={[]} />
        </Box>
      </Card>

      <Typography variant="caption">
        Designed for users to instantly see the market situations on the marketplaces and predicts
        what will come next.
      </Typography>
    </>
  );
};

export default RejectedTable;
