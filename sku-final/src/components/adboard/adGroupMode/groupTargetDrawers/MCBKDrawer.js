import { LoadingButton } from '@mui/lab';
import {
  Autocomplete,
  Box,
  Divider,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Iconify from 'components/iconify/Iconify';
import { useState } from 'react';
import TargetedMcbk from './TargetedMcbk';
import TargetedSKU from './TargetedSKU';
import TargetingMcbk from './TargetingMcbk';
import TargetingSKU from './TargetingSKU';

const MCBKDrawer = ({ toggleDrawer }) => {
  const [targetType, setTargetType] = useState({ label: 'Standard' });
  return (
    <Box sx={{ p: 2 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        {/* <Typography variant="subtitle1">Add Partner Store</Typography> */}

        <IconButton onClick={toggleDrawer}>
          <Iconify icon="eva:close-fill" />
        </IconButton>
      </Stack>

      <Divider />

      <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 2 }}>
        <Typography fontSize="700">Target Type:</Typography>
        <Autocomplete
          disablePortal
          id="country-select-campaings"
          size="small"
          value={targetType}
          disableClearable
          options={[{ label: 'Standard' }, { label: 'Dynamic' }]}
          onChange={(event, newValue) => {
            setTargetType(newValue);
          }}
          sx={{ width: '250px' }}
          renderInput={(params) => (
            <TextField
              {...params}
              InputLabelProps={{
                shrink: true,
              }}
            />
          )}
          required
        />
      </Stack>
      <Box sx={{ my: 2 }}>
        <Typography sx={{ fontSize: '14px' }}>
          <span style={{ fontWeight: 700 }}>Target types: </span>determine the kind of ads and
          targeting options you can have within your ad group.
        </Typography>
        <Typography sx={{ fontSize: '14px' }}>
          <span style={{ fontWeight: 700 }}>Standard: </span>Text ads written by you that serve
          based on the marketplaces, categories, brands and keywords you select.
        </Typography>
        <Typography sx={{ fontSize: '14px' }}>
          <span style={{ fontWeight: 700 }}>Dynamic: </span>Text ads that use your SKUs content to
          target relevant searches and generate it automatically.
        </Typography>
        <Typography variant="subtitle1" sx={{ my: 1, fontSize: '12px' }}>
          For best results, try to focus all the ads and keywords in an ad group on one marketplace,
          one category, one brand or one SKU.
        </Typography>
        {targetType.label === 'Dynamic' && (
          <Grid container spacing={1} sx={{ my: 1 }}>
            <Grid item md={7}>
              <TargetingSKU />
            </Grid>
            <Grid item md={5}>
              <TargetedSKU />
            </Grid>
          </Grid>
        )}
        <Grid container spacing={1} sx={{ mt: 1 }}>
          <Grid item md={7}>
            <TargetingMcbk />
          </Grid>
          <Grid item md={5}>
            <TargetedMcbk />
          </Grid>
        </Grid>
        <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
          <LoadingButton
            variant="contained"
            sx={{
              bgcolor: 'primary.main',
              border: (theme) => `1px solid ${theme.palette.primary.main}`,
              color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
              '&:hover': {
                bgcolor: 'white',
                color: (theme) =>
                  theme.palette.mode === 'light' ? 'primary.main' : 'primary.main',
                border: (theme) => `1px solid ${theme.palette.primary.main}`,
              },
            }}
          >
            Save Changes
          </LoadingButton>
        </Stack>
      </Box>
    </Box>
  );
};

export default MCBKDrawer;
