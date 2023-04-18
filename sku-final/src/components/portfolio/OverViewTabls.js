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
import OpportunityToBuyBox from './OppBuyBoxTable';
import OppFulfillmentTable from './OppFulfillmentTable';
import OppStockTable from './OppStockTable';
import CompetitorsTable from './StoreCompetitorsTable';
import StoreSkuTable from './StoreSkuTable';

const OverViewTables = () => {
  const theme = useTheme();
  const [opValue, setOpValue] = useState('Store SKUs');

  return (
    <>
      <Card sx={{ mt: 2 }}>
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
              <MenuItem
                sx={{
                  fontSize: '15px',
                }}
                value="Store' competitors Insights"
              >
                Store' competitors Insights
              </MenuItem>
            </Select>
          </FormControl>
        </Stack>
        <div>
          {opValue === 'Store SKUs' && <StoreSkuTable />}
          {opValue === 'Opportunity to Stock' && <OppStockTable />}
          {opValue === 'Opportunity To Fulfillment' && <OppFulfillmentTable />}
          {opValue === 'Opportunity To BuyBox' && <OpportunityToBuyBox />}
          {opValue === "Store' competitors Insights" && <CompetitorsTable />}
        </div>
      </Card>

      <Typography variant="caption">
        Designed for users to instantly see the opportunities on the marketplaces.
      </Typography>
    </>
  );
};

export default OverViewTables;
