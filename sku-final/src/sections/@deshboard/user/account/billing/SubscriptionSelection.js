import { Box, Card, Grid, Typography } from '@mui/material';
import SubscriptionPlanCard from './SubscriptionPlansCard';

const objectives = [
  {
    id: 1,
    title: 'B2B Marketplace',
    description: 'Perfect for startups and growing businesses',
  },
  {
    id: 2,
    title: 'Data Analytics',
    description: 'Ideal for small to medium-sized organizations',
  },
  {
    id: 3,
    title: 'Portfolio For Other Platforms',
    description: 'Customized for specific organization SKUs',
  },
  {
    id: 4,
    title: 'B2C Partner Stores',
    description: 'Customized for sales channels Management',
  },
  {
    id: 5,
    title: 'Automate Your Tasks',
    description: 'Designed to activate automation solutions',
  },
  {
    id: 6,
    title: 'Team Management',
    description: 'Designed for higher volumes organizations',
  },
];

const SubscriptionSelection = ({ setSelectedObjective, selectedObjective }) => {
  return (
    <>
    <Card sx={{ p: 2, my: 2 , boxShadow: 5 }}>
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
      <Typography sx={{ pl: 2, fontSize: '14px', my: '10px' }}> Start with one of our preselected plans. You can save 20% by choosing Annually subscription </Typography>
      <Grid container spacing={2}>
        {objectives.map((objective) => (
          <Grid key={objective.id} item xs={12} sm={4} md={4} sx={{ cursor: 'pointer' }}>
            <SubscriptionPlanCard
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
