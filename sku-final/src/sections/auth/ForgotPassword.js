import { Link, Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router';
import AuthForgotPassword from './AuthForgotPassword';

const ForgotPassword = () => {
  const navigate = useNavigate();
  return (
    <Paper elevation={6} sx={{ px: 4 , py: 10 }}>
      <Stack spacing={2} sx={{ my: 3, position: 'relative' }}>
        <Typography variant="h4" textAlign="left">
          Reset Password
        </Typography>
        <Typography
          sx={{
            fontSize: '.7rem',
            fontWeight: '400',
            color: 'GrayText',
            textAlign: 'left',
            
          }}
          component="p"
        >
          Enter your email address and we&apos;ll send you an email <br /> with instructions to
          reset your password.
        </Typography>
      </Stack>

      <AuthForgotPassword />

      <Stack direction="row" sx={{ my: 4 }} spacing={0.5}>
        <Typography variant="body2">Back to</Typography>

        <Link sx={{ cursor: 'pointer' }} onClick={() => navigate('/login')} variant="subtitle2">
          Sign In
        </Link>
      </Stack>
    </Paper>
  );
};

export default ForgotPassword;
