import { Switch, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import { defaultCurrency } from 'layouts/dashboard/header/currency';
import useCurrency from 'layouts/dashboard/header/useCurrency';
import { useState } from 'react';
import PricingPlan from './PricingPlan';

const PricingCard = () => {
  const getCrncy = useCurrency();
  // console.log(getCrncy);
  const [checked, setChecked] = useState(true);

  const [freeValue, setFreeValue] = useState(0);
  const [launchValue, setLaunchValue] = useState(200);
  const [professionalValue, setProfessionalValue] = useState(800);
  const [businessValue, setBusinessValue] = useState(480);
  const [growValue, setGrowValue] = useState(320);
  const [teamValue, setTeamValue] = useState(1200);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    if (!checked) {
      setFreeValue(0);
      setLaunchValue(200);
      setProfessionalValue(800);
      setBusinessValue(480);
      setGrowValue(320);
      setTeamValue(1200);
    } else {
      let LaunchDisValue = launchValue + (launchValue * 25) / 100;
      setLaunchValue(LaunchDisValue);
      let ProfessionalDisValue = professionalValue + (professionalValue * 25) / 100;
      setProfessionalValue(ProfessionalDisValue);
      let BusinessDisValue = businessValue + (businessValue * 25) / 100;
      setBusinessValue(BusinessDisValue);
      let GrowDisValue = growValue + (growValue * 25) / 100;
      setGrowValue(GrowDisValue);
      let teamValues = teamValue + (teamValue * 25) / 100;
      setTeamValue(teamValues);
    }
  };

  return (
    <div id="PricingPlans">
      <Container maxWidth="xl" id="PricingPlans">
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ textAlign: 'center', width: '400px' }}>
            <Typography sx={{ marginY: '20px' }} variant="h4" component="h5">
              Pricing Plans
            </Typography>
            <Typography sx={{ fontSize: '13px', textAlign: 'center' }} component="p">
              Start with one of our preselected plans. You can save 20% by choosing Annually
              subscription
            </Typography>
            <div style={{ marginTop: '32px', color: 'text.main' }}>
              Monthly
              <Switch
                checked={checked}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'controlled' }}
              />
              Annually
            </div>
          </Box>
        </div>
        <PricingPlan
          checked={checked}
          freeValue={freeValue}
          launchValue={launchValue}
          professionalValue={professionalValue}
          businessValue={businessValue}
          growValue={growValue}
          getCrncy={getCrncy}
          defaultCurrency={defaultCurrency}
          teamValue={teamValue}
        />
      </Container>
    </div>
  );
};

export default PricingCard;
