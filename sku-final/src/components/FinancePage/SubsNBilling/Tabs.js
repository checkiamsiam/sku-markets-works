import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Button, Card, Divider, Stack, Typography, useTheme } from '@mui/material';
import AddNewCompanyModal from '../Wallet/AddNewCompanyModal';
import { useState } from 'react';

const ALL_TABS = [
  {
    label: 'Overview',
    value: 'Overview',
    id: 1,
    for: ['Sales Accounting', 'Subscription & Billing', "Ads' billing", 'SKU Markets Wallet'],
  },
  {
    label: 'Documents',
    value: 'Documents',
    id: 2,
    for: ['Sales Accounting', 'Subscription & Billing', "Ads' billing"],
  },
  {
    label: 'Promotions',
    value: 'Promotions',
    id: 3,
    for: ['Subscription & Billing', "Ads' billing"],
  },
  {
    label: 'Billing Transfers',
    value: 'Billing Transfers',
    id: 4,
    for: ['Subscription & Billing', "Ads' billing"],
  },
  {
    label: 'Payment Transfers',
    value: 'Payment Transfers',
    id: 5,
    for: ['Sales Accounting'],
  },
  {
    label: 'Affiliation',
    value: 'Affiliation',
    id: 6,
    for: ['SKU Markets Wallet'],
  },
  {
    label: 'Settings',
    value: 'Settings',
    id: 7,
    for: ['Sales Accounting', 'Subscription & Billing', "Ads' billing"],
  },
];

const TabsControl = ({ activeTab, setActiveTab, setCollapsible, collapsible, rootTab }) => {
  const theme = useTheme();
  const TABS = ALL_TABS.filter((tab) => tab.for.includes(rootTab));
  const [open, setOpenAccept] = useState(false);
  const handleClose = () => {
    setOpenAccept(false);
  };
  const handleShowAccept = () => {
    setOpenAccept(true);
  };
  return (
    <>
      <Stack sx={{ mb: 3, position: 'relative' }}>
        <Divider />
        <Stack
          onClick={() => setCollapsible(!collapsible)}
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{
            cursor: 'pointer',
            padding: '2px',
            backgroundColor: theme.palette.mode === 'dark' ? '#212B36' : '#EFF2F5',
            position: 'absolute',
            borderRadius: '5px',
            top: '-11px',
            right: '10px',
          }}
        >
          {collapsible ? <KeyboardArrowLeftIcon /> : <KeyboardArrowRightIcon />}
        </Stack>
      </Stack>

      {collapsible && (
        <>
          <Card sx={{ padding: '10px 10px 10px 0px', minHeight: '40vh' }}>
            {TABS.map((tab, i) => (
              <div key={i}>
                <Typography
                  key={tab.id}
                  onClick={() => setActiveTab(tab.value)}
                  fontSize="14px"
                  sx={{
                    cursor: 'pointer',
                    py: 1,
                    px: 1,
                    borderLeft:
                      activeTab === tab.value ? `3px solid ${'#2065D1'}` : '3px solid transparent',
                    ':hover': {
                      backgroundColor: (theme) =>
                        theme.palette.mode === 'dark' ? '#1F262E' : '#F6F7F8',
                    },
                  }}
                >
                  {tab.label}
                </Typography>
                {(tab.value === 'Documents' ||
                  (tab.value === 'Overview' && rootTab === 'SKU Markets Wallet')) && (
                  <Divider sx={{ mb: 2 }} />
                )}
              </div>
            ))}
          </Card>
          {rootTab === 'SKU Markets Wallet' && (
            <Card sx={{ p: 2, mt: 2 }}>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography
                  sx={{ whiteSpace: 'pre-line', width: '70%', fontSize: '14px', fontWeight: 700 }}
                >
                  Invite friends and earn
                </Typography>

                <Typography variant="h6" sx={{ width: '30%', fontSize: '18px' }}>
                  {' '}
                  SAR 50{' '}
                </Typography>
              </Stack>

              <Typography variant="body2" sx={{ mt: 1, mb: 2 }}>
                Invite Companies to get money into your wallet so you can use it anywhere, enjoy it
              </Typography>

              <Stack direction="row" spacing={1}>
                <Button
                  size="small"
                  sx={{
                    width: '100%',
                    py: 2.2,
                    bgcolor: 'primary.main',
                    border: (theme) => `1px solid ${theme.palette.primary.main}`,
                    color: (theme) =>
                      theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
                    '&:hover': {
                      bgcolor: 'white',
                      color: (theme) =>
                        theme.palette.mode === 'light' ? 'primary.main' : 'primary.main',
                      border: (theme) => `1px solid ${theme.palette.primary.main}`,
                    },
                  }}
                  onClick={handleShowAccept}
                >
                  Invite
                </Button>
              </Stack>
            </Card>
          )}
        </>
      )}
      <AddNewCompanyModal open={open} handleClose={handleClose} />
    </>
  );
};

export default TabsControl;
