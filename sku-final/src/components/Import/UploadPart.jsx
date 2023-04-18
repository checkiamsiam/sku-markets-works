import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import ThemeButton from 'components/common/ThemeButton';
import CsvReader from 'components/Import/CsvReader';
import { useBulkUploadUPortfolioSkuMutation } from 'features/portfolio/portfolio.api';
import { useState } from 'react';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3, width: '100%' }}>{children}</Box>}
    </div>
  );
}

const UploadPart = ({ value, importType }) => {
  const [uploadSku] = useBulkUploadUPortfolioSkuMutation();
  const [data, setData] = useState([]);

  const handleImport = () => {
    uploadSku(data);
  };

  return (
    <TabPanel value={value} index={1}>
      <Grid container spacing={2}>
        <Grid item lg={12}>
          <CsvReader importType={importType} setData={setData} />
        </Grid>

        <Grid item lg={4}>
          <Box
            sx={{
              border: '1px solid gray',
              p: 2,
              borderRadius: '10px',
              height: { md: '330px', xs: 'auto' },
            }}
          >
            <Typography
              sx={{
                fontSize: '16px',
                fontWeight: '600',
                borderBottom: '1px solid gray',
              }}
              component="p"
            >
              About
            </Typography>
            <Box sx={{ fontSize: '14px', color: 'text.main' }}>
              <Typography sx={{ fontSize: '14px', color: 'text.main' }}>
                `This import enables you to import bulk {importType === 'Alert' ? 'Alerts' : 'SKU'}{' '}
                to actions to help you track your prices and stock to minimize your lose in
                decreasing your prices or even increasing it also allow you to track your SKUs stock
                to keep fulfilling it.`
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item lg={4}>
          <Box
            sx={{
              border: '1px solid gray',
              p: 2,
              borderRadius: '10px',
              height: { md: '330px', xs: 'auto' },
            }}
          >
            <Typography
              sx={{
                fontSize: '14px',
                fontWeight: '600',
                borderBottom: '1px solid gray',
              }}
              component="p"
            >
              IMPORT COLUMNS
            </Typography>
            <Box sx={{ fontSize: '14px', color: 'text.main' }}>
              <Typography sx={{ fontSize: '14px', color: 'text.main' }}>
                Please follow the layout
              </Typography>
              {importType === 'Alert' ? (
                <div>
                  <p> Layout: </p>
                  <ul
                    style={{
                      padding: '0px 25px 0px 25px ',
                    }}
                  >
                    <li>Mandatory Columns</li>
                    <li>Platform Country</li>
                    <li>Platform</li>
                    <li>SKU/ ASIN</li>
                    <li>Alert Type</li>
                    <li>Frequency</li>
                    <li>Delivery method</li>
                    <li>Active Status</li>
                  </ul>
                </div>
              ) : (
                <div>
                  <p> Layout: </p>
                  <ul
                    style={{
                      padding: '0px 25px 0px 25px ',
                    }}
                  >
                    <li>Mandatory Columns</li>
                    <li>Platform Country</li>
                    <li>Platform</li>
                    <li>SKU/ ASIN</li>
                  </ul>
                </div>
              )}
            </Box>
          </Box>
        </Grid>
        <Grid item lg={4}>
          <Box
            sx={{
              border: '1px solid gray',
              p: 2,
              borderRadius: '10px',
              height: { md: '330px', xs: 'auto' },
            }}
          >
            <Typography
              sx={{
                fontSize: '16px',
                fontWeight: '600',
                borderBottom: '1px solid gray',
              }}
              component="p"
            >
              TIPS
            </Typography>
            <Box sx={{ fontSize: '14px', color: 'text.main' }}>
              <Typography sx={{ fontSize: '14px', color: 'text.main' }}>
                Remove duplicate rows
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'end', my: 3 }}>
        <ThemeButton onClick={handleImport} variant="contained">
          Submit
        </ThemeButton>
      </Box>
    </TabPanel>
  );
};

export default UploadPart;
