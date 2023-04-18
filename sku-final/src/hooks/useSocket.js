import { SocketContext } from 'context/socket';
import { useContext } from 'react';

const useSocket = () => {
    return useContext(SocketContext);
};

export default useSocket;
