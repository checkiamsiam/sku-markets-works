import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { IconButton, Stack } from '@mui/material';
import AddAlertOnPD from 'components/productDetails/addAlertModal';
import BuyboxSalePrice from 'components/productDetails/BuyboxSalePrice';
import {
  useCheckAlertForSkuQuery,
  useCheckWatchlistForSkuQuery,
} from 'features/userSku/userSkuAPI';
import {
  useCreateWatchListMutation,
  useGetAllWatchListsQuery,
} from 'features/watchList/watchListAPI';
import { useEffect, useRef, useState } from 'react';
import ReactTimeAgo from 'react-time-ago';
import AlertModal from '../StoreSkuTable/modals/AlertModal';
import WatchlistModal from '../StoreSkuTable/modals/WatchlistModal';
// colors
const gray = 'text.main';
const lightGray = '#0d6efd';

const MiddleGrid = ({ id, product }) => {
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
      <Stack justifyContent="center">
        <Stack direction="row" justifyContent="center">
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
        <Stack>
          <BuyboxSalePrice id={id} publicMode={false} />
        </Stack>
        <p style={{ fontWeight: 'bold', fontSize: '14px', textAlign: 'center' }}>
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
      <>
        {isSuccess && (
          <WatchlistModal
            watchListMenu={watchListMenu}
            watchListMenuOpen={watchListMenuOpen}
            handleStarClose={handleStarClose}
            handleWatchListModalOpen={handleWatchListModalOpen}
            data={data}
            product={product}
          />
        )}
        <AlertModal
          watchListModal={watchListModal}
          handleWatchListModalClose={handleWatchListModalClose}
          handleCreate={handleCreate}
          title={title}
          setTitle={setTitle}
          isLoading={isLoading}
        />

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
          }}
        />
      </>
    </>
  );
};

export default MiddleGrid;
