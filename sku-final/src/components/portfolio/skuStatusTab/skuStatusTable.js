import {
  Card,
  FormControl,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { MenuProps } from 'components/watchlist/WatchlistData/SelectedWatchlist';
import { useState } from 'react';
import MostVolatileTable from '../MostVolatileTable';
import NewHighTable from '../NewHighTable';
import NewLowTable from '../NewLowTable';
import TopGainersTable from '../TopGainersTable';
import TopLosersTable from '../TopLosersTable';
import UnusualVolumeTable from '../UnusualVolumeTable';

const SkuStatusTable = () => {
  const theme = useTheme();
  const [opValue, setOpValue] = useState('Top Gainers');
  return (
    <>
      <Card>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ my: 2, ml: 3 }}>
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
                  return opValue || 'Top Gainers';
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
                value="Most Volatile"
              >
                Most Volatile
              </MenuItem>
            </Select>
          </FormControl>
        </Stack>
        {opValue === 'Top Gainers' && <TopGainersTable />}
        {opValue === 'Top Losers' && <TopLosersTable />}
        {opValue === 'New High (ATH)' && <NewHighTable />}
        {opValue === 'New Low (ATL)' && <NewLowTable />}
        {opValue === 'Unusual Volume' && <UnusualVolumeTable />}
        {opValue === 'Most Volatile' && <MostVolatileTable />}
      </Card>

      <Typography variant="caption">
        Designed for users to instantly see the market situations on the marketplaces and predicts
        what will come next.
      </Typography>
    </>
  );
};

export default SkuStatusTable;
