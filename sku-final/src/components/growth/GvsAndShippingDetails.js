import { Grid, Box, Stack, Typography, useTheme, Divider } from '@mui/material';
import SellerPlatformChart from './SellerPlatformChart';

const GvsAndShippingDetails = () => {
  const theme = useTheme();
  return (
    <Box sx={{ mt: 5 }}>
      <Grid container spacing={5}>
        <Grid item md={6} xs={12}>
          <Box sx={{ boxShadow: 3, borderRadius: 1 }}>
            <Box sx={{ boxShadow: 1 }}>
              <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                sx={{
                  py: 1,
                  borderRadius: 1,
                  borderTop: '1px solid #ced4da',
                }}
              >
                <Typography variant="caption" width="50%" textAlign="center" fontWeight='700'>
                  Seller GVs
                </Typography>
                <Typography variant="caption" width="50%" textAlign="center" fontWeight='700'>
                  Platform GVs
                </Typography>
              </Stack>
              <Stack
                direction="row"
                divider={
                  <Divider
                    orientation="vertical"
                    flexItem
                    color={theme.palette.secondary.contrastText}
                  />
                }
                sx={{ backgroundColor: theme.palette.primary.background, py: 1 }}
              >
                <Typography
                  variant="caption"
                  width="25%"
                  textAlign="center"
                  color={theme.palette.secondary.contrastText}
                >
                  Current Week
                </Typography>
                <Typography
                  variant="caption"
                  width="25%"
                  textAlign="center"
                  color={theme.palette.secondary.contrastText}
                >
                  Previous Week
                </Typography>
                <Typography
                  variant="caption"
                  width="25%"
                  textAlign="center"
                  color={theme.palette.secondary.contrastText}
                >
                  Current Week
                </Typography>
                <Typography
                  variant="caption"
                  width="25%"
                  textAlign="center"
                  color={theme.palette.secondary.contrastText}
                >
                  Previous Week
                </Typography>
              </Stack>
              <Stack
                direction="row"
                sx={{ py: 1 }}
                divider={<Divider orientation="vertical" flexItem />}
              >
                <Typography variant="caption" width="25%" textAlign="center">
                  800
                </Typography>
                <Typography variant="caption" width="25%" textAlign="center">
                  1000
                </Typography>
                <Typography variant="caption" width="25%" textAlign="center">
                  90
                </Typography>
                <Typography variant="caption" width="25%" textAlign="center">
                  110
                </Typography>
              </Stack>
            </Box>

            <Stack>
              <SellerPlatformChart
                chart={{
                  categories: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
                  series: [
                    {
                      gv: 'Seller',
                      data: [
                        { name: 'Current Week', data: [10, 41, 35, 51, 49, 62, 69] },
                        { name: 'Previous Week', data: [10, 34, 13, 56, 77, 88, 99] },
                      ],
                    },
                    {
                      gv: 'Platform',
                      data: [
                        { name: 'Current Week', data: [148, 91, 69, 62, 49, 51, 35] },
                        { name: 'Previous Week', data: [45, 77, 99, 88, 77, 56, 13] },
                      ],
                    },
                  ],
                  colors: ['#8BE78B', '#F76F72'],
                }}
              />
            </Stack>
          </Box>
        </Grid>
        <Grid item md={6} xs={12}>
          <Box sx={{ boxShadow: 3, borderRadius: 1 }}>
            <Box sx={{ boxShadow: 1 }}>
              <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                sx={{
                  py: 1,
                  borderRadius: 1,
                  borderTop: '1px solid #ced4da',
                }}
              >
                <Typography variant="caption" width="50%" textAlign="center" fontWeight='700'>
                  Shipped Revenue
                </Typography>
                <Typography variant="caption" width="50%" textAlign="center" fontWeight='700'>
                  Shipped Units
                </Typography>
              </Stack>
              <Stack
                direction="row"
                divider={
                  <Divider
                    orientation="vertical"
                    flexItem
                    color={theme.palette.secondary.contrastText}
                  />
                }
                sx={{ backgroundColor: theme.palette.primary.background, py: 1 }}
              >
                <Typography
                  variant="caption"
                  width="25%"
                  textAlign="center"
                  color={theme.palette.secondary.contrastText}
                >
                  Current Week
                </Typography>
                <Typography
                  variant="caption"
                  width="25%"
                  textAlign="center"
                  color={theme.palette.secondary.contrastText}
                >
                  Previous Week
                </Typography>
                <Typography
                  variant="caption"
                  width="25%"
                  textAlign="center"
                  color={theme.palette.secondary.contrastText}
                >
                  Current Week
                </Typography>
                <Typography
                  variant="caption"
                  width="25%"
                  textAlign="center"
                  color={theme.palette.secondary.contrastText}
                >
                  Previous Week
                </Typography>
              </Stack>
              <Stack
                direction="row"
                sx={{ py: 1 }}
                divider={<Divider orientation="vertical" flexItem />}
              >
                <Typography variant="caption" width="25%" textAlign="center">
                  800
                </Typography>
                <Typography variant="caption" width="25%" textAlign="center">
                  1000
                </Typography>
                <Typography variant="caption" width="25%" textAlign="center">
                  90
                </Typography>
                <Typography variant="caption" width="25%" textAlign="center">
                  110
                </Typography>
              </Stack>
            </Box>

            <Stack>
            <SellerPlatformChart
                chart={{
                  categories: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
                  series: [
                    {
                      gv: 'Revenue',
                      data: [
                        { name: 'Current Week', data: [148, 91, 69, 62, 49, 51, 35] },
                        { name: 'Previous Week', data: [45, 77, 99, 88, 77, 56, 13] },
                      ],
                    },
                    {
                      gv: 'Units',
                      data: [
                        { name: 'Current Week', data: [10, 41, 35, 51, 49, 62, 69] },
                        { name: 'Previous Week', data: [10, 34, 13, 56, 77, 88, 99] },
                      ],
                    },
                  ],
                  colors: ['#8BE78B', '#F76F72'],
                }}
              />
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GvsAndShippingDetails;
