import { Container, Stack, Typography } from '@mui/material';
import AddAutomation from 'components/bots_auto/AddAutomation';
import BotsSearchFilter from 'components/bots_auto/BotsSearchFilter';
import SKUMarquee from 'components/common/marquee';
import { useSettingsContext } from 'components/settings';
import SvgColor from 'components/svg-color/SvgColor';

const BotsAuto = () => {
  const { themeStretch } = useSettingsContext();
  return (
    <>
      <SKUMarquee />
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent={{ md: 'space-between', xs: 'flex-start' }}
          alignItems={{ md: 'center', xs: 'flex-start' }}
          marginY={2}
        >
          <Stack direction="row" spacing={1} alignItems="center" marginBottom={{ xs: 2 }}>
            <SvgColor
              src="/assets/icons/navbar/ic_bots.svg"
              sx={{ width: '25px', height: '25px' }}
            />
            <Typography gutterBottom>Bots Automation</Typography>
          </Stack>
          <BotsSearchFilter />
        </Stack>
        <AddAutomation />
      </Container>
    </>
  );
};

export default BotsAuto;
