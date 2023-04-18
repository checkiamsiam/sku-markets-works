import { selectMessage } from 'features/message/messageSlice';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

const useMessage = () => {
    const message = useSelector(selectMessage);
    return useMemo(() => ({ ...message }), [message]);
};

export default useMessage;
