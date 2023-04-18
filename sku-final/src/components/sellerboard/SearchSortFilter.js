import {
  Autocomplete,
  Box,
  Button,
  InputAdornment,
  Link,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { CustomTextField } from 'components/custom-input';
import Iconify from 'components/iconify/Iconify';
import Image from 'components/image/Image';
import MenuPopover from 'components/menu-popover/MenuPopover';
import SearchNotFound from 'components/search-not-found/SearchNotFound';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

// sort
const OPTIONS = [
  { value: 'default', label: 'Default' },
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
];

function renderLabel(label) {
  return {
    default: 'Default',
    newest: 'Newest',
    oldest: 'Oldest',
  }[label];
}


// filter
export const FILTER_OPTIONS = [
  { label: 'All', value: 'All' },
  { label: 'B2B Sell', value: 'B2B Sell' },
  { label: 'B2B Buy', value: 'B2B Buy' },
  { label: 'B2C Sell', value: 'B2C Sell' },
];

const SearchSortFilter = () => {
  const [sortBy, setSortBy] = useState('Default');
  const [filterBy, setFilterBy] = useState('All');
  const [searchProducts, setSearchProducts] = useState('');

  const [searchResults, setSearchResults] = useState([]);

  //   Sort
  const { control } = useForm();

  const [openPopover, setOpenPopover] = useState(null);

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  //   Filter
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Stack
        spacing={2}
        direction={{ xs: 'column', sm: 'row' }}
        alignItems={{ sm: 'center' }}
        sx={{ mb: 3 }}
      >
        <Autocomplete
          size="small"
          autoHighlight
          popupIcon={null}
          options={searchResults}
          getOptionLabel={(product) => product.name}
          noOptionsText={<SearchNotFound query={searchProducts} />}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          componentsProps={{
            popper: {
              sx: {
                width: `280px !important`,
              },
            },
            paper: {
              sx: {
                '& .MuiAutocomplete-option': {
                  px: `8px !important`,
                },
              },
            },
          }}
          renderInput={(params) => (
            <CustomTextField
              {...params}
              width={220}
              placeholder="Search Request"
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon="eva:search-fill" sx={{ ml: 1, color: 'text.disabled' }} />
                  </InputAdornment>
                ),
              }}
            />
          )}
          renderOption={(props, product, { inputValue }) => {
            const { name, cover } = product;
            const matches = match(name, inputValue);
            const parts = parse(name, matches);

            return (
              <li {...props}>
                <Image
                  alt={cover}
                  src={cover}
                  sx={{ width: 48, height: 48, borderRadius: 1, flexShrink: 0, mr: 1.5 }}
                />

                <Link underline="none">
                  {parts.map((part, index) => (
                    <Typography
                      key={index}
                      component="span"
                      variant="subtitle2"
                      color={part.highlight ? 'primary' : 'textPrimary'}
                    >
                      {part.text}
                    </Typography>
                  ))}
                </Link>
              </li>
            );
          }}
        />
        <Box>
          {/* Filter */}
          <Controller
            name="filter"
            control={control}
            render={({ field }) => (
              <>
                <Button
                  disableRipple
                  color="inherit"
                  onClick={handleClick}
                  endIcon={<Iconify icon="ic:round-filter-list" />}
                  sx={{ fontWeight: 'fontWeightMedium' }}
                >
                  Filters:
                  <Box component="span" sx={{ color: 'text.secondary', ml: 0.5 }}>
                    {filterBy}
                  </Box>
                </Button>

                <MenuPopover open={anchorEl} onClose={handleClose}>
                  {FILTER_OPTIONS.map((option) => (
                    <MenuItem
                      key={option.value}
                      selected={option.value === field.value}
                      onClick={() => {
                        handleClose();
                        setFilterBy(option.value);
                        field.onChange(option.value);
                      }}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </MenuPopover>
              </>
            )}
          />
          {/* sort */}
          <Controller
            name="sortBy"
            control={control}
            render={({ field }) => (
              <>
                <Button
                  disableRipple
                  color="inherit"
                  onClick={handleOpenPopover}
                  endIcon={
                    <Iconify icon={openPopover ? 'eva:chevron-up-fill' : 'eva:chevron-down-fill'} />
                  }
                  sx={{ fontWeight: 'fontWeightMedium' }}
                >
                  Sort By:
                  <Box component="span" sx={{ color: 'text.secondary', ml: 0.5 }}>
                    {/* {renderLabel(field.value)} */}
                    {sortBy}
                  </Box>
                </Button>

                <MenuPopover open={openPopover} onClose={handleClosePopover}>
                  {OPTIONS.map((option) => (
                    <MenuItem
                      key={option.value}
                      selected={option.value === field.value}
                      onClick={() => {
                        handleClosePopover();
                        setSortBy(option.value);
                        field.onChange(option.value);
                      }}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </MenuPopover>
              </>
            )}
          />
        </Box>
      </Stack>
    </div>
  );
};

export default SearchSortFilter;
