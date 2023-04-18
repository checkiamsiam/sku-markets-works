import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Divider, IconButton, Stack, TextField, Typography } from '@mui/material';
import { selectMCBKSKU } from 'features/adboard/AdsTarget/AdsTargetSlice';
import { useDispatch, useSelector } from 'react-redux';

const CategoryTar = () => {
  const { categorySearched } = useSelector((state) => state.adBoardControl);
  const dispatch = useDispatch();
  return (
    <>
      <Stack sx={{ my: 2 }} direction="row" spacing={1}>
        <TextField
          placeholder="Enter Category"
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
              color: (theme) => (theme.palette.mode === 'light' ? 'primary.main' : 'primary.main'),
              border: (theme) => `1px solid ${theme.palette.primary.main}`,
            },
            mx: 2,
          }}
        >
          Target Category
        </Button>
      </Stack>
      <Typography variant="subtitle1" sx={{ px: 1, fontSize: '14px', mb: '5px' }}>
        Suggested Category
      </Typography>
      <Typography variant="subtitle2" sx={{ px: 1, fontSize: '12px' }}>
        Ranked by most relevant.
      </Typography>

      <Box sx={{ height: '250px', overflow: 'auto' }}>
        {categorySearched.map((c) => (
          <Stack key={c.id} sx={{ my: 2 }}>
            <Divider />
            <Stack
              sx={{ py: 1 }}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Stack>
                <Typography variant="subtitle1" sx={{ px: 1, fontSize: '14px', mb: '5px' }}>
                  {c.title}
                </Typography>
                <Typography variant="subtitle2" sx={{ px: 1, fontSize: '12px' }}>
                  Target: {c.type}
                </Typography>
              </Stack>
              <IconButton onClick={() => dispatch(selectMCBKSKU(c))}>
                <AddIcon />
              </IconButton>
            </Stack>
            <Divider />
          </Stack>
        ))}
      </Box>
    </>
  );
};

export default CategoryTar;
