import {
  Box,
  Button,
  Card,
  Divider,
  Link,
  MenuItem,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import ThemeDataGrid from 'components/common/ThemeDataGrid';
import Iconify from 'components/iconify/Iconify';
import MenuPopover from 'components/menu-popover/MenuPopover';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

const columns = [
  {
    field: 'issueDate',
    headerName: 'Issue Date',
    width: 100,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
  },
  {
    field: 'invoiceId',
    headerName: 'Invoice ID',
    width: 120,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'userName',
    headerName: 'Company Name',
    width: 150,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'userPaymentId',
    headerName: 'User Wallet Payment ID',
    width: 220,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'documentType',
    headerName: 'Document Type',
    width: 180,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'currency',
    headerName: 'Currency',
    width: 110,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'amountPayment',
    headerName: 'Amount',
    type: 'number',
    width: 110,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'actions',
    headerName: 'Actions',
    align: 'center',
    headerAlign: 'center',
    width: 120,
    renderCell: ({ row }) => {
      return (
        <Link href="#" underline="none" sx={{ fontSize: '12px' }}>
          Download
        </Link>
      );
    },
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
  },
];

const rowsSchema = {
  currency: 'SAR',
  amountPayment: 500,
  issueDate: 'Jan 25,2023',
  documentType: 'Subscription Statement',
  invoiceId: 'INV-123456',
  userName: 'SKU Markets',
  userPaymentId: '123456',
};

// filter
export const FILTER_OPTIONS = [
  { label: 'All', value: 'All' },
  { label: 'Subscription Statement', value: 'Subscription Statement' },
  { label: 'VAT & Taxes Statement', value: 'VAT & Taxes Statement' },
];

function CustomToolbar() {
  const { control } = useForm();
  const [filterBy, setFilterBy] = useState('All');
  //   Filter
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ p: 1 }}>
        <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
          <Controller
            name="filter"
            control={control}
            render={({ field }) => (
              <>
                <Button
                  disableRipple
                  color="inherit"
                  onClick={handleClick}
                  endIcon={<Iconify icon="ic:round-filter-list" />}
                  sx={{ fontWeight: 'fontWeightMedium' }}
                >
                  <Box component="span" sx={{ color: 'text.secondary', ml: 0.5 }}>
                    {filterBy}
                  </Box>
                </Button>

                <MenuPopover open={anchorEl} onClose={handleClose}>
                  {FILTER_OPTIONS.map((option) => (
                    <MenuItem
                      key={option.value}
                      selected={option.value === field.value}
                      onClick={() => {
                        handleClose();
                        setFilterBy(option.value);
                        field.onChange(option.value);
                      }}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </MenuPopover>
              </>
            )}
          />
        </Stack>
        <Link href="#" underline="none" sx={{ fontSize: '14px', fontWeight: 700 }}>
          DOWNLOAD SELECTED
        </Link>
      </Stack>
      <Divider />
    </>
  );
}

const DocumentsTabWallet = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(25);
  const [height, setHeight] = useState(pageSize * 51 + 250);
  const rows = [];
  for (let i = 1; i <= pageSize; i++) {
    if (i % 2 === 0) {
      rows.push({ ...rowsSchema, id: i });
    } else {
      rows.push({ ...rowsSchema, documentType: 'VAT & Taxes Statement', id: i });
    }
  }
  useEffect(() => {
    setHeight(pageSize * 51 + 250);
  }, [pageSize]);
  return (
    <Card sx={{ p: 2 }}>
      <Typography variant="subtitle2" sx={{ mb: 2 }}>
        Subscription Statements
      </Typography>

      <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: 0, mb: 2 }}>
        <Box sx={{ height: height }}>
          <ThemeDataGrid
            statementToolbar={CustomToolbar}
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

export default DocumentsTabWallet;
