// form
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Card, Stack, Typography, Box } from '@mui/material';
// components
import FormProvider, { RHFSwitch } from 'components/hook-form';
import { useSnackbar } from 'components/snackbar';

// ----------------------------------------------------------------------

const ACTIVITY_OPTIONS = [
  {
    value: 'activityComments',
    label: 'Email me for SKU updates.',
  },
  {
    value: 'activityAnswers',
    label: 'WhatsApp me for SKU updates.',
  },
  {
    value: 'activityOrders',
    label: 'Email me for order updates.',
  },
  {
    value: 'activityWhatsappOrder',
    label: 'WhatsApp me for order updates.',
  },
];

const APPLICATION_OPTIONS = [
  { value: 'applicationNews', label: 'News and announcements' },
  { value: 'applicationProduct', label: 'SKU updates' },
  { value: 'orderUpdates', label: 'Order updates' },
];

const NOTIFICATION_SETTINGS = {
  activityComments: true,
  activityAnswers: true,
  activityFollows: false,
  applicationNews: true,
  applicationProduct: false,
  applicationBlog: false,
};

// ----------------------------------------------------------------------

export default function AccountNotifications() {
  const { enqueueSnackbar } = useSnackbar();

  const defaultValues = {
    activityComments: NOTIFICATION_SETTINGS.activityComments,
    activityAnswers: NOTIFICATION_SETTINGS.activityAnswers,
    activityFollows: NOTIFICATION_SETTINGS.activityFollows,
    applicationNews: NOTIFICATION_SETTINGS.applicationNews,
    applicationProduct: NOTIFICATION_SETTINGS.applicationProduct,
    applicationBlog: NOTIFICATION_SETTINGS.applicationBlog,
  };

  const methods = useForm({
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      enqueueSnackbar('Update success!');
      console.log('DATA', data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
    {/* <Card sx={{ p: 3 }}>
      <Typography variant='subtitle1' sx={{pb: 2}}>Notifications</Typography> */}
      <Box sx={{px: 2}}>
        <Typography variant="overline" component="div" sx={{ color: 'text.secondary' }}>
          Activity
        </Typography>

        <Stack alignItems="flex-start" spacing={1} sx={{ mt: 2 }}>
          {ACTIVITY_OPTIONS.map((activity) => (
            <RHFSwitch
              key={activity.value}
              name={activity.value}
              label={activity.label}
              sx={{ m: 0 }}
            />
          ))}
        </Stack>

        <Typography variant="overline" component="div" sx={{ color: 'text.secondary', mt: 5 }}>
          Application
        </Typography>

        <Stack alignItems="flex-start" spacing={1} sx={{ mt: 2, mb: 5 }}>
          {APPLICATION_OPTIONS.map((application) => (
            <RHFSwitch
              key={application.value}
              name={application.value}
              label={application.label}
              sx={{ m: 0 }}
            />
          ))}
        </Stack>

        <Stack>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={isSubmitting}
            sx={{
              bgcolor: 'primary.main',
              border: (theme) => `1px solid ${theme.palette.primary.main}`,
              color: (theme) =>
                theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
              '&:hover': {
                bgcolor: 'white',
                color: (theme) =>
                  theme.palette.mode === 'light' ? 'primary.main' : 'primary.main',
                border: (theme) => `1px solid ${theme.palette.primary.main}`,
              },
              ml:'auto' ,
            }}
          >
            Save Changes
          </LoadingButton>
        </Stack>
        </Box>
      {/* </Card> */}
    </FormProvider>
  );
}
