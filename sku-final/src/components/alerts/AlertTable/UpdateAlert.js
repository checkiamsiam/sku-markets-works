import EditNotificationsIcon from '@mui/icons-material/EditNotifications';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import UpdateAlertModal from '../UpdateAlertModal';

const UpdateAlert = ({ row }) => {
  const [openModal, setOpenModal] = useState(false);
  const [skipAlertDetail, setSkipAlertDetail] = useState(true);

  const handleOpenModal = () => {
    setOpenModal(true);
    setSkipAlertDetail(false);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <IconButton onClick={handleOpenModal} color="primary">
        <EditNotificationsIcon size="small" />
      </IconButton>
      <UpdateAlertModal openModal={openModal} CloseModal={handleCloseModal} product={row} skipAlertDetail={skipAlertDetail} />
    </>
  );
};

export default UpdateAlert;
