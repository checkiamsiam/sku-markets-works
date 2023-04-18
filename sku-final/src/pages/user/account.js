import { useState } from 'react';
// next
// @mui
import { Box, Container, Stack, Tab, Tabs, Typography } from '@mui/material';
// routes
// layouts
// components

// sections
import Iconify from 'components/iconify/Iconify';
import { useSettingsContext } from 'components/settings';
import { AccountSetup } from 'sections/@deshboard/user/account';
import AccountLegalSettings from 'sections/@deshboard/user/account/AccountLegalSettings';

import SvgColor from 'components/svg-color/SvgColor';
import { useGetUserQuery } from 'features/auth/authAPI';
import { Helmet } from 'react-helmet-async';
import AccountSellerboardSettign from 'sections/@deshboard/user/account/AccountSellerboardSettign';

export default function UserAccountPage() {
  // Get User Account Details
  useGetUserQuery();

  const { themeStretch } = useSettingsContext();

  const [currentTab, setCurrentTab] = useState('setup');

  const TABS = [
    {
      value: 'setup',
      label: 'Account Setup',
      icon: <Iconify icon="ic:round-account-box" />,
      component: <AccountSetup />,
    },
    {
      value: 'legal_settings',
      label: 'Legal Setup',
      icon: <Iconify icon="ic:outline-policy" />,
      component: <AccountLegalSettings />,
    },
    {
      value: 'sellerbaord_setup',
      label: 'Sellerboard Setup',
      icon: (
        <SvgColor src="/assets/icons/navbar/ic_sell.svg" sx={{ width: '20px', height: '20px' }} />
      ),
      component: <AccountSellerboardSettign />,
    },
  ];

  return (
    <>
      <Helmet>
        <title>Account Settings | SKU Markets</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 3, mb: 6 }}>
          <SvgColor
            src="/assets/icons/navbar/ic_user-edit.svg"
            sx={{ width: '25px', height: '25px' }}
          />
          <Typography>Account Settings</Typography>
        </Stack>

        <Tabs value={currentTab} onChange={(event, newValue) => setCurrentTab(newValue)}>
          {TABS.map((tab) => (
            <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
          ))}
        </Tabs>

        {TABS.map(
          (tab) =>
            tab.value === currentTab && (
              <Box key={tab.value} sx={{ mt: 5 }}>
                {tab.component}
              </Box>
            )
        )}
      </Container>
    </>
  );
}
