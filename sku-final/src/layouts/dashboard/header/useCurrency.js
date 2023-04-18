import { useEffect, useState } from 'react';
import useAuth from 'hooks/useAuth';
import { currency } from './currency';

const useCurrency = () => {
  const user = useAuth();
  //   get User Currency
  const items = currency.find(item => item?.value === user?.defaultCurrency?.value);

  const [getCrncy, setGetCrncy] = useState({});
  
  useEffect(() => {
    // const items = JSON.parse(localStorage.getItem('currency'));
    if (items) {
      setGetCrncy(items);
    }
  }, []);
    return (
        getCrncy
    );
};

export default useCurrency;