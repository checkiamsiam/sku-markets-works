import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { Card, Container, Stack, Typography } from '@mui/material';
import CatalogDataTable from 'components/CatalogPage/DataTable';
import SearchBarInCatalog from 'components/CatalogPage/SearchBar';
import SKUMarquee from 'components/common/marquee';
import { useSettingsContext } from 'components/settings';
import { Helmet } from 'react-helmet-async';

const CatalogPage = () => {
  const { themeStretch } = useSettingsContext();
  return (
    <>
      <Helmet>
        <title> Catalog Dashboard | SKU Markets</title>
      </Helmet>
      <SKUMarquee />
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Stack direction="row" justifyContent="space-between" sx={{ my: 3 }}>
          <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
            <AutoStoriesIcon style={{ width: '25px', height: '25px' }} />
            <Typography>Catalog</Typography>
          </Stack>
        </Stack>
        <Card sx={{ p: 2, overflow: 'visible' }}>
          <SearchBarInCatalog />
          <CatalogDataTable />
        </Card>
      </Container>
    </>
  );
};

export default CatalogPage;
