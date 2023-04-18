import React from 'react';
import useCurrency from 'layouts/dashboard/header/useCurrency'
import { defaultCurrency } from 'layouts/dashboard/header/currency';
import numeral from 'numeral';

export default function CurrentCurrency(number) {
  const getCrncy = useCurrency();

  const result = getCrncy?.label + " " + numeral(number * (getCrncy?.rate || defaultCurrency?.rate)).format('0,0.00');
  return result;
}