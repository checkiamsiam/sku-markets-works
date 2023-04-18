import React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { Button, IconButton } from "@mui/material";
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

const Remove = ({ remove, handleCloseRemove, data, setData, view }) => {
 
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
                Remove watchlist
              </Typography>
              <IconButton color="error" onClick={handleCloseRemove}>
                <CloseOutlinedIcon />
              </IconButton>
            </Box>
            <Typography
              variant="h6"
              component="h3"
              sx={{ mt: 2, mb: 5, color: "GrayText" }}
            >
              Are you sure you want to remove '{view?.name || data[0]?.name}' watchlist?
            </Typography>
            <Box sx={{ textAlign: "end", mb: 2 }}>
              <Button
                sx={{ mx: 2 }}
                variant="outlined"
                color="inherit"
                onClick={() => {
                  setData(data.filter((a) => a.id !== view?.id));
                  handleCloseRemove();
                }}
              >
                Remove
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={handleCloseRemove}
              >
                Close
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default Remove;
