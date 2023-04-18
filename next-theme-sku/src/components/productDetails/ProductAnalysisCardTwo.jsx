import React from 'react';
import { Card, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { Stack } from '@mui/system';
import InfoIcon from '@mui/icons-material/Info';

const ProductAnalysisCardTwo = () => {
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

  // colors
  const gray = '#7A797D';
  const lightGray = '#999999';
  return (
    <Card sx={{ padding: '1.5rem', width: { lg: '40%' }, borderRadius: '10px', boxShadow: 3 }}>
      <Stack direction="column" spacing={1.5} fontSize="12px" marginTop={1.5}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <span style={{ width: '50%', fontWeight: 'bold', color: '#7A797D' }}>
            Sku Title:{' '}
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
          <span style={{ width: '50%', color: '#7A797D' }}>Portable Diaper Organizer</span>
        </Stack>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <span style={{ width: '50%', fontWeight: 'bold', color: '#7A797D' }}>
            Sku Category:{' '}
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
          <span style={{ width: '50%', color: '#7A797D' }}>
            <Link href="/category" underline="none">
              Baby Products
            </Link>
          </span>
        </Stack>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <span style={{ width: '50%', fontWeight: 'bold', color: '#7A797D' }}>
            Sku Type:{' '}
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
          <span style={{ width: '50%', color: '#7A797D' }}>Diapering</span>
        </Stack>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <span style={{ width: '50%', fontWeight: 'bold', color: '#7A797D' }}>
            Sku Sub-Type:{' '}
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
          <span style={{ width: '50%', color: '#7A797D' }}>Diaper Stackers & Organisers</span>
        </Stack>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <span style={{ width: '50%', fontWeight: 'bold', color: '#7A797D' }}>
            Sku Brand:{' '}
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
          <span style={{ width: '50%', color: '#7A797D' }}>
            {' '}
            <Link href="/brand" underline="none">
              Beauenty
            </Link>
          </span>
        </Stack>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <span style={{ width: '50%', fontWeight: 'bold', color: '#7A797D' }}>
            Sku Description:{' '}
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
          <span style={{ width: '50%', color: '#7A797D' }}>
            The diaper has a strong t divider that is securely attached to the sides and the bottom,
            and more.
          </span>
        </Stack>
      </Stack>
    </Card>
  );
};

export default ProductAnalysisCardTwo;
