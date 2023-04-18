import AddIcon from '@mui/icons-material/Add';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Chip, ListItem, ListItemAvatar, ListItemText, Menu, Stack, CircularProgress } from '@mui/material';
import { setActiveAddress } from 'features/billingInfo/billingInfoSlice';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from 'features/message/messageSlice'

import {
  useUpdateDefaultAddressMutation,
} from 'features/billingInfo/billingInfoApi';

const AdressModal = ({
  adressMenu,
  adressListMenuOpen,
  handleCloseAdressList,
  handleAdressListModalOpen,
  loading,
}) => {
  const dispatch = useDispatch();
  const { addresses, activeAddress, defaultAddress } = useSelector((state) => state.billingInfo);

  const [makeDefault, { isLoading }] = useUpdateDefaultAddressMutation();

  // handle make default address
  const handleDefault = (address) => {
    if(!address.isApproved) {
      dispatch(addMessage({message: "Address isn't approved yet",type: 'info'}))
      return;
    }
    dispatch(setActiveAddress(address));
    makeDefault({addressId: address._id});
  };

  return (
    <Menu
      id="basic-menu"
      anchorEl={adressMenu}
      open={adressListMenuOpen}
      onClose={handleCloseAdressList}
      MenuListProps={{
        'aria-labelledby': 'star-button',
      }}
      sx={{ width: '400px', height: '300px', fontSize: '12px' }}
    >
      <div>
        <h3 style={{ fontSize: '12px', color: 'text.main', padding: '0 10px' }}>Select Adress</h3>

        {loading ? (
          <ListItem button sx={{ padding: '3px 6px' }}>
            <ListItemText>Loading...</ListItemText>
          </ListItem>
        ) : (
          <>
            {addresses?.map((address) => (
              <ListItem
                button
                onClick={() => handleDefault(address)}
                sx={{ padding: '3px 6px' }}
              >
                <ListItemText sx={{ fontSize: '10px' }}>{address?.title}</ListItemText>
                <ListItemAvatar sx={{ textAlign: 'right' }}>
                {(isLoading && activeAddress?._id === address?._id) ? (
                  <CircularProgress size={16}/>
                ) : (
                  <>
                    {defaultAddress === address?._id ? (
                      <CheckCircleIcon color="primary" sx={{ fontSize: '1.3rem' }} />
                    ) : (
                      <AddIcon />
                    )}
                  </>
                )}
                </ListItemAvatar>
              </ListItem>
            ))}
          </>
        )}

        <Stack
          sx={{ width: '200px', padding: '3px 20px' }}
          button
          onClick={() => {
            handleAdressListModalOpen();
            handleCloseAdressList();
          }}
        >
          <Chip
            sx={{ cursor: 'pointer', backgroundColor: 'none !important' }}
            icon={<AiOutlinePlusCircle style={{ fontSize: '1.4rem' }} />}
            label="Add New Adress"
            variant="outlined"
          />
        </Stack>
      </div>
    </Menu>
  );
};

export default AdressModal;
