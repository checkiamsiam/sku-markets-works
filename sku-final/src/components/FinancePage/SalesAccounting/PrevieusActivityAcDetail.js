import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import useClickOutside from 'hooks/useSearchBarToggle';
import { useRef, useState } from 'react';

const PrevieusActivityAcDetail = ({ data }) => {
  const [expanded, setExpanded] = useState(false);

  const payRef = useRef();

  useClickOutside(payRef, () => {
    setExpanded(false);
  });

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  return (
    <div>
      <Divider />
      <Grid container sx={{ mt: 3 }}>
        <Grid item xs={12} md={8}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="subtitle2">Balance from {data.preMonth}</Typography>
            <Typography variant="subtitle1" fontSize="14px" fontWeight="700" sx={{ my: 1 }}>
              SAR 0.00
            </Typography>
          </Stack>
          <Divider />
          <Stack direction="row" justifyContent="space-between" sx={{ my: 2 }}>
            <Typography variant="subtitle2">Gross Merchandise Volume</Typography>
            <Typography variant="subtitle1" fontSize="14px" fontWeight="700">
              SAR 0.00
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between" sx={{ my: 2 }}>
            <Typography variant="subtitle2">Referral Fees (%5)</Typography>
            <Typography variant="subtitle1" fontSize="14px" fontWeight="700">
              SAR 0.00
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between" sx={{ my: 2 }}>
            <Typography variant="subtitle2">VAT and Taxes (%15)</Typography>
            <Typography variant="subtitle1" fontSize="14px" fontWeight="700">
              SAR 0.00
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between" sx={{ my: 2 }}>
            <Typography variant="subtitle2">Net Revenue</Typography>
            <Typography variant="subtitle1" fontSize="14px" fontWeight="700">
              SAR 0.00
            </Typography>
          </Stack>
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
                  <KeyboardArrowDownIcon /> Payments
                </Typography>
                <Typography variant="subtitle1" fontSize="14px" fontWeight="700">
                  SAR 0.00
                </Typography>
              </Stack>
            </AccordionSummary>
            <AccordionDetails>
              <Stack direction="row" justifyContent="space-between" sx={{ my: 2 }}>
                <Typography variant="subtitle2">Feb 23, 2023</Typography>
                <Typography variant="subtitle2">Transaction ID: S13348848484</Typography>
                <Typography variant="subtitle1" fontSize="14px" fontWeight="700">
                  SAR 0.00
                </Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between" sx={{ my: 2 }}>
                <Typography variant="subtitle2">Feb 25, 2023</Typography>
                <Typography variant="subtitle2">Transaction ID: S187658848484</Typography>
                <Typography variant="subtitle1" fontSize="14px" fontWeight="700">
                  SAR 0.00
                </Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between" sx={{ my: 2 }}>
                <Typography variant="subtitle2">Feb 29, 2023</Typography>
                <Typography variant="subtitle2">Transaction ID: S13344458484</Typography>
                <Typography variant="subtitle1" fontSize="14px" fontWeight="700">
                  SAR 0.00
                </Typography>
              </Stack>
            </AccordionDetails>
          </Accordion>

          <Divider />
          <Stack direction="row" justifyContent="space-between" sx={{ my: 2 }}>
            <Typography variant="subtitle2">Ending Balance</Typography>
            <Typography variant="subtitle1" fontSize="14px" fontWeight="700">
              SAR 0.00
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} md={0.2}>
          <Divider orientation="vertical" />
        </Grid>
        <Grid item xs={12} md={3.8} sx={{ px: 3 }}></Grid>
      </Grid>
    </div>
  );
};

export default PrevieusActivityAcDetail;
