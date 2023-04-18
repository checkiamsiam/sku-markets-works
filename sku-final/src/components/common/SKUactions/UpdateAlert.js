import EditNotificationsIcon from '@mui/icons-material/EditNotifications';
import IconButton from '@mui/material/IconButton';
import UpdateAlertModal from 'components/alerts/UpdateAlertModal';
import { useState } from 'react';

const UpdateAlert = ({ row }) => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <IconButton onClick={handleOpenModal} color="primary"  size="small">
        <EditNotificationsIcon size="small" />
      </IconButton>
      <UpdateAlertModal openModal={openModal} CloseModal={handleCloseModal} product={row} />
    </>
  );
};

export default UpdateAlert;
