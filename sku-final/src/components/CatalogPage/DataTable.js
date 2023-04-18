import { Box, Card, Divider, Link, Paper, Stack } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import BlankWindow from 'components/common/BlankWindow';
import LoadingOverlay from 'components/common/LoadingOverlay';
import NoRowsOverlay from 'components/common/NoRowsOverlay';
import { useEffect, useState } from 'react';
import { dummyProduct as row } from '_mock/static/dummyProduct';
import { columns } from './tables/column';

function CustomToolbar() {
  return (
    <>
      <Stack direction="row" justifyContent="end" alignItems="center" sx={{ p: 1 }}>
        <Link href="#" underline="none" sx={{ fontSize: '14px', fontWeight: 700 }}>
          DOWNLOAD SELECTED
        </Link>
      </Stack>
      <Divider />
    </>
  );
}

const CatalogDataTable = () => {
  const [page, setPage] = useState(0);
  const [blank, setBlank] = useState(false);
  const [pageSize, setPageSize] = useState(25);
  const [height, setHeight] = useState(pageSize * 80 + 250);
  const rows = [];
  for (let i = 1; i <= pageSize; i++) {
    rows.push({ ...row, id: i });
  }
  useEffect(() => {
    setHeight(pageSize * 80 + 250);
  }, [pageSize]);
  return (
    <Card sx={{ p: 2, mt: 2 }}>
      <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: 0, mb: 2 }}>
        {!blank ? (
          <Box sx={{ height: height }}>
            <DataGrid
              page={page}
              rows={rows}
              pagination
              columns={columns}
              rowHeight={80}
              // loading={loading}
              checkboxSelection={true}
              pageSize={pageSize}
              rowCount={50}
              paginationMode="server"
              disableSelectionOnClick
              components={{
                Toolbar: CustomToolbar,
                LoadingOverlay: LoadingOverlay,
                NoRowsOverlay: NoRowsOverlay,
              }}
              disableDensitySelector={true}
              rowsPerPageOptions={[25, 50, 100]}
              onPageChange={(newPage) => setPage(newPage)}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            />
          </Box>
        ) : (
          <BlankWindow
            title="Search any marketplaces, categories, brands and SKUs"
            description="To Get the content"
          />
        )}
      </Paper>
    </Card>
  );
};

export default CatalogDataTable;
