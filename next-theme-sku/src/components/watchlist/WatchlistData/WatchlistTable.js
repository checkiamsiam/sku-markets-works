import { Box } from "@mui/system";
import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import {
  Autocomplete,
  Button,
  FormControl,
  IconButton,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import AddIcon from "@mui/icons-material/Add";
import AddNewWatchlist from "./AddNewWatchlist";
import Edit from "./Edit";
import Remove from "./Remove";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import DataStorage from "./DataStorage";

const styleM = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { md: "30vw", xs: "90vw", sm: "90vw" },
  bgcolor: "white",
  borderRadius: 2,
  boxShadow: 0,
  px: 3,
  py: 1,
};

const optn = [
  { slct: "Bitcoin (BTC)" },
  { slct: "Ethereum (ETH)" },
  { slct: "Tether (USDT)" },
  { slct: "BNB (BNB)" },
  { slct: "USD Coin (USDC)" },
  { slct: "Binance USD (BUSD)" },
  { slct: "XRPL (XRP)" },
  { slct: "Dogecoin (DOGE)" },
  { slct: "Cardano (ADA)" },
  { slct: "Polygon (MATIC)" },
  { slct: "Polkadot (DOT)" },
  { slct: "Lido Staked Ether (STETH)" },
  { slct: "Litecoin (LTC)" },
  { slct: "SHIBA INU (SHIB)" },
  { slct: "OKB (OKB)" },
  { slct: "Dai (DAI)" },
  { slct: "TRON (TRX)" },
  { slct: "Solana (SOL)" },
  { slct: "Uniswap (UNI)" },
  { slct: "Avalanche (AVAX)" },
  { slct: "Wrapped Bitcoin (WBTC)" },
  { slct: "UNUS SED LEO (LEO)" },
  { slct: "ChainLink (LINK)" },
  { slct: "Toncoin (TON)" },
  { slct: "Cosmos (ATOM)" },
  { slct: "Monero (XMR)" },
  { slct: "Ethereum Classic (ETC)" },
  { slct: "Stellar (XLM)" },
  { slct: "Bitcoin Cash (BCH)" },
  { slct: "Quant (QNT)" },
];

/* Paper style */
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.subtitle1,
  padding: theme.spacing(1),
  textAlign: "center",
  boxShadow: "none",
  color: theme.palette.text.secondary,
}));

const WatchlistTable = () => {
  /*  Search */
  const [search, setSearch] = useState([]);
  // console.log(search);

  /* select */
  const [select, setSelect] = useState("");

  /* Modals */
  const [addNew, setAddNew] = useState(false);
  const handleCloseNew = () => setAddNew(false);
  const handleShowNew = () => setAddNew(true);
  // Pop -Up chooseSKU
  /*   const [chooseSKU, setChooseSKU] = useState(false);
  const handleCloseSKU = () => setChooseSKU(false);
  const handleShowSKU = () => setChooseSKU(true); */

  // Pop -Up Edit
  const [edit, setEdit] = useState(false);
  const handleCloseEdit = () => setEdit(false);
  const handleShowEdit = () => setEdit(true);

  // Pop -Up Remove
  const [remove, setRemove] = useState(false);
  const handleCloseRemove = () => setRemove(false);
  const handleShowRemove = () => setRemove(true);

  /* New */
  const [newD, setNewD] = useState("");
  const [data, setData] = useState("");
  // console.log(data);
  const [openNew, setOpenNew] = useState(false);
  const handleCloseNewD = () => setOpenNew(false);
  const handleShowNewD = () => setOpenNew(true);
  let traceId = Math.floor(Math.random() * 10000);
  const [view, setView] = useState(false);
  console.log(view);

  return (
    <>
      <Box sx={{ my: 2 }}>
        <Typography sx={{ pb: 1, mx: 5 }}>My Watchlist</Typography>
      </Box>
      {search?.length !== 0 && <DataStorage />}
      {data?.length ? (
        <Box sx={{ border: "1px solid #ced4da", borderRadius: 1, mx: 5 }}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 1, md: 1 }}
            sx={{ m: 3 }}
          >
            <Item>
              {/*  <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  type="search"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  placeholder="Search SKU"
                /> */}
              <Autocomplete
                id="optn-select-demo"
                sx={{ minWidth: { xs: "100%", md: 250 },fontSize:"13px",backgroundColor: "#EFF2F5",'.MuiOutlinedInput-notchedOutline': { border: 0,borderRadius:3},borderRadius:3}}
                options={optn}
                autoHighlight
                getOptionLabel={(option) => option.slct}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    value={search}
                    onBlur={(e) => {
                      setSearch(e.target.value);
                    }}
                    size="small"
                    placeholder="Search SKU to add"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password", // disable autocomplete and autofill
                    }}
                  />
                )}
              />
            </Item>
            <Item>
              <FormControl
                sx={{ minWidth: { xs: "100%", md: 250 } }}
                size="small"
              >
                <Select
                  sx={{
                    fontSize: "13px",
                    textTransform: "capitalize",
                    backgroundColor: "#EFF2F5",
                    '.MuiOutlinedInput-notchedOutline': { border: 0,borderRadius:3},borderRadius:3
                  }}
                  displayEmpty
                  value={view?.name || select}
                  input={<OutlinedInput />}
                  renderValue={(selected) => {
                    if (selected.length === 0) {
                      return <>{data[0].name}</>;
                    }
                    return (view?.name || data[0].name);
                  }}
                  inputProps={{ "aria-label": "Without label" }}
                  onChange={(e) => {
                    setSelect(e.target.value);
                  }}
                >
                  {data?.map((mi) => (
                    <MenuItem
                      onClick={() => {
                        setView(mi);
                      }}
                      key={mi?.id}
                      value={mi.name}
                    >
                      {mi.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Item>
            <Item>
              <Button
                sx={{
                  minWidth: {
                    xs: "100%",
                    border: "1px solid #ced4da",
                    fontSize: "13px",
                    textTransform: "capitalize",
                  },
                }}
                color="inherit"
                onClick={handleShowNew}
              >
                Add New Watchlist
              </Button>
              <AddNewWatchlist
                addNew={addNew}
                data={data}
                setData={setData}
                handleCloseNew={handleCloseNew}
              />
            </Item>
            {/* <Item>
              <Button
                sx={{
                  minWidth: {
                    xs: "100%"},
                    border: "1px solid #ced4da",
                    fontSize: "13px",
                    textTransform: "capitalize",
                }}
                color="inherit"
                onClick={handleShowSKU}
              >
                Choose SKU/ ASIN/ MPN
              </Button>
              <ChooseSKU
                chooseSKU={chooseSKU}
                handleCloseSKU={handleCloseSKU}
              />
            </Item> */}
            <Item>
              <Button
                sx={{
                  minWidth: { xs: "100%", md: 70 },
                  border: "1px solid #ced4da",
                  fontSize: "13px",
                  textTransform: "capitalize",
                }}
                color="inherit"
                onClick={handleShowEdit}
              >
                Edit
              </Button>
              <Edit
                edit={edit}
                data={data}
                view={view}
                setView={setView}
                setData={setData}
                handleCloseEdit={handleCloseEdit}
              />
            </Item>
            <Item>
              <Button
                sx={{
                  minWidth: { xs: "100%" },
                  border: "1px solid #ced4da",
                  fontSize: "13px",
                  textTransform: "capitalize",
                }}
                color="inherit"
                onClick={handleShowRemove}
              >
                Remove
              </Button>
              <Remove
                remove={remove}
                view={view}
                data={data}
                setData={setData}
                handleCloseRemove={handleCloseRemove}
              />
            </Item>
          </Stack>
        </Box>
      ) : (
        <Box sx={{ border: "1px solid #ced4da", borderRadius: 1, mx: 5 }}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 1, md: 1 }}
            sx={{ m: 3 }}
          >
            <Item>
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                sx={{
                  minWidth: { xs: "100%" },
                  fontSize: "13px",
                  textTransform: "capitalize",
                }}
                onClick={handleShowNewD}
              >
                New
              </Button>
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openNew}
                onClose={handleCloseNewD}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={openNew}>
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
                        New watchlist
                      </Typography>
                      <IconButton color="error" onClick={handleCloseNewD}>
                        <CloseOutlinedIcon />
                      </IconButton>
                    </Box>

                    <TextField
                      fullWidth
                      sx={{ mt: 2, mb: 5 }}
                      id="outlined-basic"
                      label="Enter Watchlist Title"
                      variant="outlined"
                      value={newD}
                      onChange={(e) => {
                        setNewD(e.target.value);
                      }}
                    />
                    <Box sx={{ textAlign: "end", mb: 2 }}>
                      {newD ? (
                        <Button
                          size="small"
                          sx={{ mx: 2 }}
                          variant="contained"
                          color="inherit"
                          onClick={() => {
                            setNewD("");
                            setData([...data, { id: traceId, name: newD }]);
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
                        onClick={handleCloseNewD}
                      >
                        Cancel
                      </Button>
                    </Box>
                  </Box>
                </Fade>
              </Modal>
            </Item>
          </Stack>
        </Box>
      )}
    </>
  );
};

export default WatchlistTable;
