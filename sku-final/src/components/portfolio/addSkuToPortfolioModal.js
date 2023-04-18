import CloseIcon from '@mui/icons-material/Close';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { Stack } from '@mui/system';
import MPLogo from 'components/common/MPLogo';
import { useAddProductToPortfolioMutation } from 'features/portfolio/portfolio.api';
import { useSearchProductQuery } from 'features/product/productAPI';
import usePortfolio from 'hooks/usePortfolio';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const gray = 'text.main';

const AddSkuToPortfolio = ({ addSKUModal, handleSKUModalOpen, handleSKUModalModalClose }) => {
  const theme = useTheme();
  const [selected, setSelected] = useState({});
  const { selectedPortfolio } = usePortfolio();
  const [addProductToPortfolio] = useAddProductToPortfolioMutation();

  const [query, setQuery] = useState('');
  const { data } = useSearchProductQuery(query, {
    skip: !query,
  });

  const searchHandler = async (sku) => {
    setSelected({});
    setQuery(`search=${sku}&sku_marketplace=${selectedPortfolio?.sku_marketplace}&limit=5`);
  };

  useEffect(() => {
    if (selectedPortfolio?.sku_marketplace) {
      setQuery(`search=N41&sku_marketplace=${selectedPortfolio?.sku_marketplace}&limit=5`);
    }
  }, [selectedPortfolio?.sku_marketplace]);

  const handleAddProduct = async () => {
    try {
      await addProductToPortfolio({
        sku: selected?.sku,
        sku_marketplace: selected?.sku_marketplace,
        store_id: selectedPortfolio?.store_id,
      });
      handleSKUModalModalClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={addSKUModal} onClose={handleSKUModalOpen} fullWidth>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <DialogTitle sx={{ color: gray, fontWeight: 700, fontSize: '20px' }}>
          Add SKUs <br />
          <Typography
            component={Link}
            to="/import"
            fontSize="14px"
            color={theme.palette.mode === 'dark' ? 'white' : 'black'}
            sx={{ position: 'relative', top: 2 }}
          >
            Import
          </Typography>
        </DialogTitle>

        <IconButton
          aria-label="close"
          onClick={handleSKUModalModalClose}
          sx={{ color: gray, marginRight: '.75rem' }}
        >
          <CloseIcon />
        </IconButton>
      </Stack>

      <DialogContent sx={{ mt: '-10px' }}>
        <TextField
          autoFocus
          margin="dense"
          id="skuSearch"
          label="Add Your SKU"
          type="text"
          fullWidth
          variant="outlined"
          onChange={(e) => {
            searchHandler(e.target.value);
          }}
        />
        <Typography
          fontSize="12px"
          color={theme.palette.mode === 'dark' ? 'white' : 'black'}
          sx={{ mt: 2 }}
        >
          Suggested SKUs
        </Typography>

        {data?.map((item) => (
          <Stack
            key={item?._id}
            direction="row"
            justifyContent="space-between"
            sx={{
              py: 1,
              px: 1,
              cursor: 'pointer',
              borderRadius: '5px',
              ':hover': {
                backgroundColor: '#E6F2FC',
                color: 'black',
              },
              color:selected?._id === item?._id ? "black" :  theme.palette.mode === "dark" ? "white" : "black",
              backgroundColor: selected?._id === item?._id ? '#E6F2FC' : theme.palette.mode === "dark" ?"transparent" : 'white',
            }}
            onClick={() => setSelected(item)}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <MPLogo link={false} marketplace={item?.sku_marketplace} alt="" width="30px" />
              <Typography fontSize="13px">{item?.sku}</Typography>
            </Stack>
            <Typography fontSize="13px"># {item?.sku_rank}</Typography>
          </Stack>
        ))}

        <Button
          disabled={!selected?.sku_marketplace}
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
          onClick={handleAddProduct}
        >
          Add To Portfolio
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AddSkuToPortfolio;
