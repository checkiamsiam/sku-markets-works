// @mui
import { Link, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
// auth
// layouts
import LoginLayout from 'layouts/login';
//
import AuthLoginForm from './AuthLoginForm';

// ----------------------------------------------------------------------

export default function Login() {
  const navigate = useNavigate();

  return (
    <LoginLayout>
      <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
        <Typography variant="h4">Sign in to SKU Markets</Typography>

        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2">New user?</Typography>

          <Link sx={{ cursor: 'pointer' }} onClick={() => navigate('/signup')} variant="subtitle2">
            Create an account
          </Link>
        </Stack>
      </Stack>

      <AuthLoginForm />
    </LoginLayout>
  );
}
