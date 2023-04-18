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
import { CloseIcon } from 'theme/overrides/CustomIcons';

// colors
const gray = 'text.main';
const lightGray = '#0d6efd';

const AlertModal = ({
  watchListModal,
  handleWatchListModalClose,
  handleCreate,
  title,
  setTitle,
  isLoading,
}) => {
  return (
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
              color: (theme) => (theme.palette.mode === 'light' ? 'primary.main' : 'primary.main'),
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
  );
};

export default AlertModal;
