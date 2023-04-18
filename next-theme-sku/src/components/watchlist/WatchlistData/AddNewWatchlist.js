import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { Button, IconButton, TextField } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { md: "30vw", xs: "90vw", sm: "90vw" },
  bgcolor: "background.paper",
  //   border: "1px solid #000",
  borderRadius: 3,
  boxShadow: 0,
  px: 3,
  py: 1,
};

const AddNewWatchlist = ({ addNew, handleCloseNew,data, setData }) => {
  const [title, setTitle] = useState("");
  let traceId = Math.floor(Math.random() * 10000);
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
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 1,
              }}
            >
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                New watchlist
              </Typography>
              <IconButton color="error" onClick={handleCloseNew}>
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
            <Box sx={{textAlign:'end',mb:2}}>
            {title ? (
                          <Button
                            size="small"
                            sx={{ mx: 2 }}
                            variant="contained"
                            color="inherit"
                            onClick={() => {
                              setTitle('');
                              setData([
                                ...data,
                                { id: traceId, name: title }
                              ]);
                              handleCloseNew();
                            }}
                          >
                            Create
                          </Button>
                        ) : (
                          <Button
                            disabled
                            size="small"
                            sx={{ mx: 2 }}
                            variant="contained"
                            color="inherit"
                            type="submit"
                          >
                            Create
                          </Button>
                        )}
                        <Button
                          size="small"
                          variant="outlined"
                          color="error"
                          onClick={handleCloseNew}
                        >
                          Cancel
                        </Button>  
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default AddNewWatchlist;
