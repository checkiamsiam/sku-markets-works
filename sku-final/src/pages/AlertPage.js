import DeliveryMethod from 'components/alerts/DeliveryMethod';
import NewAlert from 'components/alerts/NewAlert';
import TransactionMode from 'components/alerts/TransMode';
import SKUMarquee from 'components/common/marquee';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';

const AlertPage = () => {
  const { IsTransactionModeOn } = useSelector((state) => state.alertState);
  return (
    <>
      <Helmet>
        <title> Alert | Minimal UI</title>
      </Helmet>
      <SKUMarquee />
      {!IsTransactionModeOn ? (
        <>
          <NewAlert />
          <DeliveryMethod />
        </>
      ) : (
        <TransactionMode />
      )}
    </>
  );
};

export default AlertPage;
