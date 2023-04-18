import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Button, IconButton, TextField } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useCreateWatchListMutation } from 'features/watchList/watchListAPI';
import { useState } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { md: '40vw', xs: '90vw', sm: '90vw' },
  bgcolor: 'background.paper',
  //   border: "1px solid #000",
  borderRadius: 3,
  boxShadow: 0,
  px: 3,
  py: 1,
};

const AddNewWatchlist = ({ addNew, handleCloseNew,refetch,setView }) => {
  const [createWatchList, { isLoading}] = useCreateWatchListMutation();
  const [title, setTitle] = useState('');

  const handleCreate = async () => {
    await createWatchList({ name: title });
    // const crt = await createWatchList({ name: title });
    // console.log(crt);
    refetch();
    setTitle('');
    handleCloseNew();
  };

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={addNew}
        onClose={handleCloseNew}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={addNew}>
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
                New watchlist
              </Typography>
              <IconButton sx={{color:"text.main"}} onClick={handleCloseNew}>
                <CloseOutlinedIcon />
              </IconButton>
            </Box>
            <TextField
              fullWidth
              sx={{ mt: 2, mb: 5 }}
              id="outlined-basic"
              label="Enter Watchlist Title"
              variant="outlined"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <Box sx={{ textAlign: 'end', mb: 2 }}>
               <Button variant="outlined" sx={{ color: "text.main" }}  onClick={handleCloseNew}>
                Cancel
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
                onClick={handleCreate}
                disabled={title.length === 0 || isLoading}
              >
                Create
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default AddNewWatchlist;
