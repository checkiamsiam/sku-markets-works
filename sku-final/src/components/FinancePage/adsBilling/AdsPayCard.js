import { Card, Divider, Grid, Link, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import heroJumpLgo from '../../../assets/images/svg/SKU Market Patt 20x15-01.png';


const AdsPayCard = () => {
  const [hide, setHide] = useState(false);
  return (
    <Stack spacing={3}>
      <Card sx={{ p: 3 }}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="overline" sx={{ display: 'block', color: 'text.secondary' }}>
            You Will paid only as Cost per Conversion
          </Typography>
          {hide && (
            <Link
              onClick={() => setHide(false)}
              sx={{ cursor: 'pointer', fontSize: '14px', fontWeight: 700 }}
              underline="none"
            >
              SEEK INFO
            </Link>
          )}
        </Stack>
        {!hide && (
          <div style={{ transition: '.5s linear' }}>
            <Grid container sx={{ my: 2 }}>
              <Grid item xs={12} md={1} >
               <Stack direction="row" justifyContent="center" alignItems="center" mt={3}>
                 <img src={heroJumpLgo} alt="" />
               </Stack>
              </Grid>
              <Grid item xs={12} md={5.5} sx={{ pl: 5 }}>
                <Typography variant="subtitle1" fontSize="14px" fontWeight="700" sx={{ mb: 1 }}>
                  How Payments Work
                </Typography>
                <Typography variant="subtitle2" fontSize="12px" sx={{ mb: 1 }}>
                  {' '}
                  You will be charged :
                  <ul style={{ marginLeft: '18px' }}>
                    <li>On the 1st of each month and</li>
                    <li>Any time your balance reaches your SAR 500 threshold</li>
                  </ul>
                </Typography>
                <Link
                  component={RouterLink}
                  underline="always"
                  to="/help_center"
                  sx={{ fontSize: '12px' }}
                >
                  Learn More about ads payments
                </Link>
              </Grid>
              <Grid item xs={12} md={5.5}>
                <Typography variant="subtitle1" fontSize="14px" fontWeight="700" sx={{ mb: 1 }}>
                  How to control your ads spend
                </Typography>
                <Typography variant="subtitle2" fontSize="12px" sx={{ mb: 1 }}>
                  {' '}
                  SKU Markets Ads gives you 2 tools for controlling your spend::
                  <ul style={{ marginLeft: '18px' }}>
                    <li>
                      <Link
                        component={RouterLink}
                        underline="always"
                        to="/help_center"
                        sx={{ fontSize: '12px' }}
                      >
                        The Average Daily Budgets
                      </Link>{' '}
                      you set on individual ads.{' '}
                    </li>
                    <li>
                      <Link
                        component={RouterLink}
                        underline="always"
                        to="/help_center"
                        sx={{ fontSize: '12px' }}
                      >
                        Your Monthly Account Spend Limit,
                      </Link>{' '}
                      which controls all your campaigns' spend.
                    </li>
                  </ul>
                </Typography>
              </Grid>
            </Grid>
            <Divider />
            <Stack direction="row" justifyContent="end" spacing={2} sx={{ mt: 2 }}>
              <Link
                onClick={() => setHide(true)}
                sx={{ cursor: 'pointer', fontSize: '14px', fontWeight: 700 }}
                underline="none"
              >
                HIDE FOR NOW
              </Link>
            </Stack>
          </div>
        )}
      </Card>
    </Stack>
  );
};

export default AdsPayCard;
