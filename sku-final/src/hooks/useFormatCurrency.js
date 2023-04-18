import useAuth from 'hooks/useAuth';
import { currency } from 'layouts/dashboard/header/currency';
import { defaultCurrency } from 'layouts/dashboard/header/currency';
import numeral from 'numeral';

const useFormatCurrency = () => {
  const user = useAuth();
  const item = currency.find(item => item?.value === user?.defaultCurrency?.value);
  
  const formatCurrency = (number) => {
    return item?.label + " " + numeral(number * (item?.rate)).format('0,0.00')
  }

  return formatCurrency;
}

export default useFormatCurrency;