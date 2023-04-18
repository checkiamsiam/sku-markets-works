import { Chip, Menu, Stack } from '@mui/material';
import WatchlistName from 'components/productDetails/WatchlistName';
import { AiOutlinePlusCircle } from 'react-icons/ai';

// colors
const gray = 'text.main';
const lightGray = '#0d6efd';

const WatchlistModal = ({
    data,
    product,
    watchListMenu,
    watchListMenuOpen,
    handleStarClose,
    handleWatchListModalOpen,
}) => {
  return (
    <Menu
      id="basic-menu"
      anchorEl={watchListMenu}
      open={watchListMenuOpen}
      onClose={handleStarClose}
      MenuListProps={{
        'aria-labelledby': 'star-button',
      }}
      sx={{ width: '300px', height: '300px', fontSize: '12px' }}
    >
      <div>
        <h3 style={{ fontSize: '12px', color: gray, padding: '0 10px' }}>Select Watch List</h3>

        {data?.map((dt) => (
          <WatchlistName
            key={dt?._id}
            watchlist={dt}
            productId={product?._id}
            handleStarClose={handleStarClose}
          />
        ))}

        <Stack
          sx={{ width: '200px', padding: '3px 20px' }}
          button
          onClick={() => {
            handleWatchListModalOpen();
            handleStarClose();
          }}
        >
          <Chip
            sx={{ cursor: 'pointer', backgroundColor: 'none !important' }}
            icon={<AiOutlinePlusCircle style={{ fontSize: '1.4rem' }} />}
            label="Add To watchList"
            variant="outlined"
          />
        </Stack>
      </div>
    </Menu>
  );
};

export default WatchlistModal;
