import AddIcon from '@mui/icons-material/Add';
import { Chip, Drawer, Stack } from '@mui/material';
import { lightGray } from 'components/sellerboard/rfq/new/SellTable';
import { NAV } from 'config-global';
import { useState } from 'react';
import AddPartnerStoreDrawer from './AddPartnerStoreDrawer';

const AddParnerStoreButton = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };
  return (
    <>
      <Stack onClick={toggleDrawer}>
        <Chip
          sx={{
            cursor: 'pointer',
            background: lightGray,
            color: 'white',
          }}
          icon={
            <AddIcon
              style={{
                fontSize: '1.4rem',
                color: 'white',
              }}
            />
          }
          label="Add Partner Store"
          variant="outlined"
        />
      </Stack>
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={toggleDrawer}
        BackdropProps={{
          invisible: true,
        }}
        PaperProps={{
          sx: { width: NAV.W_BASE },
        }}
      >
        <AddPartnerStoreDrawer toggleDrawer={toggleDrawer} />
      </Drawer>
    </>
  );
};

export default AddParnerStoreButton;
