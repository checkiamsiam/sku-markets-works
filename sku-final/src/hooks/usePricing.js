import { selectPricing } from 'features/pricing/pricingSlice';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

const usePricing = () => {
    const pricing = useSelector(selectPricing);
    return useMemo(() => ({ ...pricing }), [pricing]);
};

export default usePricing;
