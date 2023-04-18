import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SaveIcon from '@mui/icons-material/Save';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Box,
  Divider,
  Link,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import useClickOutside from 'hooks/useSearchBarToggle';
import { currency } from 'layouts/dashboard/header/currency';
import { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import AddUserModal from './AddNewCompanyModal';

const SettingsTabWallet = () => {
  const [open, setOpenAccept] = useState(false);
  const [editable, setEditable] = useState(false);
  const ref = useRef();
  const [expand1, setExpand1] = useState(false);
  const [expand2, setExpand2] = useState(false);
  useClickOutside(ref, () => {
    setExpand1(false);
    setExpand2(false);
  });

  const handleClose = () => {
    setExpand2(false);
    setOpenAccept(false);
  };
  const handleShowAccept = () => {
    setExpand2(false);
    setOpenAccept(true);
  };
  return (
    <>
      <Box>
        <div ref={ref}>
          <Accordion
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
              <Typography sx={{ width: '33%', flexShrink: 0, color: '#3366FF' }}>
                Payment Account
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                <AccountCircleIcon />
                <Stack>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    User ID{' '}
                    <Link component={RouterLink} to="/help_center" underline="none">
                      <HelpOutlineIcon sx={{ fontSize: '16px' }} />
                    </Link>
                  </Typography>
                  <Typography variant="body2">6409933007dd7cac108d9cea</Typography>
                </Stack>
              </Stack>
              <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                <AccountCircleIcon />
                <Stack>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    User Wallet Payment ID{' '}
                    <Link component={RouterLink} to="/help_center" underline="none">
                      <HelpOutlineIcon sx={{ fontSize: '16px' }} />
                    </Link>
                  </Typography>
                  <Typography variant="body2">6409933007dd7cac108d9cea</Typography>
                </Stack>
              </Stack>
              <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                <AccountBoxIcon />
                <Stack>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    Company Name{' '}
                    <Link component={RouterLink} to="/help_center" underline="none">
                      <HelpOutlineIcon sx={{ fontSize: '16px' }} />
                    </Link>
                  </Typography>
                  <Typography variant="body2">SKU Markets</Typography>
                </Stack>
              </Stack>
              <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                <CurrencyExchangeIcon />
                <Stack>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    Select Your Currency{' '}
                    {!editable ? (
                      <Link
                        onClick={() => setEditable(true)}
                        sx={{ cursor: 'pointer' }}
                        underline="none"
                      >
                        <EditIcon sx={{ fontSize: '16px' }} />
                      </Link>
                    ) : (
                      <Link
                        onClick={() => setEditable(false)}
                        sx={{ cursor: 'pointer' }}
                        underline="none"
                      >
                        <SaveIcon sx={{ fontSize: '16px' }} />
                      </Link>
                    )}
                  </Typography>
                  <Autocomplete
                    disablePortal
                    disabled={!editable}
                    id="Store-Currency-campaigns"
                    size="small"
                    defaultValue={currency[0]}
                    options={currency}
                    getOptionLabel={(option) => option.value}
                    sx={{ width: '300px' }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    )}
                    required
                  />
                </Stack>
              </Stack>
              <Stack direction="row" spacing={2}>
                <CalendarMonthIcon />
                <Stack>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    How you Pay
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    Payment Cycle
                  </Typography>
                  <Typography variant="subtitle2">
                    You will be charged on the 1st of each month. if your balance has positive
                    amount we will deduct it, you will be charged immediately up to 15 days. Learn
                    more..{' '}
                    <Link component={RouterLink} to="/help_center" underline="none">
                      Learn more.
                    </Link>
                  </Typography>
                </Stack>
              </Stack>
            </AccordionDetails>
          </Accordion>
          {/* <Accordion
            expanded={expand2}
            onChange={(e, expand) => {
              setExpand1(false);
              setExpand2(expand);
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
              <Stack width="100%" direction="row" justifyContent="space-between">
                <Typography sx={{ color: '#3366FF' }}>Management Users</Typography>
                <Box sx={{ color: 'text.secondary', mr: 10 }}>
                  <Typography variant="subtitle2" textAlign="center" sx={{}}>
                    Users
                  </Typography>
                  <Typography variant="h4" textAlign="center" sx={{}}>
                    1
                  </Typography>
                </Box>
              </Stack>
            </AccordionSummary>
            <AccordionDetails>
              <Divider />
              <Stack direction="row" spacing={2} sx={{ my: 2 }}>
                <AccountCircleIcon sx={{ fontSize: '35px' }} />
                <Stack>
                  <Typography variant="subtitle2">Primary Contact</Typography>
                  <Typography variant="body2">Soud Shabaan</Typography>
                  <Typography variant="body2">soudShabaan@skumarkets.com</Typography>
                </Stack>
              </Stack>
              <Divider />
              <Stack direction="row" spacing={2} sx={{ my: 2 }}>
                <AccountCircleIcon sx={{ fontSize: '35px' }} />
                <Stack>
                  <Typography variant="subtitle2">Secondary Contact</Typography>
                  <Typography variant="body2">Bibi Shabaan</Typography>
                  <Typography variant="body2">bibishabaan@skumarkets.com</Typography>
                </Stack>
              </Stack>
              <Divider />
              <Stack direction="row" justifyContent="end" sx={{ mt: 2 }}>
                <Link
                  onClick={handleShowAccept}
                  sx={{ cursor: 'pointer', fontSize: '14px', fontWeight: 700 }}
                  underline="none"
                >
                  ADD NEW USERS
                </Link>
              </Stack>
            </AccordionDetails>
          </Accordion> */}
        </div>
      </Box>
      <AddUserModal open={open} handleClose={handleClose} />
    </>
  );
};

export default SettingsTabWallet;
