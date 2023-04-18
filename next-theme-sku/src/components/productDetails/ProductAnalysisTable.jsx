import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Pagination } from '@mui/material';

const rows = [
  { name: 'store name', offerPrice: 0, soh: 1, rank: 0, share: '30%' },
  { name: 'store name', offerPrice: 0, soh: 1, rank: 0, share: '30%' },
  { name: 'store name', offerPrice: 0, soh: 1, rank: 0, share: '30%' },
  { name: 'store name', offerPrice: 0, soh: 1, rank: 0, share: '30%' },
  { name: 'store name', offerPrice: 0, soh: 1, rank: 0, share: '30%' },
];

const ProductAnalysisTable = () => {
  return (
    <section style={{ margin: '40px 0' }}>
      <TableContainer
        component={Paper}
        sx={{ backgroundColor: '#F8F9FA', boxShadow: 3, borderRadius: '10px' }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell width="12%" align="center" sx={{ fontSize: '12px', fontWeight: 'bold' }}>
                Store Name
              </TableCell>
              <TableCell width="12%" align="center" sx={{ fontSize: '12px', fontWeight: 'bold' }}>
                Offer Price
              </TableCell>
              <TableCell width="12%" align="center" sx={{ fontSize: '12px', fontWeight: 'bold' }}>
                SOH
              </TableCell>
              <TableCell width="12%" align="center" sx={{ fontSize: '12px', fontWeight: 'bold' }}>
                Value (24H)
              </TableCell>
              <TableCell width="12%" align="center" sx={{ fontSize: '12px', fontWeight: 'bold' }}>
                Fulfillment Type
              </TableCell>
              <TableCell width="12%" align="center" sx={{ fontSize: '12px', fontWeight: 'bold' }}>
                Offer Rank
              </TableCell>
              <TableCell width="12%" align="center" sx={{ fontSize: '12px', fontWeight: 'bold' }}>
                Store Rate
              </TableCell>
              <TableCell width="12%" align="center" sx={{ fontSize: '12px', fontWeight: 'bold' }}>
                Store Share
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => (
              <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row" sx={{ fontSize: '12px', color: '#7A797D' }}>
                  {row?.name}
                </TableCell>
                <TableCell align="center" sx={{ fontSize: '12px', color: '#7A797D' }}>
                  {row?.offerPrice}
                </TableCell>
                <TableCell align="center" sx={{ fontSize: '12px', color: '#7A797D' }}>
                  {row?.soh}
                </TableCell>
                <TableCell align="center" sx={{ fontSize: '12px', color: '#7A797D' }}>
                  <br />
                </TableCell>
                <TableCell align="center" sx={{ fontSize: '12px', color: '#7A797D' }}>
                  <br />
                </TableCell>
                <TableCell align="center" sx={{ fontSize: '12px', color: '#7A797D' }}>
                  {row?.rank}
                </TableCell>
                <TableCell align="center" sx={{ fontSize: '12px', color: '#7A797D' }}>
                  <br />
                </TableCell>
                <TableCell align="center" sx={{ fontSize: '12px', color: '#7A797D' }}>
                  {row?.share}
                </TableCell>
              </TableRow>
            ))}
            <TableRow
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
                justifyContent: 'space-between',
              }}
            >
              <TableCell align="left" colSpan={4} width="100%">
                <br />
              </TableCell>

              <TableCell align="right" colSpan={4} width="100%">
                <Pagination
                  count={10}
                  color="primary"
                  sx={{ display: 'flex', justifyContent: 'end' }}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <p style={{ fontSize: '12px', color: '#7A797D' }}>
        Designed for users to instantly see the market situations of competitors on the marketplace
        and predicts what will come next.
      </p>
    </section>
  );
};

export default ProductAnalysisTable;
