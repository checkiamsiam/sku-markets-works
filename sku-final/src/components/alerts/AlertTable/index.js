import { Card } from '@mui/material';
import Paper from '@mui/material/Paper';
import ThemeDataGrid from 'components/common/ThemeDataGrid';
import { useGetAlertsQuery } from 'features/alert/alertAPI';
import { useEffect, useState } from 'react';
import columns from './columns';

const logic = 'is_live=true&buy_box_sku_fulfillment_type=Fulfilled by Stores';
const fields =
  'sku_marketplace,sku,current_price,price_change,all_images,brand_en,category_en,estimated_SOH';

const AlertTable = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(25);
  const query = `${logic}&page=${page + 1}&limit=${pageSize}&fields=${fields}`;
  const { data, isLoading, isFetching } = useGetAlertsQuery(query);
  const [height, setHeight] = useState(500);
  useEffect(() => {
    if (data?.data?.length >= 5) {
      setHeight(data?.data?.length * 51 + 250);
    }
  }, [pageSize, data?.data?.length]);

  return (
    <>
      <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: 0, mb: 2 }}>
        <Card sx={{ height: height }}>
          <ThemeDataGrid
            checkbox={false}
            page={page}
            setPage={setPage}
            columns={columns}
            pageSize={pageSize}
            rows={data?.data || []}
            setPageSize={setPageSize}
            rowCount={data?.total || 0}
            loading={isLoading || isFetching}
            rowsPerPageOptions={[25, 50, 100]}
          />
        </Card>
      </Paper>
    </>
  );
};

export default AlertTable;
