import { TablePagination, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useGetAllStoresQuery } from 'features/store/storeAPI';
import { useState } from 'react';
import { useParams } from 'react-router';

const watchRows = [
  { label: 'Store Name', minWidth: 180 },
  { label: 'Offer Price', minWidth: 100 },
  { label: 'SOH', minWidth: 80 },
  { label: 'Value (24H)', minWidth: 80 },
  { label: 'Fulfillment Type', minWidth: 80 },
  { label: 'Offer Rank', minWidth: 150 },
  { label: 'Store Rate', minWidth: 120 },
  { label: 'Store Share', minWidth: 160 },
];

const watchAPI = [
  {
    name: 'store name',
    officePrice: 0,
    soh: 1,
    value: 5,
    fullfilment: 'Express',
    offerRank: 1,
    storeRate: 30.23,
    storeShare: '15%',
  },
  {
    name: 'store name',
    officePrice: 0,
    soh: 1,
    value: 5,
    fullfilment: 'Express',
    offerRank: 1,
    storeRate: 30.23,
    storeShare: '15%',
  },
  {
    name: 'store name',
    officePrice: 0,
    soh: 1,
    value: 5,
    fullfilment: 'Express',
    offerRank: 1,
    storeRate: 30.23,
    storeShare: '15%',
  },
  {
    name: 'store name',
    officePrice: 0,
    soh: 1,
    value: 5,
    fullfilment: 'Express',
    offerRank: 1,
    storeRate: 30.23,
    storeShare: '15%',
  },
  {
    name: 'store name',
    officePrice: 0,
    soh: 1,
    value: 5,
    fullfilment: 'Express',
    offerRank: 1,
    storeRate: 30.23,
    storeShare: '15%',
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
  height: '60px',
}));

const ProductAnalysisTable = () => {
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

  const { id } = useParams();

  const { data, isLoading } = useGetAllStoresQuery(id, {
    skip: !id,
  });

  if (isLoading) {
    return (
      <Typography color="error" fontWeight="500" fontSize="1.5rem" align="center">
        Loading...
      </Typography>
    );
  }

  if (data?.length === 0) {
    return (
      <Typography color="error" fontWeight="500" fontSize="1.5rem" align="center">
        No Store data
      </Typography>
    );
  }

  return (
    <>
      <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: '10px', boxShadow: 3, mb: 2 }}>
        <TableContainer elevation={0}>
          <Table sx={{}} aria-label="customized table">
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
              {data &&
                data.map((store, i) => (
                  <StyledTableRow key={i}>
                    <StyledTableCell padding="none" align="center">
                      {store?.store_name}
                    </StyledTableCell>
                    <StyledTableCell padding="none" align="center">
                      {store?.store_offer_price}
                    </StyledTableCell>
                    <StyledTableCell padding="none" align="center">
                      {store?.store_soh}
                    </StyledTableCell>
                    <StyledTableCell padding="none" align="center">
                      {store?.value}
                    </StyledTableCell>
                    <StyledTableCell padding="none" align="center">
                      {store?.store_fulfilment_type}
                    </StyledTableCell>
                    <StyledTableCell padding="none" align="center">
                      {store?.store_offer_rank}
                    </StyledTableCell>
                    <StyledTableCell padding="none" align="center">
                      {store?.store_rating}
                    </StyledTableCell>
                    <StyledTableCell padding="none" align="center">
                      {store?.storeShare}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5]}
          component="div"
          count={watchAPI.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <p style={{ fontSize: '12px', color: '#7A797D' }}>
        Designed for users to instantly see the market situations of competitors on the marketplace
        and predicts what will come next.
      </p>
    </>
  );
};

export default ProductAnalysisTable;
