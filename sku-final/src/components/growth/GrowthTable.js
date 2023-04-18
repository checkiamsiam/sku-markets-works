import { Box, Card, CardHeader, Typography } from '@mui/material';
import GrowthDataGrid from './GrowthDataGrid';


const GrowthTable = () => {
 /*  const { brand } = useParams();
  const query = `limit=5&brand_en=${brand}&page=1&sort=-sku_rate&fields=sku,brand_en,category_en,all_images,sku_rate,sku_rank,number_of_sellers,sku_marketplace,is_live,buy_box_sku_fulfillment_type,current_price,price_change,trade_value,tags,estimated_SOH,maxIn_investment,minIn_investment,ucr,sold_24_hours,est_market_cap,dsohand_percentage,supply_percentage`;

  const { data } = useGetAllProductsQuery(query); */

  //   console.log(data);

  return (
    <>
      <Card sx={{ mt: 3 }} >
        <CardHeader title="Sales Growth" sx={{ mb: 1.5 }} />
        <Box sx={{ height: 500 }}>
          <GrowthDataGrid data={[]} />
        </Box>
      </Card>

      <Typography variant="caption">
        Designed for users to instantly see the market situations on the marketplaces and predicts
        what will come next.
      </Typography>
    </>
  );
};

export default GrowthTable;
