import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Box, Chip, Divider, Grid, IconButton, Stack, Typography, useTheme } from '@mui/material';
import { lightGray } from 'components/sellerboard/rfq/new/SellTable';
import { toggleAdsSettingsMode, toggleCampaignMode, toggleGroupMode } from 'features/adboard/adboardSlice';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import SelectAndSearchCampaign from './SelectAndSearchCampaign';

const AdboardControl = ({ setCollapsible, collapsible }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [cam, setCam] = useState(false);
  // Handle add portfolio Dialog/Modal
  const [addAdboardOpen, setAddAdboardOpen] = useState(false);

  const handleAddCampaignModalOpen = () => {
    setAddAdboardOpen(true);
  };

  const handleAddCampaignModalClose = () => {
    setAddAdboardOpen(false);
  };
  const [searchCamList, setSearchCamList] = useState('');
  const [searchGrpList, setSearchGrpList] = useState('');
  return (
    <>
      <Grid item width="100%" xs={12} md={12} lg={12} sx={{ position: 'sticky', top: '75px' }}>
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
          <Stack width="100%" height="100%">
            {cam ? (
              <Box
                boxShadow={5}
                borderRadius={2}
                padding={7}
                sx={{
                  backgroundColor: theme.palette.mode === 'dark' ? '#212B36' : 'white',
                }}
              >
                <Typography textAlign="center" fontSize="20px" fontWeight="500">
                  You currently have no campaigns.
                </Typography>
                <Stack
                  onClick={() => dispatch(toggleCampaignMode())}
                  direction="row"
                  justifyContent="center"
                  sx={{ padding: '3px 30px', mt: 2 }}
                >
                  <Chip
                    sx={{
                      cursor: 'pointer',
                      background: lightGray,
                      color: 'white',
                    }}
                    icon={
                      <AddIcon
                        style={{
                          fontSize: '1.4rem',
                          color: 'white',
                        }}
                      />
                    }
                    label="Add Campaign"
                    variant="outlined"
                  />
                </Stack>
              </Box>
            ) : (
              <>
                <Stack
                  direction="row"
                  onClick={() => dispatch(toggleCampaignMode())}
                  sx={{ mb: 2 }}
                >
                  <Chip
                    sx={{
                      cursor: 'pointer',
                      background: lightGray,
                      color: 'white',
                    }}
                    icon={
                      <AddIcon
                        style={{
                          fontSize: '1.4rem',
                          color: 'white',
                        }}
                      />
                    }
                    label="Add Campaign"
                    variant="outlined"
                  />
                </Stack>
                <Box
                  boxShadow={5}
                  borderRadius={2}
                  padding={2}
                  sx={{
                    backgroundColor: theme.palette.mode === 'dark' ? '#212B36' : 'white', mb:2
                  }}
                >
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography>Campaign list</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} sx={{ my: '4px' }}>
                    <Box width="80%">
                      <SelectAndSearchCampaign search={searchCamList} setSearch={setSearchCamList} optn={[{ skuId: 'Marketing' }, { skuId: 'Growth' }, { skuId: 'Viral' }, { skuId: 'Serve' }]} />
                    </Box>
                    <Box width="20%">
                      <IconButton
                        disabled={!searchCamList}
                        onClick={() => dispatch(toggleGroupMode())}
                        sx={{
                          width: '100%',
                          border: `1px solid #EFF2F5`,
                          p: 1,
                          borderRadius: '7px',
                          cursor: 'pointer',
                          height: '100%',
                        }}
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Stack>
                </Box>
                <Box
                  boxShadow={5}
                  borderRadius={2}
                  padding={2}
                  sx={{
                    backgroundColor: theme.palette.mode === 'dark' ? '#212B36' : 'white',
                  }}
                >
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography>Group list</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} sx={{ my: '4px' }}>
                    <Box width="80%">
                      <SelectAndSearchCampaign search={searchGrpList} setSearch={setSearchGrpList} optn={[{ skuId: 'Group 1' }, { skuId: 'Group 2' }, { skuId: 'Group 3' }, { skuId: 'Group 4' }]}/>
                    </Box>
                    <Box width="20%">
                      <IconButton
                        disabled={!searchGrpList}
                        onClick={() => dispatch(toggleAdsSettingsMode())}
                        sx={{
                          width: '100%',
                          border: `1px solid #EFF2F5`,
                          p: 1,
                          borderRadius: '7px',
                          cursor: 'pointer',
                          height: '100%',
                        }}
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Stack>
                </Box>
              </>
            )}
          </Stack>
        )}
      </Grid>
    </>
  );
};

export default AdboardControl;
