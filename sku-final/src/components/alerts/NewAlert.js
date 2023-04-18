import { Button, Card, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Box, Stack } from '@mui/system';
import BlankWindow from 'components/common/BlankWindow';
import LoadingScreen from 'components/loading-screen/LoadingScreen';
import SvgColor from 'components/svg-color/SvgColor';
import { useGetAlertsQuery } from 'features/alert/alertAPI';
import { useState } from 'react';
import AddNew from './AddNew';
import AlertTable from './AlertTable';
import SearchSkuForAlert from './searchSKUsForAlert';

/* Paper style */
const Item = styled(Paper)(({ theme }) => ({
  bgcolor: 'background.paper',
  ...theme.typography.subtitle1,
  padding: theme.spacing(1),
  textAlign: 'center',
  boxShadow: 'none',
  color: theme.palette.text.main,
}));

const NewAlert = () => {
  const [search, setSearch] = useState('');

  /* New Alert Add */
  const [openAddNew, setOpenAddNew] = useState(false);
  const handleCloseNewAdd = () => setOpenAddNew(false);
  const handleShowNewAdd = () => setOpenAddNew(true);

  const { data, isLoading, isFetching } = useGetAlertsQuery();

  if (isLoading || isFetching) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Stack direction="row" justifyContent="space-between" sx={{ my: 3, mx: 5 }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <SvgColor src="/assets/icons/navbar/ic_bell.svg" sx={{ width: '25px', height: '25px' }} />
          <Typography>SKUs Signals, Stock and Price Alerts</Typography>
        </Stack>
      </Stack>
      <Card
        sx={{
          boxShadow: 3,
          borderRadius: 1,
          mx: { md: 5, xs: 2, sm: 2 },
          my: 3,
        }}
      >
        <Box sx={{ m: 2 }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 1, md: 1 }}>
            <Item>
              <SearchSkuForAlert search={search} setSearch={setSearch} />
            </Item>
            <Item>
              <Button
                sx={{
                  minWidth: { xs: '100%', md: 70 },
                  boxShadow: 3,
                  fontSize: '13px',
                  textTransform: 'capitalize',
                }}
                color="inherit"
                onClick={handleShowNewAdd}
              >
                New Alert
              </Button>
              <AddNew openAddNew={openAddNew} handleCloseNewAdd={handleCloseNewAdd} />
            </Item>
          </Stack>
        </Box>
        {!isLoading && !isFetching && data?.total ? (
          <AlertTable />
        ) : (
          <BlankWindow
            title="You don't have any Alert for any SKUs."
            description="You can add New Alert"
          />
        )}
      </Card>
    </>
  );
};

export default NewAlert;
