import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Grid, IconButton, TablePagination } from '@mui/material';
import { Link } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';

const watchRows = [
  { label: 'SKU', minWidth: 180 },
  { label: 'Marketplace', minWidth: 100 },
  { label: 'Stores', minWidth: 80 },
  { label: 'Rate', minWidth: 80 },
  { label: 'Rank', minWidth: 80 },
  { label: 'Fulfilment Type', minWidth: 150 },
  { label: 'SKU Status', minWidth: 120 },
  { label: 'Buybox Sale Price', minWidth: 160 },
  { label: 'Chg 24H', minWidth: 100 },
  { label: 'Max Offer Price', minWidth: 140 },
  { label: 'Min Offer Price', minWidth: 140 },
  { label: 'E Opp To Fulfilment', minWidth: 165 },
  { label: 'E Opp To Stock', minWidth: 140 },
  { label: 'Actions', minWidth: 100 },
];

const watchAPI = [
  {
    sku: {
      img: 'https://f.nooncdn.com/products/tr:n-t_400/pzsku/Z94261292DCEEFDB3F518Z/45/_/1658755374/e4d5548e-3358-4c19-b6cb-a68cdf30e97e.jpg',
      skuN: 'N35997789A',
      label1: 'Beauty & Health',
      label2: 'Tomme Tippee',
    },
    marketplace:
      'https://sku-markets.vercel.app/static/media/noon-saudi.c6b665a962341d75a9b658b6012c4194.svg',
    stores: 20,
    rate: 5,
    rank: 2,
    fullfilment: 'Express',
    status: 'Live',
    buybox: 30.23,
    chg: '15%',
    mxPrice: 45.23,
    minPrice: 29.23,
    eof: 'YES',
    eos: 'NO',
  },
  {
    sku: {
      img: 'https://f.nooncdn.com/products/tr:n-t_400/pzsku/Z94261292DCEEFDB3F518Z/45/_/1658755374/e4d5548e-3358-4c19-b6cb-a68cdf30e97e.jpg',
      skuN: 'N35997789A',
      label1: 'Beauty & Health',
      label2: 'Tomme Tippee',
    },

    marketplace:
      'https://sku-markets.vercel.app/static/media/noon-saudi.c6b665a962341d75a9b658b6012c4194.svg',
    stores: 20,
    rate: 5,
    rank: 2,
    fullfilment: 'Express',
    status: 'Live',
    buybox: 30.23,
    chg: '15%',
    mxPrice: 45.23,
    minPrice: 29.23,
    eof: 'YES',
    eos: 'NO',
  },
  {
    sku: {
      img: 'https://f.nooncdn.com/products/tr:n-t_400/pzsku/Z94261292DCEEFDB3F518Z/45/_/1658755374/e4d5548e-3358-4c19-b6cb-a68cdf30e97e.jpg',
      skuN: 'N35997789A',
      label1: 'Beauty & Health',
      label2: 'Tomme Tippee',
    },

    marketplace:
      'https://sku-markets.vercel.app/static/media/noon-saudi.c6b665a962341d75a9b658b6012c4194.svg',
    stores: 20,
    rate: 5,
    rank: 2,
    fullfilment: 'Express',
    status: 'Live',
    buybox: 30.23,
    chg: '15%',
    mxPrice: 45.23,
    minPrice: 29.23,
    eof: 'YES',
    eos: 'NO',
  },
  {
    sku: {
      img: 'https://f.nooncdn.com/products/tr:n-t_400/pzsku/Z94261292DCEEFDB3F518Z/45/_/1658755374/e4d5548e-3358-4c19-b6cb-a68cdf30e97e.jpg',
      skuN: 'N35997789A',
      label1: 'Beauty & Health',
      label2: 'Tomme Tippee',
    },

    marketplace:
      'https://sku-markets.vercel.app/static/media/noon-saudi.c6b665a962341d75a9b658b6012c4194.svg',
    stores: 20,
    rate: 5,
    rank: 2,
    fullfilment: 'Express',
    status: 'Live',
    buybox: 30.23,
    chg: '15%',
    mxPrice: 45.23,
    minPrice: 29.23,
    eof: 'YES',
    eos: 'NO',
  },
  {
    sku: {
      img: 'https://f.nooncdn.com/products/tr:n-t_400/pzsku/Z94261292DCEEFDB3F518Z/45/_/1658755374/e4d5548e-3358-4c19-b6cb-a68cdf30e97e.jpg',
      skuN: 'N35997789A',
      label1: 'Beauty & Health',
      label2: 'Tomme Tippee',
    },

    marketplace:
      'https://sku-markets.vercel.app/static/media/noon-saudi.c6b665a962341d75a9b658b6012c4194.svg',
    stores: 20,
    rate: 5,
    rank: 2,
    fullfilment: 'Express',
    status: 'Live',
    buybox: 30.23,
    chg: '15%',
    mxPrice: 45.23,
    minPrice: 29.23,
    eof: 'YES',
    eos: 'NO',
  },
  {
    sku: {
      img: 'https://f.nooncdn.com/products/tr:n-t_400/pzsku/Z94261292DCEEFDB3F518Z/45/_/1658755374/e4d5548e-3358-4c19-b6cb-a68cdf30e97e.jpg',
      skuN: 'N35997789A',
      label1: 'Beauty & Health',
      label2: 'Tomme Tippee',
    },

    marketplace:
      'https://sku-markets.vercel.app/static/media/noon-saudi.c6b665a962341d75a9b658b6012c4194.svg',
    stores: 20,
    rate: 5,
    rank: 2,
    fullfilment: 'Express',
    status: 'Live',
    buybox: 30.23,
    chg: '15%',
    mxPrice: 45.23,
    minPrice: 29.23,
    eof: 'YES',
    eos: 'NO',
  },
  {
    sku: {
      img: 'https://f.nooncdn.com/products/tr:n-t_400/pzsku/Z94261292DCEEFDB3F518Z/45/_/1658755374/e4d5548e-3358-4c19-b6cb-a68cdf30e97e.jpg',
      skuN: 'N35997789A',
      label1: 'Beauty & Health',
      label2: 'Tomme Tippee',
    },

    marketplace:
      'https://sku-markets.vercel.app/static/media/noon-saudi.c6b665a962341d75a9b658b6012c4194.svg',
    stores: 20,
    rate: 5,
    rank: 2,
    fullfilment: 'Express',
    status: 'Live',
    buybox: 30.23,
    chg: '15%',
    mxPrice: 45.23,
    minPrice: 29.23,
    eof: 'YES',
    eos: 'NO',
  },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#0d6efd',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: '14px',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const WatchlistDataTable = () => {
  /* Pagination */
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };
  return (
    <>
      <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: 0, mb: 2 }}>
        <TableContainer elevation={0}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                {watchRows.map((at, i) => (
                  <StyledTableCell sx={{ minWidth: at?.minWidth }} key={i} align="center">
                    {at.label}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {watchAPI
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((sku, i) => (
                  <StyledTableRow key={i}>
                    <StyledTableCell padding="none" component="th" scope="row">
                      <Grid container spacing={2}>
                        <Grid
                          item
                          lg={4}
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <img src={sku?.sku.img} alt="product img" width="50" height="50" />
                        </Grid>
                        <Grid item lg={8}>
                          <div
                            style={{
                              fontSize: '14px',
                              lineHeight: '5px',
                              color: 'gray',
                            }}
                          >
                            <p style={{ fontWeight: '600' }}>
                              <Link
                                style={{ textDecoration: 'none', color: '#2065D1' }}
                                to={`/product/detail`}
                              >
                                {sku?.sku.skuN}
                              </Link>
                            </p>
                            <p>
                              <Link
                                style={{ textDecoration: 'none', color: 'gray' }}
                                to="/category"
                              >
                                {sku?.sku.label1}
                              </Link>
                            </p>
                            <p>
                              <Link
                                style={{ textDecoration: 'none', color: 'GrayText' }}
                                to="/brand"
                              >
                                {sku?.sku.label2}
                              </Link>
                            </p>
                          </div>
                        </Grid>
                      </Grid>
                    </StyledTableCell>
                    <StyledTableCell padding="none" align="center">
                      <Link to={`/marketplace`}>
                        <img
                          style={{
                            margin: 'auto',
                          }}
                          src={sku.marketplace}
                          alt="market img"
                          width="40"
                          height="40"
                        />
                      </Link>
                    </StyledTableCell>
                    <StyledTableCell padding="none" align="center">
                      {sku?.stores}
                    </StyledTableCell>
                    <StyledTableCell padding="none" align="center">
                      {sku?.rate}
                    </StyledTableCell>
                    <StyledTableCell padding="none" align="center">
                      {sku?.rank}
                    </StyledTableCell>
                    <StyledTableCell padding="none" align="center">
                      {sku?.fullfilment}
                    </StyledTableCell>
                    <StyledTableCell padding="none" align="center">
                      {sku?.status}
                    </StyledTableCell>
                    <StyledTableCell padding="none" align="center">
                      {sku?.buybox}
                    </StyledTableCell>
                    <StyledTableCell padding="none" align="center">
                      {sku?.chg}
                    </StyledTableCell>
                    <StyledTableCell padding="none" align="center">
                      {sku.mxPrice}
                    </StyledTableCell>
                    <StyledTableCell padding="none" align="center">
                      {sku.minPrice}
                    </StyledTableCell>
                    <StyledTableCell padding="none" align="center">
                      {sku.eof}
                    </StyledTableCell>
                    <StyledTableCell padding="none" align="center">
                      {sku.eos}
                    </StyledTableCell>
                    <StyledTableCell padding="none" align="center">
                      <IconButton color="inherit" size="small">
                        <CloseIcon />
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={watchAPI.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {/* <EditAlert openEditAlert={openEditAlert} handleCloseAlertEdit={handleCloseAlertEdit} /> */}
    </>
  );
};

export default WatchlistDataTable;
