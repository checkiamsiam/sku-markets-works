import { Box, Card, Divider, Paper, Typography } from '@mui/material';
import ThemeDataGrid from 'components/common/ThemeDataGrid';
import { useEffect, useState } from 'react';

const columns = [
  {
    field: 'transactionId',
    headerName: 'Transaction ID',
    width: 120,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'invoiceId',
    headerName: 'Invoice Id',
    width: 140,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'paymentMethod',
    headerName: 'Payment Method',
    width: 140,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'username',
    headerName: 'User Name',
    width: 150,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'userPaymentId',
    headerName: 'User Payment ID',
    type: 'number',
    width: 220,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'startDate',
    headerName: 'Start Date',
    type: 'number',
    width: 130,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'endDate',
    headerName: 'End Date',
    type: 'number',
    width: 130,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    align: 'center',
    headerAlign: 'center',
  },
];

const rowsSchema = {
  transactionId: '1234567890',
  invoiceId: 'SKU-Ads-123456',
  paymentMethod: 'Automatic',
  username: 'SKU Markets',
  userPaymentId: '6409933007dd7cac108d9cea',
  startDate: '23 Feb, 2023',
  endDate: 'no end date',
};

const BillingTransferTab = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [height, setHeight] = useState(pageSize * 51 + 180);
  const rows = [];
  for (let i = 1; i <= pageSize; i++) {
    rows.push({ ...rowsSchema, id: i });
  }
  useEffect(() => {
    setHeight(pageSize * 51 + 180);
  }, [pageSize]);
  return (
    <Card sx={{ p: 2 }}>
      <Typography variant="subtitle2" sx={{ mb: 2 }}>
        Billing Transfers
      </Typography>
      <Divider />

      <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: 0, mb: 2 }}>
        <Box sx={{ height: height }}>
          <ThemeDataGrid
            checkbox={false}
            setPage={setPage}
            columns={columns}
            rows={rows}
            rowCount={50}
            page={page}
            pageSize={pageSize}
            setPageSize={setPageSize}
            rowsPerPageOptions={[25, 50, 100]}
            //   loading={isLoading || isFetching}
            statement={true}
          />
        </Box>
      </Paper>
    </Card>
  );
};

export default BillingTransferTab;
