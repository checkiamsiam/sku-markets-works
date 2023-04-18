import { Box, Card, Grid, Typography } from '@mui/material';
import ObjectiveCard from './ObjectiveCard';

const objectives = [
  {
    id: 1,
    title: 'Deals',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, deserunt.',
  },
  {
    id: 2,
    title: 'Clearances',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, deserunt.',
  },
  {
    id: 3,
    title: 'Coupons',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, deserunt.',
  },
  {
    id: 4,
    title: 'Coupons',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, deserunt.',
  },
  {
    id: 5,
    title: 'Deals',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, deserunt.',
  },
  {
    id: 6,
    title: 'Clearances',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, deserunt.',
  },
  {
    id: 7,
    title: 'Coupons',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, deserunt.',
  },
  {
    id: 8,
    title: 'Coupons',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, deserunt.',
  },
];

const ObjectiveSelection = ({ setSelectedObjective, selectedObjective }) => {
  return (
    <>
     <Typography variant="h6" sx={{ pl: 2, fontSize: '14px' , mb: 2 }}>
            What's is your campaign objective?
          </Typography>
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
            Select Your Objective
          </Typography>
        </Box>
      </Box>
      <Typography sx={{ pl: 2, fontSize: '14px', my: '10px' }}> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis officia error culpa? Rem sequi eligendi voluptas quis in. </Typography>
      <Grid container spacing={2}>
        {objectives.map((objective) => (
          <Grid key={objective.id} item xs={12} sm={4} md={3} sx={{ cursor: 'pointer' }}>
            <ObjectiveCard
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

export default ObjectiveSelection;
