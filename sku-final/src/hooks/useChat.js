import { selectChart } from 'features/chat/chat';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

const useChat = () => {
  const chat = useSelector(selectChart);
  return useMemo(() => ({ ...chat }), [chat]);
};

export default useChat;
