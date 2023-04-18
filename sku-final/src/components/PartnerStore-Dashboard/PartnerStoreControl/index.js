import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Box, Divider, Grid, Stack, Typography, useTheme } from '@mui/material';
import { toggleCampaignMode } from 'features/adboard/adboardSlice';
import { useDispatch } from 'react-redux';
import AddParnerStoreButton from '../AddPartnerStore/Button';

const PartnerStoreControl = ({ setCollapsible, collapsible, setTest }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  return (
    <>
      <Grid item width="100%" xs={12} md={12} lg={12} sx={{ position: 'sticky', top: '75px' }}>
        <Stack sx={{ mb: 3, position: 'relative' }}>
          <Divider />
          <Stack
            onClick={() => setCollapsible(!collapsible)}
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{
              cursor: 'pointer',
              padding: '2px',
              backgroundColor: theme.palette.mode === 'dark' ? '#212B36' : '#EFF2F5',
              position: 'absolute',
              borderRadius: '5px',
              top: '-11px',
              right: '10px',
            }}
          >
            {collapsible ? <KeyboardArrowLeftIcon /> : <KeyboardArrowRightIcon />}
          </Stack>
        </Stack>
        {collapsible && (
          <Stack width="100%" height="100%">
            <Box
              boxShadow={5}
              borderRadius={2}
              padding={7}
              sx={{
                backgroundColor: theme.palette.mode === 'dark' ? '#212B36' : 'white',
              }}
            >
              <Typography textAlign="center" fontSize="20px" fontWeight="500">
                You currently have no Partner Store.
              </Typography>
              <Stack
                onClick={() => dispatch(toggleCampaignMode())}
                direction="row"
                justifyContent="center"
                sx={{ padding: '3px 30px', mt: 2 }}
              >
                <AddParnerStoreButton />
              </Stack>
            </Box>
          </Stack>
        )}
      </Grid>
    </>
  );
};

export default PartnerStoreControl;
