import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import { Stack, Typography } from '@mui/material';
import ConfirmationAlert from 'components/sellerboard/sellerboardAlerts/ConfirmationAlert';
import { useState } from 'react';

const QntCell = ({ quantity }) => {
  const [qnt, setQnt] = useState(quantity);
  const [openAccept, setOpenAccept] = useState(false);
  const handleCloseAccept = () => {
    setOpenAccept(false);
  };
  const handleShowAccept = () => setOpenAccept(true);
  const handleMinusIcon = () => {
    if (qnt > 1) {
      setQnt(qnt - 1);
    }
  };

  return (
    <>
      <Stack
        direction="row"
        justifyContent="center"
        spacing={1}
        sx={{ border: `1px solid gray`, padding: '5px 10px', borderRadius: 1 }}
      >
        <RemoveIcon sx={{ cursor: 'pointer' }} onClick={handleMinusIcon} />
        <Typography>{qnt}</Typography>
        <DeleteIcon sx={{ cursor: 'pointer' }} onClick={handleShowAccept} />
      </Stack>
      <ConfirmationAlert
        open={openAccept}
        handleClose={handleCloseAccept}
        item={''}
        alert={'Are you sure you want to remove this sku'}
        title={'Confirm Remove'}
        btnTitle={'Remove'}
        text={'Sku Remove Successfully'}
      />
    </>
  );
};

export default QntCell;
