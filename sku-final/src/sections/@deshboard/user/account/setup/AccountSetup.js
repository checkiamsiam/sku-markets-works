import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  Grid,
  Stack,
  Typography,
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Iconify from 'components/iconify/Iconify';
import useClickOutside from 'hooks/useSearchBarToggle';
import { useRef, useState } from 'react';
import AccountBillingAddressBook from '../billing/AccountBillingAddressBook';
import AddNewAddress from '../billing/AddNewAddress';
import AccountAbout from './AccountAbout';
import AccountChangePassword from './AccountChangePassword';
import AccountNotifications from './AccountNotifications';
import ImageCard from './ImageCard';

export default function AccountSetup() {
  const ref = useRef();
  const [expand1, setExpand1] = useState(false);
  const [expand2, setExpand2] = useState(false);
  const [expand3, setExpand3] = useState(false);
  const [expand4, setExpand4] = useState(false);
  useClickOutside(ref, () => {
    setExpand1(false);
    setExpand2(false);
    setExpand3(false);
    setExpand4(false);
  });
  // new address
  const [openAddress, setOpenAddress] = useState(false);
  const handleCloseAddress = () => setOpenAddress(false);
  const handleShowAddress = () => setOpenAddress(true);
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4} sx={{ position: 'relative' }}>
          <Box sx={{ position: 'sticky', top: 6, right: 0 }}>
            <ImageCard />
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 2 }}>
            <div ref={ref}>
              <Accordion
                expanded={expand1}
                onChange={(e, expand) => {
                  setExpand4(false);
                  setExpand3(false);
                  setExpand2(false);
                  setExpand1(expand);
                }}
                sx={{
                  p: 2,
                  boxShadow: 5,
                  transition: 'all 0.3s ease-in-out',
                  ':hover': {
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'dark' ? '#1F262E' : '#F6F7F8',
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography sx={{ width: '33%', flexShrink: 0, color: '#3366FF' }}>
                    Account
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <AccountAbout />
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expand2}
                onChange={(e, expand) => {
                  setExpand4(false);
                  setExpand3(false);
                  setExpand1(false);
                  setExpand2(expand);
                }}
                sx={{
                  p: 2,
                  boxShadow: 5,
                  transition: 'all 0.3s ease-in-out',
                  ':hover': {
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'dark' ? '#1F262E' : '#F6F7F8',
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Stack width="100%" direction="row" justifyContent="space-between">
                    <Typography sx={{ color: '#3366FF' }}>Change Password</Typography>
                  </Stack>
                </AccordionSummary>
                <AccordionDetails>
                  <AccountChangePassword />
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expand3}
                onChange={(e, expand) => {
                  setExpand1(false);
                  setExpand2(false);
                  setExpand4(false);
                  setExpand3(expand);
                }}
                sx={{
                  p: 2,
                  boxShadow: 5,
                  transition: 'all 0.3s ease-in-out',
                  ':hover': {
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'dark' ? '#1F262E' : '#F6F7F8',
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Stack width="100%" direction="row" justifyContent="space-between">
                    <Typography sx={{ color: '#3366FF' }}>Notifications</Typography>
                  </Stack>
                </AccordionSummary>
                <AccordionDetails>
                  <AccountNotifications />
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expand4}
                onChange={(e, expand) => {
                  setExpand1(false);
                  setExpand2(false);
                  setExpand3(false);
                  setExpand4(expand);
                }}
                sx={{
                  p: 2,
                  boxShadow: 5,
                  transition: 'all 0.3s ease-in-out',
                  ':hover': {
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'dark' ? '#1F262E' : '#F6F7F8',
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Stack width="100%" direction="row" justifyContent="space-between">
                    <Typography sx={{ color: '#3366FF' }}>Warehouses</Typography>
                    <Box sx={{ color: 'text.secondary', mr: 5 }}>
                      <Button
                        onClick={handleShowAddress}
                        size="small"
                        startIcon={<Iconify icon="eva:plus-fill" />}
                      >
                        New Address
                      </Button>
                    </Box>
                  </Stack>
                </AccordionSummary>
                <AccordionDetails>
                  <AccountBillingAddressBook />
                </AccordionDetails>
              </Accordion>
            </div>
          </Card>
        </Grid>
      </Grid>
      <AddNewAddress
        open={openAddress}
        handleClose={handleCloseAddress}
        text={'New Address Added Successfully'}
        title="Add New Billing Address"
      />
    </>
  );
}
