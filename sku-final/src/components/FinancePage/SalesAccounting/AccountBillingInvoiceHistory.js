import { Link as RLink} from 'react-router-dom';
// @mui
import { Button, Link, Stack, TablePagination, Typography } from '@mui/material';
// utils
import { fCurrency } from '../../../../../utils/formatNumber';
import { fDate } from '../../../../../utils/formatTime';
// components
import Iconify from '../../../../../components/iconify';
import { useState } from 'react';

// ----------------------------------------------------------------------

export default function AccountBillingInvoiceHistory() {
  const date = new Date();
  const invoices = [
    {createdAt: date, price: 100, link: 'https://storage.googleapis.com/sku_market_chat/docs/user-63e4838cfe695957a46eacbe-madrasah_hsc_2022_107901-1678983866046.pdf'},
    {createdAt: date, price: 50, link: 'https://storage.googleapis.com/sku_market_chat/docs/user-63e4838cfe695957a46eacbe-madrasah_hsc_2022_107901-1678983866046.pdf'},
    {createdAt: date, price: 200, link: 'https://storage.googleapis.com/sku_market_chat/docs/user-63e4838cfe695957a46eacbe-madrasah_hsc_2022_107901-1678983866046.pdf'},
    {createdAt: date, price: 250, link: 'https://storage.googleapis.com/sku_market_chat/docs/user-63e4838cfe695957a46eacbe-madrasah_hsc_2022_107901-1678983866046.pdf'},
    {createdAt: date, price: 10, link: 'https://storage.googleapis.com/sku_market_chat/docs/user-63e4838cfe695957a46eacbe-madrasah_hsc_2022_107901-1678983866046.pdf'},
    {createdAt: date, price: 20, link: 'https://storage.googleapis.com/sku_market_chat/docs/user-63e4838cfe695957a46eacbe-madrasah_hsc_2022_107901-1678983866046.pdf'},
    {createdAt: date, price: 80, link: 'https://storage.googleapis.com/sku_market_chat/docs/user-63e4838cfe695957a46eacbe-madrasah_hsc_2022_107901-1678983866046.pdf'},
    {createdAt: date, price: 60, link: 'https://storage.googleapis.com/sku_market_chat/docs/user-63e4838cfe695957a46eacbe-madrasah_hsc_2022_107901-1678983866046.pdf'},
    {createdAt: date, price: 50, link: 'https://storage.googleapis.com/sku_market_chat/docs/user-63e4838cfe695957a46eacbe-madrasah_hsc_2022_107901-1678983866046.pdf'},
    {createdAt: date, price: 40, link: 'https://storage.googleapis.com/sku_market_chat/docs/user-63e4838cfe695957a46eacbe-madrasah_hsc_2022_107901-1678983866046.pdf'},
    {createdAt: date, price: 30, link: 'https://storage.googleapis.com/sku_market_chat/docs/user-63e4838cfe695957a46eacbe-madrasah_hsc_2022_107901-1678983866046.pdf'},
    {createdAt: date, price: 20, link: 'https://storage.googleapis.com/sku_market_chat/docs/user-63e4838cfe695957a46eacbe-madrasah_hsc_2022_107901-1678983866046.pdf'},
    {createdAt: date, price: 10, link: 'https://storage.googleapis.com/sku_market_chat/docs/user-63e4838cfe695957a46eacbe-madrasah_hsc_2022_107901-1678983866046.pdf'},
    {createdAt: date, price: 5, link: 'https://storage.googleapis.com/sku_market_chat/docs/user-63e4838cfe695957a46eacbe-madrasah_hsc_2022_107901-1678983866046.pdf'},
    {createdAt: date, price: 450, link: 'https://storage.googleapis.com/sku_market_chat/docs/user-63e4838cfe695957a46eacbe-madrasah_hsc_2022_107901-1678983866046.pdf'},
    {createdAt: date, price: 550, link: 'https://storage.googleapis.com/sku_market_chat/docs/user-63e4838cfe695957a46eacbe-madrasah_hsc_2022_107901-1678983866046.pdf'},
    {createdAt: date, price: 500, link: 'https://storage.googleapis.com/sku_market_chat/docs/user-63e4838cfe695957a46eacbe-madrasah_hsc_2022_107901-1678983866046.pdf'},
  ]
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <Stack
      spacing={3}
      alignItems="flex-end"
      sx={{
        background: (theme) => (theme.palette.mode === 'dark' ? '#212B36' : '#fff'),
        p: 2,
        borderRadius: 2,
      }}
    >
      <Typography variant="overline" sx={{ width: 1, color: 'text.secondary' }}>
        Subscription Invoices History
      </Typography>

      <Stack spacing={2} sx={{ width: 1, }}>
        {invoices?.slice(page * rowsPerPage, (page + 1) * rowsPerPage)?.map((invoice, i) => (
          <Stack key={i} direction="row" justifyContent="space-between" sx={{ width: 1 }}>
            <Typography variant="body2" sx={{ minWidth: 120 }}>
              {fDate(invoice.createdAt)}
            </Typography>

            <Typography variant="body2">{fCurrency(invoice.price)}</Typography>

            <Link
              component={RLink}
              to={invoice.link}
              rel='noopener'
              target='_blank'
              sx={{cursor: 'pointer'}}
            >
              Invoice
            </Link>
          </Stack>
        ))}
      </Stack>

      {/*<Button size="small" color="inherit" endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}>
        All invoices
      </Button>*/}

      <TablePagination
        sx={{ mt: 2 }}
        component="div"
        count={invoices?.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Stack>
  );
}
