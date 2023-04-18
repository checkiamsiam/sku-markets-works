import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useLoginMutation } from '../../feature/auth/authAPI';
// ----------------------------------------------------------------------

export default function Login() {
  const router = useRouter();
  const [login, { data, isSuccess, isLoading }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => login(data);

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        justifyItems: 'center',
      }}
    >
      <Box
        sx={{
          border: '1px solid GrayText',
          height: 'fit-content',
          mt: 10,
          p: 5,
          borderRadius: 3,
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
            onClick={() => router.push('/')}
            sx={{
              mb: 2,
              cursor: 'pointer',
            }}
          >
            <Image src="/images/logo.svg" alt="logo" width={200} height={60} />
          </Box>
          <Box
            sx={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: 'GrayText',
              textAlign: 'center',
            }}
          >
            Sign In
          </Box>
          <Box
            sx={{
              fontSize: '1rem',
              fontWeight: '400',
              color: 'GrayText',
              textAlign: 'center',
              px: '3rem',
              pb: '1rem',
            }}
          >
            Enter your email address and password <br /> to access admin panel.
          </Box>
        </Box>

        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              mb: 3,
            }}
          >
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              size="small"
              type="email"
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

          <div>
            <TextField
              error={!!errors?.password}
              id="outlined-basic"
              label="Password"
              variant="outlined"
              size="small"
              fullWidth
              helperText={errors?.password?.message}
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must have at least 6 characters',
                },
              })}
            />
          </div>

          <Box
            component={Link}
            href="/forgotPassword"
            sx={{
              fontSize: '10px',
              mt: '5px',
              display: 'flex',
              justifyContent: 'end',
              color: 'GrayText',
              ml: '-10px',
              textDecoration: 'none',
              transition: '1s all',
              ':hover': { color: 'blue', textDecoration: 'underline' },
            }}
          >
            Forgot Password ?
          </Box>

          <Box
            sx={{
              mt: 4,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <LoadingButton loading={isLoading} type="submit" variant="contained">
              Sign In
            </LoadingButton>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            color: 'GrayText',
            mt: 5,
          }}
        >
          Don&apos;t have an account?{' '}
          <Box
            component={Link}
            href="/signup"
            sx={{
              color: 'GrayText',
              ml: '10px',
              textDecoration: 'none',
              transition: '1s all',
              ':hover': { color: 'blue', textDecoration: 'underline' },
            }}
          >
            {' '}
            Sign Up
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            color: 'GrayText',
            mt: 1,
          }}
        >
          All rights reserved @ {new Date().getFullYear()}
        </Box>
      </Box>
    </Box>
  );
}
