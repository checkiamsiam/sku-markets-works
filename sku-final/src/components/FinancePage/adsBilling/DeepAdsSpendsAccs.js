import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Accordion, AccordionDetails, AccordionSummary, Stack, Typography } from '@mui/material';
import useClickOutside from 'hooks/useSearchBarToggle';
import { useRef, useState } from 'react';

const DeepAdsAccDetails = () => {
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
            <KeyboardArrowDownIcon /> Campaign' group
          </Typography>
          <Typography variant="subtitle1" fontSize="14px" fontWeight="700">
            SAR 0.00
          </Typography>
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <Stack direction="row" justifyContent="space-between" sx={{ my: 2 }}>
          <Typography variant="subtitle2">Feb 23, 2023</Typography>
          <Typography variant="subtitle2">Ad Name: Banner Ad</Typography>
          <Typography variant="subtitle1" fontSize="14px" fontWeight="700">
            SAR 0.00
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between" sx={{ my: 2 }}>
          <Typography variant="subtitle2">Feb 23, 2023</Typography>
          <Typography variant="subtitle2">Ad Name: Banner Ad</Typography>
          <Typography variant="subtitle1" fontSize="14px" fontWeight="700">
            SAR 0.00
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between" sx={{ my: 2 }}>
          <Typography variant="subtitle2">Feb 23, 2023</Typography>
          <Typography variant="subtitle2">Ad Name: Banner Ad</Typography>
          <Typography variant="subtitle1" fontSize="14px" fontWeight="700">
            SAR 0.00
          </Typography>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default DeepAdsAccDetails;
