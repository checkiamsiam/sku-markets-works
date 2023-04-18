import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Button, IconButton } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useDeleteWatchListMutation } from 'features/watchList/watchListAPI';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { md: '40vw', xs: '90vw', sm: '90vw' },
  bgcolor: 'background.paper',
  borderRadius: 3,
  boxShadow: 0,
  px: 3,
  py: 1,
};

const Remove = ({ remove, handleCloseRemove, data, view, setView, refetch }) => {

  const [deleteWatchlist] = useDeleteWatchListMutation();

  const deleteHandler = async (id) => {
    await deleteWatchlist(id);
    if(view){
      setView(data[0]);
    }
    refetch();
    handleCloseRemove();
    // console.log(id);
  };
  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={remove}
        onClose={handleCloseRemove}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={remove}>
          <Box sx={style}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 1,
              }}
            >
              <Typography id="transition-modal-title" variant="h6" component="h2">
                Remove watchlist
              </Typography>
              <IconButton sx={{ color: "text.main" }} onClick={handleCloseRemove}>
                <CloseOutlinedIcon />
              </IconButton>
            </Box>
            <Typography variant="h6" component="h3" sx={{ mt: 2, mb: 5, color: 'GrayText' }}>
              Are you sure you want to remove '{view?.name || data[0]?.name}' watchlist?
            </Typography>
            <Box sx={{ textAlign: 'end', mb: 2 }}>
               <Button variant="outlined" sx={{ color: "text.main" }} onClick={handleCloseRemove}>
                Close
              </Button>
              <Button
                sx={{
                  bgcolor: 'primary.main',
                  color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
                  '&:hover': {
                    bgcolor: 'white',
                    color: (theme) => (theme.palette.mode === 'light' ? 'primary.main' : 'primary.main'),
                    border: (theme)=> (`1px solid ${theme.palette.primary.main}`)
                  },
                  mx:2
                }}
                onClick={() => {
                  deleteHandler(view?._id || data[0]._id);
                }}
              >
                Remove
              </Button>
             
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default Remove;
