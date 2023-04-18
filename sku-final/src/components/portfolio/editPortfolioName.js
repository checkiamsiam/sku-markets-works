import CloseIcon from '@mui/icons-material/Close';
import { Button, Dialog, DialogContent, DialogTitle, IconButton, TextField } from '@mui/material';
import { Stack } from '@mui/system';
import { renamePortfolio } from 'features/portfolio/portfolioSlice';
import usePortfolio from 'hooks/usePortfolio';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
const gray = 'text.main';

const EditPortfolioNameActionModal = ({
  editPortfolioName,
  handleEditPortfolioNameModalOpen,
  handleEditPortfolioNameModalClose,
}) => {
  const dispatch = useDispatch();
  const { target } = usePortfolio();
  const [searchKey, setSearchKey] = useState('');
  const handleRename = () => {
    dispatch(renamePortfolio({ name: target.name, newName: searchKey }));
    handleEditPortfolioNameModalClose();
  };
  return (
    <Dialog open={editPortfolioName} onClose={handleEditPortfolioNameModalOpen} fullWidth>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <DialogTitle sx={{ color: gray, fontWeight: 700, fontSize: '20px' }}>
          Rename Portfolio
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleEditPortfolioNameModalClose}
          sx={{ color: gray, marginRight: '.75rem' }}
        >
          <CloseIcon />
        </IconButton>
      </Stack>

      <DialogContent>
        <TextField
          defaultValue={target?.store_id}
          autoFocus
          margin="dense"
          id="skuSearch"
          label="Portfolio name"
          type="text"
          fullWidth
          variant="outlined"
          onChange={(e) => {
            setSearchKey(e.target.value);
          }}
        />
        <Button
          onClick={handleRename}
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
          Rename Portfolio
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default EditPortfolioNameActionModal;
