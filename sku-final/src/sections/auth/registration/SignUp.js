import React, { useEffect } from 'react';
import { Link, Stack, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import AuthRegisterForm from '../AuthRegisterForm';
import useAuth from 'hooks/useAuth';
// ----------------------------------------------------------------------

export default function SignUp({setCurrentStep}) {
  const navigate = useNavigate();
  const user = useAuth();

  useEffect(() => {
    if(user?.email) setCurrentStep(2)
  }, [user.email, setCurrentStep])

  return (
    <Box>
      <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
        <Typography variant="h4">Get started absolutely free.</Typography>

        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2"> Already have an account? </Typography>

          <Link sx={{ cursor: 'pointer' }} onClick={() => navigate('/login')} variant="subtitle2">
            Sign in
          </Link>
        </Stack>
      </Stack>

      <AuthRegisterForm v2={true} setCurrentStep={setCurrentStep} />

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
    </Box>
  );
}
