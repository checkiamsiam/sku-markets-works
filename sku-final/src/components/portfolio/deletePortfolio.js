import CloseIcon from '@mui/icons-material/Close';
import { Button, Dialog, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { useDeletePortfolioMutation } from 'features/portfolio/portfolio.api';
import usePortfolio from 'hooks/usePortfolio';
const gray = 'text.main';

const DeletePortfolioModal = ({
  deleteModalOpen,
  handleDeleteModalOpen,
  handleDeleteModalClose,
  handleEditPortfoliosModalClose,
}) => {
  const { target } = usePortfolio();
  const [deletePortfolio] = useDeletePortfolioMutation();

  const handleDelete = () => {
    deletePortfolio(target?._id);
    handleDeleteModalClose();
    handleEditPortfoliosModalClose();
  };

  return (
    <Dialog open={deleteModalOpen} onClose={handleDeleteModalOpen} fullWidth>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <DialogTitle sx={{ color: gray, fontWeight: 700, fontSize: '20px' }}>
          Remove Portfolio
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleDeleteModalClose}
          sx={{ color: gray, marginRight: '.75rem' }}
        >
          <CloseIcon />
        </IconButton>
      </Stack>

      <DialogContent>
        <Typography textAlign="center" fontSize="25px" fontWeight="500" sx={{ px: 4 }}>
          {`Are you sure you want to remove "${target?.store_id}" portfolio?`}
        </Typography>
        <Button
          onClick={handleDelete}
          sx={{
            bgcolor: 'primary.main',
            border: (theme) => `1px solid ${theme.palette.primary.main}`,
            color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
            '&:hover': {
              bgcolor: 'white',
              transition: 'ease-in-out 0.7s',
              color: (theme) => (theme.palette.mode === 'light' ? 'primary.main' : 'primary.main'),
              border: (theme) => `1px solid ${theme.palette.primary.main}`,
            },
            width: '100%',
            my: 3,
            py: 2,
          }}
        >
          Remove
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default DeletePortfolioModal;
