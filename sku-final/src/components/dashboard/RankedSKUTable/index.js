import { Box, Card, CardHeader } from '@mui/material';
import ThemeDataGrid from 'components/common/ThemeDataGrid';
import { useGetAllProductsQuery } from 'features/product/productAPI';
import { useState } from 'react';
import columns from '../RecentlyRankTable/columns';

// get previous 2days data
const date = new Date();
date.setDate(date.getDate() - 3);
const logic = `sort=-sku_rank`;

const fields =
  'sku,brand_en,volume_to_market_cap_ratio,average_selling_price,category_en,all_images,sku_rate,sku_rank,number_of_sellers,sku_marketplace,is_live,buy_box_sku_fulfillment_type,current_price,price_change,trade_value,tags,estimated_SOH,max_investment,min_investment,EQTI,sold_24_hours,est_market_cap,demand_percentage,supply_percentage,getTopBottomPrice,opp_ff,days_on_hand,est_net_revenue,estimated_margin';

const RankedSKUTable = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const query = `${logic}&page=${page + 1}&limit=${pageSize}&fields=${fields}`;
  const { data, isLoading, isFetching } = useGetAllProductsQuery(query);

  return (
    <>
      <Card>
        <CardHeader title="Top Ranked & Trending SKUs" sx={{ mb: 2 }} />
        <Box sx={{ height: 500 }}>
          <ThemeDataGrid
            page={page}
            setPage={setPage}
            columns={columns}
            pageSize={pageSize}
            rows={data?.data || []}
            setPageSize={setPageSize}
            rowCount={data?.total || 0}
            loading={isLoading || isFetching}
          />
        </Box>
      </Card>
    </>
  );
};

export default RankedSKUTable;
