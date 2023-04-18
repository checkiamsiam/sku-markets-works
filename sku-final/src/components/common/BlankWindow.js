import { Box, Card, Stack, Typography } from '@mui/material';

const BlankWindow = ({ title, description }) => {
  return (
    <Box>
      <Card sx={{ mb: 3, pb: 3 , boxShadow: 3}}>
        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{
            height: 1,
            textAlign: 'center',
            p: (theme) => theme.spacing(8, 2),
          }}
        >
          <img
            alt="empty content"
            src={'/assets/illustrations/illustration_empty_content.svg'}
            style={{ height: 240, mb: 3 }}
          />

          <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
            {title}
          </Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {description}
          </Typography>
        </Stack>
      </Card>
    </Box>
  );
};

export default BlankWindow;
