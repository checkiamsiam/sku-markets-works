import { CircularProgress, Stack, Typography } from '@mui/material';

const RatioTab = ({ row }) => {
  return (
    <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
      <Typography sx={{ fontSize: '14px' }}>45.59% </Typography>
      <CircularProgress size="20px" variant="determinate" value={75} />
    </Stack>
  );
};

export default RatioTab;
