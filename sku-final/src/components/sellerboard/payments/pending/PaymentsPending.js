import { useSelector } from 'react-redux';
import BuyPending from './BuyPending';
import SellPending from './SellPending';

const PaymentsPending = ({ payments, refetch }) => {
  const userId = useSelector((state) => state.user?._id);

  return (
    <>
      {payments?.map(({ payment, buyerDetails, sellerDetails }) => (
        <>
          {userId === payment?.seller && <SellPending payment={payment} buyer={buyerDetails} />}
          {userId === payment?.user && (
            <BuyPending payment={payment} seller={sellerDetails} refetch={refetch} />
          )}
        </>
      ))}
    </>
  );
};

export default PaymentsPending;
