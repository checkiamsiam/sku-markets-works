import { Button, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Time from 'react-time-format';
import ConfirmSellAlert from './SellModal';

const primaryColor = '#0d6efd';
const HistoricalDataCard = ({ product, handleFlip }) => {
  const [activeTab, setActiveTab] = useState('bbp');
  const [dataTitle, setDataTitle] = useState(['Buybox Sale Price', 'Date & Time']);
  const [openConfirmSell, setConfirmSell] = useState(false);
  const [historicalData, setHData] = useState(product?.dailyPrice);
  const tabs = [
    { placeHolder: 'BB Prices', key: 'bbp' },
    { placeHolder: 'E SOH', key: 'esoh' },
    { placeHolder: 'Sales volume', key: 'sv' },
    { placeHolder: 'MP cap', key: 'mpc' },
    { placeHolder: 'Trade Volume', key: 'tv' },
  ];

  const handleTabChange = (key) => {
    setActiveTab(key);
    switch (key) {
      case 'bbp':
        setHData(product?.dailyPrice);
        setDataTitle(['Buybox Sale Price', 'Date & Time']);
        break;
      case 'esoh':
        setHData(product?.stock_history);
        setDataTitle(['Estimated SOH', 'Date & Time']);
        break;
      case 'sv':
        setHData(product?.sold_24_hours_history);
        setDataTitle(['Sales volume', 'Date & Time']);
        break;
      case 'mpc':
        setHData(product?.market_cap_history);
        setDataTitle(['Marketplace cap', 'Date & Time']);
        break;
      case 'tv':
        setHData(product?.trade_value_history);
        setDataTitle(['Trade Volume', 'Date & Time']);
        break;
      default:
        break;
    }
  };

  const handleCloseSellModal = () => setConfirmSell(false);
  const handleShowSellModal = () => setConfirmSell(true);

  return (
    <>
      <Stack direction="row" spacing="3px" justifyContent="center" sx={{ marginBottom: '20px' }}>
        {tabs.map((tab, i) => (
          <Typography
            onClick={() => handleTabChange(tab.key)}
            key={i}
            style={{
              cursor: 'pointer',
              fontSize: '12px',
              padding: '3px',
              fontWeight: 600,
              color: tab.key === activeTab && primaryColor,
              border: `1px solid ${tab.key === activeTab ? primaryColor : 'transparent'}`,
              borderRadius: '20px',
              backgroundColor: tab.key === activeTab && 'rgba(0, 88, 252, 0.1)',
            }}
          >
            {tab.placeHolder}
          </Typography>
        ))}
      </Stack>

      <Stack justifyContent={'space-between'} direction={'row'}>
        <Typography width="50%" textAlign="center" sx={{ fontSize: '12px', fontWeight: 500 }}>
          {dataTitle[0]}
        </Typography>
        <Typography
          textAlign="center"
          width="50%"
          sx={{ fontSize: '12px', fontWeight: 500, paddingLeft: '5px' }}
        >
          {dataTitle[1]}
        </Typography>
      </Stack>
      <Stack height="88%" direction="column" justifyContent="space-between">
        <div>
          {historicalData?.slice(0, 14)?.map((data) => (
            <Stack
              key={data?._id}
              sx={{ my: 1 }}
              justifyContent={'space-between'}
              direction={'row'}
            >
              <Typography
                width="50%"
                textAlign="center"
                sx={{
                  fontSize: '12px',
                  color: data?.price >= 0 ? (data?.price === 0 ? primaryColor : 'green') : 'red',
                }}
              >
                {data?.price}
              </Typography>
              <Typography width="50%" textAlign="center" sx={{ fontSize: '12px' }}>
                <Time value={data?.date} format="YYYY/MM/DD hh:mm:ss" />
              </Typography>
            </Stack>
          ))}
        </div>

        <div>
          <Stack direction="row" spacing={5} justifyContent="center">
            <Link to="/skuMarket/2" style={{ textDecoration: 'none' }}>
              <Button
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
                  width: { md: 100, xs: 75 },
                  mx: 1,
                }}
              >
                Buy
              </Button>
            </Link>
            <Button
              onClick={handleShowSellModal}
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
                width: { md: 100, xs: 75 },
              }}
            >
              Sell
            </Button>
          </Stack>
          <Stack direction="row" justifyContent="center">
            <Typography
              sx={{
                cursor: 'pointer',
                fontSize: '12px',
                textDecoration: 'underline',
                color: primaryColor,
              }}
              onClick={handleFlip}
            >
              Back
            </Typography>
          </Stack>
        </div>
      </Stack>
      <ConfirmSellAlert
        open={openConfirmSell}
        handleClose={handleCloseSellModal}
        item={`SKU: ${product.id}`}
        alert={'Are you sure you want to Sell this SKU on SKU Markets Platform'}
        title={'Sku Sell Confirmation'}
        btnTitle={'Confirm'}
        text={'Request Review Confirmed Successfully'}
      />
    </>
  );
};

export default HistoricalDataCard;
