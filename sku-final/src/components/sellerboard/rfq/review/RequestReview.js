import { useSelector } from 'react-redux';
import BuyReview from './BuyReview';
import SellReview from './SellReview';

const RequestReview = ({ orders, refetch }) => {
  const userId = useSelector((state) => state.user?._id);

  return (
    <>
      {orders?.map(({ order, buyerDetails, sellerDetails }) => {
        return (
          <>
            {userId == order.seller && <SellReview order={order} buyer={buyerDetails} />}
            {userId == order.buyer && (
              <BuyReview order={order} seller={sellerDetails} refetch={refetch} />
            )}
          </>
        );
      })}
    </>
  );
};

export default RequestReview;
