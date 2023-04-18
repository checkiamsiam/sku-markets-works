import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Fade, Modal, Stack, Typography } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import IconButton from '@mui/material/IconButton';
import { useDeleteAlertMutation } from 'features/alert/alertAPI';
import { useRemoveProductFromPortfolioMutation } from 'features/portfolio/portfolio.api';
import { useRemoveProductInWatchListMutation } from 'features/watchList/watchListAPI';
import usePortfolio from 'hooks/usePortfolio';
import { useState } from 'react';

const DeleteSKU = ({ row, from }) => {
  // delete modal controls
  const { selectedPortfolio } = usePortfolio();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const handleShowDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);
  const [deleteAlert] = useDeleteAlertMutation();
  const [removeProduct] = useRemoveProductInWatchListMutation();
  const [removeProductFromPortfolio] = useRemoveProductFromPortfolioMutation();
  const handleRemoveSku = async () => {
    if (from === 'alert') {
      await deleteAlert(row?.alert_id);
    }
    if (from === 'watchlist') {
      await removeProduct(`${row?.watchList_id}/product/${row?.id}`);
    }
    if (from === 'portfolio_store') {
      await removeProductFromPortfolio({
        store_id : selectedPortfolio?.store_id , 
        sku: row?.sku,
      })
    }
    handleCloseDeleteModal();
  };

  return (
    <>
      <IconButton onClick={handleShowDeleteModal} color="error" size="small" aria-label="delete">
        <DeleteIcon fontSize="inherit" />
      </IconButton>
      <Modal
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openDeleteModal}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: { md: '40vw', xs: '90vw', sm: '90vw' },
              bgcolor: 'background.paper',
              borderRadius: 3,
              boxShadow: (theme) => (theme.palette.mode === 'dark' ? 5 : 0),
              px: 3,
              py: 1,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 1,
              }}
            >
              <Typography id="transition-modal-title" variant="h6" component="h2">
                Remove This SKU?
              </Typography>
              <IconButton sx={{ color: 'text.main' }} onClick={handleCloseDeleteModal}>
                <CloseOutlinedIcon />
              </IconButton>
            </Box>
            <Stack sx={{ mb: 2 }}>
              <Button
                sx={{
                  width: '100%',
                  bgcolor: 'primary.main',
                  border: (theme) => `1px solid ${theme.palette.primary.main}`,
                  color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
                  '&:hover': {
                    bgcolor: 'white',
                    color: (theme) =>
                      theme.palette.mode === 'light' ? 'primary.main' : 'primary.main',
                    border: (theme) => `1px solid ${theme.palette.primary.main}`,
                  },
                }}
                onClick={handleRemoveSku}
              >
                Remove
              </Button>
            </Stack>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default DeleteSKU;
