import { Box, Container, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import {
  AiFillApple,
  AiFillLinkedin,
  AiFillYoutube,
  AiOutlineMail,
  AiOutlineTwitter,
  AiOutlineWhatsApp,
} from 'react-icons/ai';
import { FaGooglePlay } from 'react-icons/fa';

const ContactUs = () => {
  return (
    <Container sx={{ mt: 7, mb: 4 }} id="ContactUs">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid xs={12} md={4}>
            <Typography variant="subtitle1" sx={{ textAlign: 'center', mb: 2 }}>
              MANAGE ON THE GO
            </Typography>
            <Stack direction="row" justifyContent="space-evenly" alignItems="center" spacing={2}>
              <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={1}
                sx={{
                  background: (theme) => (theme.palette.mode === 'dark' ? '#fff' : '#212B36'),
                  color: (theme) => (theme.palette.mode === 'dark' ? '#212B36' : '#fff'),
                  pt: 0.3,
                  borderRadius: 1,
                }}
              >
                <Box>
                  <AiFillApple style={{ fontSize: '2.2em' }} />
                </Box>
                <Box sx={{ pr: 3 }}>
                  <Typography variant="caption" sx={{ fontSize: '10px' }} component="div">
                    Download on the
                    <Typography sx={{ fontSize: '15px', pt: 0 }}>App Store</Typography>
                  </Typography>
                </Box>
              </Stack>
              <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={1}
                sx={{
                  background: (theme) => (theme.palette.mode === 'dark' ? '#fff' : '#212B36'),
                  color: (theme) => (theme.palette.mode === 'dark' ? '#212B36' : '#fff'),
                  pt: 0.5,
                  pb: 0,
                  borderRadius: 1,
                }}
              >
                <Box sx={{ pl: 0.5 }}>
                  <FaGooglePlay style={{ fontSize: '2.2em' }} />
                </Box>
                <Box sx={{ pr: 3 }}>
                  <Typography variant="caption" sx={{ fontSize: '10px' }} component="div">
                    GET IN ON
                  </Typography>
                  <Typography sx={{ fontSize: '15px', pt: 0 }}>Google Play</Typography>
                </Box>
              </Stack>
            </Stack>
          </Grid>
          <Grid xs={12} md={4}>
            <Typography variant="subtitle1" sx={{ textAlign: 'center', mb: 2 }}>
              CONTACT US
            </Typography>
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={3}>
              <Box>
                <a href="mailto:support@skumarkets.com" target="_blank" rel="noreferrer">
                  <AiOutlineMail color="#0d6efd" style={{ fontSize: '2.5em' }} />
                </a>
              </Box>
              <Box>
                <a
                  href="https://api.whatsapp.com/send?phone=966570044545"
                  target="_blank"
                  rel="noreferrer"
                >
                  <AiOutlineWhatsApp color="#0d6efd" style={{ fontSize: '2.5em' }} />
                </a>
              </Box>
            </Stack>
          </Grid>
          <Grid xs={12} md={4}>
            <Typography variant="subtitle1" sx={{ textAlign: 'center', mb: 2 }}>
              CONNECT WITH US
            </Typography>
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={3}>
              <Box>
                {' '}
                <a
                  href="https://www.linkedin.com/company/sku-markets"
                  target="_blank"
                  rel="noreferrer"
                >
                  <AiFillLinkedin color="#0d6efd" style={{ fontSize: '2.5em' }} />
                </a>
              </Box>
              <Box>
                <a href="https://twitter.com/SKUmarkets" target="_blank" rel="noreferrer">
                  <AiOutlineTwitter color="#0d6efd" style={{ fontSize: '2.5em' }} />
                </a>
              </Box>
              <Box>
                <a
                  href="https://www.youtube.com/channel/UC7yfhmbEEzaJgQMKSXZcFNA"
                  target="_blank"
                  rel="noreferrer"
                >
                  <AiFillYoutube color="#0d6efd" style={{ fontSize: '2.5em' }} />
                </a>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ContactUs;
