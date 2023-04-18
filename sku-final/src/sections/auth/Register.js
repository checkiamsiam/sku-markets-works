// next
// @mui
import { Link, Stack, Typography } from '@mui/material';
// layouts
import LoginLayout from '../../layouts/login';
// routes
//
import { useNavigate } from 'react-router';
import AuthRegisterForm from './AuthRegisterForm';

// ----------------------------------------------------------------------

export default function Register() {
  const navigate = useNavigate();
  return (
    <LoginLayout title="Manage the job more effectively with Minimal">
      <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
        <Typography variant="h4">Get started absolutely free.</Typography>

        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2"> Already have an account? </Typography>

          <Link sx={{ cursor: 'pointer' }} onClick={() => navigate('/login')} variant="subtitle2">
            Sign in
          </Link>
        </Stack>
      </Stack>

      <AuthRegisterForm />

      <Typography
        component="div"
        sx={{ color: 'text.secondary', mt: 3, typography: 'caption', textAlign: 'center' }}
      >
        {'By signing up, I agree to '}
        <Link onClick={() => navigate('/policies')} underline="always" color="text.primary">
          policies
        </Link>
        .
      </Typography>
    </LoginLayout>
  );
}
