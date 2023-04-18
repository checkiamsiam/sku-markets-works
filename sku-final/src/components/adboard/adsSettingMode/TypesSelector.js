import AppSettingsAltIcon from '@mui/icons-material/AppSettingsAlt';
import InstagramIcon from '@mui/icons-material/Instagram';
import WebAssetIcon from '@mui/icons-material/WebAsset';
import { Card, Divider, Grid, Typography } from '@mui/material';
import ObjectiveCard from './ObjectiveCard';

const objectives = [
  {
    id: 1,
    title: 'Deals',
    description: 'Drive sales & traffic onsite to your Partner Store & B2B Marketplace.',
    disable: false,
    icon: <WebAssetIcon sx={{ fontSize: '40px', color: '#1562ff' }} />,
  },
  {
    id: 2,
    title: 'Coupons',
    description: 'Drive sales & traffic on app to your Partner App & B2B Marketplace App',
    disable: true,
    icon: <AppSettingsAltIcon sx={{ fontSize: '40px', color: '#1562ff' }} />,
  },
  {
    id: 3,
    title: 'Clearances',
    description: 'Drive sales & traffic online to your Partner Store & App',
    disable: true,
    icon: <InstagramIcon sx={{ fontSize: '40px', color: '#1562ff' }} />,
  },
  {
    id: 4,
    title: 'Open Box',
    description: 'Drive sales & traffic online to your Partner Store & App',
    disable: true,
    icon: <InstagramIcon sx={{ fontSize: '40px', color: '#1562ff' }} />,
  },
];

const TypesSelector = ({ setSelectedObjective, selectedObjective, setActiveStep }) => {
  return (
    <>
      <Card sx={{ p: 2, my: 2, boxShadow: 5 }}>
        <Typography variant="subtitle1" sx={{ p: 2, fontSize: '14px' }}>
          Select Your Types
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography sx={{ pl: 2, fontSize: '14px', my: '10px' }}>
          Select Types for your campaign Group
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {objectives.map((objective) => (
            <Grid key={objective.id} item xs={12} sm={4} md={3}>
              <ObjectiveCard
                setActiveStep={setActiveStep}
                objective={objective}
                setSelectedObjective={setSelectedObjective}
                selectedObjective={selectedObjective}
                usedPlace="types"
              />
            </Grid>
          ))}
        </Grid>
      </Card>
    </>
  );
};

export default TypesSelector;
