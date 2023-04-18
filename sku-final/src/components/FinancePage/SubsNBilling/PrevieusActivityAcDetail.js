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
import useFormatCurrency from 'hooks/useFormatCurrency';
import { format } from 'date-fns';

const PrevieusActivityAcDetail = ({ data }) => {
  const formatCurrency = useFormatCurrency();
  const {
    subscription_fees,
    prev_month,
    prev_balance,
    net_cost,
    vat_rate,
    vat_price,
    promotion,
    discount_rate,
    discount_price,
    total_payment,
    ending_balance,
    payments,
  } = data || {};

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
            <Typography variant="subtitle2">VAT and Taxes (%{vat_rate})</Typography>
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
              {formatCurrency(promotion)}
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
            <Typography variant="subtitle2">Ending Balance</Typography>
            <Typography variant="subtitle1" fontSize="14px" fontWeight="700">
              {formatCurrency(ending_balance)}
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
