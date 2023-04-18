import BuyShipped from './BuyShippped';
import SellShipped from './SellShipped';

const ShipmentsShipped = ({ shipment, refetch }) => {
  return (
    <>
      {shipment?.data?.map(({ shipment, buyerDetails, sellerDetails }) => (
        <>
          {buyerDetails && (
            <SellShipped shipment={shipment} buyer={buyerDetails} refetch={refetch} />
          )}
          {sellerDetails && <BuyShipped shipment={shipment} seller={sellerDetails} />}
        </>
      ))}
    </>
  );
};

export default ShipmentsShipped;
