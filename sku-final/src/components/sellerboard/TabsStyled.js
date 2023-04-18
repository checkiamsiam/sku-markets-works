import { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import EventNoteIcon from '@mui/icons-material/EventNote';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import GradingIcon from '@mui/icons-material/Grading';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import PreviewIcon from '@mui/icons-material/Preview';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import { Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TablePagination from '@mui/material/TablePagination';
import { styled } from '@mui/system';
import { useGetAllOrdersQuery } from 'features/order/orderAPI';
import { useGetPaymentQuery } from 'features/payment/paymentAPI';
import { useGetShipmentQuery } from 'features/shipment/shipmentAPI';
import { OrderStatus, PaymentStatus } from 'helper/OrderStatuses';
import { ShipmentStatus } from 'helper/ShipmentStatuses';
import { useState } from 'react';
import { FaShippingFast } from 'react-icons/fa';
import { MdOutlinePaid } from 'react-icons/md';
import { TbReceiptTax, TbTruckReturn } from 'react-icons/tb';
import CommissionInvoices from './invoices/commission/CommissionInvoices';
import OrderCredit from './invoices/creditNotes/OrderCredit';
import OrderInvoices from './invoices/orderInvoices/OrderInvoices';
import VatInvoices from './invoices/vat/VatInvoices';
import PaymentsDisbusal from './payments/disbursal/PaymentsDisbusal';
import PaymentsPending from './payments/pending/PaymentsPending';
import PaymentsRetrived from './payments/retrived/PaymentsRetrived';
import RequestCompleted from './rfq/completed/RequestCompleted';
import RequestsNew from './rfq/new/RequestsNew';
import RequestRejected from './rfq/rejected/RequestRejected';
import RequestReview from './rfq/review/RequestReview';
import SearchSortFilter from './SearchSortFilter';
import ShipmentsPending from './shipments/pending/ShipmentsPending';
import ShipmentsRTV from './shipments/rtv/ShipmentsRTV';
import Shipping from './shipments/shipping/Shipping';
import TopTab from './TopTab';
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

const TabsStyled = ({ sellTab, setSellTab }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  /// RFQs
  const { data: requestedOrders, refetch: refetchRequested } = useGetAllOrdersQuery(
    `status[eq]=${OrderStatus.REQUESTED}&page=${page + 1}&limit=${rowsPerPage}`
  );
  const { data: reviewedOrders, refetch: refetchReviewed } = useGetAllOrdersQuery(
    `status[eq]=${OrderStatus.REVIEWED}&page=${page + 1}&limit=${rowsPerPage}`
  );
  const { data: rejectedOrders, refetch: refetchRejected } = useGetAllOrdersQuery(
    `status[in]=${OrderStatus.REJECTED_FROM_BUYER_RFQ}&status[in]=${
      OrderStatus.REJECTED_FROM_SELLER_RFQ
    }&status[in]=${OrderStatus.REJECTED_FROM_BUYER_PAYMENT}&page=${page + 1}&limit=${rowsPerPage}`
  );

  // Payments
  const { data: pendingPayments, refetch: refetchPaymentPending } = useGetPaymentQuery(
    `status[eq]=${PaymentStatus.PENDING}&page=${page + 1}&limit=${rowsPerPage}`
  );

  // Shipments

  /// PREPARING
  const { data: preparingShipments, refetch: refetchPreparingShipments } = useGetShipmentQuery(
    `status[eq]=${ShipmentStatus.PREPARING}&page=${page + 1}&limit=${rowsPerPage}`
  );
  const { data: pickedShipments, refetch: refetchPickedShipments } = useGetShipmentQuery(
    `status[eq]=${ShipmentStatus.PICKED}&page=${page + 1}&limit=${rowsPerPage}`
  );
  const { data: packedShipments, refetch: refetchPackedShipments } = useGetShipmentQuery(
    `status[eq]=${ShipmentStatus.PACKED}&page=${page + 1}&limit=${rowsPerPage}`
  );

  /// SHIPPING
  const { data: shippedShipments, refetch: refetchShippedShipments } = useGetShipmentQuery(
    `status[eq]=${ShipmentStatus.SHIPPED}&page=${page + 1}&limit=${rowsPerPage}`
  );
  const { data: deliveredShipments, refetch: refetchDeliveredShipments } = useGetShipmentQuery(
    `status[eq]=${ShipmentStatus.DELIVERED}&page=${page + 1}&limit=${rowsPerPage}`
  );

  /// RTV
  const { data: rtvAcceptanceShipments, refetch: refetchRTVAcceptanceShipments } =
    useGetShipmentQuery(
      `status[eq]=${ShipmentStatus.RTV_PENDING}&page=${page + 1}&limit=${rowsPerPage}`
    );
  const { data: rtvAwaitingShipments, refetch: refetchRTVAwaitingShipments } = useGetShipmentQuery(
    `status[eq]=${ShipmentStatus.RTV_CONFIRMED}&page=${page + 1}&limit=${rowsPerPage}`
  );
  const { data: rtvShippedShipments, refetch: refetchRTVShippedShipments } = useGetShipmentQuery(
    `status[eq]=${ShipmentStatus.RTV_SHIPPED}&page=${page + 1}&limit=${rowsPerPage}`
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // tab change

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack width="55%">
          <TopTab
            setSellTab={setSellTab}
            totalRfq={requestedOrders?.total + reviewedOrders?.total + rejectedOrders?.total}
            totalPayment={pendingPayments?.total}
            totalShipment={
              preparingShipments?.total +
              pickedShipments?.total +
              packedShipments?.total +
              shippedShipments?.total +
              deliveredShipments?.total +
              rtvAcceptanceShipments?.total +
              rtvAwaitingShipments?.total +
              rtvShippedShipments?.total
            }
          />
        </Stack>
        <SearchSortFilter />
      </Stack>
      <TabsUnstyled defaultValue={0}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={6} md={12}>
              {sellTab === 'rfq' && (
                <TabsList>
                  <Tab>
                    <FiberNewIcon sx={{ fontSize: '20px', fontWeight: '500' }} />
                    Requests New ({requestedOrders?.total})
                  </Tab>
                  <Tab>
                    <PreviewIcon sx={{ fontSize: '20px', fontWeight: '500' }} /> Requests Review (
                    {reviewedOrders?.total})
                  </Tab>
                  <Tab>
                    <ThumbDownOffAltIcon sx={{ fontSize: '20px', fontWeight: '500' }} />
                    Request Rejected ({rejectedOrders?.total})
                  </Tab>
                  <Tab>
                    <LibraryAddCheckIcon sx={{ fontSize: '20px', fontWeight: '500' }} />
                    Request Completed (400)
                  </Tab>
                </TabsList>
              )}
              {sellTab === 'payment' && (
                <TabsList>
                  <Tab>
                    <HourglassTopIcon sx={{ fontSize: '20px', fontWeight: '500' }} /> Payments
                    Pending ({pendingPayments?.total})
                  </Tab>
                  <Tab>
                    <PreviewIcon sx={{ fontSize: '20px', fontWeight: '500' }} /> Payments Retrieved
                    (0)
                  </Tab>
                  <Tab>
                    <MdOutlinePaid style={{ fontSize: '20px', fontWeight: '500' }} /> Payments
                    Disbursed (400)
                  </Tab>
                </TabsList>
              )}
              {sellTab === 'shipments' && (
                <TabsList>
                  <Tab>
                    {' '}
                    <HourglassTopIcon sx={{ fontSize: '20px', fontWeight: '500' }} /> Preparing (
                    {preparingShipments?.total + pickedShipments?.total + packedShipments?.total})
                  </Tab>
                  <Tab>
                    {' '}
                    <FaShippingFast style={{ fontSize: '20px', fontWeight: '500' }} /> Shipping (
                    {shippedShipments?.total + deliveredShipments?.total})
                  </Tab>
                  <Tab>
                    {' '}
                    <TbTruckReturn style={{ fontSize: '20px', fontWeight: '500' }} /> Returning (
                    {rtvAcceptanceShipments?.total +
                      rtvAwaitingShipments?.total +
                      rtvShippedShipments?.total}
                    )
                  </Tab>
                </TabsList>
              )}
              {sellTab === 'invoices' && (
                <TabsList>
                  <Tab>
                    <GradingIcon sx={{ fontSize: '20px', fontWeight: '500' }} /> Order Invoices (30)
                  </Tab>
                  <Tab>
                    <EventNoteIcon sx={{ fontSize: '20px', fontWeight: '500' }} /> Order Credit
                    Notes (2)
                  </Tab>
                  <Tab>
                    <AccountBalanceIcon sx={{ fontSize: '20px', fontWeight: '500' }} /> Order
                    Referral Fees Bills (400)
                  </Tab>
                  <Tab>
                    {' '}
                    <TbReceiptTax style={{ fontSize: '20px', fontWeight: '500' }} /> VAT Payable
                    (400)
                  </Tab>
                </TabsList>
              )}
            </Grid>
          </Grid>
        </Box>

        <TabPanel value={0}>
          {sellTab === 'rfq' && (
            <RequestsNew
              orders={requestedOrders?.data}
              refetch={[refetchRequested, refetchReviewed, refetchRejected]}
            />
          )}
          {sellTab === 'payment' && (
            <PaymentsPending
              payments={pendingPayments?.data}
              refetch={[refetchPaymentPending, refetchPreparingShipments, refetchRejected]}
            />
          )}
          {sellTab === 'shipments' && (
            <ShipmentsPending
              preparing={preparingShipments}
              picked={pickedShipments}
              packed={packedShipments}
              refetch={[
                refetchPreparingShipments,
                refetchPickedShipments,
                refetchPackedShipments,
                refetchShippedShipments,
                refetchDeliveredShipments,
                refetchRTVAcceptanceShipments,
                refetchRejected,
              ]}
            />
          )}
          {sellTab === 'invoices' && <OrderInvoices />}
        </TabPanel>
        <TabPanel value={1}>
          {sellTab === 'rfq' && (
            <RequestReview
              orders={reviewedOrders?.data}
              refetch={[refetchRequested, refetchReviewed, refetchRejected, refetchPaymentPending]}
            />
          )}
          {sellTab === 'payment' && <PaymentsRetrived />}
          {sellTab === 'shipments' && (
            <Shipping
              shipped={shippedShipments}
              delivered={deliveredShipments}
              refetch={[refetchShippedShipments, refetchDeliveredShipments, refetchRejected]}
            />
          )}
          {sellTab === 'invoices' && <OrderCredit />}
        </TabPanel>
        <TabPanel value={2}>
          {sellTab === 'rfq' && <RequestRejected orders={rejectedOrders?.data} />}
          {sellTab === 'payment' && <PaymentsDisbusal />}
          {sellTab === 'shipments' && (
            <ShipmentsRTV
              acceptance={rtvAcceptanceShipments}
              awaiting={rtvAwaitingShipments}
              shipped={rtvShippedShipments}
              refetch={[
                refetchRTVAcceptanceShipments,
                refetchRTVAwaitingShipments,
                refetchRTVShippedShipments,
                refetchRejected,
              ]}
            />
          )}
          {sellTab === 'invoices' && <CommissionInvoices />}
        </TabPanel>
        <TabPanel value={3}>
          {sellTab === 'rfq' && <RequestCompleted />}
          {sellTab === 'payment' && <PaymentsPending />}
          {sellTab === 'shipments' && <ShipmentsRTV />}
          {sellTab === 'invoices' && <VatInvoices />}
        </TabPanel>
        <TabPanel value={4}>
          {sellTab === 'rfq' && <RequestsNew />}
          {sellTab === 'payment' && <PaymentsPending />}
          {sellTab === 'shipments' && <ShipmentsPending />}
          {sellTab === 'invoices' && <OrderInvoices />}
        </TabPanel>
      </TabsUnstyled>
      <TablePagination
        sx={{ mt: 2 }}
        component="div"
        count={-1}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default TabsStyled;
