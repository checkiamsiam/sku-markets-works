import { Card } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  {
    field: 'item',
    headerName: 'Balance Sheet',
    width: 130,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    align: 'center',
    headerAlign: 'center',
    cellClassName: 'smaller-font',
  },
  {
    field: '2021',
    headerName: '2021',
    width: 90,
    align: 'center',
    headerAlign: 'center',
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    cellClassName: 'smaller-font',
  },
  {
    field: '2022',
    headerName: '2022',
    width: 90,
    sortable: false,
    align: 'center',
    headerAlign: 'center',
    filterable: false,
    disableColumnMenu: true,
    cellClassName: 'smaller-font',
  },
  {
    field: 'percentage',
    headerName: 'Growth %',
    width: 100,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    align: 'center',
    headerAlign: 'center',
    cellClassName: 'smaller-font',
  },
];
const columnsTwo = [
  {
    field: 'item',
    headerName: 'Revenue',
    width: 150,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    align: 'center',
    headerAlign: 'center',
    cellClassName: 'smaller-font',
  },
  {
    field: '2021',
    headerName: '2021',
    width: 90,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    align: 'center',
    headerAlign: 'center',
    cellClassName: 'smaller-font',
  },
  {
    field: '2022',
    headerName: '2022',
    width: 90,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    align: 'center',
    cellClassName: 'smaller-font',
    headerAlign: 'center',
  },
  {
    field: 'percentage',
    headerName: 'Growth %',
    align: 'center',
    headerAlign: 'center',
    width: 90,
    cellClassName: 'smaller-font',
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
  },
];

const rows = [
  { id: 1, item: 'Receivable', 2021: 'SAR 100,000', 2022: 'SAR 100,000', percentage: '20%' },
  { id: 2, item: 'Payables', 2021: 'SAR 100,000', 2022: 'SAR 100,000', percentage: '20%' },
  { id: 3, item: 'Net assets', 2021: 'SAR 100,000', 2022: 'SAR 100,000', percentage: '20%' },
];
const rowsTow = [
  {
    id: 1,
    item: 'Gross Merchandise Volume',
    2021: 'SAR 100,000',
    2022: 'SAR 100,000',
    percentage: '20%',
  },
  { id: 2, item: 'Referral Fees', 2021: 'SAR 100,000', 2022: 'SAR 100,000', percentage: '20%' },
  { id: 3, item: 'Gross Revenue', 2021: 'SAR 100,000', 2022: 'SAR 100,000', percentage: '20%' },
  { id: 4, item: 'Payables', 2021: 'SAR 100,000', 2022: 'SAR 100,000', percentage: '20%' },
  { id: 5, item: 'Net Revenue', 2021: 'SAR 100,000', 2022: 'SAR 100,000', percentage: '20%' },
];

const styles = {
  smallerFont: {
    fontSize: '14px',
  },
};

export function BalanceSheetTable() {
  return (
    <Card sx={{ width: '100%', p: 2 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        checkboxSelection={false}
        hideFooterPagination={true}
        hideFooter={true}
        autoHeight={true}
        rowHeight={35}
        headerClassName={styles.smallerFont}
        sx={{
          '& .MuiDataGrid-cell': {
            fontSize: '10px',
          },
          '& .css-191bxd1-MuiDataGrid-columnHeaderTitle': {
            fontSize: '12px',
          },
        }}
      />
    </Card>
  );
}
export function ProbablityTable() {
  return (
    <Card sx={{ width: '100%', p: 2 }}>
      <DataGrid
        rows={rowsTow}
        columns={columnsTwo}
        pageSize={5}
        checkboxSelection={false}
        hideFooterPagination={true}
        hideFooter={true}
        autoHeight={true}
        rowHeight={35}
        headerClassName={styles.smallerFont}
        sx={{
          '& .MuiDataGrid-cell': {
            fontSize: '10px',
          },
          '& .css-191bxd1-MuiDataGrid-columnHeaderTitle': {
            fontSize: '12px',
          },
        }}
      />
    </Card>
  );
}
