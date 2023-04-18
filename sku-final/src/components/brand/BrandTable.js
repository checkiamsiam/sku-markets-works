import { Box, Card, CardHeader } from '@mui/material';
import BrandDataGrid from 'components/brand/BrandDataGrid';
import { useGetAllProductsQuery } from 'features/product/productAPI';
import { useState } from 'react';
import { useParams } from 'react-router';

const BrandTable = () => {
  const { brand } = useParams();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const query = `limit=${pageSize}&brand_en=${brand}&page=${
    page + 1
  }&sort=-sku_rate&fields=sku,brand_en,volume_to_market_cap_ratio,average_selling_price,category_en,all_images,sku_rate,sku_rank,number_of_sellers,sku_marketplace,is_live,buy_box_sku_fulfillment_type,current_price,price_change,trade_value,tags,estimated_SOH,max_investment,min_investment,EQTI,sold_24_hours,est_market_cap,demand_percentage,supply_percentage`;

  const { data, isFetching } = useGetAllProductsQuery(query);

  return (
    <>
      <Card sx={{ mt: 2 }}>
        <CardHeader title="Top Ranked & Trending SKUs" sx={{ mb: 2 }} />
        <Box sx={{ height: 500 }}>
          {data && (
            <BrandDataGrid
              data={data}
              page={page}
              isLoading={isFetching}
              setPage={setPage}
              pageSize={pageSize}
              setPageSize={setPageSize}
            />
          )}
        </Box>
      </Card>
    </>
  );
};

export default BrandTable;
