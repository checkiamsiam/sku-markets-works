import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import useTheme from '@mui/material/styles/useTheme';
import axios from 'axios';
import MPLogo from 'components/common/MPLogo';
import LoadingScreen from 'components/loading-screen/LoadingScreen';
import EditPortfolioModal from 'components/portfolio/EditPortfolios';
import AddPortfolioModal from 'components/portfolio/addPortfolioModal';
import AddSkuToPortfolio from 'components/portfolio/addSkuToPortfolioModal';
import { MenuProps } from 'components/watchlist/WatchlistData/SelectedWatchlist';
import { setSelectedPortfolio, toggleDetailVisible } from 'features/portfolio/portfolioSlice';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SkuStatusDonutChart from '../skuStatusTab/SkuStatusDonutChart';

const lightGray = '#0d6efd';
const borderColor = '#EFF2F5';

const PortfolioControl = ({ setCollapsible, collapsible, data }) => {
  const theme = useTheme();
  const { token } = useSelector((state) => state.user);
  const { portfolios, selectedPortfolio, isHideDetails } = useSelector((state) => state.portfolios);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleSetPort = async (portfolio) => {
    setLoading(true);
    const { data } = await axios.get(
      `https://sku-markets.herokuapp.com/api/v1/portfolio/${portfolio?.store_id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setLoading(false);
    dispatch(setSelectedPortfolio({ ...portfolio, store_products: data?.data }));
  };

  // Handle add portfolio Dialog/Modal
  const [portfolioModal, setPortfolioModal] = useState(false);

  const handlePortfolioModalOpen = () => {
    setPortfolioModal(true);
  };

  const handlePortfolioModalClose = () => {
    setPortfolioModal(false);
  };
  // Handle add sku to portfolio Dialog/Modal
  const [addSKUModal, setAddSKUModal] = useState(false);

  const handleSKUModalOpen = () => {
    setAddSKUModal(true);
  };

  const handleSKUModalModalClose = () => {
    setAddSKUModal(false);
  };

  // Handle Edit portfolio Dialog/Modal
  const [editPortfoliosModal, setEditPortfoliosModal] = useState(false);

  const handleEditPortfoliosModalOpen = () => {
    setEditPortfoliosModal(true);
  };

  const handleEditPortfoliosModalClose = () => {
    setEditPortfoliosModal(false);
  };

  const toggleCollaps = () => {
    setCollapsible(!collapsible);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Grid item width="100%" xs={12} md={12} lg={12} sx={{ position: 'sticky', top: '75px' }}>
        <Stack sx={{ mb: 3, position: 'relative' }}>
          <Divider />
          <Stack
            onClick={toggleCollaps}
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
          <Grid
            container
            spacing={3}
            sx={{ opacity: collapsible ? 1 : 0, transition: '.5s linear' }}
          >
            <Grid item xs={12} md={12} lg={12}>
              {data && data.length === 0 && (
                <Stack width="100%" height="100%">
                  <Box
                    boxShadow={5}
                    borderRadius={2}
                    padding={7}
                    sx={{
                      backgroundColor: theme.palette.mode === 'dark' ? '#212B36' : 'white',
                    }}
                  >
                    <Typography textAlign="center" fontSize="20px" fontWeight="500">
                      You currently have no portfolios
                    </Typography>
                    <Stack
                      direction="row"
                      justifyContent="center"
                      sx={{ padding: '3px 40px', mt: 2 }}
                      onClick={() => {
                        handlePortfolioModalOpen();
                      }}
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
                        label="Add Portfolio"
                        variant="outlined"
                      />
                    </Stack>
                  </Box>
                </Stack>
              )}
              {data && data.length > 0 && (
                <Stack width="100%" height="100%" spacing={2}>
                  <Stack
                    direction="row"
                    onClick={() => {
                      handleSKUModalOpen();
                    }}
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
                      label="Add New SKUs"
                      variant="outlined"
                    />
                  </Stack>
                  <Box
                    boxShadow={5}
                    borderRadius={2}
                    padding={2}
                    sx={{
                      backgroundColor: theme.palette.mode === 'dark' ? '#212B36' : 'white',
                    }}
                  >
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography>Portfolio list</Typography>
                      <Stack
                        onClick={handleEditPortfoliosModalOpen}
                        direction="row"
                        alignItems="center"
                        spacing={1}
                        sx={{
                          cursor: 'pointer',
                          ':hover': {
                            color: lightGray,
                          },
                        }}
                      >
                        <EditIcon sx={{ width: '14px' }} />
                        <Typography fontSize="14px">Edit</Typography>
                      </Stack>
                    </Stack>
                    <Stack direction="row" spacing={2} sx={{ my: '4px' }}>
                      <Box width="80%">
                        {(selectedPortfolio.store_id || portfolios[0]?.store_id) && (
                          <FormControl
                            sx={{
                              minWidth: '100%',
                            }}
                            size="small"
                          >
                            <Select
                              sx={{
                                borderRadius: 1,
                                width: '100%',
                                backgroundColor:
                                  theme.palette.mode === 'dark' ? '#212B36' : 'white',
                              }}
                              value={selectedPortfolio.store_id || portfolios[0]?.store_id}
                              input={<OutlinedInput />}
                              renderValue={(selected) => {
                                if (selected?.length === 0) {
                                  return <>{portfolios[0]?.store_id}</>;
                                }
                                return selectedPortfolio.store_id || portfolios[0]?.store_id;
                              }}
                              MenuProps={MenuProps}
                              inputProps={{
                                'aria-label': 'Without label',
                              }}
                            >
                              {portfolios.map((portfolio, i) => (
                                <MenuItem
                                  key={i}
                                  sx={{
                                    fontSize: '15px',
                                  }}
                                  value={portfolio.store_id}
                                  onClick={() => handleSetPort(portfolio)}
                                >
                                  {portfolio.store_id}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        )}
                      </Box>
                      <Box width="20%">
                        <Stack
                          onClick={() => {
                            handlePortfolioModalOpen();
                          }}
                          direction="row"
                          justifyContent="center"
                          alignItems="center"
                          sx={{
                            border: `1px solid ${borderColor}`,
                            p: 1,
                            borderRadius: '7px',
                            cursor: 'pointer',
                            height: '100%',
                          }}
                        >
                          <AddIcon fontSize="small" />
                        </Stack>
                      </Box>
                    </Stack>
                    <Stack
                      direction="row"
                      spacing={2}
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography>Current Live SKUs</Typography>
                        {isHideDetails ? (
                          <VisibilityOffIcon
                            onClick={() => dispatch(toggleDetailVisible())}
                            sx={{ cursor: 'pointer' }}
                          />
                        ) : (
                          <RemoveRedEyeIcon
                            onClick={() => dispatch(toggleDetailVisible())}
                            sx={{ cursor: 'pointer' }}
                          />
                        )}
                      </Stack>
                      <Stack sx={{ mr: '4px' }}>
                        <MPLogo marketplace={selectedPortfolio?.sku_marketplace} />
                      </Stack>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography fontSize="20px" fontWeight="600">
                        {isHideDetails ? '****' : 0.0}
                      </Typography>
                      <Stack alignItems="center" justifyContent="center">
                        <Typography textAlign="right">24h Change</Typography>
                        <Typography textAlign="right" sx={{ color: 'green' }}>
                          (0%)
                        </Typography>
                      </Stack>
                    </Stack>
                  </Box>
                  {selectedPortfolio?.store_products?.length !== 0 && (
                    <Box
                      boxShadow={5}
                      borderRadius={2}
                      padding={2}
                      sx={{
                        backgroundColor: theme.palette.mode === 'dark' ? '#212B36' : 'white',
                      }}
                    >
                      <Typography fontSize="16px">Portfolio Analytics</Typography>
                      <Divider />
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ mt: 2 }}
                      >
                        <Stack>
                          <Typography textAlign="right">Total GMV</Typography>
                          <Typography fontWeight="700">${isHideDetails ? '****' : 0.0}</Typography>
                        </Stack>
                        <Stack>
                          <Typography>Total Revenue</Typography>
                          <Typography fontWeight="700" textAlign="left" sx={{ color: 'green' }}>
                            ${isHideDetails ? '****' : 0.0} (0.00%)
                          </Typography>
                        </Stack>
                      </Stack>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ my: 2 }}
                      >
                        <Stack>
                          <Typography>Realized Revenue</Typography>
                          <Typography fontWeight="700" sx={{ color: 'green' }}>
                            ${isHideDetails ? '****' : 0.0}
                          </Typography>
                        </Stack>
                        <Stack>
                          <Typography textAlign="right">Unrealized Revenue</Typography>
                          <Typography fontWeight="700" textAlign="left" sx={{ color: 'green' }}>
                            ${isHideDetails ? '****' : 0.0}
                          </Typography>
                        </Stack>
                      </Stack>
                    </Box>
                  )}
                </Stack>
              )}
            </Grid>
          </Grid>
        )}
        {collapsible && selectedPortfolio?.store_products?.length !== 0 && (
          <Grid xs={12} sx={{ mt: 2 }}>
            <SkuStatusDonutChart />
          </Grid>
        )}
      </Grid>

      {/* modals / dialogs  */}

      <AddPortfolioModal
        handlePortfolioModalOpen={handlePortfolioModalOpen}
        portfolioModal={portfolioModal}
        handlePortfolioModalClose={handlePortfolioModalClose}
        handleSKUModalOpen={handleSKUModalOpen}
      />
      <AddSkuToPortfolio
        addSKUModal={addSKUModal}
        handleSKUModalOpen={handleSKUModalOpen}
        handleSKUModalModalClose={handleSKUModalModalClose}
      />
      <EditPortfolioModal
        editPortfoliosModal={editPortfoliosModal}
        handleEditPortfoliosModalOpen={handleEditPortfoliosModalOpen}
        handleEditPortfoliosModalClose={handleEditPortfoliosModalClose}
      />
    </>
  );
};

export default PortfolioControl;
