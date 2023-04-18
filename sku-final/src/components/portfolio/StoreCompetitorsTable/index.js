import { Box } from '@mui/material';
import ThemeDataGrid from 'components/common/ThemeDataGrid';
import { useStoreCompetitorsQuery } from 'features/userSku/userSkuAPI';
import { useEffect, useState } from 'react';
import columns from './columns';

const StoreSkuTable = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const query = `page=${page + 1}&limit=${pageSize}`;
  const { data, isLoading, isFetching } = useStoreCompetitorsQuery(query);
  const [height, setHeight] = useState(500);
  useEffect(() => {
    if (data?.data?.length >= 5) {
      setHeight(data?.data?.length * 51 + 250);
    }
  }, [pageSize, data?.data?.length]);

  return (
      <Box  sx={{ height: height }}>
        <ThemeDataGrid
          checkbox={false}
          setPage={setPage}
          columns={columns}
          rows={data?.data}
          rowCount={data?.total}
          page={page}
          pageSize={pageSize}
          setPageSize={setPageSize}
          loading={isLoading || isFetching}
        />
      </Box>
  );
};

export default StoreSkuTable;
