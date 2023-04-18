import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectMessage } from '../feature/message/messageSlice';

const useMessage = () => {
  const message = useSelector(selectMessage);
  return useMemo(() => ({ ...message }), [message]);
};

export default useMessage;
