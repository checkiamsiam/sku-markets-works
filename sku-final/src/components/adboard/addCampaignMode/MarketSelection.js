import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import WebAssetIcon from '@mui/icons-material/WebAsset';
import { Card, Divider, Grid, Typography } from '@mui/material';
import ObjectiveCard from './ObjectiveCard';
import StorefrontIcon from '@mui/icons-material/Storefront';

const objectives = [
  {
    id: 1,
    title: 'B2B Marketplace',
    description: 'Drive sales & traffic onsite to your Partner Store & B2B Marketplace.',
    disable: false,
    icon: <LocalOfferIcon sx={{ fontSize: '40px', color: '#1562ff' }} />,
  },
  {
    id: 2,
    title: 'Partner Store',
    description: 'Drive sales & traffic on app to your Partner App & B2B Marketplace App',
    disable: true,
    icon: <StorefrontIcon sx={{ fontSize: '40px', color: '#1562ff' }} />,
  },
];

const MarketSelection = ({ setSelectedObjective, selectedObjective, setActiveStep }) => {
  return (
    <>
      <Card sx={{ p: 2, my: 2, boxShadow: 5 }}>
        <Typography variant="subtitle1" sx={{ p: 2, fontSize: '14px' }}>
          Select Your Market
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography sx={{ pl: 2, fontSize: '14px', my: '10px' }}>
          Select Market where you want to show your campaign
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {objectives.map((objective) => (
            <Grid key={objective.id} item xs={12} sm={4} md={3}>
              <ObjectiveCard
                setActiveStep={setActiveStep}
                objective={objective}
                setSelectedObjective={setSelectedObjective}
                selectedObjective={selectedObjective}
                usedPlace="market"
              />
            </Grid>
          ))}
        </Grid>
      </Card>
    </>
  );
};

export default MarketSelection;
