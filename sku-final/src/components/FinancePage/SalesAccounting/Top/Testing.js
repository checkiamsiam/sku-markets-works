import { makeStyles } from '@material-ui/core/styles';
import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, year2021, year2022, growth) {
  return { name, year2021, year2022, growth };
}

const rows = [
  createData('Assets', 100000, 120000, 20),
  createData('Liabilities', 50000, 60000, 20),
  createData('Equity', 50000, 60000, 20),
];

export default function DataGrid() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableBody>
          <TableCell component="th" scope="row">
            Balance Sheet
          </TableCell>
          <TableCell align="right">2021</TableCell>
          <TableCell align="right">2022</TableCell>
          <TableCell align="right">Growth %</TableCell>
          {rows.map((row) => (
            <>
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.year2021}</TableCell>
              <TableCell align="right">{row.year2022}</TableCell>
              <TableCell align="right">{row.growth}</TableCell>
            </TableRow>
            <hr />
            </>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
