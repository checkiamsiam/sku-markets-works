import AddIcon from '@mui/icons-material/Add';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import RemoveIcon from '@mui/icons-material/Remove';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Divider,
  Fade,
  Grid,
  IconButton,
  Link,
  Modal,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import { modalStyle } from 'components/sellerboard/sellerboardAlerts/ConfirmationAlert';
import { useState } from 'react';
import { FaEquals } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';
import OverviewBillingAccordionDetails from './OverviewBillingAccordionDetails';
import TrasactionConfirmModal from './TransactionConfirmDialog';
import { lightGray } from 'components/SkuMarket/TopSkuCard';
import sabbBank from '../../../assets/images/SABB_Bank_Logo.png';

const AddFundModal = ({ open, handleClose }) => {
  const [amount, setAmount] = useState(null);

  const handleSetAmount = (e) => {
    setAmount(e.target.value);
  };

  const [openConfirm, setOpenConfirm] = useState(false);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const [expand, setExpand] = useState(false);

  return (
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
              Add New Funds
            </Typography>
            <IconButton sx={{ color: 'text.main' }} onClick={handleClose}>
              <CloseOutlinedIcon />
            </IconButton>
          </Box>
          <Divider />
          <Box sx={{ my: 2 }}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={1}
              sx={{ mt: 2 }}
            >
              <Typography variant="subtitle1">Specify your amount</Typography>
              <TextField
                size="small"
                name="amount"
                label="Amount"
                value={amount}
                onChange={handleSetAmount}
                required
              />
            </Stack>

            {/* show information's by default currency */}
            <Typography variant="subtitle1" sx={{mt:3}}>Bank Transfer to SKU Markets Wallet</Typography>
              <Divider />
            <Accordion
              expanded={expand}
              onChange={(e, expand) => setExpand(expand)}
              sx={{
                mt:2 ,
                p: 2,
                boxShadow: 5,
                transition: 'all 0.3s ease-in-out',
                ':hover': {
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#1F262E' : '#F6F7F8',
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Grid container>
                <Grid item xs={12} md={8}>
                  <Typography variant="subtitle1">
                  SABB Bank
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                <img
                    // component={Image}
                    src={sabbBank}
                    alt="marketplace"
                    style={{ maxWidth: '70px', height: '30px' }}
                  />
                </Grid>
                </Grid>
                
              </AccordionSummary>
              <AccordionDetails>
                <Divider sx={{mb:2}}/>
              <Stack sx={{mb:1}}>
                <Typography variant="subtitle1" fontSize="12px">Beneficiency Name</Typography>
                <Typography
                  variant="subtitle1"  fontSize="12px"
                  sx={{  textTransform: 'uppercase' }}
                >
                  ALARDH ALMUTQEN FOR TRS EST
                </Typography>
              </Stack>
              <Stack sx={{mb:1}}>
                <Typography variant="subtitle1"  fontSize="12px">IBAN</Typography>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="subtitle1"  fontSize="12px">
                    SA1554456565565465464565
                  </Typography>
                  <Typography
                    variant="subtitle1"  fontSize="12px"
                    sx={{ cursor: 'pointer', color: lightGray }}
                  >
                    Copy
                  </Typography>
                </Stack>
              </Stack>
              <Stack sx={{mb:1}}>
                <Typography variant="subtitle2"  fontSize="12px">Account Number</Typography>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="subtitle1"  fontSize="12px">
                  003628955002
                  </Typography>
                  <Typography
                    variant="subtitle1"  fontSize="12px"
                    sx={{  cursor: 'pointer', color: lightGray }}
                  >
                    Copy
                  </Typography>
                </Stack>
              </Stack>
              <Stack sx={{mb:1}}>
                <Typography variant="subtitle2"  fontSize="12px">Swift Code</Typography>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="subtitle1"  fontSize="12px">
                  SABBSARI
                  </Typography>
                  <Typography
                    variant="subtitle1"  fontSize="12px"
                    sx={{  cursor: 'pointer', color: lightGray }}
                  >
                    Copy
                  </Typography>
                </Stack>
              </Stack>
              <Stack sx={{mb:1}}>
                <Typography variant="subtitle2"  fontSize="12px">Account Currency</Typography>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="subtitle1"  fontSize="12px" >
                  SAR
                  </Typography>
                  <Typography
                    variant="subtitle1"  fontSize="12px"
                    sx={{  cursor: 'pointer', color: lightGray }}
                  >
                    Copy
                  </Typography>
                </Stack>
              </Stack>
              <Stack sx={{mb:1}}>
                <Typography variant="subtitle2"  fontSize="12px">Beneficiary Bank Address</Typography>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="subtitle1"  fontSize="12px">
                  Soudi, Arabia
                  </Typography>
                  <Typography
                    variant="subtitle1"  fontSize="12px"
                    sx={{  cursor: 'pointer', color: lightGray }}
                  >
                    Copy
                  </Typography>
                </Stack>
              </Stack>
              </AccordionDetails>
            </Accordion>
            
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
              onClick={handleOpenConfirm}
            >
              Add Funds
            </Button>
            <TrasactionConfirmModal
              open={openConfirm}
              amount={amount}
              onClose={handleCloseConfirm}
            />
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default AddFundModal;
