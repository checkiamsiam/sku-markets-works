import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Menu,
  Stack,
  TextField,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import AnimatedGradiantText from 'components/common/AnimatedGradiantText';
import MPLogo from 'components/common/MPLogo';
import Label from 'components/label/Label';
import LoadingScreen from 'components/loading-screen/LoadingScreen';
import PartnerStoreSlider from 'components/PartnersStore/PartnersStore/PartnerStoreSlider';
import WatchlistName from 'components/productDetails/WatchlistName';
import { useGetProductDetailQuery } from 'features/product/productAPI';
import { useCheckWatchlistForSkuQuery } from 'features/userSku/userSkuAPI';
import {
  useCreateWatchListMutation,
  useGetAllWatchListsQuery,
} from 'features/watchList/watchListAPI';
import useResponsive from 'hooks/useResponsive';
import { useState } from 'react';
import { AiFillStar, AiOutlinePlusCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { CloseIcon } from 'theme/overrides/CustomIcons';

export const lightGray = '#0d6efd';
const demoImage = 'https://api-dev-minimal-v4.vercel.app/assets/images/products/product_1.jpg';

const TopSkuCard = ({ id }) => {
  const isMd = useResponsive('up', 'md');

  // modal data
  const { data: product, isLoading1 } = useGetProductDetailQuery(id);

  const { data: productWatchlist } = useCheckWatchlistForSkuQuery(id);
  // Handle Watch List Menu
  const [watchListMenu, setWatchListMenu] = useState(null);
  const watchListMenuOpen = Boolean(watchListMenu);
  const handleStarClick = (event) => {
    setWatchListMenu(event.currentTarget);
  };
  const handleStarClose = () => {
    setWatchListMenu(null);
  };

  // Handle Watch List Dialog/Modal
  const [watchListModal, setWatchListModal] = useState(false);

  const handleWatchListModalOpen = () => {
    setWatchListModal(true);
  };

  const handleWatchListModalClose = () => {
    setWatchListModal(false);
  };

  // colors
  const gray = 'text.main';

  // watcglist API integration
  const { data, refetch, isSuccess } = useGetAllWatchListsQuery();

  const [createWatchList, { isLoading2 }] = useCreateWatchListMutation();
  const [title, setTitle] = useState('');

  const handleCreate = async () => {
    await createWatchList({ name: title });
    refetch();
    setTitle('');
    handleWatchListModalClose();
  };

  if (isLoading1 || isLoading2) {
    return <LoadingScreen />;
  }
  const productDummyData = [1, 2, 3, 4, 5, 6];

  return (
    <>
      <Box sx={{ bgcolor: 'background.paper', pt: 2, px: 2, borderRadius: 2, boxShadow: 1 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={1} alignItems="center">
          <Paper
            sx={{
              boxShadow: 3,
              minWidth: { md: '40%', xs: 'auto' },
              minHeight: '225px',
              flexGrow: 1,
              bgcolor: 'background.paper',
              borderRadius: 2,
              padding: 2,
              position: 'relative',
            }}
          >
            <Grid container spacing={1} alignItems="center">
              <Grid item xs={4} md={3}>
                <img
                  style={{ borderRadius: '20px' }}
                  width="200px"
                  height="200px"
                  alt="complex"
                  src={product?.all_images ? product?.all_images[0] : demoImage}
                />
              </Grid>
              <Grid item xs={8} md={7} container>
                <Stack item container direction="column" spacing={0} sx={{ mt: 2 }}>
                  <Grid item>
                    <Typography
                      component={Link}
                      to={`/skuMarket/${product?._id}`}
                      variant="caption"
                      sx={{ textDecoration: 'none', color: 'text.primary', fontWeight: 700 }}
                    >
                      {product?.sku}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="caption">{product?.title_en}</Typography>{' '}
                  </Grid>
                  <Grid item>
                    <Stack direction="row" spacing={1}>
                      <Typography
                        component={Link}
                        to={`/brand/${product?.brand_en}`}
                        variant="caption"
                        color="text.primary"
                        sx={{ textDecoration: 'none' }}
                      >
                        {product?.brand_en}
                      </Typography>
                      <Divider orientation="vertical" variant="middle" flexItem />
                      <Typography
                        component={Link}
                        to={`/category/${product?.category_en}`}
                        variant="caption"
                        color="text.primary"
                        sx={{ textDecoration: 'none' }}
                      >
                        {product?.category_en}
                      </Typography>
                      <Divider orientation="vertical" variant="middle" flexItem />
                      <MPLogo marketplace={product?.sku_marketplace} width={40} hight={15} />
                    </Stack>
                  </Grid>
                  <Grid item sx={{ mt: 1 }}>
                    <Typography
                      sx={{
                        fontSize: '13px',
                        fontWeight: 'bold',
                        color: (theme) =>
                          theme.palette.mode === 'light' ? 'black' : 'common.white',
                      }}
                      component="p"
                    >
                      {`${product?.buy_box_currency} ${product?.current_price ?? 0}`}
                    </Typography>
                    <Typography sx={{ fontSize: '12px', color: 'red' }} component="p">
                      <span
                        style={{
                          color:
                            product?.price_change >= 0
                              ? product?.price_change === 0
                                ? lightGray
                                : 'green'
                              : 'red',
                        }}
                      >
                        {product?.price_change} %
                      </span>
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
                      <Typography
                        sx={{
                          backgroundColor: '#37ae02',
                          fontSize: '10px',
                          color: 'white',
                          fontWeight: '400',
                          padding: '1px 7px 1px 7px',
                          borderRadius: '10px',
                          textAlign: 'center',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                        variant="p"
                      >
                        {product?.sku_rate} <AiFillStar />
                      </Typography>
                      <Typography sx={{ color: 'text.main', fontSize: '12px' }} variant="p">
                        ({product?.sku_rank})
                      </Typography>
                    </Stack>
                  </Grid>
                </Stack>
              </Grid>
            </Grid>
            <Box
              sx={{
                position: 'absolute',
                justifyContent: 'space-between',
                bottom: '35px',
                right: '20px',
                zIndex: 1,
              }}
            >
              {product?.tags?.length === 0 ? (
                <Label sx={{ borderRadius: 2 }} variant={'filled'} color="default">
                  Normal
                </Label>
              ) : (
                <Label sx={{ borderRadius: 2 }} variant={'filled'} color="default">
                  {product?.tags?.map((tag, i) => {
                    return `${tag}${i !== product?.tags?.length - 1 ? ', ' : ''}`;
                  })}
                </Label>
              )}
            </Box>

            <Box
              sx={{
                position: 'absolute',
                justifyContent: 'space-between',
                right: '20px',
                top: '10px',
              }}
            >
              <IconButton
                id="star-button"
                aria-controls={watchListMenuOpen && 'basic-menu'}
                aria-haspopup="true"
                aria-expanded={watchListMenuOpen && 'true'}
                onClick={handleStarClick}
                sx={{
                  '&:hover': {
                    border: '1px solid #0d6efd',
                    transition: '0.7s',
                  },
                  border: '1px solid transparent',
                }}
              >
                {productWatchlist?.data.length > 0 ? (
                  <StarIcon sx={{ color: '#0d6efd' }} />
                ) : (
                  <StarOutlineIcon sx={{ color: '#0d6efd' }} />
                )}
              </IconButton>
            </Box>
          </Paper>
          {isMd && (
            <Box
              sx={{
                boxShadow: 3,
                minWidth: { md: '60%', xs: 'auto' },
                minHeight: '225px',
                bgcolor: 'background.paper',
                borderRadius: 2,
                padding: 2,
                position: 'relative',
              }}
            >
              <PartnerStoreSlider userDummy={productDummyData} topSkuCard="topSkuCard" />
            </Box>
          )}
        </Stack>
        {!isMd && (
          <Box
            sx={{
              boxShadow: 3,
              // minWidth: { md: '60%', xs: 'auto' },
              // minHeight: '225px',
              bgcolor: 'background.paper',
              borderRadius: 2,
              padding: 2,
              mt: 2,
              position: 'relative',
            }}
          >
            <PartnerStoreSlider userDummy={productDummyData} topSkuCard="topSkuCard" />
          </Box>
        )}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', pr: 1 }}>
          <AnimatedGradiantText>Sponsored Ads</AnimatedGradiantText>
        </Box>
      </Box>

      {/* Watchlist Menu */}
      {isSuccess && (
        <Menu
          id="basic-menu"
          anchorEl={watchListMenu}
          open={watchListMenuOpen}
          onClose={handleStarClose}
          MenuListProps={{
            'aria-labelledby': 'star-button',
          }}
          sx={{ width: '300px', height: '300px', fontSize: '12px' }}
        >
          <div>
            <h3 style={{ fontSize: '12px', color: gray, padding: '0 10px' }}>Select Watch List</h3>

            {data?.map((dt) => (
              <WatchlistName
                key={dt._id}
                watchlist={dt}
                productId={id}
                handleStarClose={handleStarClose}
              />
            ))}

            <Stack
              sx={{ width: '200px', padding: '3px 20px' }}
              button
              onClick={() => {
                handleWatchListModalOpen();
                handleStarClose();
              }}
            >
              <Chip
                sx={{ cursor: 'pointer', backgroundColor: 'none !important' }}
                icon={<AiOutlinePlusCircle style={{ fontSize: '1.4rem' }} />}
                label="Add To watchList"
                variant="outlined"
              />
            </Stack>
          </div>
        </Menu>
      )}

      {/* WatchList Dialog/Modal */}

      <Dialog open={watchListModal} onClose={handleWatchListModalClose} fullWidth>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <DialogTitle sx={{ color: gray, fontWeight: 700, fontSize: '20px' }}>
            New WatchList
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleWatchListModalClose}
            sx={{ color: gray, marginRight: '.75rem' }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>
        <Divider light />
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="watchlist"
            label="Enter Watchlist Title"
            type="text"
            fullWidth
            variant="outlined"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions sx={{ padding: '1rem' }}>
          <Button variant="outlined" sx={{ color: gray }} onClick={handleWatchListModalClose}>
            Close
          </Button>
          <Button
            sx={{
              bgcolor: 'primary.main',
              color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
              '&:hover': {
                bgcolor: 'white',
                color: (theme) =>
                  theme.palette.mode === 'light' ? 'primary.main' : 'primary.main',
                border: (theme) => `1px solid ${theme.palette.primary.main}`,
              },
            }}
            onClick={handleCreate}
            disabled={title?.length === 0 || isLoading2}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TopSkuCard;
