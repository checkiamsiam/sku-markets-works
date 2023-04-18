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
  import React, { useState } from 'react';

  // filter
  export const FILTER_OPTIONS = [
      { label: 'All', value: 'All' },
    ];
  
  const SearchFilter = () => {
    const [searchProducts, setSearchProducts] = useState('');
  
    const [searchResults, setSearchResults] = useState([]);
  
  //   Filter
  const [anchorEl, setAnchorEl] = React.useState(null);
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
          direction="row"
          alignItems="center"
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
                placeholder="Search Activity"
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
          <Button
          disableRipple
          color="inherit"
          endIcon={<Iconify icon="ic:round-filter-list" />}
          onClick={handleClick}
        >
          Filters
        </Button>
        <MenuPopover  anchorEl={anchorEl}
          open={open}
          onClose={handleClose}>
                  {FILTER_OPTIONS.map((option) => (
                    <MenuItem
                      key={option.value}
                      onClick={handleClose}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </MenuPopover>       
          </Box>
        </Stack>
      </div>
    );
  };
  
  export default SearchFilter;
  