import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Card, Divider, IconButton, Stack, Typography } from '@mui/material';
import { DeSelectMCBKSKU } from 'features/adboard/AdsTarget/AdsTargetSlice';
import { useDispatch, useSelector } from 'react-redux';

const TargetedMcbk = () => {
  const { MCBKsSkuSaved } = useSelector((state) => state.adBoardControl);
  const dispatch = useDispatch();
  const data = MCBKsSkuSaved.filter((m) => m.type !== 'sku');
  return (
    <Card sx={{ p: 2 }}>
      <Typography variant="subtitle1" sx={{ px: 1, fontSize: '14px' }}>
        1 Targeted
      </Typography>
      <Typography variant="subtitle2" sx={{ px: 1, fontSize: '12px' }}>
        Already Targeted Elements
      </Typography>

      <Box sx={{ height: '450px', overflow: 'auto' }}>
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
                <Stack>
                  <Typography variant="subtitle1" sx={{ px: 1, fontSize: '14px', mb: '5px' }}>
                    {m.title}
                  </Typography>
                  <Typography variant="subtitle2" sx={{ px: 1, fontSize: '12px' }}>
                    Target: {m.type}
                  </Typography>
                </Stack>
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

export default TargetedMcbk;
