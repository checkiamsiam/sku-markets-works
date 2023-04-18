import RepeatIcon from '@mui/icons-material/Repeat';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  TextField,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import WatchlistModal from 'components/portfolio/StoreSkuTable/modals/WatchlistModal';
import { targetSkuForTransaction, toggleTransInAlert } from 'features/alert/alertSlice';
import { useCheckWatchlistForSkuQuery } from 'features/userSku/userSkuAPI';
import {
  useCreateWatchListMutation,
  useGetAllWatchListsQuery,
} from 'features/watchList/watchListAPI';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { CloseIcon } from 'theme/overrides/CustomIcons';
const TranAndWatch = ({ row: product, watchlist = true, transaction = true }) => {
  const dispatch = useDispatch();
  // delete modal controls
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const handleShowDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);
  // transaction button controls
  const handleTransactionOpen = () => {
    dispatch(targetSkuForTransaction(product));
    dispatch(toggleTransInAlert());
    window.scrollTo(0, 0);
  };
  const { data: productWatchlist } = useCheckWatchlistForSkuQuery(product._id);

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

  const gray = 'text.main';
  const lightGray = '#0d6efd';
  return (
    <>
      <Stack direction="row">
        {/* {transaction && (
          <IconButton onClick={handleTransactionOpen} size="small" aria-label="details">
            <RepeatIcon sx={{ color: '#0D6EFD' }} fontSize="inherit" />
          </IconButton>
        )} */}
        {watchlist && (
          <IconButton
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
          </IconButton>
        )}
      </Stack>
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
    </>
  );
};

export default TranAndWatch;
