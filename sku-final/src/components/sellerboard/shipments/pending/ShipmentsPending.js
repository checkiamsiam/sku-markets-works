import {
  buttonUnstyledClasses,
  TabPanelUnstyled,
  TabsListUnstyled,
  TabsUnstyled,
  TabUnstyled,
  tabUnstyledClasses
} from '@mui/base';
import { Box, Grid } from '@mui/material';
import { styled } from '@mui/system';
import { FaPallet } from 'react-icons/fa';
import { GiDeliveryDrone } from 'react-icons/gi';
import { GoPackage } from 'react-icons/go';
import { useSelector } from 'react-redux';
import BuyShipPendingDeliver from './deliver/BuyShipPending';
import SellShipPendingDeliver from './deliver/SellShipPending';
import BuyShipPendingPack from './pack/BuyShipPending';
import SellShipPendingPack from './pack/SellShipPending';
import BuyShipPendingPick from './pick/BuyShipPending';
import SellShipPendingPick from './pick/SellShipPending';

const blue = {
  50: '#F0F7FF',
  100: '#C2E0FF',
  200: '#80BFFF',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B2',
  800: '#004C99',
  900: '#003A75',
};

const grey = {
  50: '#f6f8fa',
  100: '#eaeef2',
  200: '#d0d7de',
  300: '#afb8c1',
  400: '#8c959f',
  500: '#6e7781',
  600: '#57606a',
  700: '#424a53',
  800: '#32383f',
  900: '#24292f',
};

const Tab = styled(TabUnstyled)`
  //   font-family: IBM Plex Sans, sans-serif;
  color: #fff;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 600;
  background-color: transparent;
  width: 100%;
  padding: 10px 12px;
  margin: 6px 6px;
  border: none;
  border-radius: 7px;
  display: flex;
  gap: 3px;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: ${blue[400]};
  }

  /* &:focus {
      color: #fff;
      outline: 3px solid ${blue[200]};
    } */

  &.${tabUnstyledClasses.selected} {
    background-color: #fff;
    color: ${blue[600]};
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabPanel = styled(TabPanelUnstyled)(
  ({ theme }) => `
    width: 100%;
    // font-family: IBM Plex Sans, sans-serif;
   /*  font-size: 0.875rem;
    padding: 20px 12px;
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    border-radius: 12px;
    opacity: 0.6; */
    `
);

const TabsList = styled(TabsListUnstyled)(
  ({ theme }) => `
    min-width: 380px;
    background-color: ${blue[500]};
    border-radius: 12px;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    align-content: space-between;
    box-shadow: 0px 4px 30px ${theme.palette.mode === 'dark' ? grey[900] : grey[200]};
    `
);

const ShipmentsPending = ({ preparing, picked, packed, refetch }) => {
  const userId = useSelector((state) => state.user?._id);

  return (
    <>
      <TabsUnstyled defaultValue={0}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={6} md={12}>
              <TabsList>
                <Tab>
                  <FaPallet style={{ fontSize: '20px', fontWeight: '500' }} /> Pick (
                  {preparing?.total ?? 0})
                </Tab>
                <Tab>
                  <GoPackage style={{ fontSize: '20px', fontWeight: '500' }} /> Pack (
                  {picked?.total ?? 0})
                </Tab>
                <Tab>
                  <GiDeliveryDrone style={{ fontSize: '20px', fontWeight: '500' }} /> Ready to
                  Deliver ({packed?.total ?? 0})
                </Tab>
                {/* <Tab>
                  Awaiting Pickup
                  </Tab> */}
              </TabsList>
            </Grid>
          </Grid>
        </Box>

        <TabPanel value={0}>
          {preparing?.data?.map(({ shipment, buyerDetails, sellerDetails }) => (
            <>
              {buyerDetails && (
                <SellShipPendingPick shipment={shipment} buyer={buyerDetails} refetch={refetch} />
              )}
              {sellerDetails && <BuyShipPendingPick shipment={shipment} seller={sellerDetails} />}
            </>
          ))}
        </TabPanel>
        <TabPanel value={1}>
          {picked?.data?.map(({ shipment, buyerDetails, sellerDetails }) => (
            <>
              {buyerDetails && (
                <SellShipPendingPack shipment={shipment} buyer={buyerDetails} refetch={refetch} />
              )}
              {sellerDetails && <BuyShipPendingPack shipment={shipment} seller={sellerDetails} />}
            </>
          ))}
        </TabPanel>
        <TabPanel value={2}>
          {packed?.data?.map(({ shipment, buyerDetails, sellerDetails }) => (
            <>
              {buyerDetails && (
                <SellShipPendingDeliver
                  shipment={shipment}
                  buyer={buyerDetails}
                  refetch={refetch}
                />
              )}
              {sellerDetails && (
                <BuyShipPendingDeliver shipment={shipment} seller={sellerDetails} />
              )}
            </>
          ))}
        </TabPanel>
        {/* <TabPanel value={3}>awaiting</TabPanel> */}
      </TabsUnstyled>
    </>
  );
};

export default ShipmentsPending;
