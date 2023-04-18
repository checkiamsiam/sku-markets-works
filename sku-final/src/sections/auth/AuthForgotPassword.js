import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Stack } from '@mui/material';
import FormProvider, { RHFTextField } from 'components/hook-form';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { useForgotPasswordMutation } from 'features/auth/authAPI';

const AuthForgotPassword = () => {
  const [forgot, { isLoading }] = useForgotPasswordMutation();

  const UpdateUserSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Please enter a valid email address'),
  });

  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    forgot({ email: data.email });
  };
  return (
    <Box>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} sx={{ mb: 2 }}>
          <RHFTextField fullWidth name="email" label="Email address" />
        </Stack>

        <LoadingButton
          fullWidth
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          loading={isLoading || isSubmitting}
          sx={{
            bgcolor: 'primary.main',
            color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
            '&:hover': {
              bgcolor: 'white',
              color: (theme) => (theme.palette.mode === 'light' ? 'primary.main' : 'primary.main'),
              border: (theme) => `1px solid ${theme.palette.primary.main}`,
            },
          }}
        >
          RESET PASSWORD
        </LoadingButton>
      </FormProvider>
    </Box>
  );
};

export default AuthForgotPassword;
