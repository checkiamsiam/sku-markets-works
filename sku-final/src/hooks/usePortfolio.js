import { selectPortfolio } from 'features/portfolio/portfolioSlice';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

const usePortfolio = () => {
  const portfolio = useSelector(selectPortfolio);
  return useMemo(() => ({ ...portfolio }), [portfolio]);
};

export default usePortfolio;
