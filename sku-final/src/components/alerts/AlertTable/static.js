import { TableRow } from '@mui/material';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#0d6efd',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: '14px',
    padding: 0,
  },
  textAlign: 'center',
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export const tableTitle = [
  { label: 'SKU', minWidth: 180 },
  { label: 'Notification Target', minWidth: 200 },
  { label: 'Marketplace', minWidth: 100 },
  { label: 'Stores', minWidth: 80 },
  { label: 'Rate', minWidth: 80 },
  { label: 'Rank', minWidth: 80 },
  { label: 'Fulfillment Type', minWidth: 150 },
  { label: 'SKU Status', minWidth: 120 },
  { label: 'Buybox Sale Price', minWidth: 160 },
  { label: 'Comment', minWidth: 80 },
  { label: 'Notify Via', minWidth: 100 },
  { label: 'Active Status', minWidth: 130 },
  { label: 'Actions', minWidth: 100 },
];
