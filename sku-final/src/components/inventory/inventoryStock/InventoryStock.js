import { Button, Card, Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import RecordingTable from './RecordingTable';
import RejectedTable from './RejectedTable';
import ReplenishmentTable from './ReplenishmentTable';
import UnidefinedTable from './UnidefinedTable';

const SKUs = [
  { label: 'Agening Stock', value: 0, type: 'QTY' },
  { label: 'OOS SKUs', value: 0, type: 'SKUs' },
  { label: 'SKUs In-low Stock', value: 0, type: 'SKUs' },
//   { label: 'SKUs In-high Stock', value: 100, type: 'SKUs' },
  { label: 'RTV Stock', value: 0, type: 'SKUs' },
];

const InventoryStock = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          <Grid xs={12} md={6}>
            <ReplenishmentTable />
          </Grid>
          <Grid xs={12} md={6}>
            <RecordingTable />
          </Grid>
          <Grid xs={12} md={6}>
            <RejectedTable />
          </Grid>
          <Grid xs={12} md={6}>
            <UnidefinedTable />
          </Grid>
          <Grid xs={12} md={12}>
            <Grid item container spacing={3} sx={{ mt: 2 }}>
              {SKUs.map((sku, i) => (
                <Grid key={i} md={3}>
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

export default InventoryStock;
