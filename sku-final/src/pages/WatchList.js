import WatchListTable from 'components/watchlist/WatchlistData/WatchlistTable';
import { Helmet } from 'react-helmet-async';

const WatchList = () => {
  return (
    <>
      <Helmet>
        <title> Watchlists | SKU Markets</title>
      </Helmet>

      <WatchListTable />
    </>
  );
};

export default WatchList;
