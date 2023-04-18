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
import useClickOutside from 'hooks/useSearchBarToggle';
import { useRef, useState } from 'react';
import { FaEquals } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';
import MakeAPaymentModal from './MakeAPaymentModal';
import OverviewBillingAccordionDetails from './OverviewBillingAccordionDetails';

const BillingOverviewOther = ({ setActiveTab }) => {
  const [open, setOpenAccept] = useState(false);
  const handleClose = () => {
    setOpenAccept(false);
  };
  const handleShowAccept = () => {
    setOpenAccept(true);
  };
  const ref = useRef();
  const [expand1, setExpand1] = useState(false);
  const [expand2, setExpand2] = useState(false);
  useClickOutside(ref, () => {
    setExpand1(false);
    setExpand2(false);
  });
  return (
    <>
      <Grid container spacing={3} sx={{ marginTop: '-45px' }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, height: '100%' }}>
            <Typography variant="subtitle1" fontSize="14px" fontWeight="700" sx={{ mb: 1 }}>
              Next Payment
            </Typography>
            <Typography variant="subtitle2" fontSize="12px" sx={{ mb: 6 }}>
              {' '}
              You don't have any upcoming payments
            </Typography>
            <Link
              onClick={handleShowAccept}
              underline="always"
              sx={{ cursor: 'pointer', fontSize: '12px' }}
            >
              Make a Payment
            </Link>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, height: '100%' }}>
            <Typography variant="subtitle1" fontSize="14px" fontWeight="700" sx={{ mb: 1 }}>
              Last Payment
            </Typography>
            <Typography variant="subtitle2" fontSize="12px" sx={{ mb: 5 }}>
              {' '}
              You haven't made any payments yet
            </Typography>
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
            ref={ref}
            expanded={expand1}
            onChange={(e, expand) => {
              setExpand2(false);
              setExpand1(expand);
            }}
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
                  <Typography variant="h6">March 2023</Typography>
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
                  <Typography variant="subtitle2">Balance From February</Typography>
                  <Typography variant="subtitle1" fontSize="14px" fontWeight="700" sx={{ my: 1 }}>
                    SAR 0.00
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
                    SAR 0.00
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
                    SAR 0.00
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
                    SAR 0.00
                  </Typography>
                </Grid>
              </Grid>
            </AccordionSummary>
            <AccordionDetails>
              <OverviewBillingAccordionDetails setActiveTab={setActiveTab} />
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
      <MakeAPaymentModal open={open} handleClose={handleClose} />
    </>
  );
};

export default BillingOverviewOther;
