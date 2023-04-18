import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  useTheme,
} from '@mui/material';
import { Stack } from '@mui/system';
import { setTargetPortfolioForAction } from 'features/portfolio/portfolioSlice';
import usePortfolio from 'hooks/usePortfolio';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import DeletePortfolioModal from './deletePortfolio';
import EditPortfolioNameActionModal from './editPortfolioName';
const gray = 'text.main';
const lightGray = '#0d6efd';

const EditPortfolioModal = ({
  editPortfoliosModal,
  handleEditPortfoliosModalOpen,
  handleEditPortfoliosModalClose,
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { portfolios } = usePortfolio();

  // Handle Edit portfolio name Dialog/Modal
  const [editPortfolioName, setEditPortfolioName] = useState(false);
  const handleEditPortfolioNameModalOpen = () => {
    setEditPortfolioName(true);
  };
  const handleEditPortfolioNameModalClose = () => {
    setEditPortfolioName(false);
  };

  // Handle Delete portfolio Dialog/Modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const handleDeleteModalOpen = () => {
    setDeleteModalOpen(true);
  };
  const handleDeleteModalClose = () => {
    setDeleteModalOpen(false);
  };

  const handleEdit = (target) => {
    dispatch(setTargetPortfolioForAction(target));
    handleEditPortfolioNameModalOpen();
  };

  const handleDelete = (target) => {
    dispatch(setTargetPortfolioForAction(target));
    handleDeleteModalOpen();
  };

  return (
    <>
      <Dialog
        open={editPortfoliosModal}
        onClose={handleEditPortfoliosModalOpen}
        fullWidth
        maxWidth="xs"
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <DialogTitle sx={{ color: gray, fontWeight: 700, fontSize: '20px' }}>
            Edit Portfolio
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleEditPortfoliosModalClose}
            sx={{ color: gray, marginRight: '.75rem' }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>

        <DialogContent>
          <Typography color={theme.palette.mode === 'dark' ? 'white' : 'black'}>
            Current Portfolios
          </Typography>
          {portfolios.map((portfolio, i) => (
            <Stack
              key={i}
              direction="row"
              justifyContent="space-between"
              sx={{
                py: 1,
              }}
            >
              <Stack direction="row" spacing={1} alignItems="center">
                {/* <GrainIcon /> */}
                <Typography>{portfolio.store_id}</Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center" fontSize="13px">
                {/* <EditIcon
                  onClick={() => handleEdit(portfolio)}
                  sx={{
                    cursor: 'pointer',
                    ':hover': {
                      color: lightGray,
                    },
                  }}
                /> */}
                <DeleteIcon
                  onClick={() => handleDelete(portfolio)}
                  sx={{
                    cursor: 'pointer',
                    ':hover': {
                      color: lightGray,
                    },
                  }}
                />
              </Stack>
            </Stack>
          ))}
        </DialogContent>
      </Dialog>
      <EditPortfolioNameActionModal
        editPortfolioName={editPortfolioName}
        handleEditPortfolioNameModalOpen={handleEditPortfolioNameModalOpen}
        handleEditPortfolioNameModalClose={handleEditPortfolioNameModalClose}
      />
      <DeletePortfolioModal
        deleteModalOpen={deleteModalOpen}
        handleDeleteModalOpen={handleDeleteModalOpen}
        handleDeleteModalClose={handleDeleteModalClose}
        handleEditPortfoliosModalClose={handleEditPortfoliosModalClose}
      />
    </>
  );
};

export default EditPortfolioModal;
