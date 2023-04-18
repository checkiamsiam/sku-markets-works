import { useSelector } from 'react-redux';
import BuyTable from './BuyTable';
import SellTable from './SellTable';

const RequestsNew = ({ orders, refetch }) => {
  const userId = useSelector((state) => state.user?._id);
  return (
    <>
      {orders?.map(({ order, buyerDetails, sellerDetails }) => (
        <>
          {userId === order.seller && (
            <SellTable order={order} buyer={buyerDetails} refetch={refetch} />
          )}
          {userId === order.buyer && <BuyTable order={order} seller={sellerDetails} />}
        </>
      ))}
    </>
  );
};

export default RequestsNew;
