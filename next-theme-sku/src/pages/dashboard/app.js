// next
import Head from 'next/head';
// @mui
import { Button, Card, CardHeader, Container, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// auth
import { useAuthContext } from '../../auth/useAuthContext';
// layouts
import DashboardLayout from '../../layouts/dashboard';
// _mock_
// components
import { useSettingsContext } from '../../components/settings';
// sections
import { AppAreaInstalled, AppWidgetSummary } from '../../sections/@dashboard/general/app';
// assets
import DataGridCustom from '../../sections/_examples/mui/data-grid/DataGridCustom';
import _mock, { randomInArray } from '../../_mock';

// ---------------------------------------------

import { Box } from '@mui/system';
import SKUMarquee from './common/Marquee.tsx';

export const _dataGrid = [...Array(5)].map((_, index) => ({
  id: _mock.id(index),
  name: _mock.name.fullName(index),
  email: _mock.email(index),
  lastLogin: _mock.time(index),
  performance: _mock.number.percent(index),
  rating: _mock.number.rating(index),
  status: randomInArray(['online', 'away', 'busy']),
  isAdmin: _mock.boolean(index),
  lastName: _mock.name.lastName(index),
  firstName: _mock.name.firstName(index),
  age: _mock.number.age(index),
}));

GeneralAppPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function GeneralAppPage() {
  const { user } = useAuthContext();

  const theme = useTheme();

  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Head>
        <title> General: App | Minimal UI</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <SKUMarquee />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12} lg={12}>
                <AppWidgetSummary
                  title="Total Active Users"
                  percent={2.6}
                  total={18765}
                  chart={{
                    colors: [theme.palette.primary.main],
                    series: [5, 18, 12, 51, 68, 11, 39, 37, 27, 20],
                  }}
                />
              </Grid>

              <Grid item xs={12} md={12} lg={12}>
                <AppWidgetSummary
                  title="Total Downloads"
                  percent={-0.1}
                  total={678}
                  chart={{
                    colors: [theme.palette.primary.main],
                    series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
                  }}
                />
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <AppWidgetSummary
                  title="Total Downloads"
                  percent={-0.1}
                  total={678}
                  chart={{
                    colors: [theme.palette.primary.main],
                    series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
                  }}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppAreaInstalled
              title="Area Installed"
              subheader="(+43%) than last year"
              chart={{
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
                series: [
                  {
                    year: '2019',
                    data: [
                      { name: 'Asia', data: [10, 41, 35, 51, 49, 62, 69, 91, 148] },
                      { name: 'America', data: [10, 34, 13, 56, 77, 88, 99, 77, 45] },
                    ],
                  },
                  {
                    year: '2020',
                    data: [
                      { name: 'Asia', data: [148, 91, 69, 62, 49, 51, 35, 41, 10] },
                      { name: 'America', data: [45, 77, 99, 88, 77, 56, 13, 34, 10] },
                    ],
                  },
                ],
              }}
            />
          </Grid>

          <Grid item xs={12} md={12} lg={4}>
            <AppWidgetSummary
              title="Total Downloads"
              percent={-0.1}
              total={678}
              chart={{
                colors: [theme.palette.primary.main],
                series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
              }}
            />
          </Grid>
          <Grid item xs={12} md={12} lg={4}>
            <AppWidgetSummary
              title="Total Downloads"
              percent={-0.1}
              total={678}
              chart={{
                colors: [theme.palette.primary.main],
                series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
              }}
            />
          </Grid>
          <Grid item xs={12} md={12} lg={4}>
            <AppWidgetSummary
              title="Total Downloads"
              percent={-0.1}
              total={678}
              chart={{
                colors: [theme.palette.primary.main],
                series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
              }}
            />
          </Grid>
          <Grid lg={12} item md={12} xs={12}>
            <Button variant="text">Text</Button>
            <Card>
              <CardHeader title="Custom" sx={{ mb: 2 }} />
              <Box sx={{ height: 500 }}>
                <DataGridCustom data={_dataGrid} />
              </Box>
            </Card>
          </Grid>
          <Grid lg={6} item md={12} xs={12}>
            <Card>
              <CardHeader title="Custom" sx={{ mb: 2 }} />
              <Box sx={{ height: 500 }}>
                <DataGridCustom data={_dataGrid} />
              </Box>
            </Card>
          </Grid>
          <Grid lg={6} item md={12} xs={12}>
            <Card>
              <CardHeader title="Custom" sx={{ mb: 2 }} />
              <Box sx={{ height: 500 }}>
                <DataGridCustom data={_dataGrid} />
              </Box>
            </Card>
          </Grid>
          <Grid lg={7} item md={12} xs={12}>
            <Card>
              <CardHeader title="Custom" sx={{ mb: 2 }} />
              <Box sx={{ height: 500 }}>
                <DataGridCustom data={_dataGrid} />
              </Box>
            </Card>
          </Grid>
          <Grid lg={5} item md={12} xs={12}>
            <Card>
              <CardHeader title="Custom" sx={{ mb: 2 }} />
              <Box sx={{ height: 500 }}>
                <DataGridCustom data={_dataGrid} />
              </Box>
            </Card>
          </Grid>
          <Grid lg={6} item md={12} xs={12}>
            <Card>
              <CardHeader title="Custom" sx={{ mb: 2 }} />
              <Box sx={{ height: 500 }}>
                <DataGridCustom data={_dataGrid} />
              </Box>
            </Card>
          </Grid>
          <Grid lg={6} item md={12} xs={12}>
            <Card>
              <CardHeader title="Custom" sx={{ mb: 2 }} />
              <Box sx={{ height: 500 }}>
                <DataGridCustom data={_dataGrid} />
              </Box>
            </Card>
          </Grid>

          <Grid lg={6} item md={12} xs={12}>
            <Card>
              <CardHeader title="Custom" sx={{ mb: 2 }} />
              <Box sx={{ height: 500 }}>
                <DataGridCustom data={_dataGrid} />
              </Box>
            </Card>
          </Grid>
          <Grid lg={6} item md={12} xs={12}>
            <Card>
              <CardHeader title="Custom" sx={{ mb: 2 }} />
              <Box sx={{ height: 500 }}>
                <DataGridCustom data={_dataGrid} />
              </Box>
            </Card>
          </Grid>
          <Grid lg={6} item md={12} xs={12}>
            <Card>
              <CardHeader title="Custom" sx={{ mb: 2 }} />
              <Box sx={{ height: 500 }}>
                <DataGridCustom data={_dataGrid} />
              </Box>
            </Card>
          </Grid>
          <Grid lg={6} item md={12} xs={12}>
            <Card>
              <CardHeader title="Custom" sx={{ mb: 2 }} />
              <Box sx={{ height: 500 }}>
                <DataGridCustom data={_dataGrid} />
              </Box>
            </Card>
          </Grid>
          <Grid lg={12} item md={12} xs={12}>
            <Card>
              <CardHeader title="Custom" sx={{ mb: 2 }} />
              <Box sx={{ height: 500 }}>
                <DataGridCustom data={_dataGrid} />
              </Box>
            </Card>
          </Grid>
          <Grid lg={12} item md={12} xs={12}>
            <Card>
              <CardHeader title="Custom" sx={{ mb: 2 }} />
              <Box sx={{ height: 500 }}>
                <DataGridCustom data={_dataGrid} />
              </Box>
            </Card>
          </Grid>
          <Grid lg={12} item md={12} xs={12}>
            <Card>
              <CardHeader title="Custom" sx={{ mb: 2 }} />
              <Box sx={{ height: 500 }}>
                <DataGridCustom data={_dataGrid} />
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
