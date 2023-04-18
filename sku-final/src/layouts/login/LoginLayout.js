import PropTypes from 'prop-types';
// @mui
import { Paper, Stack, useTheme } from '@mui/material';
// components
import Logo from '../../components/logo';
//
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import { StyledContent, StyledRoot } from './styles';

// ----------------------------------------------------------------------

LoginLayout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  illustration: PropTypes.string,
};

export default function LoginLayout({ children, illustration, title }) {
  const theme = useTheme();
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Logo
          sx={{
            zIndex: 9,
            position: 'absolute',
            mt: { xs: 1.5, md: 5 },
            ml: { xs: 2, md: 5 },
          }}
        />
        <Box
          component={Link}
          to="/help_center"
          sx={{
            color: theme.palette.mode === 'dark' ? 'white' : 'black',
            pr: 3,
            textDecoration: 'none',
            fontSize: '13px',
            fontWeight: 600,
            '&:hover': { textDecoration: 'underline' },
          }}
        >
          Need Help?
        </Box>
      </Box>

      <StyledRoot>
        <Paper sx={{ width: '100%' }}>
          <StyledContent>
            <Stack sx={{ width: 1, justifyContent: 'center' }}> {children} </Stack>
          </StyledContent>
        </Paper>
      </StyledRoot>
    </Box>
  );
}
