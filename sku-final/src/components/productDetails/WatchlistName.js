import AddIcon from '@mui/icons-material/Add';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import {
  useAddProductInWatchListMutation,
  useGetWatchListDetailQuery,
  useRemoveProductInWatchListMutation,
} from 'features/watchList/watchListAPI';
import { useEffect, useState } from 'react';

const WatchlistName = ({ watchlist, productId, handleStarClose }) => {
  const { data, isLoading, refetch, isSuccess } = useGetWatchListDetailQuery(watchlist?._id);
  const [deleteProductInWatchlist] = useRemoveProductInWatchListMutation();
  const [addProductInWatchList] = useAddProductInWatchListMutation();

  const [found, setFound] = useState(false);

  const handleWatchlistPd = async (watchList, product) => {
    await addProductInWatchList({ watchList, product });
    await refetch();
    setTimeout(() => {
      handleStarClose();
    }, 500);
  };

  const deleteWatchlistPd = async (watchList, product) => {
    await deleteProductInWatchlist(`${watchList}/product/${product}`);
    await refetch();
    setTimeout(() => {
      handleStarClose();
    }, 500);
  };

  useEffect(() => {
    if (isSuccess) {
      const foundWatch = data?.data?.find((pd) => pd.id === productId);
      console.log(data?.data , productId );
      if (foundWatch) {
        setFound(true);
      } else {
        setFound(false);
      }
    }
  }, [data, isSuccess, productId]);

  if (isLoading) {
    return (
      <ListItem button sx={{ padding: '3px 6px' }}>
        <ListItemText>Loading...</ListItemText>
      </ListItem>
    )
  }

  return (
    <>
      <ListItem button sx={{ padding: '3px 6px' }}>
        {isSuccess && (
          <>
            <ListItemText sx={{ fontSize: '10px' }}>{watchlist?.name}</ListItemText>
            <ListItemAvatar sx={{ textAlign: 'right' }}>
              {found ? (
                <CheckCircleIcon
                  onClick={() => deleteWatchlistPd(watchlist._id, productId)}
                  color="primary"
                  sx={{ fontSize: '1.2rem' }}
                />
              ) : (
                <AddIcon onClick={() => handleWatchlistPd(watchlist._id, productId)} />
              )}
            </ListItemAvatar>
          </>
        )}
      </ListItem>
    </>
  );
};

export default WatchlistName;
