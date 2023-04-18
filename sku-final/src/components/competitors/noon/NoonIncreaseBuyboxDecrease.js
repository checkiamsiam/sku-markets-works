import { Button, Card, Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import PriceDecreaseTable from '../increaseBuyboxDecrease/PriceDecreaseTable';
import PriceIncreaseTable from '../increaseBuyboxDecrease/PriceIncreaseTable';
import NoonBuyboxTable from './NoonBuyboxTable';

const SKUs = [
  { label: 'SKUs At Min Price', value: 0, type: 'Live SKUs' },
  { label: 'Estimated Current Value', value: 0, type: 'Live SKUs' },
  { label: 'New Prices update to upload', value: 0, type: 'Live SKUs' },
];

const NoonIncreaseBuyboxDecrease = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          <Grid xs={12} md={3.75}>
            <PriceIncreaseTable/>
          </Grid>
          <Grid xs={12} md={4.5}>
            <NoonBuyboxTable/>
          </Grid>
          <Grid xs={12} md={3.75}>
            <PriceDecreaseTable/>
          </Grid>
          <Grid xs={12} md={12}>
            <Grid item container spacing={3} sx={{ mt: 2 }}>
              {SKUs.map((sku, i) => (
                <Grid key={i} md={4}>
                  <Card sx={{borderRadius:1,textAlign: 'center',boxShadow: '0px 0px 1px 0px rgba(0,0,0,0.55)',p:1}}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      spacing={2}
                    >
                      <Typography sx={{fontWeight:700}} variant="caption">{sku.label}</Typography>
                      <Box>
                        <Button
                          sx={{
                            bgcolor: 'white',
                            border: (theme) => `1px solid ${theme.palette.primary.main}`,
                            color: (theme) =>
                              theme.palette.mode === 'light' ? 'primary.main' : 'primary.main',
                            '&:hover': {
                              bgcolor: 'primary.main',
                              color: (theme) =>
                                theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
                              border: (theme) => `1px solid ${theme.palette.primary.main}`,
                            },
                          }}
                        >
                          Export
                        </Button>{' '}
                        <br />
                        <Typography sx={{fontWeight:700}} variant="caption">{sku.type}</Typography> <br />
                        <Typography variant="caption">{sku.value}</Typography>
                      </Box>
                    </Stack>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default NoonIncreaseBuyboxDecrease;
