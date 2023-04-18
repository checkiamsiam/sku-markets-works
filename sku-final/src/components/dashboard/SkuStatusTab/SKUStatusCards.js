import { Box, Card, FormControl, MenuItem, OutlinedInput, Select, Stack, useTheme } from '@mui/material';
import { MenuProps } from 'components/watchlist/WatchlistData/SelectedWatchlist';
import { useState } from 'react';
import MostVolatile from './MostVolatile';
import NewHigh from './NewHIgh';
import NewLow from './NewLow';
import TopGainers from './TopGainers';
import TopLosers from './TopLosers';
import UnusualVolume from './UnusualVolume';

const SKUStatusCards = ({collapsible}) => {
  const theme = useTheme();
  const [opValue, setOpValue] = useState('Top Gainers');

  return (
    <>
      <Card>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ my: 2 , ml: 3}}>
          <FormControl
            sx={{
              width: '250px',
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
                value="Top Gainers"
              >
                Top Gainers
              </MenuItem>
              <MenuItem
                sx={{
                  fontSize: '15px',
                }}
                value="Top Losers"
              >
                Top Losers
              </MenuItem>
              <MenuItem
                sx={{
                  fontSize: '15px',
                }}
                value="New High (ATH)"
              >
                New High (ATH)
              </MenuItem>
              <MenuItem
                sx={{
                  fontSize: '15px',
                }}
                value="New Low (ATL)"
              >
                New Low (ATL)
              </MenuItem>
              <MenuItem
                sx={{
                  fontSize: '15px',
                }}
                value="Unusual Volume"
              >
                Unusual Volume
              </MenuItem>
              <MenuItem
                sx={{
                  fontSize: '15px',
                }}
                value="New Low (ATL)"
              >
                Most Volatile
              </MenuItem>
            </Select>
          </FormControl>
        </Stack>
        <div>
          {opValue === 'Top Gainers' && <TopGainers collapsible={collapsible}/>}
          {opValue === 'Top Losers' && <TopLosers collapsible={collapsible}/>}
          {opValue === 'New High (ATH)' && <NewHigh collapsible={collapsible}/>}
          {opValue === 'New Low (ATL)' && <NewLow collapsible={collapsible}/>}
          {opValue === 'Unusual Volume' && <UnusualVolume collapsible={collapsible}/>}
          {opValue === 'Most Volatile' && <MostVolatile collapsible={collapsible}/>}
        </div>
      </Card>
    </>
  );
};

export default SKUStatusCards;
