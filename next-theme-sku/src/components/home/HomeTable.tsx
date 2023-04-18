import { Box, Container, Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import chart from '../../assets/images/redChart.png';
import MarketLogo from '../../assets/images/ring.png';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#0d6efd',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
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

const Data = [
  {
    sku: 'N29827999A',
    marketImg: 'MarketLogo',
    store: 1,
    Rank: 1,
    SalePrice: 0,
    Charge24h: 'live',
    Chart: 'chart',
  },
  {
    sku: 'N29827999A',
    marketImg: 'MarketLogo',
    store: 1,
    Rank: 1,
    SalePrice: 0,
    Charge24h: 'live',
    Chart: 'chart',
  },
  {
    sku: 'N29827999A',
    marketImg: 'MarketLogo',
    store: 1,
    Rank: 1,
    SalePrice: 0,
    Charge24h: 'live',
    Chart: 'chart',
  },
  {
    sku: 'N29827999A',
    marketImg: 'MarketLogo',
    store: 1,
    Rank: 1,
    SalePrice: 0,
    Charge24h: 'live',
    Chart: 'chart',
  },
  {
    sku: 'N29827999A',
    marketImg: 'MarketLogo',
    store: 1,
    Rank: 1,
    SalePrice: 0,
    Charge24h: 'live',
    Chart: 'chart',
  },
];

const HomeTable = () => {
  const router = useRouter();
  return (
    <Container sx={{ marginTop: '200px' }} maxWidth="lg">
      <TableContainer component={Paper} elevation={0}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">SKU</StyledTableCell>
              <StyledTableCell align="center">MarketPlace</StyledTableCell>
              <StyledTableCell align="center">Stores</StyledTableCell>
              <StyledTableCell align="center">Rank</StyledTableCell>
              <StyledTableCell align="center">Buybox Sale Price </StyledTableCell>
              <StyledTableCell align="center"> Chg 24H </StyledTableCell>
              <StyledTableCell align="center">Chart </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Data.map((data, i) => (
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
                      <div
                        style={{
                          border: '1px solid black',
                          height: '40px',
                          width: '50px',
                        }}
                      ></div>
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
                          <Box
                            component={Link}
                            sx={{ textDecoration: 'none', color: '#0d6efd' }}
                            href="/product/details"
                          >
                            {data.sku}
                          </Box>
                        </p>
                        <p>
                          <Box
                            component={Link}
                            sx={{ textDecoration: 'none', color: 'GrayText' }}
                            href="/category"
                          >
                            ASOS Ridley High
                          </Box>
                        </p>
                        <p>
                          <Box
                            component={Link}
                            sx={{ textDecoration: 'none', color: 'GrayText' }}
                            href="/brand"
                          >
                            Tommee Tippee
                          </Box>
                        </p>
                      </div>
                    </Grid>
                  </Grid>
                </StyledTableCell>
                <StyledTableCell padding="none" align="center">
                  <Box
                    component={Image}
                    onClick={() => router.push('/marketPlace')}
                    src={MarketLogo}
                    alt="market img"
                    sx={{
                      height: 17,
                      width: 17,
                      cursor: 'pointer',
                    }}
                  />
                </StyledTableCell>
                <StyledTableCell padding="none" sx={{ fontSize: '13px' }} align="center">
                  {data.store}
                </StyledTableCell>
                <StyledTableCell padding="none" sx={{ fontSize: '13px' }} align="center">
                  {data.Rank}
                </StyledTableCell>
                <StyledTableCell padding="none" sx={{ fontSize: '13px' }} align="center">
                  {data.SalePrice}
                </StyledTableCell>
                <StyledTableCell padding="none" sx={{ fontSize: '13px' }} align="center">
                  {data.Charge24h}
                </StyledTableCell>
                <StyledTableCell padding="none" sx={{ fontSize: '13px' }} align="center">
                  <Image src={chart} alt="market img" width={100} />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default HomeTable;
