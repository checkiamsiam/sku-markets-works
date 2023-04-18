import {
  Autocomplete,
  CircularProgress,
  FormControl,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import MPLogo from 'components/common/MPLogo';
import LoadingScreen from 'components/loading-screen/LoadingScreen';
import { useSearchProductQuery } from 'features/product/productAPI';
import {
  useAddProductInWatchListMutation,
  useGetWatchListDetailQuery,
} from 'features/watchList/watchListAPI';
import { useEffect, useState } from 'react';
import getFullName from 'utils/getFullName';

const SearchWatchlist = ({ view }) => {
  const [addToWL, { isLoading: addLoading, isSuccess: s1 }] = useAddProductInWatchListMutation();
  const { data: detailView, isLoading: getDetailViewLoad } = useGetWatchListDetailQuery(view?._id);
  const [query, setQuery] = useState(
    'search=""&fields=sku,sku_marketplace,sku_rank,buy_box_currency,current_price&limit=5'
  );
  const [searchKey, setSearchKey] = useState('');
  const { data, refetch, isLoading, isFetching } = useSearchProductQuery(query);
  const [sku, setSku] = useState(null);
  const searchHandler = async (sku) => {
    setSearchKey(sku);
    setQuery(
      `search=${sku}&fields=sku,sku_marketplace,sku_rank,buy_box_currency,current_price&limit=5`
    );
    refetch();
  };
  const handleAddSku = async () => {
    const alreadyHave = await detailView?.data.find((wls) => wls?.id === (sku?.id || sku?._id));
    if (sku && !alreadyHave) {
      const queryDetail = { product: sku?.id || sku?._id, watchList: view?._id };
      await addToWL(queryDetail);
      setSku(null);
    }
  };

  const handleOnChange = async (newValue) => {
    setSku(newValue);
    if (searchKey === newValue?.sku) {
      const alreadyHave = await detailView?.data.find(
        (wls) => wls?.id === (newValue?.id || newValue?._id)
      );
      if (!alreadyHave) {
        const queryDetail = { product: newValue?.id || newValue?._id, watchList: view?._id };
        await addToWL(queryDetail);
        setSku(null);
      }
    }
  };

  useEffect(() => {
    setSku(null);
  }, [view]);

  if (addLoading || getDetailViewLoad) {
    return <LoadingScreen />;
  }
  return (
    <>
      <FormControl sx={{ width: '350px' }} size="small">
        <Autocomplete
          value={sku}
          onSelect={handleAddSku}
          disablePortal
          getOptionDisabled={(option) =>
            !detailView.data.find((s) => s.id === option.id) ? false : true
          }
          options={data || []}
          id="SKU-ASIAN-MPN-search-input"
          loading={isLoading || isFetching || getDetailViewLoad}
          getOptionLabel={(option) => option.sku}
          onChange={(_, newValue) => handleOnChange(newValue)}
          groupBy={(option) => getFullName(option.sku_marketplace.split('/').join('-'))}
          renderOption={(props, option) => (
            <Stack
              {...props}
              direction="row"
              alignItems="space-between"
              justifyContent="space-between"
            >
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
              {...params}
              size="small"
              placeholder="Search SKU to add"
              onChange={(e) => searchHandler(e.target.value)}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {isLoading || isFetching ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
      </FormControl>
    </>
  );
};

export default SearchWatchlist;
