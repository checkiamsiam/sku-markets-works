import CloseIcon from '@mui/icons-material/Close';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { Stack } from '@mui/system';
import MPLogo from 'components/common/MPLogo';
import ThemeButton from 'components/common/ThemeButton';
import { useCreatePortfolioMutation } from 'features/portfolio/portfolio.api';
import { createNewPortfolio } from 'features/portfolio/portfolioSlice';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const AddPortfolioModal = ({
  portfolioModal,
  handlePortfolioModalOpen,
  handlePortfolioModalClose,
  handleSKUModalOpen,
}) => {
  const [searchKey, setSearchKey] = useState('');
  const [marketplace, setMarketplace] = useState('');
  const [CreatePortfolio] = useCreatePortfolioMutation();
  const dispatch = useDispatch();
  const gray = 'text.main';

  const marketplaces = [
    'amazon/egypt',
    'amazon/ksa',
    'amazon/uae',
    'jumia/egypt',
    'noon/egypt',
    'noon/ksa',
    'noon/uae',
  ];

  const handleCreatePortfolio = () => {
    dispatch(createNewPortfolio({ name: searchKey }));
    handlePortfolioModalClose();
    handleSKUModalOpen();

    CreatePortfolio({
      store_id: searchKey,
      sku_marketplace: marketplace,
    });
  };

  return (
    <Dialog open={portfolioModal} onClose={handlePortfolioModalOpen} fullWidth>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <DialogTitle sx={{ color: gray, fontWeight: 700, fontSize: '20px' }}>
          Add New Portfolio
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handlePortfolioModalClose}
          sx={{ color: gray, marginRight: '.75rem' }}
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
          onChange={(e) => {
            setSearchKey(e.target.value);
          }}
        />

        <Typography mt={2}>Choose your marketplace</Typography>

        <Grid
          container
          justifyContent="center"
          alignItems="center"
          spacing={2}
          sx={{ cursor: 'pointer', width: '100%', mt: 1, px: 3 }}
        >
          {marketplaces.map((mp, i) => (
            <Grid key={i} item md={3}>
              <Stack
                justifyContent="center"
                alignItems="center"
                sx={{
                  cursor: 'pointer',
                  py: 1,
                  px: 1,
                  borderRadius: '5px',
                  ':hover': {
                    backgroundColor: '#E6F2FC',
                    color: 'black',
                  },

                  backgroundColor: marketplace === mp ? '#E6F2FC' : 'white',
                }}
                onClick={() => setMarketplace(mp)}
              >
                <MPLogo marketplace={mp} link={false} />
              </Stack>
            </Grid>
          ))}
        </Grid>
        <ThemeButton
          onClick={handleCreatePortfolio}
          disabled={!searchKey || !marketplace}
          variant="contained"
          sx={{
            width: '100%',
            my: 3,
            py: 2,
          }}
        >
          Connect Your Store
        </ThemeButton>
      </DialogContent>
    </Dialog>
  );
};

export default AddPortfolioModal;
