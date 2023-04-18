import { selectCurrentPlan } from 'features/plan/planSlice';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

const usePlan = () => {
  const plan = useSelector(selectCurrentPlan);
  return useMemo(() => ({ ...plan }), [plan]);
};

export default usePlan;
