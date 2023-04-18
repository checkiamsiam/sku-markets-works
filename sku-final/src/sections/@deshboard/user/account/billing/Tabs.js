import { Card, Divider, Typography } from '@mui/material';
import { useState } from 'react';

const TABS = [
  {
    label: 'Overview',
    value: 'Overview',
    id: 1,
  },
  {
    label: 'Documents',
    value: 'Documents',
    id: 2,
  },
  {
    label: 'Promotions',
    value: 'Promotions',
    id: 3,
  },
  {
    label: 'Billing Transfers',
    value: 'Billing Transfers',
    id: 4,
  },
  {
    label: 'Settings',
    value: 'Settings',
    id: 5,
  },
];

const TabsControl = ({activeTab , setActiveTab}) => {

  return (
    <Card sx={{ padding: '10px 10px 10px 0px' , minHeight: "60vh" }}>
        {TABS.map((tab) => ( <><Typography key={tab.id}
        onClick={() => setActiveTab(tab.value)}
        fontSize="14px"
        sx={{
          cursor: 'pointer',
          py: 1,
          px: 1,
          borderLeft: activeTab === tab.value ? `3px solid ${"#2065D1"}` : "3px solid transparent",
          ':hover': {
            backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1F262E' : '#F6F7F8'),
          },
        }}
      >
        {tab.label}
      </Typography>
      {tab.value === "Documents" && <Divider sx={{mb:2}} />}
      </>
      ))}
    </Card>
  );
};

export default TabsControl;
