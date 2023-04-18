// form
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Stack, Typography } from '@mui/material';
// components
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import FormProvider, { RHFSwitch } from 'components/hook-form';
import { useSnackbar } from 'components/snackbar';
import useClickOutside from 'hooks/useSearchBarToggle';
import { useRef, useState } from 'react';

// ----------------------------------------------------------------------

const PREPARING_OPTION = [
  {
    value: 'Pick',
    label: 'Pick',
  },
  {
    value: 'Pack',
    label: 'Pack',
  },
  {
    value: 'ReadyToDeliver',
    label: 'Ready To Deliver',
  },
];

const SHIPPING_OPTIONS = [
  { value: 'ShipmentsShipped', label: 'Shipments Shipped' },
  { value: 'ShipmentsDelivered', label: 'Shipments Delivered' },
];
const RETURNING_OPTIONS = [
  { value: 'RTVAcceptance', label: 'RTV Acceptance' },
  { value: 'AwaitingRTV', label: 'Awaiting RTV' },
  { value: 'RTVShipped', label: 'RTV Shipped' },
  { value: 'RTVDelivered', label: 'RTV Delivered' },
];

const B2B_CONTROL_SETTINGS = {
  Pick: true,
  Pack: false,
  ReadyToDeliver: false,
  ShipmentsShipped: true,
  ShipmentsDelivered: false,
  RTVAcceptance: true,
  AwaitingRTV: true,
  RTVShipped: false,
  RTVDelivered: false,
};

// ----------------------------------------------------------------------

export default function B2BSwichtes() {
  const { enqueueSnackbar } = useSnackbar();
  const ref = useRef();
  const [expand1, setExpand1] = useState(false);
  const [expand2, setExpand2] = useState(false);
  useClickOutside(ref, () => {
    setExpand1(false);
    setExpand2(false);
  });

  const defaultValues = {
    Pick: B2B_CONTROL_SETTINGS.Pick,
    Pack: B2B_CONTROL_SETTINGS.Pack,
    ReadyToDeliver: B2B_CONTROL_SETTINGS.ReadyToDeliver,
    ShipmentsShipped: B2B_CONTROL_SETTINGS.ShipmentsShipped,
    ShipmentsDelivered: B2B_CONTROL_SETTINGS.ShipmentsDelivered,
    RTVAcceptance: B2B_CONTROL_SETTINGS.RTVAcceptance,
    AwaitingRTV: B2B_CONTROL_SETTINGS.AwaitingRTV,
    RTVShipped: B2B_CONTROL_SETTINGS.RTVShipped,
    RTVDelivered: B2B_CONTROL_SETTINGS.RTVDelivered,
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
      <Card ref={ref} sx={{ p: 2, mt: 3 }}>
        <Typography variant="subtitle1" sx={{ pb: 2 }}>
          B2B Sellerboard Flow Control
        </Typography>
        <Accordion
          expanded={expand1}
          onChange={(e, expand) => {
            setExpand2(false);
            setExpand1(expand);
          }}
          sx={{
            p: 2,
            boxShadow: 5,
            transition: 'all 0.3s ease-in-out',
            ':hover': {
              backgroundColor: (theme) => theme.palette.mode === "dark" ? "#1F262E" : '#F6F7F8',
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography sx={{ width: '33%', flexShrink: 0, color: '#3366FF' }}>
              Shipments
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}></Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ px: 2 }}>
              <Typography variant="overline" component="div" sx={{ color: 'text.secondary' }}>
                Preparing
              </Typography>

              <Stack alignItems="flex-start" spacing={1} sx={{ mt: 2 }}>
                {PREPARING_OPTION.map((activity) => (
                  <RHFSwitch
                    key={activity.value}
                    name={activity.value}
                    label={activity.label}
                    sx={{ m: 0 }}
                  />
                ))}
              </Stack>

              <Typography
                variant="overline"
                component="div"
                sx={{ color: 'text.secondary', mt: 5 }}
              >
                Shipping
              </Typography>

              <Stack alignItems="flex-start" spacing={1} sx={{ mt: 2, mb: 5 }}>
                {SHIPPING_OPTIONS.map((application) => (
                  <RHFSwitch
                    key={application.value}
                    name={application.value}
                    label={application.label}
                    sx={{ m: 0 }}
                  />
                ))}
              </Stack>
              <Typography
                variant="overline"
                component="div"
                sx={{ color: 'text.secondary', mt: 5 }}
              >
                Returning
              </Typography>

              <Stack alignItems="flex-start" spacing={1} sx={{ mt: 2, mb: 5 }}>
                {RETURNING_OPTIONS.map((application) => (
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
                    ml: 'auto',
                  }}
                >
                  Save Changes
                </LoadingButton>
              </Stack>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Card>
    </FormProvider>
  );
}
