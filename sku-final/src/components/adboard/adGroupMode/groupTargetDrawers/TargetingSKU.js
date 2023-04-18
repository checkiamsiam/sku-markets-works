import AddIcon from '@mui/icons-material/Add';
import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { selectMCBKSKU } from 'features/adboard/AdsTarget/AdsTargetSlice';
import { useDispatch, useSelector } from 'react-redux';

const TargetingSKU = () => {
  const { SKUSearched } = useSelector((state) => state.adBoardControl);
  const dispatch = useDispatch();
  return (
    <Card sx={{ p: 2 }}>
      <Typography variant="subtitle1" sx={{ px: 1, fontSize: '14px', mb: '5px' }}>
        Targeting
      </Typography>
      <Typography variant="subtitle2" sx={{ px: 1, fontSize: '12px' }}>
        Select SKUs for your targets
      </Typography>

      <Card sx={{ p: 2 }}>
        <Stack sx={{ my: 2 }} direction="row" spacing={1}>
          <TextField
            placeholder="Enter SKU"
            required
            id="outlined-required"
            size="small"
            sx={{ width: '60%', fontSize: '10px' }}
          />
          <Button
            sx={{
              width: '40%',
              bgcolor: 'primary.main',
              color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
              '&:hover': {
                bgcolor: 'white',
                color: (theme) =>
                  theme.palette.mode === 'light' ? 'primary.main' : 'primary.main',
                border: (theme) => `1px solid ${theme.palette.primary.main}`,
              },
              mx: 2,
            }}
          >
            Target SKU
          </Button>
        </Stack>
        <Typography variant="subtitle1" sx={{ px: 1, fontSize: '14px', mb: '5px' }}>
          Suggested SKUs
        </Typography>
        <Typography variant="subtitle2" sx={{ px: 1, fontSize: '12px' }}>
          Ranked by most relevant.
        </Typography>

        <Box sx={{ height: '250px', overflow: 'auto' }}>
          {SKUSearched.map((sku) => (
            <Stack key={sku.id} sx={{ my: 2 }}>
              <Divider />
              <Grid container
                sx={{ py: 1 }}
                alignItems="center"
              >
                <Grid item md={2}>

                <Box
                  component="img"
                  src={sku.img}
                  alt="product img"
                  sx={{ width: 50, height: 50, objectFit: 'cover' }}
                />
                </Grid>
                <Grid item md={5}>
                <Stack>
                  <Typography variant="subtitle1" sx={{ px: 1, fontSize: '12px', mb: '5px' }}>
                    {sku.title}
                  </Typography>
                  <Typography variant="subtitle2" sx={{ px: 1, fontSize: '10px' }}>
                    {sku.sku}
                  </Typography>
                </Stack>
                </Grid>
                <Grid item md={3}>

                <Typography variant="subtitle1" sx={{ px: 1, fontSize: '12px', mb: '5px' }}>
                  {sku.category}
                </Typography>
                </Grid>
                <Grid item md={2}>
                <IconButton onClick={() => dispatch(selectMCBKSKU(sku))}>
                  <AddIcon />
                </IconButton>
                </Grid>
              </Grid>
              <Divider />
            </Stack>
          ))}
        </Box>
      </Card>
    </Card>
  );
};

export default TargetingSKU;
