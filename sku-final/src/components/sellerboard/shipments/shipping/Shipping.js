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
import { CiDeliveryTruck } from 'react-icons/ci';
import { FaRegHandshake } from 'react-icons/fa';
import ShipmentsDelivered from '../delivered/ShipmentsDelivered';
import ShipmentsShipped from '../shipped/ShipmentsShipped';

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

const Shipping = ({ shipped, delivered, refetch }) => {
  return (
    <>
      <TabsUnstyled defaultValue={0}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={6} md={12}>
              <TabsList>
                <Tab>
                  {' '}
                  <CiDeliveryTruck style={{ fontSize: '20px', fontWeight: '500' }} />
                  Shipments Shipped ({shipped?.total ?? 0})
                </Tab>
                <Tab>
                  <FaRegHandshake style={{ fontSize: '20px', fontWeight: '500' }} /> Shipments
                  Delivered ({delivered?.total ?? 0})
                </Tab>
              </TabsList>
            </Grid>
          </Grid>
        </Box>

        <TabPanel value={0}>
          <ShipmentsShipped shipment={shipped} refetch={refetch} />
        </TabPanel>
        <TabPanel value={1}>
          <ShipmentsDelivered shipment={delivered} refetch={refetch} />
        </TabPanel>
      </TabsUnstyled>
    </>
  );
};

export default Shipping;
