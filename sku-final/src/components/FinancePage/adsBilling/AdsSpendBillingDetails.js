import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Accordion, AccordionDetails, AccordionSummary, Stack, Typography } from '@mui/material';
import useClickOutside from 'hooks/useSearchBarToggle';
import { useRef, useState } from 'react';
import DeepAdsAccDetails from './DeepAdsSpendsAccs';

const AdsSpendBillingDetails = ({data}) => {
  const [expanded, setExpanded] = useState(false);

  const payRef = useRef();

  useClickOutside(payRef, () => {
    setExpanded(false);
  });

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <Accordion
      ref={payRef}
      expanded={expanded}
      onChange={handleChange(true)}
      sx={{
        '& .css-90h10p-MuiButtonBase-root-MuiAccordionSummary-root': {
          padding: 0,
        },
        '& .Mui-expanded': {
          backgroundColor: 'transparent',
          boxShadow: 'none',
        },
        '& .css-15v22id-MuiAccordionDetails-root': {
          backgroundColor: 'transparent',
          boxShadow: 'none',
        },
      }}
    >
      <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
        <Stack width="100%" direction="row" justifyContent="space-between">
          <Typography
            variant="subtitle2"
            sx={{ display: 'flex', alignItems: 'center', gap: '2px' }}
          >
            <KeyboardArrowDownIcon /> Campaign Name
          </Typography>
          <Typography variant="subtitle1" fontSize="14px" fontWeight="700">
            SAR 0.00
          </Typography>
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <DeepAdsAccDetails/>
        <DeepAdsAccDetails/>
        <DeepAdsAccDetails/>
      </AccordionDetails>
    </Accordion>
  );
};

export default AdsSpendBillingDetails;
