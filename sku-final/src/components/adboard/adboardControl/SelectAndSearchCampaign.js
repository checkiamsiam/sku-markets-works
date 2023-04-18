import { Autocomplete, FormControl, Stack, TextField, Typography } from '@mui/material';



const SelectAndSearchCampaign = ({ search, setSearch , optn }) => {
  return (
    <>
      <FormControl sx={{ width: '100%' }} size="small">
        <Autocomplete
          id="optn-select-demo"
          sx={{
            minWidth: { xs: '100%' },
            borderRadius: 1,
          }}
          onChange={(e, value) => {setSearch(value)}} 
          options={optn} 
          autoHighlight
          getOptionLabel={(option) => option.skuId}
          renderOption={(props, option) => (
            <Stack
              {...props}
              direction="row"
              justifyContent="space-between"
              spacing={3}
              sx={{
                cursor: 'pointer',
                py: 1,
                px: 1,
                borderRadius: '5px',
                ':hover': {
                  backgroundColor: '#E6F2FC',
                },
              }}
            >
              <Typography fontSize="13px">{option.skuId}</Typography>
            </Stack>
          )}
          renderInput={(params) => (
            <TextField
              sx={{ fontSize: '13px' }}
              {...params}
              value={search}
              size="small"
              placeholder="Search Campaign"
              inputProps={{
                ...params.inputProps,
                autoComplete: 'new-password', // disable autocomplete and autofill
              }}
            />
          )}
        />
      </FormControl>
    </>
  );
};

export default SelectAndSearchCampaign;
