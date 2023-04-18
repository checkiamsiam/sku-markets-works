import { Box, Card, Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import BlankWindow from 'components/common/BlankWindow';
import LoadingOverlay from 'components/common/LoadingOverlay';
import NoRowsOverlay from 'components/common/NoRowsOverlay';
import { useEffect, useState } from 'react';
import { importDataRow } from '_mock/static/dummyImportData';
import { columns } from './tables/column';

function CustomToolbar() {
  return <></>;
}

const ImportedDataTable = () => {
  const [page, setPage] = useState(0);
  const [blank, setBlank] = useState(false);
  const [pageSize, setPageSize] = useState(25);
  const [height, setHeight] = useState(pageSize * 80 + 250);
  const rows = [];
  for (let i = 1; i <= pageSize; i++) {
    if (i === 1) {
      rows.push({ ...importDataRow, id: i });
    } else if (i === 2) {
      rows.push({
        ...importDataRow,
        id: i,
        type: 'SKU Markets',
        subType: 'Activate SKUs',
        status: 'Success',
        comment: 'Some SKUs on Creation process',
      });
    } else if (i === 3) {
      rows.push({
        ...importDataRow,
        id: i,
        type: 'Alerts',
        subType: 'Price Range',
        status: 'Failed',
        comment: 'New Creation on Process',
      });
    } else {
      rows.push({ ...importDataRow, id: i });
    }
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
              checkboxSelection={false}
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
            title="Your Import Status is empty"
            description="Import to show your import status here"
          />
        )}
      </Paper>
    </Card>
  );
};

export default ImportedDataTable;
