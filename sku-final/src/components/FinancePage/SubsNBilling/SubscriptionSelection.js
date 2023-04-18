import { Box, Card, Grid, Stack, Switch, Typography } from '@mui/material';
import { useState } from 'react';
import SubscriptionPlanCard from './SubscriptionPlansCard';

const objectives = [
  {
    id: 1,
    title: 'B2B Marketplace',
    price: 0,
    description: 'Perfect for startups and growing businesses',
  },
  {
    id: 2,
    title: 'B2C Partner Stores',
    price: 200,
    description: 'Customized for sales channels Management',
  },
  {
    id: 3,
    title: 'Data Analytics',
    price: 320,
    description: 'Ideal for small to medium-sized organizations',
  },
  {
    id: 4,
    title: 'Portfolio for Other Platforms',
    price: 480,
    description: 'Customized for specific organization SKUs',
  },
  {
    id: 5,
    title: 'Automate Your Tasks',
    price: 800,
    description: 'Designed to activate automation solutions',
  },
  {
    id: 6,
    title: 'Team Management',
    price: 1200,
    description: 'Designed for higher volumes organizations',
  },
];

const SubscriptionSelection = ({ setSelectedObjective, selectedObjective, checked, setChecked }) => {
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  return (
    <>
      <Card sx={{ p: 2, my: 2, boxShadow: 5 }}>
        <Box
          sx={{
            borderBottom: '2px solid #f9f9f9',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            pb: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="subtitle1" sx={{ pl: 2, fontSize: '14px' }}>
              Select Your Subscription Plan
            </Typography>
          </Box>
        </Box>
        <Stack direction="row" justifyContent="space-between" sx={{ px: 2 }}>
          <Typography sx={{ fontSize: '14px', my: '10px' }}>
            {' '}
            Start with one of our preselected plans. You can save 20% by choosing Annually
            subscription{' '}
          </Typography>
          <div style={{ color: 'text.main', fontSize: '14px' }}>
            Monthly
            <Switch
              checked={checked}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'controlled' }}
            />
            Annually
          </div>
        </Stack>

        <Grid container spacing={2}>
          {objectives.map((objective) => (
            <Grid key={objective.id} item xs={12} sm={4} md={4} sx={{ cursor: 'pointer' }}>
              <SubscriptionPlanCard
                checked={checked}
                objective={objective}
                setSelectedObjective={setSelectedObjective}
                selectedObjective={selectedObjective}
              />
            </Grid>
          ))}
        </Grid>
      </Card>
    </>
  );
};

export default SubscriptionSelection;
