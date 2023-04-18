import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import { Container } from '@mui/system';
import SKUMarquee from 'components/common/marquee';
import ImportedDataTable from 'components/Import/DataTable';
import ImportTabs from 'components/Import/ImportTabs';
import SelectPart from 'components/Import/SelectPart';
import UploadPart from 'components/Import/UploadPart';
import { useSettingsContext } from 'components/settings';
import SvgColor from 'components/svg-color/SvgColor';
import { useState } from 'react';

const ImportPage = () => {
  const [showModule, setShowModule] = useState(false);
  const { themeStretch } = useSettingsContext();
  const [importType, setImportType] = useState(null);
  const [importSubType, setSubImportType] = useState(null);
  const [value, setValue] = useState(0);

  const handleCancel = () => {
    setShowModule(false);
    setImportType(null);
    setSubImportType(null);
    setValue(0);
  };

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
            <Grid container spacing={2} sx={{ bgcolor: 'background.paper', width: '100%', mt: 3 }}>
              <ImportTabs value={value} setValue={setValue} />
              <Grid item lg={8} xs={12}>
                <SelectPart
                  value={value}
                  setValue={setValue}
                  importType={importType}
                  setImportType={setImportType}
                  importSubType={importSubType}
                  setSubImportType={setSubImportType}
                />
                <UploadPart value={value} importType={importType} />
              </Grid>
            </Grid>
          </>
        ) : (
          <>
            <Stack direction="row" justifyContent="space-between" sx={{ my: 3 }}>
              <Stack direction="row" spacing={1} alignItems="center">
                <SvgColor
                  src="/assets/icons/navbar/ic_import.svg"
                  sx={{ width: '25px', height: '25px' }}
                />
                <Typography>Import</Typography>
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
                  Refresh Import
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
                  New Import
                </Button>
              </Stack>
            </Stack>
            <ImportedDataTable />
          </>
        )}
      </Container>
    </>
  );
};

export default ImportPage;
