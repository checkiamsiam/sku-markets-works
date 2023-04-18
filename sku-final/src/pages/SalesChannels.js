import { Container, Stack, Typography } from '@mui/material';
import SKUMarquee from 'components/common/marquee';
import AddSaleChannel from 'components/sales_channels/AddSaleChannel';
import SearchFilter from 'components/sales_channels/SearchFilter';
import { useSettingsContext } from 'components/settings';
import SvgColor from 'components/svg-color/SvgColor';

const SalesChannels = () => {
  const { themeStretch } = useSettingsContext();
  return (
    <>
      <SKUMarquee />
      <Container sx={{ marginTop: '30px' }} maxWidth={themeStretch ? false : 'xl'}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent={{ md: 'space-between', xs: 'flex-start' }}
          alignItems={{ md: 'center', xs: 'flex-start' }}
          marginY={2}
        >
          <Stack direction="row" spacing={1} alignItems="center" marginBottom={{ xs: 2 }}>
            <SvgColor
              src="/assets/icons/navbar/ic_sales.svg"
              sx={{ width: '25px', height: '25px' }}
            />
            <Typography gutterBottom>Multi Channels Integration</Typography>
          </Stack>
          <SearchFilter />
        </Stack>

        <AddSaleChannel />
      </Container>
    </>
  );
};

export default SalesChannels;
