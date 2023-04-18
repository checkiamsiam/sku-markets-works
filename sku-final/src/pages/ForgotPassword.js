import { useState } from 'react';
import { useForm } from 'react-hook-form';
import signLogo from '../assets/images/SKU-Market-Logo.svg';

import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import { Box, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        justifyItems: 'center',
        px: '10px',
      }}
    >
      <Box
        sx={{
          boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
          height: 'fit-content',
          mt: 10,
          p: 5,
          
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            pb: '1rem',
          }}
        >
          <Box
            sx={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: 'GrayText',
              textAlign: 'center',
              
            }}
          >
            Reset Password
          </Box>
          <Box
            sx={{
              fontSize: '.7rem',
              fontWeight: '400',
              color: 'GrayText',
              textAlign: 'center',
              px: '3rem',
              py: '.5rem',
            }}
          >
            Enter your email address and we&apos;ll send you an email <br /> with instructions to
            reset your password.
          </Box>
        </Box>

        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              mt: 4,
            }}
          >
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              size="small"
              fullWidth
              error={!!errors?.email}
              helperText={errors?.email?.message}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'invalid email address',
                },
              })}
            />
          </Box>

          <Box
            sx={{
              mt: 4,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Button
              sx={{
                bgcolor: 'primary.main',
                fontWeight:"500",
                transition:"ease-in-out 0.5s",
                color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
                '&:hover': {
                  bgcolor: 'white',
                  color: (theme) =>
                    theme.palette.mode === 'light' ? 'primary.main' : 'primary.main',
                  border: (theme) => `1px solid ${theme.palette.primary.main}`,
                  transition:"ease-in-out 0.5s",
                },
                border: (theme) => `1px solid ${theme.palette.primary.main}`,
              }}
              
              type="submit"
              
            >
              RESET PASSWORD
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            color: 'GrayText',
            mt: 5,
            fontSize:"14px",
          }}
        >
          Back to{' '}
          <Box
            component={Link}
            to="/login"
            sx={{
              color: 'GrayText',
              ml: '10px',
              
              textDecoration: 'none',
              transition: '1s all',
              ':hover': { color: 'blue', textDecoration: 'underline' },
            }}
          >
            {' '}
            Sign In
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
