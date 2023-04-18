import { Box, Card } from '@mui/material';
import ThemeDataGrid from 'components/common/ThemeDataGrid';
import { useGetAllStoresQuery } from 'features/store/storeAPI';
import { useEffect, useState } from 'react';
import columns from './columns';

const logic = 'short=store_offer_rank';

const TransactionModeTable = ({ targetedForTransaction }) => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const query = `${targetedForTransaction?._id}?page=${page + 1}&limit=${pageSize}&${logic}`;
  const { data, isFetching, isLoading } = useGetAllStoresQuery(query);
  const [height, setHeight] = useState(500);

  useEffect(() => {
    if (data?.data?.length >= 5) {
      setHeight(data?.data?.length * 51 + 250);
    }
  }, [pageSize, data?.data?.length]);

  return (
    <>
      <Card sx={{ mt: '20px' }}>
        <Box sx={{ height: height }}>
          <ThemeDataGrid
            page={page}
            setPage={setPage}
            columns={columns}
            toolbar={false}
            checkbox={false}
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

export default TransactionModeTable;
