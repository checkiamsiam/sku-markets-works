import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Grid,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import useClickOutside from 'hooks/useSearchBarToggle';
import { useRef, useState } from 'react';

import useFormatCurrency from 'hooks/useFormatCurrency';
import { format } from 'date-fns';

const OverviewBillingAccordionDetails = ({ setActiveTab, subscription }) => {
  const formatCurrency = useFormatCurrency();
  const {
    prev_month,
    prev_balance,
    subscription_fees,
    vat_rate,
    vat_price,
    net_cost,
    discount_rate,
    discount_price,
    total_payment,
    ending_balance,
    payments } = subscription || {};


  const [expanded, setExpanded] = useState(false);

  const payRef = useRef();

  // useClickOutside(payRef, () => {
  //   setExpanded(false);
  // });

  // const handleChange = (panel) => (event, newExpanded) => {
  //   setExpanded(newExpanded ? panel : false);
  // };
  return (
    <div>
      <Divider />
      <Grid container sx={{ mt: 3 }}>
        <Grid item xs={12} md={8}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="subtitle2">Balance from {format(new Date(prev_month), 'MMMMMMMMM')}</Typography>
            <Typography variant="subtitle1" fontSize="14px" fontWeight="700" sx={{ my: 1 }}>
              {formatCurrency(prev_balance)}
            </Typography>
          </Stack>
          <Divider />
          <Stack direction="row" justifyContent="space-between" sx={{ my: 2 }}>
            <Typography variant="subtitle2">Subscription Fees</Typography>
            <Typography variant="subtitle1" fontSize="14px" fontWeight="700">
              {formatCurrency(subscription_fees)}
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between" sx={{ my: 2 }}>
            <Typography variant="subtitle2">Estimated VAT and Taxes (%{vat_rate})</Typography>
            <Typography variant="subtitle1" fontSize="14px" fontWeight="700">
              {formatCurrency(vat_price)}
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between" sx={{ my: 2 }}>
            <Typography variant="subtitle2">Net Cost</Typography>
            <Typography variant="subtitle1" fontSize="14px" fontWeight="700">
              {formatCurrency(net_cost)}
            </Typography>
          </Stack>
          <Divider />
          <Stack direction="row" justifyContent="space-between" sx={{ my: 2 }}>
            <Typography variant="subtitle2">Promotion</Typography>
            <Typography variant="subtitle1" fontSize="14px" fontWeight="700">
              {formatCurrency(0)}
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between" sx={{ my: 2 }}>
            <Typography variant="subtitle2">Discount (%{discount_rate})</Typography>
            <Typography variant="subtitle1" fontSize="14px" fontWeight="700">
              {formatCurrency(discount_price)}
            </Typography>
          </Stack>
          <Accordion
            ref={payRef}
            expanded={expanded}
            onChange={(e, expand) => setExpanded(expand)}
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
                  {formatCurrency(total_payment)}
                </Typography>
              </Stack>
            </AccordionSummary>
            <AccordionDetails>
            {payments?.map((item, i) => <Stack 
              key={i}
              direction="row"
              justifyContent="space-between"
              sx={{ my: 2 }}
            >
                <Typography variant="subtitle2">{format(new Date(item?.date), "PP")}</Typography>
                <Typography variant="subtitle2">Transaction ID: {item?.transaction_id}</Typography>
                <Typography variant="subtitle1" fontSize="14px" fontWeight="700">
                  {formatCurrency(item?.cost)}
                </Typography>
              </Stack>
              )}
            </AccordionDetails>
          </Accordion>
          <Divider />
          <Stack direction="row" justifyContent="space-between" sx={{ my: 2 }}>
            <Typography variant="subtitle2">Current Balance</Typography>
            <Typography variant="subtitle1" fontSize="14px" fontWeight="700">
              {formatCurrency(ending_balance)}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} md={0.2}>
          <Divider orientation="vertical" />
        </Grid>
        <Grid item xs={12} md={3.8} sx={{ px: 3 }}>
          <Typography variant="subtitle1" fontSize="14px" fontWeight="700" sx={{ mb: 1 }}>
            Documents
          </Typography>
          <Typography variant="subtitle2" fontSize="12px" sx={{ mb: 1 }}>
            {' '}
            Documents should be available by 2nd Business day of april.
          </Typography>
          <Link
            href="#"
            onClick={() => setActiveTab('Documents')}
            underline="always"
            sx={{ fontSize: '12px' }}
          >
            View and Download March's billing Documents.
          </Link>
        </Grid>
      </Grid>
    </div>
  );
};

export default OverviewBillingAccordionDetails;
