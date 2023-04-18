import { Box, Grid } from '@mui/material';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import MPLogo from 'components/common/MPLogo';
import { Link as DomLink } from 'react-router-dom';

export default function SkuPendingColumnForModal({ row }) {
  return (
    <Box sx={{ width: '100%' }}>
      <Grid container direction="row" alignItems={'center'} spacing={2}>
        <Grid item xs={2.5}>
          <Box
            component="img"
            src={row?.all_images[0]}
            alt="product img"
            sx={{ width: 50, height: 50, objectFit: 'cover' }}
          />
        </Grid>
        <Grid item xs={5.5}>
          <Stack spacing={0}>
            <Link component={DomLink} lineHeight={1} fontSize={12} to={`/product/${row?.id}`}>
              {row?.sku}
            </Link>
            <Link component={DomLink} lineHeight={1} fontSize={12} to={`/product/${row?.id}`}>
              {row?.partner_code}
            </Link>
            <Link
              component={DomLink}
              fontSize={12}
              color="text.secondary"
              lineHeight={1}
              to={`/brand/${row?.brand_en}`}
            >
              {row?.brand_en}
            </Link>
            <Link
              component={DomLink}
              fontSize={12}
              lineHeight={1}
              color="text.secondary"
              to={`/category/${row?.category_en}`}
            >
              {row?.category_en}
            </Link>
          </Stack>
        </Grid>
        <Grid item xs={4}>
          <MPLogo marketplace={row?.sku_marketplace} />
        </Grid>
      </Grid>
    </Box>
  );
}
