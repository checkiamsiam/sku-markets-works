import DeleteIcon from '@mui/icons-material/Delete';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import RepeatIcon from '@mui/icons-material/Repeat';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { Stack } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AddAlertOnPD from 'components/productDetails/addAlertModal';
import {
  targetSkuForTransaction,
  toggleSkuTransactionMode,
} from 'features/portfolio/portfolioSlice';
import {
  useCheckAlertForSkuQuery,
  useCheckWatchlistForSkuQuery,
} from 'features/userSku/userSkuAPI';
import {
  useCreateWatchListMutation,
  useGetAllWatchListsQuery,
} from 'features/watchList/watchListAPI';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import AlertModal from './modals/AlertModal';
import DeleteModal from './modals/DeleteModal';
import WatchlistModal from './modals/WatchlistModal';

const DeleteSKUFromPortfolio = ({ row: product , remove=true , watchlist=true , alert=true, transaction=true }) => {
  // state
  const dispatch = useDispatch();
  // delete modal controls
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const handleShowDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);
  // transaction button controls
  const handleTransactionOpen = () => {
    dispatch(targetSkuForTransaction(product));
    dispatch(toggleSkuTransactionMode());
    window.scrollTo(0, 0);
  };
  const { data: productWatchlist } = useCheckWatchlistForSkuQuery(product._id);
  const { data: productAlert } = useCheckAlertForSkuQuery(product._id);

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
      <Stack direction="row">
        {transaction && <IconButton onClick={handleTransactionOpen} size="small" aria-label="details">
          <RepeatIcon sx={{ color: '#0D6EFD' }} fontSize="inherit" />
        </IconButton>}
        {watchlist && <IconButton
          size="small"
          id="star-button"
          aria-controls={watchListMenuOpen && 'basic-menu'}
          aria-haspopup="true"
          aria-expanded={watchListMenuOpen && 'true'}
          onClick={handleStarClick}
        >
          {productWatchlist?.data.length > 0 ? (
            <StarIcon sx={{ color: '#0d6efd' }} fontSize="inherit" />
          ) : (
            <StarOutlineIcon sx={{ color: '#0d6efd' }} fontSize="inherit" />
          )}
        </IconButton>}
        {alert && <IconButton
          size="small"
          id="notify-button"
          aria-controls={openAddAlertModal && 'basic-menu'}
          aria-haspopup="true"
          aria-expanded={openAddAlertModal && 'true'}
          onClick={handleShowNewAdd}
        >
          {productAlert?.data.length > 0 ? (
            <NotificationsIcon sx={{ color: '#0d6efd' }} fontSize="inherit" />
          ) : (
            <NotificationsNoneIcon sx={{ color: '#0d6efd' }} fontSize="inherit" />
          )}
        </IconButton>}
        {remove && <IconButton onClick={handleShowDeleteModal} color="error" size="small" aria-label="delete">
          <DeleteIcon fontSize="inherit" />
        </IconButton>}
      </Stack>

      {/* modals of the actions */}
      <DeleteModal
        openDeleteModal={openDeleteModal}
        handleCloseDeleteModal={handleCloseDeleteModal}
        product={product}
      />
      <AddAlertOnPD
        openAddNew={openAddAlertModal}
        handleCloseNewAdd={handleCloseNewAdd}
        sku={{
          id: product?.id,
          _id: product?._id,
          sku: product?.sku,
          sku_marketplace: product?.sku_marketplace,
          sku_rank: product?.sku_rank,
          buy_box_currency: product?.buy_box_currency,
          current_price: product?.current_price,
        }}
      />
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
    </>
  );
};

export default DeleteSKUFromPortfolio;
