import { Grid, Tab, Typography } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import { Box } from '@mui/system';
import { useState } from 'react';
import { TbFileUpload, TbTableImport } from 'react-icons/tb';

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const ImportTabs = ({ value, setValue }) => {
  const [isdis, setIsDis] = useState(true);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid item lg={4} xs={12}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider', mx: { md: 0, xs: 2 } }}
      >
        <Tab
          sx={{ display: 'flex', justifyContent: 'start' }}
          label={
            <Box sx={{ display: 'flex' }}>
              <Box>
                <Typography sx={{ color: 'text.main' }} variant="h3" component="h3">
                  <TbTableImport />
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'left' }}>
                <Typography sx={{ color: 'text.main', fontSize: '15px' }} component="p">
                  Import Types
                </Typography>
                <Typography sx={{ color: 'text.main', fontSize: '12px' }} component="p">
                  Select Types for imports
                </Typography>
              </Box>
            </Box>
          }
          {...a11yProps(0)}
        />
        {isdis ? (
          <Tab
            disabled
            sx={{ display: 'flex', justifyContent: 'start' }}
            label={
              <Box sx={{ display: 'flex' }}>
                <Box>
                  <Typography sx={{ color: 'text.main' }} variant="h3" component="h3">
                    <TbFileUpload />
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'left' }}>
                  <Typography sx={{ color: 'text.main', fontSize: '15px' }} component="p">
                    File Upload
                  </Typography>
                  <Typography
                    sx={{
                      textAlign: 'left',
                      color: 'text.main',
                      fontSize: '12px',
                    }}
                    component="p"
                  >
                    Upload your file
                  </Typography>
                </Box>
              </Box>
            }
            {...a11yProps(1)}
          />
        ) : (
          <Tab
            sx={{ display: 'flex', justifyContent: 'start' }}
            label={
              <Box sx={{ display: 'flex' }}>
                <Box>
                  <Typography sx={{ color: 'text.main' }} variant="h3" component="h3">
                    <TbFileUpload />
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'left' }}>
                  <Typography sx={{ color: 'text.main', fontSize: '15px' }} component="p">
                    File Upload
                  </Typography>
                  <Typography
                    sx={{
                      textAlign: 'left',
                      color: 'text.main',
                      fontSize: '12px',
                    }}
                    component="p"
                  >
                    Upload your file
                  </Typography>
                </Box>
              </Box>
            }
            {...a11yProps(1)}
          />
        )}
      </Tabs>
    </Grid>
  );
};

export default ImportTabs;
