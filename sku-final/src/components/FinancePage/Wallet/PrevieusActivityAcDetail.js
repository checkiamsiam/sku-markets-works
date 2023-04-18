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

const PrevieusActivityAcDetail = ({ setActiveTab }) => {
  const ref = useRef();

  const [expandedIn, setExpandedIn] = useState(false);

  const payRefIn = useRef();

  useClickOutside(payRefIn, () => {
    setExpandedIn(false);
  });

  const handleChangeIn = (panel) => (event, newExpanded) => {
    setExpandedIn(newExpanded ? panel : false);
  };
  const [expandedOut, setExpandedOut] = useState(false);

  const payRefOut = useRef();

  useClickOutside(payRefOut, () => {
    setExpandedOut(false);
  });

  const handleChangeOut = (panel) => (event, newExpanded) => {
    setExpandedOut(newExpanded ? panel : false);
  };

  useClickOutside(ref, () => {
    setExpandedOut(false);
    setExpandedIn(false);
  });
  return (
    <div ref={ref}>
      <Divider />
      <Grid container sx={{ mt: 3 }}>
        <Grid item xs={12} md={8}>
          <Accordion
            ref={payRefIn}
            expanded={expandedIn}
            onChange={handleChangeIn(true)}
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
                  <KeyboardArrowDownIcon /> Inflow Transactions
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
          <Accordion
            ref={payRefOut}
            expanded={expandedOut}
            onChange={handleChangeOut(true)}
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
                  <KeyboardArrowDownIcon /> Outflow Transactions
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
