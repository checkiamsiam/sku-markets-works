import { Box } from '@mui/material';
import ThemeDataGrid from 'components/common/ThemeDataGrid';
import { useGetPortFolioTableDataQuery } from 'features/portfolio/portfolio.api';
import usePortfolio from 'hooks/usePortfolio';
import { useEffect, useState } from 'react';
import columns from './columns';

const logic = '';
const fields =
  'id,sku,brand_en,category_en,all_images,sku_rate,sku_rank,number_of_sellers,sku_marketplace,is_live,buy_box_sku_fulfillment_type,current_price,price_change,trade_value,tags,estimated_SOH,max_investment,min_investment,EQTI,sold_24_hours,est_market_cap,demand_percentage,supply_percentage';

const StoreSkuTable = () => {
  const { selectedPortfolio } = usePortfolio();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const query = `${selectedPortfolio?.store_id}?${logic}page=${
    page + 1
  }&limit=${pageSize}&fields=${fields}`;
  const { data, isLoading, isFetching, isSuccess } = useGetPortFolioTableDataQuery(query, {
    skip: !selectedPortfolio,
  });
  const [height, setHeight] = useState(500);
  useEffect(() => {
    if (data?.data?.length >= 5) {
      setHeight(data?.data?.length * 51 + 250);
    }
  }, [pageSize, data?.data?.length]);

  return (
    <Box sx={{ height: height }}>
      <ThemeDataGrid
        checkbox={false}
        setPage={setPage}
        columns={columns}
        rows={data?.data}
        rowCount={data?.total}
        page={page}
        pageSize={pageSize}
        setPageSize={setPageSize}
        loading={isLoading || isFetching || !isSuccess}
      />
    </Box>
  );
};

export default StoreSkuTable;
