import { Stack, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import MPLogo from 'components/common/MPLogo';
import { useSearchProductQuery } from 'features/product/productAPI';
import { useState } from 'react';
import getFullName from 'utils/getFullName';

export default function TestPage() {
  const [value, setValue] = useState(null);

  const [query, setQuery] = useState('search=N41&fields=sku,sku_marketplace,sku_rank&limit=5');
  const { data, refetch, isLoading, isFetching } = useSearchProductQuery(query);

  const searchHandler = async (sku) => {
    setQuery(`search=${sku}&fields=sku,sku_marketplace,sku_rank&limit=5`);
    refetch();
  };

  return (
    <Box
      sx={{
        p: 30,
      }}
    >
      <Autocomplete
        disablePortal
        id="SKU-ASIAN-MPN-search-input"
        options={data || []}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        groupBy={(option) => getFullName(option.sku_marketplace.split('/').join('-'))}
        getOptionLabel={(option) => option.sku}
        sx={{ width: 300 }}
        loading={isLoading || isFetching}
        renderOption={(props, option) => (
          <Stack {...props} direction="row" alignItems="space-between">
            <Stack sx={{ ml: -3 }} direction="row" alignItems="space-between">
              <MPLogo marketplace={option?.sku_marketplace} link={false} />
              <Typography component="span" ml={1}>
                {option?.sku}
              </Typography>
            </Stack>
            <Typography component="span" ml={10}>
              #{option?.sku_rank}
            </Typography>
          </Stack>
        )}
        renderInput={(params) => (
          <TextField
            onChange={(e) => searchHandler(e.target.value)}
            {...params}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {isLoading || isFetching ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
    </Box>
  );
}
