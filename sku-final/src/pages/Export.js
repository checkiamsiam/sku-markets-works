import { Autocomplete, Button, Container, Stack, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/system';
import SKUMarquee from 'components/common/marquee';
import ExportedDataTable from 'components/ExportPage/DataTable';
import { useSettingsContext } from 'components/settings';
import SvgColor from 'components/svg-color/SvgColor';
import { useState } from 'react';
import { TbTableExport } from 'react-icons/tb';

const exportType = [
  { label: 'SKU Markets', type: 'SKU Markets' },
  { label: 'Partner Store', type: 'Partner Store' },
];

const Export = () => {
  const [showModule, setShowModule] = useState(false);
  const { themeStretch } = useSettingsContext();
  const [value, setValue] = useState(null);
  const [exportValue, setExportValue] = useState('');
  const [subType, setSubType] = useState(null);

  const handleCancel = () => {
    setShowModule(false);
    setExportValue('');
    setSubType(null);
    setValue(null);
  };

  let subTypes = [];
  switch (exportValue) {
    case 'SKU Markets':
      subTypes = [
        'New Created SKUs',
        'Active SKUs',
        'Orders',
        'Shipments',
        'Order Invoices',
        'Credit Notes',
        'Payments Disbursal',
        'Outstanding Payments',
        'Order Referral fees invoices',
        'VAT Payable',
      ];
      break;
    case 'Partner Store':
      subTypes = [];
      break;
    default:
      subTypes = [];
      break;
  }

  return (
    <>
      <SKUMarquee />
      <Container sx={{ marginTop: '30px' }} maxWidth={themeStretch ? false : 'xl'}>
        {showModule ? (
          <>
            <Box width="100px" onClick={handleCancel}>
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={0.8}
                variant="contained"
                sx={{
                  py: '5px',
                  fontSize: '15px',
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#212B36' : '#EFF2F5',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                <Typography sx={{ fontSize: '16px' }}>Cancel</Typography>
              </Stack>
            </Box>

            <Box sx={{ flexGrow: 1, mt: 3 }}>
              <Grid container spacing={2} sx={{ bgcolor: 'background.paper' }}>
                <Grid item md={4} xs={12}>
                  <Box
                    sx={{
                      display: 'flex',
                      borderRight: 3,
                      borderColor: 'primary.main',
                      mx: { md: 0, xs: 2 },
                    }}
                  >
                    <Box>
                      <Typography sx={{ color: 'text.main' }} variant="h3" component="h3">
                        <TbTableExport />
                      </Typography>
                      {/* <TbTableExport style={{ color: 'text.main', fontSize: '40px' }} /> */}
                    </Box>
                    <Box sx={{ textAlign: 'left', px: 1 }}>
                      <Typography sx={{ color: 'text.main', fontSize: '15px' }} component="p">
                        Export Types
                      </Typography>
                      <Typography sx={{ color: 'text.main', fontSize: '12px' }} component="p">
                        Select Types for exports
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} md={5} sx={{ mx: 'auto' }}>
                  <Box sx={{ px: 2 }}>
                    <Typography variant="h6" component="h6">
                      Build Your Export
                    </Typography>
                    <Autocomplete
                      disablePortal
                      value={value}
                      onChange={(event, newValue) => {
                        setValue(newValue);
                      }}
                      inputValue={exportValue}
                      onInputChange={(event, newInputValue) => {
                        setExportValue(newInputValue);
                        setSubType(null);
                      }}
                      id="controllable-states-demo"
                      options={exportType}
                      getOptionLabel={(option) => option.label}
                      sx={{ my: 3 }}
                      renderInput={(params) => <TextField {...params} label="Select Your type" />}
                    />
                    <Autocomplete
                      getOptionLabel={(option) => option}
                      disabled={!exportValue}
                      disablePortal
                      id="csv-import-type"
                      options={subTypes}
                      value={subType}
                      onChange={(event, newValue) => {
                        setSubType(newValue);
                      }}
                      sx={{ my: 3 }}
                      renderInput={(params) => (
                        <TextField {...params} label="Select Your Sub-type" />
                      )}
                    />

                    <Button
                      disabled={!subType || !value}
                      sx={{
                        bgcolor: 'primary.main',
                        color: (theme) =>
                          theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
                        '&:hover': {
                          bgcolor: 'white',
                          color: (theme) =>
                            theme.palette.mode === 'light' ? 'primary.main' : 'primary.main',
                          border: (theme) => `1px solid ${theme.palette.primary.main}`,
                        },
                        border: (theme) => `1px solid ${theme.palette.primary.main}`,
                        width: '100%',
                        mb: 20,
                      }}
                      component="a"
                      href={
                        exportValue === 'Alerts'
                          ? 'https://docs.google.com/uc?export=download&id=1OazkOX0PmJi6STEdI8jq15YHQFGDGjss'
                          : 'https://docs.google.com/uc?export=download&id=1rthI2uxjBzCPupRN5PE2UFZIeLVcPDWF'
                      }
                    >
                      Export
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </>
        ) : (
          <>
            <Stack direction="row" justifyContent="space-between" sx={{ my: 3 }}>
              <Stack direction="row" spacing={1} alignItems="center">
                <SvgColor
                  src="/assets/icons/navbar/ic_export.svg"
                  sx={{ width: '25px', height: '25px' }}
                />
                <Typography>Export</Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <Button
                  size="medium"
                  sx={{
                    bgcolor: 'white',
                    border: (theme) => `1px solid ${theme.palette.primary.main}`,
                    color: (theme) =>
                      theme.palette.mode === 'light' ? 'primary.main' : 'primary.main',
                    '&:hover': {
                      bgcolor: 'primary.main',
                      color: (theme) =>
                        theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
                      border: (theme) => `1px solid ${theme.palette.primary.main}`,
                    },
                  }}
                >
                  Refresh Export
                </Button>
                <Button
                  size="medium"
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
                  }}
                  // disabled={subscription === 'free'}
                  onClick={() => setShowModule(true)}
                >
                  New Export
                </Button>
              </Stack>
            </Stack>
            <ExportedDataTable />
          </>
        )}
      </Container>
    </>
  );
};

export default Export;
