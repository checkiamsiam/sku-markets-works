import { Box } from '@mui/material';
import ThemeDataGrid from 'components/common/ThemeDataGrid';
import { useGetUserSkusQuery } from 'features/userSku/userSkuAPI';
import { useEffect, useState } from 'react';
import columns from './columns';

const logic = 'sort=price_change&price_change[lt]=0';
const fields = 'sku_marketplace,sku,current_price,all_images,brand_en,category_en,price_change';

const NewLowTable = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const query = `${logic}&page=${page + 1}&limit=${pageSize}&fields=${fields}`;
  const { data, isLoading, isFetching } = useGetUserSkusQuery(query);

  const [height, setHeight] = useState(500);
  useEffect(() => {
    if (data?.data?.length >= 5) {
      setHeight(data?.data?.length * 51 + 250);
    }
  }, [pageSize, data?.data?.length]);

  return (
    <>
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
          loading={isLoading || isFetching}
        />
      </Box>
    </>
  );
};

export default NewLowTable;
