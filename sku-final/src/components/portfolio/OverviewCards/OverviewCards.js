import { Card, FormControl, MenuItem, OutlinedInput, Select, Stack, useTheme } from '@mui/material';
import { MenuProps } from 'components/watchlist/WatchlistData/SelectedWatchlist';
import { useState } from 'react';
import OppFulfillmentCards from './OppFullfillCards';
import OppStockSKUCards from './OppStockCards';
import OppToBBCards from './OppToBB';
import StoreSKUCard from './StoreSkuCard';

const OverviewCards = ({ collapsible }) => {
  const theme = useTheme();
  const [opValue, setOpValue] = useState('Store SKUs');

  return (
    <>
      <Card sx={{ p: 2 }}>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ my: 2 }}>
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
                  return opValue || 'Stored SKUs';
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
                value="Store SKUs"
              >
                Store SKUs
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
                value="Opportunity To Fulfillment"
              >
                Opportunity To Fulfillment
              </MenuItem>
              <MenuItem
                sx={{
                  fontSize: '15px',
                }}
                value="Opportunity To BuyBox"
              >
                Opportunity To BuyBox
              </MenuItem>
              {/* <MenuItem
                sx={{
                  fontSize: '15px',
                }}
                value="Store' competitors Insights"
              >
                Store' competitors Insights
              </MenuItem> */}
            </Select>
          </FormControl>
        </Stack>
        <div>
          {opValue === 'Store SKUs' && <StoreSKUCard collapsible={collapsible} />}
          {opValue === 'Opportunity to Stock' && <OppStockSKUCards collapsible={collapsible} />}
          {opValue === 'Opportunity To Fulfillment' && (
            <OppFulfillmentCards collapsible={collapsible} />
          )}
          {opValue === 'Opportunity To BuyBox' && <OppToBBCards collapsible={collapsible} />}
          {/* {opValue === "Store' competitors Insights" && <CompetatorsCards collapsible={collapsible}/>} */}
        </div>
      </Card>
    </>
  );
};

export default OverviewCards;
