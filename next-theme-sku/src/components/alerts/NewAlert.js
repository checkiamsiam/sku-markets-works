import { Button, InputBase, Paper } from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Stack } from "@mui/system";
import { styled } from "@mui/material/styles";
import AddNew from "./AddNew";
import { FaCloudUploadAlt } from "react-icons/fa";
import ImportAlert from "./ImportAlert";

/* Paper style */
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.subtitle1,
  padding: theme.spacing(1),
  textAlign: "center",
  boxShadow: "none",
  color: theme.palette.text.secondary,
}));

const NewAlert = () => {
  const [search, setSearch] = useState("");

  /* New Alert Add */
  const [openAddNew, setOpenAddNew] = useState(false);
    const handleCloseNewAdd = () => setOpenAddNew(false);
    const handleShowNewAdd = () => setOpenAddNew(true);
  /* Import */
  const [openAddImport, setOpenAddImport] = useState(false);
    const handleCloseImportAdd = () => setOpenAddImport(false);
    const handleShowImportAdd = () => setOpenAddImport(true);
  return (
    <>
      <Box sx={{ border: "1px solid #ced4da", borderRadius: 1, mx: 5, my: 3 }}>
        <Box sx={{ m: 2 }}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 1, md: 1 }}
          >
            <Item>
              <Paper
                component="form"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: { md: "18vw", xs: "100%" },
                  height: "35px",
                  boxShadow: 0,
                  border: "1px solid #ced4da",
                  borderRadius: 1,
                }}
              >
                <Button
                  variant="contained"
                  sx={{ py: "6px", boxShadow: "none" }}
                  aria-label="search"
                >
                  <SearchIcon />
                </Button>
                {/* <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" /> */}
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  type="search"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  placeholder="Search SKU"
                />
              </Paper>
            </Item>
            <Item>
            <Button
                sx={{
                  minWidth: { xs: "100%", md: 70 },
                  border: "1px solid #ced4da",
                  fontSize: "13px",
                  textTransform: "capitalize",
                }}
                color="inherit"
                onClick={handleShowNewAdd}
              >
                New Alert
              </Button>
              <AddNew
                openAddNew={openAddNew}
                handleCloseNewAdd={handleCloseNewAdd}
              />
            </Item>
            <Item>
            <Button
                sx={{
                  minWidth: { xs: "100%", md: 70 },
                  border: "1px solid #ced4da",
                  fontSize: "13px",
                  textTransform: "capitalize",
                }}
                color="inherit"
                onClick={handleShowImportAdd}
                startIcon={<FaCloudUploadAlt />}
              >
                Import
              </Button>
              <ImportAlert
                openAddImport={openAddImport}
                handleCloseImportAdd={handleCloseImportAdd}
              />
            </Item>
            
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default NewAlert;
