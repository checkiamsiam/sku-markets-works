import { DataGrid, GridToolbar as Toolbar } from '@mui/x-data-grid';
import { TABLE_PAGINATION } from 'config-global';
import LoadingOverlay from './LoadingOverlay';
import NoRowsOverlay from './NoRowsOverlay';

export default function ThemeDataGrid({
  rows = [],
  columns,
  loading,
  setPage,
  page = 0,
  setPageSize,
  toolbar = true,
  checkbox = true,
  rowCount = TABLE_PAGINATION.ROW_COUNT,
  pageSize = TABLE_PAGINATION.ROWS_PER_PAGE[0],
  rowsPerPageOptions = TABLE_PAGINATION.ROWS_PER_PAGE,
  statement = false,
  statementToolbar,
  getRowId
}) {
  return (
    <>
      {statement ? (
        <DataGrid
          page={page}
          rows={rows}
          pagination
          columns={columns}
          loading={loading}
          checkboxSelection={checkbox}
          pageSize={pageSize}
          rowCount={rowCount}
          paginationMode="server"
          disableSelectionOnClick
          components={{
            Toolbar: statementToolbar,
            LoadingOverlay: LoadingOverlay,
            NoRowsOverlay: NoRowsOverlay,
          }}
          disableDensitySelector={true}
          rowsPerPageOptions={rowsPerPageOptions}
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          getRowId={getRowId}
        />
      ) : (
        <DataGrid
          sx={{
            '& .super-app-theme--header': {
              backgroundColor: '#0D6EFD',
              color: 'white',
            },
          }}
          page={page}
          rows={rows}
          pagination
          columns={columns}
          loading={loading}
          checkboxSelection={checkbox}
          pageSize={pageSize}
          rowCount={rowCount}
          paginationMode="server"
          disableSelectionOnClick
          components={{
            Toolbar: toolbar ? Toolbar : null,
            LoadingOverlay: LoadingOverlay,
            NoRowsOverlay: NoRowsOverlay,
          }}
          disableDensitySelector={true}
          rowsPerPageOptions={rowsPerPageOptions}
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          getRowId={getRowId}
        />
      )}
    </>
  );
}
