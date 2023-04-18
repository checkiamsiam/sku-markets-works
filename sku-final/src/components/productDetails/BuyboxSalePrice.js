import InfoIcon from '@mui/icons-material/Info';
import { Chip, LinearProgress, Typography } from '@mui/material';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { Stack, styled } from '@mui/system';
import ThemeTooltip from 'components/common/ThemeTooltip';
import { useGetProductDetailQuery } from 'features/product/productAPI';
import { useEffect, useState } from 'react';

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip placement="right" {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}));

const BuyboxSalePrice = ({ id, publicMode = true }) => {
  const { data: product, isLoading, isSuccess } = useGetProductDetailQuery(id);
  const [labelTime, setLabelTime] = useState('24H');
  const [lowPrice, setLowPrice] = useState(product?.getTopBottomPrice?.bottomPrice?.last24Hours);
  const [highPrice, setHighPrice] = useState(product?.getTopBottomPrice?.topPrice?.last24Hours);
  const [progress, setProgress] = useState(0);
  const [percentage, setPercentage] = useState(0);

  const handleLabelTime = (t) => {
    if (t === '24H') {
      setLabelTime('07D');
    }
    if (t === '07D') {
      setLabelTime('14D');
    }
    if (t === '14D') {
      setLabelTime('30D');
    }
    if (t === '30D') {
      setLabelTime('24H');
    }
  };

  useEffect(() => {
    if (labelTime === '07D') {
      setLowPrice(product?.getTopBottomPrice?.bottomPrice?.last7Days);
      setHighPrice(product?.getTopBottomPrice?.topPrice?.last7Days);
    } else if (labelTime === '14D') {
      setLowPrice(product?.getTopBottomPrice?.bottomPrice?.last2Weeks);
      setHighPrice(product?.getTopBottomPrice?.topPrice?.last2Weeks);
    } else if (labelTime === '30D') {
      setLowPrice(product?.getTopBottomPrice?.bottomPrice?.last30Days);
      setHighPrice(product?.getTopBottomPrice?.topPrice?.last30Days);
    } else {
      setLowPrice(product?.getTopBottomPrice?.bottomPrice?.last24Hours);
      setHighPrice(product?.getTopBottomPrice?.topPrice?.last24Hours);
    }

    if (product?.current_price === lowPrice && product?.current_price === highPrice) {
      setProgress(50);
      setPercentage(0);
    } else {
      const dbhl = highPrice - lowPrice;
      const dblc = product?.current_price - lowPrice;
      const per = (dblc * 100) / dbhl;
      setProgress(parseInt(per));
      if (product?.current_price === lowPrice && product?.current_price !== highPrice) {
        const diff = product?.current_price - lowPrice;
        const per = (diff * 100) / lowPrice;
        setPercentage(-per.toFixed(2));
      } else if (product?.current_price !== lowPrice && product?.current_price === highPrice) {
        const diff = highPrice - product?.current_price;
        const per = (diff * 100) / highPrice;
        setPercentage(per.toFixed(2));
      } else if (
        Math.ceil(product?.current_price - lowPrice) ===
        Math.ceil(highPrice - product?.current_price)
      ) {
        setPercentage(50);
      } else if (product?.current_price - lowPrice > highPrice - product?.current_price) {
        const diff = highPrice - product?.current_price;
        const per = (diff * 100) / highPrice;
        setPercentage(per.toFixed(2));
      } else {
        const diff = product?.current_price - lowPrice;
        const per = (diff * 100) / lowPrice;
        setPercentage(-per.toFixed(2));
      }
    }
  }, [labelTime, product, lowPrice, highPrice]);

  // colors
  const gray = 'text.main';
  const lightGray = '#0d6efd';

  return (
    <>
      {isSuccess && (
        <>
          {!publicMode ? (
            <Typography
              style={{
                fontSize: '12px',
                fontWeight: 'bold',
                color: 'text.main',
                textAlign: 'center',
              }}
            >
              Buybox Sale Price
              <HtmlTooltip
                title={
                  <>
                    <em>{"And here's"}</em> <b>{'some'}</b> <u>{'amazing content'}</u>.{' '}
                    {"It's very engaging. Right?"}
                  </>
                }
              >
                <InfoIcon htmlColor={lightGray} fontSize="3px" />
              </HtmlTooltip>
            </Typography>
          ) : (
            <h6
              style={{
                fontWeight: 'bold',
                color: 'text.main',
                textAlign: 'center',
              }}
            >
              Buybox Sale Price
              <HtmlTooltip
                title={
                  <>
                    <em>{"And here's"}</em> <b>{'some'}</b> <u>{'amazing content'}</u>.{' '}
                    {"It's very engaging. Right?"}
                  </>
                }
              >
                <InfoIcon htmlColor={lightGray} fontSize="3px" />
              </HtmlTooltip>
            </h6>
          )}
          <Typography fontSize="12px" style={{ textAlign: 'center' }}>
            {product?.buy_box_currency} &nbsp;
            <span
              style={{
                fontWeight: 'bold',
                fontSize: '20px',
                color: gray,
              }}
            >
              {product?.current_price}
            </span>{' '}
            &nbsp;
            <span
              style={{ color: percentage >= 0 ? (percentage === 0 ? lightGray : 'green') : 'red' }}
            >
              {percentage} %
            </span>
          </Typography>

          <Stack
            direction="row"
            justifyContent="space-between"
            spacing={2}
            fontSize="12px"
            marginTop="10px"
          >
            <Stack width="100%">
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <span>Low</span>
                <Chip
                  onClick={() => handleLabelTime(labelTime)}
                  label={labelTime}
                  color="primary"
                  size="small"
                  sx={{ marginBottom: '5px' }}
                />

                <span>high</span>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                  padding: '1px',
                  borderRadius: '5px',
                  bgcolor: '#D3D3D3',
                  margin: '2px 0px',
                }}
              />
              <Stack direction="row" paddingTop="5px" justifyContent="space-between">
                <span>
                  {product?.buy_box_currency} {lowPrice}
                </span>
                <span>
                  {product?.buy_box_currency} {highPrice}
                </span>
              </Stack>
            </Stack>
          </Stack>
          {publicMode && (
            <Stack fontSize="12px" paddingTop="1rem" spacing={1}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={3}>
                <span style={{ fontWeight: 'bold', color: gray }}>
                  Estimated SOH{' '}
                  <HtmlTooltip
                    title={
                      <>
                        <em>{"And here's"}</em> <b>{'some'}</b> <u>{'amazing content'}</u>.{' '}
                        {"It's very engaging. Right?"}
                      </>
                    }
                  >
                    <InfoIcon htmlColor={lightGray} fontSize="3px" />
                  </HtmlTooltip>
                </span>
                <span style={{ color: gray }}>{Math.ceil(product?.estimated_SOH || 0)}</span>
              </Stack>
              <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={3}>
                <span style={{ fontWeight: 'bold', color: gray }}>
                  Sales volume L 24 H <ThemeTooltip />
                </span>
                <span style={{ color: gray }}>{Math.ceil(product?.sold_24_hours || 0)}</span>
              </Stack>
            </Stack>
          )}
        </>
      )}
    </>
  );
};

export default BuyboxSalePrice;
