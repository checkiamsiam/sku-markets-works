import AddIcon from '@mui/icons-material/Add';
import {
  Autocomplete,
  Box,
  Button,
  Card,
  Divider,
  Fade,
  IconButton,
  InputAdornment,
  Modal,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import ThemeDataGrid from 'components/common/ThemeDataGrid';
import { CustomTextField } from 'components/custom-input';
import Iconify from 'components/iconify/Iconify';
import SearchNotFound from 'components/search-not-found/SearchNotFound';
import { modalStyle } from 'components/sellerboard/sellerboardAlerts/ConfirmationAlert';
import { useEffect, useState } from 'react';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const columns = [
  {
    field: 'promotion',
    headerName: 'Promotion Code',
    width: 160,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
  },
  {
    field: 'amountGranted',
    headerName: 'Amount Granted',
    width: 130,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 80,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'dataRedeemed',
    headerName: 'Data Redeemed',
    width: 150,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'expireDates',
    headerName: 'Expiration Date',
    width: 150,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'qualification',
    headerName: 'Qualifications',
    width: 150,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'spentFromPromotion',
    headerName: 'Spent From Promotion',
    align: 'center',
    headerAlign: 'center',
    width: 200,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
  },
];

const rowsSchema = {
  status: '',
  dataRedeemed: '',
  promotion: '',
  amountGranted: '',
  spentFromPromotion: '',
  expireDates: '',
  qualification: '',
};

function CustomToolbar() {
  const [code , setCode] = useState('')
  const [searchProducts, setSearchProducts] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [open, setOpenAccept] = useState(false);
  const handleClose = () => {
    setOpenAccept(false);
  };
  const handleShowAccept = () => {
    setOpenAccept(true);
  };
  const handleSetCode = (e) => {
    if(e.target.value.length <= 12){
      setCode(e.target.value)
    }else{

    }
  }
  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ p: 1 }}>
        <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
          <IconButton
            onClick={handleShowAccept}
            sx={{
              borderRadius: '50px',
              bgcolor: 'white',
              border: (theme) => `1px solid ${theme.palette.primary.main}`,
              color: (theme) => (theme.palette.mode === 'light' ? 'primary.main' : 'primary.main'),
              '&:hover': {
                bgcolor: 'primary.main',
                color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
                border: (theme) => `1px solid ${theme.palette.primary.main}`,
              },
              px: 1,
            }}
          >
            <AddIcon />
          </IconButton>
        </Stack>
        <Stack>
          <Autocomplete
            size="small"
            autoHighlight
            popupIcon={null}
            options={searchResults}
            getOptionLabel={(product) => product.name}
            noOptionsText={<SearchNotFound query={searchProducts} />}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            componentsProps={{
              popper: {
                sx: {
                  width: `280px !important`,
                },
              },
              paper: {
                sx: {
                  '& .MuiAutocomplete-option': {
                    px: `8px !important`,
                  },
                },
              },
            }}
            renderInput={(params) => (
              <CustomTextField
                {...params}
                width={220}
                placeholder="Search Activity"
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <Iconify icon="eva:search-fill" sx={{ ml: 1, color: 'text.disabled' }} />
                    </InputAdornment>
                  ),
                }}
              />
            )}
            renderOption={(props, product, { inputValue }) => {}}
          />
        </Stack>
      </Stack>
      <Divider />
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
        <Box sx={modalStyle}>
        <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 1,
              }}
            >
              <Typography id="transition-modal-title" variant="h6" component="h2">
                Add A Promotional Code
              </Typography>
              <IconButton sx={{ color: 'text.main' }} onClick={handleClose}>
                <CloseOutlinedIcon />
              </IconButton>
            </Box>
            <Divider/>
            <Box sx={{ my: 2}}>
              <Box sx={{width: "200px"}}>
              <TextField value={code} onChange={handleSetCode} size="small" id="outlined-basic" 
              placeholder="XXXX-XXXX-XXXX" variant="outlined" sx={{width: "100%"}} />
              <Typography fontSize="14px" textAlign="right" sx={{mt:1 , ml:1}}>{code.length}/12</Typography>
              </Box>
              <Typography variant="subtitle2" fontSize="12px" sx={{mt:1}}>You might have received a promotional code from SKU Markets or one of our partners as part of a specific offer. If so, add the code here, then track your progress toward your reward.</Typography>
            </Box>
            <Box sx={{ textAlign: 'end', my: 2 }}>
              <Button
                variant="outlined"
                sx={{
                  color: 'text.main',
                  border: (theme) => `1px solid ${theme.palette.primary.main}`,
                }}
                onClick={handleClose}
              >
                Close
              </Button>
              <Button
                sx={{
                  bgcolor: 'primary.main',
                  border: (theme) => `1px solid ${theme.palette.primary.main}`,
                  color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
                  '&:hover': {
                    bgcolor: 'white',
                    color: (theme) =>
                      theme.palette.mode === 'light' ? 'primary.main' : 'primary.main',
                    border: (theme) => `1px solid ${theme.palette.primary.main}`,
                  },
                  mx: 2,
                }}
                // disabled={isLoading}
                onClick={handleClose}
              >
                Submit
              </Button>
            </Box>
        </Box>
        </Fade>
      </Modal>
    </>
  );
}

const PromotionTab = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(0);
  const [height, setHeight] = useState(pageSize * 51 + 250);
  const rows = [];
  for (let i = 1; i <= pageSize; i++) {
    rows.push({ ...rowsSchema, id: i });
  }
  useEffect(() => {
    setHeight(pageSize * 51 + 250);
  }, [pageSize]);
  return (
    <Card sx={{ p: 2 }}>
      <Typography variant="subtitle2" sx={{ mb: 2 }}>
        Promotions
      </Typography>
      <Divider />

      <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: 0, mb: 2 }}>
        <Box sx={{ height: height }}>
          <ThemeDataGrid
            checkbox={false}
            statementToolbar={CustomToolbar}
            setPage={setPage}
            columns={columns}
            rows={rows}
            rowCount={50}
            page={page}
            pageSize={pageSize}
            setPageSize={setPageSize}
            rowsPerPageOptions={[25, 50, 100]}
            //   loading={isLoading || isFetching}
            statement={true}
          />
        </Box>
      </Paper>
    </Card>
  );
};

export default PromotionTab;
