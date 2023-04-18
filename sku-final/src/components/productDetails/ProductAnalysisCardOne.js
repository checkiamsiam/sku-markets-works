import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import {
  Box,
  Button,
  Card,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Menu,
  TextField,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { Stack } from '@mui/system';
import MPLogo from 'components/common/MPLogo';
import Label from 'components/label/Label';
import { useGetProductDetailQuery } from 'features/product/productAPI';
import {
  useCheckAlertForSkuQuery,
  useCheckWatchlistForSkuQuery,
} from 'features/userSku/userSkuAPI';
import {
  useCreateWatchListMutation,
  useGetAllWatchListsQuery,
} from 'features/watchList/watchListAPI';
import { useEffect, useRef, useState } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useParams } from 'react-router';
import ReactTimeAgo from 'react-time-ago';
import AddAlertOnPD from './addAlertModal';
import BuyboxSalePrice from './BuyboxSalePrice';
import WatchlistName from './WatchlistName';

const ProductAnalysisCardOne = () => {
  const { id } = useParams();
  const { data: product } = useGetProductDetailQuery(id);
  const { data: productWatchlist } = useCheckWatchlistForSkuQuery(id);
  const { data: productAlert } = useCheckAlertForSkuQuery(id);
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

  const [openAddAlertModal, setOpenAddAlertModal] = useState(false);
  const handleCloseNewAdd = () => setOpenAddAlertModal(false);
  const handleShowNewAdd = () => setOpenAddAlertModal(true);

  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (openAddAlertModal) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [openAddAlertModal]);

  // colors
  const gray = 'text.main';
  const lightGray = '#0d6efd';

  const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip placement="right" {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
    },
  }));

  const img = product?.all_images.length > 0 ? product.all_images[0] : null;

  // watcglist API integration
  const { data, refetch, isSuccess } = useGetAllWatchListsQuery();

  const [createWatchList, { isLoading }] = useCreateWatchListMutation();
  const [title, setTitle] = useState('');

  const handleCreate = async () => {
    await createWatchList({ name: title });
    refetch();
    setTitle('');
    handleWatchListModalClose();
  };
  return (
    <>
      <Card
        sx={{
          padding: '1.5rem',
          width: { lg: '60%' },
          borderRadius: '10px',
          boxShadow: 3,
        }}
      >
        <Stack direction={{ md: 'row' }} justifyContent="space-between" spacing={3}>
          <div style={{ width: { xs: '100%', md: '40%' } }}>
            <Stack direction="column" spacing={1} fontSize="12px">
              <Stack direction="row" spacing={3} alignItems="center" justifyContent="space-between">
                <Stack direction="row" spacing={2} alignItems="center">
                  <img src={img} width="80px" height="70px" alt={product?.sku} />
                  <Box
                    component="a"
                    target="_blank"
                    href={product?.sku_url}
                    rel="noreferrer"
                    sx={{ textDecoration: 'none', color: '#0d6efd' }}
                  >
                    {product?.sku}
                  </Box>
                </Stack>
              </Stack>
              <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={3}>
                <span style={{ fontWeight: 'bold', color: gray }}>
                  Rank{' '}
                  <HtmlTooltip
                    title={
                      <>
                        <em>{"And here's"}</em> <b>{'some'}</b> <u>{'amazing content'}</u>.{' '}
                        {"It's very engaging. Right?"}
                      </>
                    }
                  >
                    <InfoIcon htmlColor={lightGray} fontSize="3px" />
                  </HtmlTooltip>
                  {/* <Tooltip title="there is something" placement="top-end" arrow>
                    <InfoIcon htmlColor={lightGray} fontSize="3px" />
                  </Tooltip> */}
                </span>
                <span style={{ color: gray }}>{product?.sku_rank}</span>
              </Stack>
              <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={3}>
                <span style={{ fontWeight: 'bold', color: gray }}>
                  Rate
                  <HtmlTooltip
                    title={
                      <>
                        <em>{"And here's"}</em> <b>{'some'}</b> <u>{'amazing content'}</u>.{' '}
                        {"It's very engaging. Right?"}
                      </>
                    }
                  >
                    <InfoIcon htmlColor={lightGray} fontSize="3px" />
                  </HtmlTooltip>
                </span>
                <span style={{ color: gray }}>{product?.sku_rate}</span>
              </Stack>
              <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={3}>
                <span style={{ fontWeight: 'bold', color: gray }}>
                  SKU Marketplace{' '}
                  <HtmlTooltip
                    title={
                      <>
                        <em>{"And here's"}</em> <b>{'some'}</b> <u>{'amazing content'}</u>.{' '}
                        {"It's very engaging. Right?"}
                      </>
                    }
                  >
                    <InfoIcon htmlColor={lightGray} fontSize="3px" />
                  </HtmlTooltip>
                </span>

                <MPLogo marketplace={product?.sku_marketplace} />
              </Stack>
              <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={3}>
                <span style={{ fontWeight: 'bold', color: gray }}>
                  No. Of Sellers{' '}
                  <HtmlTooltip
                    title={
                      <>
                        <em>{"And here's"}</em> <b>{'some'}</b> <u>{'amazing content'}</u>.{' '}
                        {"It's very engaging. Right?"}
                      </>
                    }
                  >
                    <InfoIcon htmlColor={lightGray} fontSize="3px" />
                  </HtmlTooltip>
                </span>
                <span style={{ color: gray }}>{product?.number_of_sellers}</span>
              </Stack>
              <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={3}>
                <span style={{ fontWeight: 'bold', color: gray }}>
                  Fulfillment Type{' '}
                  <HtmlTooltip
                    title={
                      <>
                        <em>{"And here's"}</em> <b>{'some'}</b> <u>{'amazing content'}</u>.{' '}
                        {"It's very engaging. Right?"}
                      </>
                    }
                  >
                    <InfoIcon htmlColor={lightGray} fontSize="3px" />
                  </HtmlTooltip>
                </span>
                <span style={{ color: gray }}>{product?.buy_box_sku_fulfillment_type}</span>
              </Stack>
              <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={3}>
                <span style={{ fontWeight: 'bold', color: gray }}>
                  Tags{' '}
                  <HtmlTooltip
                    title={
                      <>
                        <em>{"And here's"}</em> <b>{'some'}</b> <u>{'amazing content'}</u>.{' '}
                        {"It's very engaging. Right?"}
                      </>
                    }
                  >
                    <InfoIcon htmlColor={lightGray} fontSize="3px" />
                  </HtmlTooltip>
                </span>
                <span style={{ color: gray }}>
                  {product?.tags.length > 0 ? (
                    <Label sx={{ borderRadius: 2 }} variant={'filled'} color="default">
                      {product?.tags[0]}
                    </Label>
                  ) : (
                    <Label sx={{ borderRadius: 2 }} variant={'filled'} color="default">
                      Normal
                    </Label>
                  )}
                </span>
              </Stack>
            </Stack>
          </div>
          <div style={{ width: { xs: '100%', md: '30%' } }}>
            <Stack
              direction="column"
              fontSize="12px"
              justifyContent="center"
              alignItems="center"
              spacing={0}
              color={gray}
              height="100%"
            >
              <Stack direction="row">
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
                <IconButton
                  id="notify-button"
                  aria-controls={openAddAlertModal && 'basic-menu'}
                  aria-haspopup="true"
                  aria-expanded={openAddAlertModal && 'true'}
                  onClick={handleShowNewAdd}
                  sx={{
                    '&:hover': {
                      border: '1px solid #0d6efd',
                      transition: '0.7s',
                    },
                    border: '1px solid transparent',
                  }}
                >
                  {productAlert?.data.length > 0 ? (
                    <NotificationsIcon sx={{ color: '#0d6efd' }} />
                  ) : (
                    <NotificationsNoneIcon sx={{ color: '#0d6efd' }} />
                  )}
                </IconButton>
              </Stack>
              <p>{productWatchlist?.data.length} Watchlists</p>
              <p>10 Alerts</p>
              <p style={{ fontWeight: 'bold' }}>
                Updated: &nbsp;{' '}
                {product && (
                  <ReactTimeAgo
                    date={new Date(
                      product?.price_updated_at || product?.date || product?.updatedAt
                    ).getTime()}
                    locale="en-US"
                  />
                )}
              </p>
            </Stack>
          </div>
          <div style={{ width: { xs: '100%', md: '40%' } }}>
            <BuyboxSalePrice id={id} />
          </div>
        </Stack>
      </Card>

      {/* Start::WatchList, Notification Menu / Modal / Dialog */}
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
            disabled={title?.length === 0 || isLoading}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
      {/* Add alert modal */}

      <AddAlertOnPD
        openAddNew={openAddAlertModal}
        handleCloseNewAdd={handleCloseNewAdd}
        sku={{
          id: id,
          _id: id,
          sku: product?.sku,
          sku_marketplace: product?.sku_marketplace,
          sku_rank: product?.sku_rank,
          buy_box_currency: product?.buy_box_currency,
          current_price: product?.current_price,
          stock: product?.stock_history?.length || 0,
          store: product?.stores?.length || 0,
          sku_rate: product?.sku_rate || 0,
        }}
        alertData={productAlert?.data[0] || {}}
      />
    </>
  );
};

export default ProductAnalysisCardOne;
