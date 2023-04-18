import { Card, Divider, Drawer, Link, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import CompaniesDrawer from './groupTargetDrawers/CompaniesDrawer';
import GraphicDrawer from './groupTargetDrawers/GraphicDrawer';
import MCBKDrawer from './groupTargetDrawers/MCBKDrawer';

const GroupTarget = ({ setActiveStep }) => {
  const dummyFunctionality = () => {
    setActiveStep((prevActiveStep) => {
      if (prevActiveStep === 1) return prevActiveStep + 1;
      else return prevActiveStep;
    });
  };
  const [openMCBKDrawer, setOpenMCBKDrawer] = useState(false);
  const toggleMCBKDrawer = () => {
    setOpenMCBKDrawer(!openMCBKDrawer);
  };
  const [openGraphicDrawer, setOpenGraphicDrawer] = useState(false);
  const toggleGraphicDrawer = () => {
    setOpenGraphicDrawer(!openGraphicDrawer);
  };
  const [openCompaniesDrawer, setOpenCompaniesDrawer] = useState(false);
  const toggleCompaniesDrawer = () => {
    setOpenCompaniesDrawer(!openCompaniesDrawer);
  };
  return (
    <>
      <Card onClick={dummyFunctionality} sx={{ p: 2, my: 2, boxShadow: 5 }}>
        <Typography variant="subtitle1" sx={{ p: 2, fontSize: '14px' }}>
          Set up an ads group Targets
        </Typography>
        <Typography sx={{ pl: 2, fontSize: '14px' }}>
          A group Targets contains a set of related keywords and segmentation for your ads included
          in this ads group. For best results, try to focus all the ads and keywords in an ad group
          on one marektplace, or one category, or one brand, or one SKU.
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="subtitle1" sx={{ px: 2, fontSize: '14px', mb: '10px' }}>
          Marketplace/ Categories/ Brands/ Keywords
        </Typography>
        <Typography sx={{ pl: 2, fontSize: '14px' }}>
          Marketplace/ Categories/ Brands/ Keywords are marketplaces, categories, brands, and words
          or phrases that are used to match your ads with the terms people are searching for, or
          browsing it.
        </Typography>
        <Stack direction="row" justifyContent="end" spacing={2} sx={{ mt: 2 }}>
          <Link
            onClick={toggleMCBKDrawer}
            sx={{ cursor: 'pointer', fontSize: '14px', fontWeight: 700 }}
            underline="none"
          >
            Select Your Target
          </Link>
        </Stack>
        <Drawer
          anchor="right"
          open={openMCBKDrawer}
          onClose={toggleMCBKDrawer}
          BackdropProps={{
            invisible: true,
          }}
          PaperProps={{
            sx: { width: '60%' },
          }}
        >
          <MCBKDrawer toggleDrawer={toggleMCBKDrawer} />
        </Drawer>
        <Divider sx={{ my: 2 }} />
        <Typography variant="subtitle1" sx={{ px: 2, fontSize: '14px', mb: '10px' }}>
          Geographic ( Languages & Locations)
        </Typography>
        <Typography sx={{ pl: 2, fontSize: '14px' }}>
          Brands are used to match your ads when people are searching for it or browsing it.
        </Typography>
        <Stack direction="row" justifyContent="end" spacing={2} sx={{ mt: 2 }}>
          <Link
            onClick={toggleGraphicDrawer}
            sx={{ cursor: 'pointer', fontSize: '14px', fontWeight: 700 }}
            underline="none"
          >
            Select Your Target
          </Link>
        </Stack>
        <Drawer
          anchor="right"
          open={openGraphicDrawer}
          onClose={toggleGraphicDrawer}
          BackdropProps={{
            invisible: true,
          }}
          PaperProps={{
            sx: { width: '60%' },
          }}
        >
          <GraphicDrawer toggleDrawer={toggleGraphicDrawer} />
        </Drawer>

        <Divider sx={{ my: 2 }} />
        <Typography variant="subtitle1" sx={{ px: 2, fontSize: '14px', mb: '10px' }}>
          Companies (Interests & Types)
        </Typography>
        <Typography sx={{ pl: 2, fontSize: '14px' }}>
          Brands are used to match your ads when people are searching for it or browsing it.
        </Typography>
        <Stack direction="row" justifyContent="end" spacing={2} sx={{ mt: 2 }}>
          <Link
            onClick={toggleCompaniesDrawer}
            sx={{ cursor: 'pointer', fontSize: '14px', fontWeight: 700 }}
            underline="none"
          >
            Select Your Target
          </Link>
        </Stack>
        <Drawer
          anchor="right"
          open={openCompaniesDrawer}
          onClose={toggleCompaniesDrawer}
          BackdropProps={{
            invisible: true,
          }}
          PaperProps={{
            sx: { width: '60%' },
          }}
        >
          <CompaniesDrawer toggleDrawer={toggleCompaniesDrawer} />
        </Drawer>
      </Card>
    </>
  );
};

export default GroupTarget;
