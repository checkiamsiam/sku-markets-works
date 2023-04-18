import { useTheme } from '@emotion/react';
import CloseIcon from '@mui/icons-material/Close';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { Link, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Switch from '@mui/material/Switch';
import MPLogo from 'components/common/MPLogo';
import Label from 'components/label/Label';
import { useState } from 'react';
import { BsWhatsapp } from 'react-icons/bs';
import { FaRegEdit } from 'react-icons/fa';
import { Link as DomLink } from 'react-router-dom';
import EditAlert from '../EditAlert';
import RemoveAlert from './RemoveAlert';
import { StyledTableCell, StyledTableRow } from './static';

export default function MyTableRow({ sku: item }) {
  const [checked, setChecked] = useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const image = item?.product?.all_images ? item?.product?.all_images[0] : null;

  let notification_target = [];

  for (const [key, value] of Object.entries(item)) {
    if (key === 'price_move_above' && value > 0) {
      notification_target.push('Price Above');
    } else if (key === 'price_move_below' && value > 0) {
      notification_target.push('Price Below');
    } else if (key === 'stock_move_above' && value > 0) {
      notification_target.push('Stock Above');
    } else if (key === 'stock_move_below' && value > 0) {
      notification_target.push('Stock Below');
    } else if (key === 'store_move_below' && value > 0) {
      notification_target.push('Store Below');
    } else if (key === 'store_move_above' && value > 0) {
      notification_target.push('Store Above');
    } else if (key === 'price_range' && (value.top > 0 || value.bottom > 0)) {
      notification_target.push('Price Range');
    } else if (key === 'stock_range' && (value.top > 0 || value.bottom > 0)) {
      notification_target.push('Stock Range');
    } else if (key === 'store_range' && (value.top > 0 || value.bottom > 0)) {
      notification_target.push('Store Range');
    }
  }

  // if no notification target is set then show 'None'
  if (notification_target.length === 0) {
    notification_target.push('None');
  }

  // if  notification target length gets more than 3 then remove the last one and add '...'
  if (notification_target.length > 3) {
    notification_target = notification_target.slice(0, 3);
    notification_target.push('...');
  }

  // modal data

  /* Edit Alert */
  const [openEditAlert, setOpenEditAlert] = useState(false);
  const handleCloseAlertEdit = () => setOpenEditAlert(false);
  const handleShowAlertEdit = () => setOpenEditAlert(true);
  // Pop -Up Remove
  const [openRemoveAlert, setOpenRemoveAlert] = useState(false);
  const handleCloseAlertRemove = () => setOpenRemoveAlert(false);
  const handleShowAlertRemove = () => setOpenRemoveAlert(true);

  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  return (
    <>
      <StyledTableRow>
        <StyledTableCell>
          <Stack direction="row">
            <Box
              sx={{
                width: 70,
                height: 70,
              }}
            >
              <img src={image} alt={item?.sku} height="100%" />
            </Box>
            <Stack>
              <Link
                sx={{
                  fontSize: '14px',
                  textAlign: 'left',
                }}
                component={DomLink}
                to={`/product/${item?.product?.id}`}
              >
                {item?.sku}
              </Link>
              <Link
                sx={{
                  color: 'text.secondary',
                  fontSize: '14px',
                  textAlign: 'left',
                }}
                component={DomLink}
                to={`/brand/${item?.product?.brand_en}`}
              >
                {item?.product?.brand_en}
              </Link>
              <Link
                sx={{
                  color: 'text.secondary',
                  fontSize: '14px',
                  textAlign: 'left',
                }}
                component={DomLink}
                to={`/category/${item?.product?.category_en}`}
              >
                {item?.product?.category_en}
              </Link>
            </Stack>
          </Stack>
        </StyledTableCell>
        <StyledTableCell>
          <Stack
            direction="row"
            alignContent={'center'}
            justifyContent={'center'}
            sx={{
              flexWrap: 'wrap',
            }}
          >
            {notification_target?.map((target, index) => (
              <Label
                key={index}
                variant={isLight ? 'soft' : 'filled'}
                color={
                  (target.includes('Above') && 'success') ||
                  ((target.includes('Range') || target.includes('...')) && 'warning') ||
                  'error'
                }
                sx={{ mx: 'auto' }}
              >
                {target}
              </Label>
            ))}
          </Stack>
        </StyledTableCell>
        <StyledTableCell>
          <MPLogo marketplace={item?.product.sku_marketplace} />
        </StyledTableCell>
        <StyledTableCell>{item?.store}</StyledTableCell>
        <StyledTableCell>{item?.product?.sku_rate}</StyledTableCell>
        <StyledTableCell>{item?.product?.sku_rank}</StyledTableCell>
        <StyledTableCell>
          <Label variant={isLight ? 'soft' : 'filled'} color={'success'} sx={{ mx: 'auto' }}>
            Express
          </Label>
        </StyledTableCell>
        <StyledTableCell>
          <Label
            variant={isLight ? 'soft' : 'filled'}
            color={item?.is_live ? 'success' : 'error'}
            sx={{ mx: 'auto' }}
          >
            {item?.is_live ? 'Live' : 'Not Live'}
          </Label>
        </StyledTableCell>
        <StyledTableCell>{item?.price}</StyledTableCell>
        <StyledTableCell>{item.comment ? item.comment : 'No Comment'}</StyledTableCell>
        <StyledTableCell>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}
          >
            <IconButton color="inherit" size="small">
              <BsWhatsapp style={{ color: '#27C469', fontSize: '20px' }} />
            </IconButton>
            <IconButton color="primary" size="small">
              <MailOutlineIcon color="primary" />
            </IconButton>
          </Box>
        </StyledTableCell>
        <StyledTableCell>
          <Switch
            checked={checked}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </StyledTableCell>
        <StyledTableCell>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}
          >
            <IconButton onClick={handleShowAlertRemove} color="inherit" size="small">
              <CloseIcon />
            </IconButton>
            <IconButton onClick={handleShowAlertEdit} color="inherit" size="small">
              <FaRegEdit />
            </IconButton>
          </Box>
        </StyledTableCell>
      </StyledTableRow>
      <EditAlert
        openEditAlert={openEditAlert}
        item={item}
        handleCloseAlertEdit={handleCloseAlertEdit}
      />
      <RemoveAlert open={openRemoveAlert} item={item} handleClose={handleCloseAlertRemove} />
    </>
  );
}
