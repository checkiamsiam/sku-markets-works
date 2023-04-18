import { Autocomplete, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import ThemeButton from 'components/common/ThemeButton';

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

const SelectPart = ({
  value,
  setValue,
  importType,
  setImportType,
  setSubImportType,
  importSubType,
}) => {
  const mainTypes = ['Portfolio', 'Alerts', 'SKU Markets', 'Partner Store'];
  let subTypes = [];
  switch (importType) {
    case 'Portfolio':
      subTypes = ['Add SKUs', 'Remove SKUs'];
      break;
    case 'Alerts':
      subTypes = [
        'Price Range',
        'Price Moves Above',
        'Price Moves Below',
        'Stock Range',
        'Stock Moves Above',
        'Stock Moves Below',
        'Stores Range',
        'Stores Moves Above',
        'Stores Moves Below',
        'SKU to Store',
        'SKU to Fulfillment',
      ];
      break;
    case 'SKU Markets':
      subTypes = ['Create SKUs', 'Activate SKUs', 'Deactivate SKUs'];
      break;
    case 'Partner Store':
      subTypes = ['Price Update', 'Stock Update'];
      break;
    default:
      subTypes = [];
      break;
  }
  return (
    <TabPanel value={value} index={0}>
      <Box sx={{ width: { md: '60%', xs: '100%' }, marginX: 'auto' }}>
        <Typography variant="h6" component="h6">
          Build Your import
        </Typography>
        <Autocomplete
          getOptionLabel={(option) => option}
          disablePortal
          id="csv-import-type"
          options={mainTypes}
          value={importType}
          onChange={(event, newValue) => {
            setImportType(newValue);
            setSubImportType(null);
          }}
          sx={{ my: 3 }}
          renderInput={(params) => <TextField {...params} label="Select Your type" />}
        />
        <Autocomplete
          getOptionLabel={(option) => option}
          disabled={!importType}
          disablePortal
          id="csv-import-type"
          options={subTypes}
          value={importSubType}
          onChange={(event, newValue) => {
            setSubImportType(newValue);
          }}
          sx={{ my: 3 }}
          renderInput={(params) => <TextField {...params} label="Select Your Sub-type" />}
        />

        <ThemeButton
          sx={{
            width: '100%',
            mb: 10,
          }}
          component="a"
          variant="contained"
          disabled={!importType || !importSubType}
          href={
            importType === 'Alert'
              ? 'https://docs.google.com/uc?export=download&id=1OazkOX0PmJi6STEdI8jq15YHQFGDGjss'
              : 'https://docs.google.com/uc?export=download&id=1rthI2uxjBzCPupRN5PE2UFZIeLVcPDWF'
          }
        >
          Download Template
        </ThemeButton>

        <Box sx={{ display: 'flex', justifyContent: 'end' }}>
          <ThemeButton
            onClick={() => {
              setValue(1);
            }}
            variant="contained"
            disabled={!importType || !importSubType}
          >
            Next
          </ThemeButton>
        </Box>
      </Box>
    </TabPanel>
  );
};

export default SelectPart;
