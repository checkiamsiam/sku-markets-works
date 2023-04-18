import BuyDelivered from './BuyDelivered';
import SellDelivered from './SellDelivered';

const ShipmentsDelivered = ({ shipment, refetch }) => {
  return (
    <>
      {shipment?.data?.map(({ shipment, buyerDetails, sellerDetails }) => (
        <>
          {buyerDetails && <SellDelivered shipment={shipment} buyer={buyerDetails} />}
          {sellerDetails && (
            <BuyDelivered shipment={shipment} seller={sellerDetails} refetch={refetch} />
          )}
        </>
      ))}
    </>
  );
};

export default ShipmentsDelivered;
