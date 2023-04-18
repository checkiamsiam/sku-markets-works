import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Button, IconButton, TextField } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useUpdateWatchListNameMutation } from 'features/watchList/watchListAPI';
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

const Edit = ({ edit, handleCloseEdit, data, view, setView }) => {
  const [editWatchlist] = useUpdateWatchListNameMutation();

  const [inputValue, setInputValue] = useState('');

  const updateHandler = async (id, name) => {
    const updated = await editWatchlist({ id, name });
    //  console.log(updated.data);
    setView(updated.data);
    setInputValue('');
    handleCloseEdit(); 
  };

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={edit}
        onClose={handleCloseEdit}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={edit}>
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
                Edit watchlist
              </Typography>
              <IconButton sx={{ color: "text.main" }} onClick={handleCloseEdit}>
                <CloseOutlinedIcon />
              </IconButton>
            </Box>
            <TextField
              fullWidth
              sx={{ mt: 2, mb: 5 }}
              id="outlined-basicE"
              label={view?.name || data[0].name}
              variant="outlined"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
            />
            <Box sx={{ textAlign: 'end', mb: 2 }}>
              <Button  variant="outlined" sx={{ color: "text.main" }}  onClick={handleCloseEdit}>
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
                onClick={() => updateHandler(view?._id || data[0]._id, inputValue)}
              >
                Update
              </Button>
              
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default Edit;
