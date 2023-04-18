import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Button, Link, Stack, Typography, useTheme } from '@mui/material';
import { m } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link as RLink, Link as RouterLink } from 'react-router-dom';
import { MotionContainer, varBounce } from '../components/animate';

export default function Page404() {
  const theme = useTheme();
  return (
    <>
      <Helmet>
        <title> 404 Page Not Found | Minimal UI</title>
      </Helmet>

      <MotionContainer>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" paragraph>
            Sorry, page not found!
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: 'text.secondary' }}>
            Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be
            sure to check your spelling.
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ fontSize: '120px', fontWeight: 700 }}>404</Typography>
        </m.div>
        <m.div variants={varBounce().in}>
          <Button
            component={RouterLink}
            to="/"
            size="large"
            sx={{
              bgcolor: 'primary.main',
              border: (theme) => `1px solid ${theme.palette.primary.main}`,
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
            Go to Home
          </Button>
        </m.div>
        <Stack direction="row" justifyContent="center" spacing={2}>
          <Link
            component={RLink}
            to="/finance"
            sx={{
              mt: 3,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '13px',
              color: theme.palette.mode === 'dark' ? 'white' : 'black',
            }}
          >
            <ChevronLeftIcon /> Return to Finance
          </Link>
        </Stack>
      </MotionContainer>
    </>
  );
}
