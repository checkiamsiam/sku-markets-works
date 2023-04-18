import { Card, FormControl, MenuItem, OutlinedInput, Select, Stack, useTheme } from '@mui/material';
import { MenuProps } from 'components/watchlist/WatchlistData/SelectedWatchlist';
import { useState } from 'react';
import OToFF from './oToFF';
import OToStock from './oToStock';
import RecentlyAddedSKU from './RecenlyAddedTop';
import TopAndTrending from './TopAndTrending';

const InvestInsigntAnalitics = () => {
  const theme = useTheme();
  const [opValue, setOpValue] = useState('Top Ranked & Trending SKUs');

  return (
    <>
      <Card>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ my: 2  , ml: 3}}>
          <FormControl
            sx={{
              width: '300px',
              height: '30px',
              mb: 1,
            }}
            size="small"
          >
            <Select
              sx={{
                borderRadius: 1,
                width: '100%',
                backgroundColor: theme.palette.mode === 'dark' ? '#212B36' : 'white',
              }}
              displayEmpty
              value={opValue}
              input={<OutlinedInput />}
              renderValue={(selected) => {
                if (selected?.length === 0) {
                  return opValue || 'Top Ranked & Trending SKUs';
                }
                return selected;
              }}
              onChange={(e) => setOpValue(e.target.value)}
              MenuProps={MenuProps}
              inputProps={{
                'aria-label': 'Without label',
              }}
            >
              <MenuItem
                sx={{
                  fontSize: '15px',
                }}
                value="Top Ranked & Trending SKUs"
              >
                Top Ranked & Trending SKUs
              </MenuItem>
              <MenuItem
                sx={{
                  fontSize: '15px',
                }}
                value="Recently Added SKUs To Top Ranked"
              >
                Recently Added SKUs To Top Ranked
              </MenuItem>
              <MenuItem
                sx={{
                  fontSize: '15px',
                }}
                value="Opportunity to Stock"
              >
                Opportunity to Stock
              </MenuItem>
              <MenuItem
                sx={{
                  fontSize: '15px',
                }}
                value="Opportunity to Fulfillment"
              >
                Opportunity to Fulfillment
              </MenuItem>
            </Select>
          </FormControl>
        </Stack>
        <div>
          {opValue === 'Top Ranked & Trending SKUs' && <TopAndTrending />}
          {opValue === 'Recently Added SKUs To Top Ranked' && <RecentlyAddedSKU />}
          {opValue === 'Opportunity to Stock' && <OToStock />}
          {opValue === 'Opportunity to Fulfillment' && <OToFF />}
        </div>
      </Card>
    </>
  );
};

export default InvestInsigntAnalitics;
