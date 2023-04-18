import AddIcon from '@mui/icons-material/Add';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import WalletIcon from '@mui/icons-material/Wallet';
import { Box, Button, Card, Chip, Grid, IconButton, Stack, Typography } from '@mui/material';
import { lightGray } from 'components/SkuMarket/TopSkuCard';
import SKUWalletLogo from 'components/common/SKUWalletLogo';
import { useState } from 'react';
import AddFundModal from './AddFundModal';
import RequestFundModal from './RequestFundModal';
import SendFundTransModal from './SendFundTransModal';
import VirtualCard from './VirtualCard';

const SubsAndBillingTopWallet = ({ setActiveTab }) => {
  const [open, setOpenAccept] = useState(false);
  const handleClose = () => {
    setOpenAccept(false);
  };
  const handleShowAccept = () => {
    setOpenAccept(true);
  };
  const [openSendTransferModal, setOpenSendTransferModal] = useState(false);
  const handleCloseOpenSendTransferModal = () => {
    setOpenSendTransferModal(false);
  };
  const handleOpenSendTransferModal = () => {
    setOpenSendTransferModal(true);
  };
  const [openRequestTransferModal, setOpenRequestTransferModal] = useState(false);
  const handleCloseRequestTransferModal = () => {
    setOpenRequestTransferModal(false);
  };
  const handleOpenRequestTransferModal = () => {
    setOpenRequestTransferModal(true);
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item md={6}>
          <Card sx={{ p: 3, minHeight: '100%' }}>
            <Stack direction="row">
              <Box sx={{ width: '50%' }}>
                <Stack sx={{ mb: 1 }}>
                  <SKUWalletLogo />
                </Stack>

                <Typography sx={{ fontSize: '12px' }}>
                  Wallet Default Currency <span style={{ fontWeight: 700 }}>SAR</span>
                </Typography>

                <Stack
                  onClick={handleShowAccept}
                  direction="row"
                  sx={{ padding: '3px 0px', mt: '10px' }}
                >
                  <Chip
                    sx={{
                      cursor: 'pointer',
                      background: lightGray,
                      color: 'white',
                    }}
                    icon={
                      <AddIcon
                        style={{
                          fontSize: '1.4rem',
                          color: 'white',
                        }}
                      />
                    }
                    label="Add Funds"
                    variant="outlined"
                  />
                </Stack>
              </Box>
              <Box sx={{ width: '50%' }}>
                <Stack direction="row" spacing={1} justifyContent="end" alignItems="center">
                  <Button
                    size="small"
                    sx={{
                      bgcolor: 'primary.main',
                      border: (theme) => `1px solid ${theme.palette.primary.main}`,
                      color: (theme) =>
                        theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
                      '&:hover': {
                        bgcolor: 'white',
                        color: (theme) =>
                          theme.palette.mode === 'light' ? 'primary.main' : 'primary.main',
                        border: (theme) => `1px solid ${theme.palette.primary.main}`,
                      },
                    }}
                    // disabled={subscription === 'free'}
                    onClick={handleOpenSendTransferModal}
                  >
                    Send Credit
                  </Button>
                  <Button
                    size="small"
                    sx={{
                      bgcolor: 'white',
                      border: (theme) => `1px solid ${theme.palette.primary.main}`,
                      color: (theme) =>
                        theme.palette.mode === 'light' ? 'primary.main' : 'primary.main',
                      '&:hover': {
                        bgcolor: 'primary.main',
                        color: (theme) =>
                          theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
                        border: (theme) => `1px solid ${theme.palette.primary.main}`,
                      },
                    }}
                    onClick={handleOpenRequestTransferModal}
                  >
                    Request Credit
                  </Button>
                </Stack>
                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent="end"
                  alignItems="center"
                  sx={{ mt: 5, mr: 5 }}
                >
                  <IconButton>
                    <CurrencyExchangeIcon />
                  </IconButton>
                  <IconButton>
                    <WalletIcon />
                  </IconButton>
                  <IconButton>
                    <QrCodeScannerIcon />
                  </IconButton>
                </Stack>
              </Box>
            </Stack>
          </Card>
        </Grid>
        <Grid item md={6}>
          <VirtualCard />
        </Grid>
      </Grid>
      <AddFundModal open={open} handleClose={handleClose} />
      <SendFundTransModal
        open={openSendTransferModal}
        handleClose={handleCloseOpenSendTransferModal}
      />
      <RequestFundModal
        open={openRequestTransferModal}
        handleClose={handleCloseRequestTransferModal}
      />
    </>
  );
};

export default SubsAndBillingTopWallet;
