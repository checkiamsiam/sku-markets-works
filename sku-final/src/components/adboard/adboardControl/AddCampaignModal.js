import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogContent, DialogTitle, IconButton, TextField } from '@mui/material';
import { Stack } from '@mui/system';
import ThemeButton from 'components/common/ThemeButton';
import { useState } from 'react';

const AddCampaignModal = ({ open, onClose }) => {
  const [name, setName] = useState('');
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <DialogTitle sx={{ color: 'text.main', fontWeight: 700, fontSize: '20px' }}>
          Title
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={onClose}
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
          label="Enter Your Campaign Name"
          type="text"
          fullWidth
          variant="outlined"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <ThemeButton
          variant="contained"
          sx={{
            width: '100%',
            my: 3,
            py: 2,
          }}
        >
          Action
          
        </ThemeButton>
      </DialogContent>
    </Dialog>
  );
};

export default AddCampaignModal;
