import { selectWatchList } from 'features/watchList/watchListSlice';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

const useWatchList = () => {
    const watchList = useSelector(selectWatchList);
    return useMemo(() => ({ ...watchList }), [watchList]);
};

export default useWatchList;
