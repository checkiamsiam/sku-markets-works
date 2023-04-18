import { Autocomplete, FormControl, Stack, TextField, Typography } from '@mui/material';
import amazonEgypt from '../../assets/images/marketplace-logo/amazon-egypt.jpeg';

const optn = [
  { skuId: 'LA721ST0PD4NCNAFAMZ', img: amazonEgypt, rank: '#10' },
  { skuId: 'LA721ST0PD4NCNAFAMZ', img: amazonEgypt, rank: '#10' },
  { skuId: 'LA721ST0PD4NCNAFAMZ', img: amazonEgypt, rank: '#90' },
  { skuId: 'LA721ST0PD4NCNAFAMZ', img: amazonEgypt, rank: '#10' },
];

const SearchSkuForAlert = ({ search, setSearch }) => {
  return (
    <>
      <FormControl sx={{ width: '100%' }} size="small">
        <Autocomplete
          id="optn-select-demo"
          sx={{
            minWidth: { xs: '100%', md: 300 },
            borderRadius: 1,
          }}
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
              <Stack direction="row" spacing={1} alignItems="center">
                <img src={option.img} alt="" width="30px" />
                <Typography fontSize="13px">{option.skuId}</Typography>
              </Stack>
              <Typography fontSize="13px">{option.rank}</Typography>
            </Stack>
          )}
          renderInput={(params) => (
            <TextField
              sx={{ fontSize: '13px' }}
              {...params}
              value={search}
              onBlur={(e) => {
                setSearch(e.target.value);
              }}
              size="small"
              placeholder="Search SKU to add"
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

export default SearchSkuForAlert;
