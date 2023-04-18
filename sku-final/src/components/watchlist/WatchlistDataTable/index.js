import { Box } from '@mui/material';
import Paper from '@mui/material/Paper';
import BlankWindow from 'components/common/BlankWindow';
import ThemeDataGrid from 'components/common/ThemeDataGrid';
import { useGetWatchListDetailQuery } from 'features/watchList/watchListAPI';
import { useEffect, useState } from 'react';
import columns from './columns';

const logic = '';
const fields =
  'watchList_id,is_live,getTopBottomPrice,opp_stock,opp_other_platform,buy_box_sku_fulfillment_type,sku_rate,sku_rank,sku_marketplace,sku,current_price,all_images,brand_en,category_en,price_change,sold_24_hours,estimated_SOH,number_of_sellers';

const Index = ({ view, setSkuOnView }) => {
  const { _id } = view || {};
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(25);
  const query = `${_id}?${logic}&page=${page + 1}&limit=${pageSize}&fields=${fields}`;
  const { data, isLoading, isFetching } = useGetWatchListDetailQuery(query, { skip: !view });
  const [height, setHeight] = useState(500);
  useEffect(() => {
    if (data?.data?.length >= 5) {
      setHeight(data?.data?.length * 51 + 250);
    }
  }, [pageSize, data?.data?.length]);
  useEffect(() => {
    if (data?.data?.length > 0) {
      setSkuOnView(true);
    } else {
      setSkuOnView(false);
    }
  }, [data?.data?.length, setSkuOnView]);

  return (
    <>
      {data?.data.length > 0 ? (
        <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: 0, mb: 2 }}>
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
              rowsPerPageOptions={[25, 50, 100]}
              loading={isLoading || isFetching}
            />
          </Box>
        </Paper>
      ) : (
        <Box>
          <BlankWindow
            title="You don't have SKUs in This Watchlist."
            description="You can add a SKU in the watchlist."
          />
        </Box>
      )}
    </>
  );
};

export default Index;
