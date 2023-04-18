import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import {
  Card,
  Link,
  Stack,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
} from '@mui/material';
import Image from 'next/image';
import React from 'react';
import basketImg from '../../assets/images/basket.png';
import noonImg from '../../assets/images/noon.png';

const data = [
  {
    id: 'N35997789A',
    category: 'Baby Products',
    brand: 'Tommy Hilfiger',
    marketplace: '#',
    sale_price: 30,
    chg: 15,
  },
  {
    id: 'N35997789A',
    category: 'Baby Products',
    brand: 'Tommy Hilfiger',
    marketplace: '#',
    sale_price: 30,
    chg: -4.04,
  },
  {
    id: 'N35997789A',
    category: 'Baby Products',
    brand: 'Tommy Hilfiger',
    marketplace: '#',
    sale_price: 22,
    chg: 15,
  },
  {
    id: 'N35997789A',
    category: 'Baby Products',
    brand: 'Tommy Hilfiger',
    marketplace: '#',
    sale_price: 1,
    chg: 15,
  },
  {
    id: 'N35997789A',
    category: 'Baby Products',
    brand: 'Tommy Hilfiger',
    marketplace: '#',
    sale_price: 3,
    chg: 15,
  },
];

const ComparableTradeVolume = () => {
  const gray = '#7A797D';
  return (
    <section style={{ margin: '30px 0' }}>
      <Stack direction={{ xs: 'column', lg: 'row' }} spacing={2}>
        {/* Left Card */}
        <Box sx={{ width: { xs: '100%', lg: '50%' } }}>
          <Card
            sx={{
              boxShadow: 3,
              pt: '.5rem',
              borderRadius: '10px',
            }}
          >
            {/* Section heading */}
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              justifyContent="space-between"
              sx={{ padding: '0 .75rem 1rem .75rem' }}
            >
              <h2 style={{ fontSize: '15px', color: gray }}>Comparable Trade Volume</h2>
              <Link href="#" underline="none" sx={{ fontSize: '12px', fontWeight: '600' }}>
                <Stack direction="row" alignItems="center">
                  <span>See All SKUs</span>
                  <KeyboardArrowRightIcon />
                </Stack>
              </Link>
            </Stack>

            {/* Section Body */}
            <TableContainer component={Paper}>
              <Table
                sx={{ width: '100%', borderTop: '2px solid lightgray' }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontSize: '12px',
                        fontWeight: '600',
                        color: gray,
                        py: '.4rem',
                      }}
                    >
                      SKU
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontSize: '12px',
                        fontWeight: '600',
                        color: gray,
                        py: '.4rem',
                      }}
                    >
                      Marketplace
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontSize: '12px',
                        fontWeight: '600',
                        color: gray,
                        py: '.4rem',
                      }}
                    >
                      Buybox Sale Price
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontSize: '12px',
                        fontWeight: '600',
                        color: gray,
                        py: '.4rem',
                      }}
                    >
                      Chg 24H
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((item, i) => (
                    <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component="td" scope="row" sx={{ py: '.40rem' }}>
                        <Image src={basketImg} alt="basket" width="50" height="40" />
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          fontSize: '12px',
                          color: gray,
                          py: '.40rem',
                        }}
                      >
                        <Stack direction="column">
                          <Link href="/product" underline="none" sx={{ fontWeight: '700' }}>
                            {item.id}
                          </Link>
                          <Link
                            href="/category"
                            underline="none"
                            sx={{ fontSize: '10px', color: 'GrayText' }}
                          >
                            {item.category}
                          </Link>
                          <Link
                            href="/brand"
                            underline="none"
                            sx={{ fontSize: '10px', color: 'GrayText' }}
                          >
                            {item.brand}
                          </Link>
                        </Stack>
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          fontSize: '12px',
                          color: gray,
                          py: '.40rem',
                        }}
                      >
                        <Link href={item.marketplace}>
                          <Image
                            src={noonImg}
                            alt="marketplace"
                            width="15"
                            height="15"
                            style={{ margin: '0 auto' }}
                          />
                        </Link>
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          fontSize: '12px',
                          color: gray,
                          py: '.40rem',
                        }}
                      >
                        {item.sale_price}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          fontSize: '12px',
                          color: `${item.chg > 0 ? 'green' : 'red'}`,
                          py: '.40rem',
                        }}
                      >
                        {item.chg}%
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
          <p style={{ fontSize: '12px', color: gray }}>
            Of all the top SKUs on marketplace, these are the closest in trade volume.
          </p>
        </Box>

        {/* Right Card */}
        <Box sx={{ width: { xs: '100%', lg: '50%' } }}>
          <Card
            sx={{
              boxShadow: 3,
              pt: '.5rem',
              borderRadius: '10px',
            }}
          >
            {/* Section heading */}
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              justifyContent="space-between"
              sx={{ padding: '0 .75rem 1rem .75rem' }}
            >
              <h2 style={{ fontSize: '15px', color: gray }}>People also view</h2>
              <Link href="#" underline="none" sx={{ fontSize: '12px', fontWeight: '600' }}>
                <Stack direction="row" alignItems="center">
                  <span>See All SKUs</span>
                  <KeyboardArrowRightIcon />
                </Stack>
              </Link>
            </Stack>

            {/* Section Body */}
            <TableContainer component={Paper}>
              <Table
                sx={{ width: '100%', borderTop: '2px solid lightgray' }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontSize: '12px',
                        fontWeight: '600',
                        color: gray,
                        py: '.4rem',
                      }}
                    >
                      SKU
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontSize: '12px',
                        fontWeight: '600',
                        color: gray,
                        py: '.4rem',
                      }}
                    >
                      Marketplace
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontSize: '12px',
                        fontWeight: '600',
                        color: gray,
                        py: '.4rem',
                      }}
                    >
                      Buybox Sale Price
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontSize: '12px',
                        fontWeight: '600',
                        color: gray,
                        py: '.4rem',
                      }}
                    >
                      Chg 24H
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((item, i) => (
                    <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component="td" scope="row" sx={{ py: '.40rem' }}>
                        <Image src={basketImg} alt="basket" width="50" height="40" />
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          fontSize: '12px',
                          color: gray,
                          py: '.40rem',
                        }}
                      >
                        <Stack direction="column">
                          <Link href="/product" underline="none" sx={{ fontWeight: '700' }}>
                            {item.id}
                          </Link>
                          <Link
                            href="/category"
                            underline="none"
                            sx={{ fontSize: '10px', color: 'GrayText' }}
                          >
                            {item.category}
                          </Link>
                          <Link
                            href="/brand"
                            underline="none"
                            sx={{ fontSize: '10px', color: 'GrayText' }}
                          >
                            {item.brand}
                          </Link>
                        </Stack>
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          fontSize: '12px',
                          color: gray,
                          py: '.40rem',
                        }}
                      >
                        <Link href={item.marketplace}>
                          <Image
                            src={noonImg}
                            alt="marketplace"
                            width="15"
                            height="15"
                            style={{ margin: '0 auto' }}
                          />
                        </Link>
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          fontSize: '12px',
                          color: gray,
                          py: '.40rem',
                        }}
                      >
                        {item.sale_price}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          fontSize: '12px',
                          color: `${item.chg > 0 ? 'green' : 'red'}`,
                          py: '.40rem',
                        }}
                      >
                        {item.chg}%
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
          <p style={{ fontSize: '12px', color: gray }}>
            Of all the top SKUs on marketplace, these are the closest in trade volume.
          </p>
        </Box>
      </Stack>
    </section>
  );
};

export default ComparableTradeVolume;
