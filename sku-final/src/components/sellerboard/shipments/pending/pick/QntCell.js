import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import { Stack, Typography } from '@mui/material';
import ConfirmationAlert from 'components/sellerboard/sellerboardAlerts/ConfirmationAlert';
import { reduceShipmentQuantity, removeShipmentItem } from 'features/shipment/shipmentSlice';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const QntCell = ({ quantity, orderId }) => {
  const [qnt, setQnt] = useState(quantity);
  const [openAccept, setOpenAccept] = useState(false);

  const dispatch = useDispatch();

  const handleCloseAccept = () => {
    setOpenAccept(false);
  };

  const handleShowAccept = () => setOpenAccept(true);

  const handleMinusIcon = () => {
    if (qnt > 1) {
      dispatch(reduceShipmentQuantity({ id: orderId }));
      setQnt(qnt - 1);
    }
  };

  const handleItemRemoval = () => {
    dispatch(removeShipmentItem({ id: orderId }));
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
        callback={handleItemRemoval}
      />
    </>
  );
};

export default QntCell;
