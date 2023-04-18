import { Dialog, DialogContent, DialogTitle, IconButton, Stack, TextField } from '@mui/material';
import ThemeButton from 'components/common/ThemeButton';
import { CloseIcon } from 'theme/overrides/CustomIcons';

const AddAdboardModal = ({
  setTest,
  AddAdboardModalOpen,
  handleAddAdboardModalClose,
  handleAddAdboardModalOpen,
}) => {
  const onSubmit = () => {
    setTest(true);
    handleAddAdboardModalClose();
  };
  return (
    <Dialog open={AddAdboardModalOpen} onClose={handleAddAdboardModalClose} fullWidth>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <DialogTitle sx={{ color: 'text.main', fontWeight: 700, fontSize: '20px' }}>
          Add Campaigns
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleAddAdboardModalClose}
          sx={{ color: 'text.main', marginRight: '.75rem' }}
        >
          <CloseIcon />
        </IconButton>
      </Stack>

      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="skuSearch"
          label="Enter Your Store ID"
          type="text"
          fullWidth
          variant="outlined"
        />
        <ThemeButton
          variant="contained"
          sx={{
            width: '100%',
            my: 3,
            py: 2,
          }}
          onClick={onSubmit}
        >
          Add Campaigns
        </ThemeButton>
      </DialogContent>
    </Dialog>
  );
};

export default AddAdboardModal;
