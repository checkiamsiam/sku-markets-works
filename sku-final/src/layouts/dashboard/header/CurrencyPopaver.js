import { useState } from 'react';
// @mui
import { MenuItem, Stack, Typography } from '@mui/material';
// locales
// components
import { IconButtonAnimate } from '../../../components/animate';
import MenuPopover from '../../../components/menu-popover';
import { currency, defaultCurrency } from './currency';
import useCurrency from './useCurrency';
import useAuth from 'hooks/useAuth'

// ----------------------------------------------------------------------

export default function CurrencyPopover() {
  const getCrncy = useCurrency();
  const user = useAuth();

  const [openPopover, setOpenPopover] = useState(null);

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  //   set currency
  const [crncy, setCrncy] = useState('');

  /*   useEffect(() => {
    localStorage.setItem('currency', JSON.stringify(crncy));
  }, [crncy]); */

  const handleChangeCurrency = (newC) => {
    setCrncy(newC);
    localStorage.setItem('currency', JSON.stringify(newC));
    handleClosePopover();
    window.location.reload();
  };

  return (
    <>
      <IconButtonAnimate
        // onClick={handleOpenPopover}
        sx={{
          width: 40,
          height: 40,
          ...(openPopover && {
            bgcolor: 'action.selected',
          }),
        }}
      >
        {/* <Image disabledEffect src={currentLang.icon} alt={currentLang.label} /> */}
        <Typography>
          {/*getCrncy?.label ? getCrncy.label : crncy?.label || defaultCurrency.label*/}
          {user?.defaultCurrency?.label || defaultCurrency.label}
        </Typography>
      </IconButtonAnimate>

      <MenuPopover open={openPopover} onClose={handleClosePopover} sx={{ width: 250 }}>
        <Stack spacing={0.75}>
          {currency.map((option) => (
            <MenuItem
              key={option.value}
              selected={option.label === (getCrncy?.label || crncy?.label)}
              // selected={option.label === (crncy?.label || getCrncy?.label)}
              // onClick={() => handleChangeCurrency(option)}
            >
              {option.value}
            </MenuItem>
          ))}
        </Stack>
      </MenuPopover>
    </>
  );
}
