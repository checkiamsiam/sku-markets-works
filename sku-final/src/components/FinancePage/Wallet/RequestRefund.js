import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
// @mui
import { Button, Slider, Stack, Typography } from '@mui/material';
import InputAmount from 'components/common/InputAmount';
import { fCurrency } from 'utils/formatNumber';

// ----------------------------------------------------------------------

const STEP = 50;

const MIN_AMOUNT = 0;

const MAX_AMOUNT = 1000;

// ----------------------------------------------------------------------

RequestRefund.propTypes = {
  sx: PropTypes.object,
  list: PropTypes.array,
  title: PropTypes.string,
  subheader: PropTypes.string,
};

export default function RequestRefund({ title, subheader, list, sx, ...other }) {
  const [autoWidth, setAutoWidth] = useState(24);

  const [amount, setAmount] = useState(0);

  useEffect(() => {
    if (amount) {
      handleAutoWidth();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount]);

  const handleAutoWidth = () => {
    const getNumberLength = amount.toString().length;
    setAutoWidth(getNumberLength * 22);
  };

  const handleChangeSlider = (event, newValue) => {
    setAmount(newValue);
  };

  const handleChangeInput = (event) => {
    setAmount(event.target.value === '' ? '' : Number(event.target.value));
  };

  const handleBlur = () => {
    if (amount < 0) {
      setAmount(0);
    } else if (amount > MAX_AMOUNT) {
      setAmount(MAX_AMOUNT);
    }
  };
  return (
    <>

      <Stack spacing={3} sx={{ mt: 2 }}>
        <Typography variant="overline" sx={{ color: 'text.secondary' }}>
          insert amount
        </Typography>

        <InputAmount
          amount={amount}
          onBlur={handleBlur}
          autoWidth={autoWidth}
          onChange={handleChangeInput}
        />

        <Slider
          value={typeof amount === 'number' ? amount : 0}
          valueLabelDisplay="auto"
          step={STEP}
          marks
          min={MIN_AMOUNT}
          max={MAX_AMOUNT}
          onChange={handleChangeSlider}
        />

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
            Your Balance
          </Typography>
          <Typography variant="subtitle1">{fCurrency(34212)}</Typography>
        </Stack>

        <Button
          sx={{
            bgcolor: 'primary.main',
            border: (theme) => `1px solid ${theme.palette.primary.main}`,
            color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
            '&:hover': {
              bgcolor: 'white',
              color: (theme) => (theme.palette.mode === 'light' ? 'primary.main' : 'primary.main'),
              border: (theme) => `1px solid ${theme.palette.primary.main}`,
            },
          }}
          size="large"
          disabled={amount === 0}
        >
          Refund
        </Button>
      </Stack>
    </>
  );
}

// ----------------------------------------------------------------------


