import InfoIcon from '@mui/icons-material/Info';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import {
  Box,
  Card,
  Stack,
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
  LinearProgress,
} from '@mui/material';
import React, { useState } from 'react';
import BuyBoxPriceStatus from './BuyBoxPriceStatus';
import noonImg from '../../assets/images/noon.png';
import Image from 'next/image';
import Grid from '@mui/material/Grid';

// Data
const data = [
  { label: 'E Marketplace cap', value: 'AED 60,090.00' },
  { label: 'Trade Volume', value: 'AED 60,090.00' },
  { label: 'Chg 24H', value: '-4.04%' },
  { label: 'ASP', value: 'AED 60,090.00' },
  { label: 'Vol(24h)/MCap', value: '0.7924' },
  { label: 'SKU Status', value: 'Live' },
  { label: 'DOH', value: '44' },
  { label: 'ENR', value: 'AED 60,090.00' },
  { label: 'Max Investment', value: 'AED 60,090.00' },
  { label: 'Min Investment', value: 'AED 60,090.00' },
  { label: 'EQTI', value: '300' },
  { label: 'EM', value: '15%' },
  { label: 'E Opp to stock', value: 'Yes' },
  { label: 'E Opp to Fulfilment', value: 'Yes' },
  { label: 'E Opp to Amazon Fulfilment', img: true },
];

const gray = '#7A797D';
const lightGray = '#999999';

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip placement="right" {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}));

const ChartAndAnalysis = () => {
  return (
    <section style={{ margin: '30px 0' }}>
      <Grid container spacing={{ xs: 4, md: 2, lg: 4 }}>
        {/* Start::BuyBox Price Status Chart */}
        <Grid item xs={12} lg={8} sx={{ width: { xs: '100%', lg: '60%' } }}>
          <BuyBoxPriceStatus />
          <p style={{ fontSize: '12px', color: gray }}>
            The SKU Markets chart is designed for users to instantly see the changes that occur on
            the marketplaces and predicts what will come next.
          </p>
        </Grid>
        {/* End::BuyBox Price Status Chart */}

        {/* Start::SKU Analysis & Statistics */}
        <Grid item xs={12} lg={4} sx={{ width: { xs: '100%', lg: '40%' } }}>
          <Card
            sx={{ borderRadius: '10px', boxShadow: 3, padding: '1rem .75rem', height: '500px' }}
          >
            <h2 style={{ fontSize: '15px', color: gray, textAlign: 'center' }}>
              SKU Analysis & Statistics
            </h2>

            <TableContainer component={Paper} sx={{ boxShadow: 'none', px: '2rem' }}>
              <Table sx={{ width: '100%' }} aria-label="simple table">
                <TableBody>
                  {data.map((item, i) => (
                    <TableRow key={i}>
                      <TableCell
                        align="left"
                        sx={{
                          fontSize: '10px',
                          fontWeight: 500,
                          color: gray,
                          py: '.25rem',
                        }}
                      >
                        {item.label}{' '}
                        <HtmlTooltip
                          title={
                            <>
                              <em>{"And here's"}</em> <b>{'some'}</b> <u>{'amazing content'}</u>.{' '}
                              {"It's very engaging. Right?"}
                            </>
                          }
                        >
                          <InfoIcon htmlColor={lightGray} fontSize="3px" />
                        </HtmlTooltip>
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          fontSize: '10px',
                          color: `${
                            parseFloat(item.value) < 0
                              ? 'red'
                              : item.value === 'Live'
                              ? 'green'
                              : '#7A797D'
                          }`,
                          py: '.25rem',
                        }}
                      >
                        {item.img ? (
                          <Box
                            component={Image}
                            src={noonImg}
                            sx={{
                              width: 15,
                              height: 15,
                              mx: 'auto',
                            }}
                          />
                        ) : (
                          <span>{item.value}</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Box>
              <p
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  color: gray,
                  textAlign: 'center',
                  margin: '.5rem 0 .25rem 0 ',
                }}
              >
                Trading Activity
              </p>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{
                  fontSize: '12px',
                  fontWeight: 500,
                  color: gray,
                  mx: 3,
                }}
              >
                <p style={{ width: '25%' }}>40% Demand</p>
                <LinearProgress
                  variant="determinate"
                  value={25}
                  sx={{
                    width: '45%',
                    padding: '1px',
                    borderRadius: '5px',
                    bgcolor: '#D3D3D3',
                    margin: '2px 0px',
                  }}
                />
                <p style={{ width: '25%' }}>60% Supply</p>
              </Stack>
            </Box>
          </Card>

          <p style={{ fontSize: '12px', color: gray }}>
            Designed for users to instantly see the statistics.
          </p>
        </Grid>
        {/* End::SKU Analysis & Statistics */}
      </Grid>
    </section>
  );
};

export default ChartAndAnalysis;
