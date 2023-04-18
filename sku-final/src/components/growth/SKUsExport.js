import { Button, Card, Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';


const SKUs = [
  { label: 'Live SKUs', value: 0 },
  { label: 'Not Live SKUs', value: 0 },
  { label: 'Not Active SKUs', value: 0 },
  { label: 'Price not in range SKUs', value: 0 },
  { label: 'Rejected SKUs', value: 0 },
  { label: 'Barcodeless SKUs', value: 0 },
  { label: 'Not Approved SKUs', value: 0 },
  { label: 'FBN Not Live SKUs', value: 0 },
];

const SKUsExport = () => {
  return (
    <>
      <Box sx={{ width: '100%', mt: 5 }}>
        <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {SKUs.map((sku, i) => (
            <Grid key={i} item md={3} xs={6}>
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
                    </Button> <br />
                    <Typography variant="caption">{sku.value}</Typography>
                  </Box>
                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default SKUsExport;
