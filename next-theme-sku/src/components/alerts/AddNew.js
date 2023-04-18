import { Backdrop, Button, Fade, IconButton, Modal, TextField, Typography } from '@mui/material';
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Box } from '@mui/system';
import React, { useState } from 'react';
const styleM = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { md: "30vw", xs: "90vw", sm: "90vw" },
    bgcolor: "white",
    //   border: "1px solid #000",
    borderRadius: 3,
    boxShadow: 0,
    px: 3,
    py: 1,
  };
const AddNew = ({openAddNew,handleCloseNewAdd}) => {
    
    const [value,setValue]= useState("");
    return (
        <>
             <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openAddNew}
                onClose={handleCloseNewAdd}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={openAddNew}>
                  <Box sx={styleM}>
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
                       Add New Alert
                      </Typography>
                      <IconButton color="error" onClick={handleCloseNewAdd}>
                        <CloseOutlinedIcon />
                      </IconButton>
                    </Box>

                    <TextField
                      fullWidth
                      sx={{ mt: 2, mb: 5 }}
                      id="outlined-basic"
                      label="Enter Watchlist Title"
                      variant="outlined"
                      value={value}
                      onChange={(e) => {
                        setValue(e.target.value);
                      }}
                    />
                    <Box sx={{ textAlign: "end", mb: 2 }}>
                        <Button
                          size="small"
                          sx={{ mx: 2 }}
                          variant="contained"
                          color="inherit"
                          onClick={handleCloseNewAdd}
                        >
                          Create
                        </Button>
                      
                      <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        onClick={handleCloseNewAdd}
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

export default AddNew;