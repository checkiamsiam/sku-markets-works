import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import RemoveIcon from '@mui/icons-material/Remove';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  Grid,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { FaEquals } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';
import MakeAPaymentModal from './MakeAPaymentModal';
import OverviewBillingAccordionDetails from './OverviewBillingAccordionDetails';

import useFormatCurrency from 'hooks/useFormatCurrency';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';

const BillingOverviewOther = ({ setActiveTab }) => {
  const formatCurrency = useFormatCurrency();
  const { lastPlan } = useSelector(state => state.subscription);
  const {
    plan_start,
    prev_month,
    prev_balance,
    net_cost,
    ending_balance,
    subscription_fees,
    total_payment,
    payments,
    isCurrent,
  } = lastPlan || {};

  const [paymentCount, setPaymentCount] = useState(0);
  const [lastPaymentDate, setLastPaymentDate] = useState(new Date());

  useEffect(() => {
    setPaymentCount(payments?.length);
    if (payments?.length > 0 && paymentCount) {
      setLastPaymentDate(new Date(payments[paymentCount - 1]?.date));
    }
  }, [payments, paymentCount]);

  const [open, setOpenAccept] = useState(false);
  const [expand, setExpand] = useState(false);

  const handleClose = () => {
    setOpenAccept(false);
  };

  const handleShowAccept = () => {
    setOpenAccept(true);
  };

  return (
    <>
    {!isCurrent ? (
      <Card 
        sx={{
          p: 3,
          width: '100%',
          height: '200px',
          display: 'grid',
          placeItems: 'center'
        }}
      >
        <Typography variant='subtitle2' sx={{ color: 'text.secondary' }}>
          There is no subscription activities in this month.
        </Typography>
      </Card>
      ) : (
      <Grid container spacing={3} sx={{ marginTop: '-45px' }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, height: '100%' }}>
            <Typography variant="subtitle1" fontSize="14px" fontWeight="700">
              Next Payment
            </Typography>
            {lastPlan?.ending_balance >= 0.1 ? (
              <>
                <Typography variant="subtitle1" fontSize="12px" sx={{ mb: 0.8 }}>
                  You have due payment.
                </Typography>
                <Typography variant="subtitle1" fontSize="20px" sx={{ mb: 2, fontWeight: 600 }}>
                  {formatCurrency(lastPlan?.ending_balance)}
                </Typography>
                <Link
                  onClick={handleShowAccept}
                  underline="always"
                  sx={{ cursor: 'pointer', fontSize: '12px' }}
                >
                  Make a Payment
                </Link>
              </>
            ) : (
              <>
                <Typography variant="subtitle2" fontSize="12px" sx={{ mt: 1, mb: 6 }}>
                  {' '}
                  You don't have any upcoming payments
                </Typography>
              </>
            )}
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, height: '100%' }}>
            <Typography variant="subtitle1" fontSize="14px" fontWeight="700" sx={{ mb: 1 }}>
              Last Payment
            </Typography>

            {paymentCount <= 0 ? (
              <Typography variant="subtitle2" fontSize="12px" sx={{ mb: 5 }}>
                You haven't made any payments yet
              </Typography>
            ) : (
              <>
                <Typography variant="subtitle2" fontSize="20px" sx={{ mb: 3, fontWeight: 600 }}>
                  {formatCurrency(payments[paymentCount-1]?.cost)}
                </Typography>

                <Typography variant="subtitle2" fontSize="12px" sx={{ mb: 1 }}>
                  {format(lastPaymentDate, "PP")}
                </Typography>
              </>
            )}
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, height: '100%' }}>
            <Typography variant="subtitle1" fontSize="14px" fontWeight="700" sx={{ mb: 1 }}>
              How Payment Works
            </Typography>
            <Typography variant="subtitle2" fontSize="12px" sx={{ mb: 1 }}>
              {' '}
              You will be charged :
              <ul style={{ marginLeft: '18px' }}>
                <li>On the first of each month</li>
                <li>Payment Attempts through 15 days</li>
              </ul>
            </Typography>
            <Link
              onClick={() => setActiveTab('Documents')}
              href="#"
              underline="always"
              sx={{ fontSize: '12px' }}
            >
              Download Your Invoices
            </Link>
          </Card>
        </Grid>
        <Grid item xs={12} md={12}>
          <Accordion
            expanded={expand}
            onChange={(e, expand) => setExpand(expand)}
            sx={{
              p: 2,
              boxShadow: 5,
              transition: 'all 0.3s ease-in-out',
              ':hover': {
                backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1F262E' : '#F6F7F8'),
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Grid container>
                <Grid item xs={12} md={2.7}>
                  <Typography variant="h6">
                    {format(new Date(plan_start), 'MMMMMMMMM yyyy')}
                  </Typography>
                  <Link
                    component={RouterLink}
                    to="/help_center"
                    underline="always"
                    sx={{ fontSize: '12px' }}
                  >
                    Numbers are updated real time.
                  </Link>
                </Grid>
                <Grid item xs={12} md={2}>
                  <Typography variant="subtitle2">Balance From {format(new Date(prev_month), 'MMM')}</Typography>
                  <Typography variant="subtitle1" fontSize="14px" fontWeight="700" sx={{ my: 1 }}>
                    {formatCurrency(prev_balance)}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={0.5}>
                  <Stack sx={{ mt: 2 }}>
                    <AddIcon />
                  </Stack>
                </Grid>

                <Grid item xs={12} md={1.5}>
                  <Typography variant="subtitle2">
                    Net Cost
                    <Link component={RouterLink} to="/help_center" underline="none">
                      <HelpOutlineIcon sx={{ fontSize: '16px' }} />
                    </Link>
                  </Typography>
                  <Typography variant="subtitle1" fontSize="14px" fontWeight="700" sx={{ my: 1 }}>
                    {formatCurrency(net_cost)}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={0.5}>
                  <Stack sx={{ mt: 2 }}>
                    <RemoveIcon />
                  </Stack>
                </Grid>

                <Grid item xs={12} md={1.5}>
                  <Typography variant="subtitle2">Payments</Typography>
                  <Typography variant="subtitle1" fontSize="14px" fontWeight="700" sx={{ my: 1 }}>
                    {formatCurrency(total_payment)}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={0.5}>
                  <Stack sx={{ mt: 2 }}>
                    <FaEquals />
                  </Stack>
                </Grid>
                <Grid item xs={12} md={2}>
                  <Typography variant="subtitle2">
                    Current Balance
                    <Link component={RouterLink} to="/help_center" underline="none">
                      <HelpOutlineIcon sx={{ fontSize: '16px' }} />
                    </Link>
                  </Typography>
                  <Typography variant="subtitle1" fontSize="14px" fontWeight="700" sx={{ my: 1 }}>
                    {formatCurrency(ending_balance)}
                  </Typography>
                </Grid>
              </Grid>
            </AccordionSummary>
            <AccordionDetails>
              <OverviewBillingAccordionDetails
                setActiveTab={setActiveTab}
                subscription={lastPlan}
              />
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
      )}
      <MakeAPaymentModal open={open} handleClose={handleClose} data={lastPlan} />
    </>
  );
};

export default BillingOverviewOther;
