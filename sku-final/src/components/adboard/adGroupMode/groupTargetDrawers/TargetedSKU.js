import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Card, Divider, IconButton, Stack, Typography } from '@mui/material';
import { DeSelectMCBKSKU } from 'features/adboard/AdsTarget/AdsTargetSlice';
import { useDispatch, useSelector } from 'react-redux';
import CsvReaderForImportSku from './ImportSKUByCSV';

const TargetedSKU = () => {
  const { MCBKsSkuSaved } = useSelector((state) => state.adBoardControl);
  const dispatch = useDispatch();
  const data = MCBKsSkuSaved.filter((m) => m.type === 'sku');
  return (
    <Card sx={{ p: 2 }}>
      <Typography variant="subtitle1" sx={{ px: 1, fontSize: '14px' }}>
        300 SKUs Selected
      </Typography>
      <Typography variant="subtitle2" sx={{ px: 1, fontSize: '12px' }}>
        Already Targeted SKUs
      </Typography>
      <CsvReaderForImportSku />
      <Box sx={{ height: '340px', overflow: 'auto' }}>
        {data.length > 0 ? (
          data.map((m) => (
            <Stack sx={{ my: 2 }}>
              <Divider />
              <Stack
                sx={{ py: 1 }}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box
                  component="img"
                  src={m.img}
                  alt="product img"
                  sx={{ width: 50, height: 50, objectFit: 'cover' }}
                />
                <Stack>
                  <Typography variant="subtitle1" sx={{ px: 1, fontSize: '12px', mb: '5px' }}>
                    {m.title}
                  </Typography>
                  <Typography variant="subtitle2" sx={{ px: 1, fontSize: '10px' }}>
                    {m.sku}
                  </Typography>
                </Stack>
                <Typography variant="subtitle1" sx={{ px: 1, fontSize: '12px', mb: '5px' }}>
                  {m.category}
                </Typography>
                <IconButton onClick={() => dispatch(DeSelectMCBKSKU(m))} sx={{ color: 'red' }}>
                  <DeleteIcon />
                </IconButton>
              </Stack>
              <Divider />
            </Stack>
          ))
        ) : (
          <img
            alt="empty content"
            src={'/assets/illustrations/illustration_empty_content.svg'}
            style={{ width: '100%', height: '100%' }}
          />
        )}
      </Box>
    </Card>
  );
};

export default TargetedSKU;
