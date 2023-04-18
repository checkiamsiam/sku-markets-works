import { useSelector } from 'react-redux';
import BuyRejected from './BuyRejected';
import SellRejected from './SellRejected';

const RequestRejected = ({ orders }) => {
  const userId = useSelector((state) => state.user?._id);

  return (
    <>
      {orders?.map(({ order, buyerDetails, sellerDetails }) => {
        return (
          <>
            {userId == order.seller && <SellRejected order={order} buyer={buyerDetails} />}
            {userId == order.buyer && <BuyRejected order={order} seller={sellerDetails} />}
          </>
        );
      })}
    </>
  );
};

export default RequestRejected;
