import { Clear } from '@material-ui/icons';
import SearchIcon from '@mui/icons-material/Search';
import { Box, IconButton, Stack, Typography, useTheme } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import { styled } from '@mui/material/styles';
import { useAllSearchedProductsQuery } from 'features/product/productAPI';
import {
  addSearchedItem,
  getSearchedItems,
  removeSearchedItem,
} from 'features/searchHistory/searchHistory';
import {
  useAddUserHistoryMutation,
  useGetUserHistoryQuery,
} from 'features/searchHistory/searchHistoryAPI';
import useClickOutside from 'hooks/useSearchBarToggle';
import debounce from 'lodash/debounce';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SearchBarInSku = ({ lng }) => {
  const theme = useTheme();
  const searchRef = useRef();
  const searchInputRef = useRef();

  const [searchOptionVisible, setSearchOptionVisible] = useState(false);

  const [query, setQuery] = useState('');

  const [skus, setSkus] = useState([]);
  const [marketplaces, setMarketplaces] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  const { data, isSuccess, isFetching, refetch } = useAllSearchedProductsQuery(`key=${query}`);

  const [searchedItems, setSearchedItems] = useState();
  const [keyword, setKeyword] = useState('');

  const loggedInUserId = useSelector((state) => state.user._id);
  const [addUserSearchHistory] = useAddUserHistoryMutation();
  const {
    data: searchHistoryData,
    isSuccess: searchHistoryIsSuccess,
    isFetching: searchHistoryIsFetching,
    refetch: refetchSearchHistory,
  } = useGetUserHistoryQuery('limit=20&field=searchedKeywords');

  const navigate = useNavigate();

  useClickOutside(searchRef, () => {
    clearSearch();
  });

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    zIndex: 50,
    boxShadow: searchOptionVisible && '-2px 2px 5px 0px',
    borderRadius: theme.shape.borderRadius,
    backgroundColor:
      theme.palette.mode === 'dark' ? '#212B36' : searchOptionVisible ? 'white' : '#EFF2F5',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      mx: theme.spacing(1),
      width: 'auto',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    position: 'absolute',
    top: '8px',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: theme.palette.mode === 'dark' ? 'white' : 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('lg')]: {
        width: '400px',
      },
      [theme.breakpoints.up('md')]: {
        width: '330px',
      },
      position: 'relative',
      zIndex: 50,
    },
  }));

  const clearSearch = () => {
    setSearchOptionVisible(false);
    setKeyword('');
    setSkus([]);
    setMarketplaces([]);
    setCategories([]);
    setBrands([]);
  };

  const handleHistory = async () => {
    if (loggedInUserId) {
      await addUserSearchHistory({ keyword: searchInputRef?.current?.value });
      refetchSearchHistory();
    } else {
      addSearchedItem(searchInputRef?.current?.value);
      setSearchedItems(getSearchedItems());
    }
  };

  const handleQueryChange = debounce(() => {
    setQuery(searchInputRef?.current?.value);

    if (searchInputRef?.current?.value?.trim() != '') {
      handleHistory();
      setKeyword(searchInputRef?.current?.value);
      refetch();
    }
  }, 1000);

  const handleItemClick = (url) => {
    navigate(url, { state: { keyword } });
    clearSearch();
  };

  const handleItemRemove = (item) => {
    if (loggedInUserId) {
      const filtered = searchedItems.filter((obj) => obj != item);
      setSearchedItems(filtered);
    } else {
      removeSearchedItem(item);
      setSearchedItems(getSearchedItems());
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (searchInputRef?.current?.value?.trim() != '') {
        handleHistory();
        clearSearch();
        navigate(`/skuMarket?keyword=${encodeURIComponent(searchInputRef?.current?.value)}`);
      }
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setSkus(data?.data?.skus);
      setMarketplaces(data?.data?.marketplaces);
      setCategories(data?.data?.categories);
      setBrands(data?.data?.brands);
    }
  }, [isSuccess, isFetching]);

  useEffect(() => {
    if (searchHistoryIsSuccess) {
      if (searchHistoryData?.data) {
        setSearchedItems(searchHistoryData?.data?.searchedKeywords);
      } else {
        setSearchedItems(getSearchedItems());
      }
    }
  }, [searchHistoryIsSuccess, searchHistoryIsFetching]);

  useEffect(() => {
    if (searchOptionVisible) {
      searchInputRef.current.focus();
    }
  }, [searchOptionVisible]);

  return (
    <Box>
      <Search ref={searchRef}>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          onClick={() => setSearchOptionVisible(true)}
          placeholder={lng ? 'بحث...' : 'Search…'}
          inputProps={{ 'aria-label': 'search' }}
          onInput={handleQueryChange}
          inputRef={searchInputRef}
          onKeyDown={handleKeyDown}
        />
        {searchOptionVisible && (
          <Box
            sx={{
              px: 2,
              pb: 3,
              height: '350px',
              width: '100%',
              overflowY: 'auto',
              position: 'absolute',
              zIndex: 99999,
              top: '50px',
              backgroundColor: theme.palette.mode === 'dark' ? '#212B36' : 'white',
              borderRadius: 1,
              boxShadow: 3,
            }}
          >
            {skus && skus?.length != 0 && (
              <>
                <Typography
                  fontSize="12px"
                  color={theme.palette.mode === 'dark' ? 'white' : 'black'}
                  sx={{ mt: 2 }}
                >
                  SKUs
                </Typography>
                {skus?.map((obj) => {
                  return (
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      sx={{
                        cursor: 'pointer',
                        py: 1,
                        px: 1,
                        borderRadius: '5px',
                        ':hover': {
                          color: theme.palette.mode === 'dark' && 'black',
                          backgroundColor: '#E6F2FC',
                        },
                      }}
                      onClick={() =>
                        handleItemClick(`/skuMarket/${obj?.product?._id}/${obj?.sellerIds[0]}`)
                      }
                    >
                      <Stack direction="row" spacing={1} alignItems="center">
                        <img
                          src={`/assets/images/marketplace/${obj?.product?.sku_marketplace?.replace(
                            '/',
                            '-'
                          )}.jpeg`}
                          alt=""
                          width="30px"
                        />
                        <Typography fontSize="13px">{obj?.product?.sku}</Typography>
                      </Stack>
                      {/* <Typography fontSize="13px"># 10</Typography> */}
                    </Stack>
                  );
                })}{' '}
              </>
            )}
            {marketplaces && marketplaces?.length > 0 && (
              <>
                <Typography
                  fontSize="12px"
                  color={theme.palette.mode === 'dark' ? 'white' : 'black'}
                  sx={{ mt: 2 }}
                >
                  Marketplace
                </Typography>
                {marketplaces?.map((obj) => {
                  return (
                    <Stack
                      onClick={() =>
                        handleItemClick(
                          `/skuMarket?marketplace=${encodeURIComponent(obj?.sku_marketplace)}`
                        )
                      }
                      direction="row"
                      justifyContent="space-between"
                      sx={{
                        cursor: 'pointer',
                        py: 1,
                        px: 1,
                        borderRadius: '5px',
                        ':hover': {
                          color: theme.palette.mode === 'dark' && 'black',
                          backgroundColor: '#E6F2FC',
                        },
                      }}
                    >
                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        onClick={() => console.log('BOT')}
                      >
                        <img
                          src={`/assets/images/marketplace/${obj?.sku_marketplace?.replace(
                            '/',
                            '-'
                          )}.jpeg`}
                          alt=""
                          width="30px"
                        />
                        <Typography fontSize="13px">{obj?.sku_marketplace}</Typography>{' '}
                      </Stack>
                    </Stack>
                  );
                })}
              </>
            )}
            {categories && categories?.length != 0 && (
              <>
                <Typography
                  fontSize="12px"
                  color={theme.palette.mode === 'dark' ? 'white' : 'black'}
                  sx={{ mt: 2 }}
                >
                  Category
                </Typography>
                {categories?.map((obj) => {
                  return (
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      sx={{
                        cursor: 'pointer',
                        py: 1,
                        px: 1,
                        borderRadius: '5px',
                        ':hover': {
                          color: theme.palette.mode === 'dark' && 'black',
                          backgroundColor: '#E6F2FC',
                        },
                      }}
                      onClick={() =>
                        handleItemClick(
                          `/skuMarket?marketplace=${encodeURIComponent(
                            obj?.sku_marketplace
                          )}&category=${encodeURIComponent(obj?.category_en)}`
                        )
                      }
                    >
                      <Stack direction="row" spacing={1} alignItems="center">
                        <img
                          src={`/assets/images/marketplace/${obj?.sku_marketplace?.replace(
                            '/',
                            '-'
                          )}.jpeg`}
                          alt=""
                          width="30px"
                        />
                        <Typography fontSize="13px">{obj?.category_en}</Typography>
                      </Stack>
                    </Stack>
                  );
                })}
              </>
            )}
            {brands && brands?.length != 0 && (
              <>
                <Typography
                  fontSize="12px"
                  color={theme.palette.mode === 'dark' ? 'white' : 'black'}
                  sx={{ mt: 2 }}
                >
                  Brands
                </Typography>
                {brands?.map((obj) => {
                  return (
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      sx={{
                        cursor: 'pointer',
                        py: 1,
                        px: 1,
                        borderRadius: '5px',
                        ':hover': {
                          color: theme.palette.mode === 'dark' && 'black',
                          backgroundColor: '#E6F2FC',
                        },
                      }}
                      onClick={() =>
                        handleItemClick(
                          `/skuMarket?marketplace=${encodeURIComponent(
                            obj?.sku_marketplace
                          )}&brand=${encodeURIComponent(obj?.brand_en)}`
                        )
                      }
                    >
                      <Stack direction="row" spacing={1} alignItems="center">
                        <img
                          src={`/assets/images/marketplace/${obj?.sku_marketplace?.replace(
                            '/',
                            '-'
                          )}.jpeg`}
                          alt=""
                          width="30px"
                        />
                        <Typography fontSize="13px">{obj?.brand_en}</Typography>
                      </Stack>
                    </Stack>
                  );
                })}
              </>
            )}
            {searchedItems && searchedItems?.length != 0 && (
              <>
                <Typography
                  fontSize="12px"
                  color={theme.palette.mode === 'dark' ? 'white' : 'black'}
                  sx={{ mt: 3 }}
                >
                  Recently Searched
                </Typography>
                {searchedItems?.map((obj) => {
                  return (
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      sx={{
                        cursor: 'pointer',
                        py: 1,
                        px: 1,
                        borderRadius: '5px',
                        ':hover': {
                          color: theme.palette.mode === 'dark' && 'black',
                          backgroundColor: '#E6F2FC',
                        },
                      }}
                      onClick={() => {
                        searchInputRef.current.value = obj;
                        searchInputRef.current.dispatchEvent(new Event('input', { bubbles: true }));
                      }}
                    >
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Typography fontSize="13px">{obj}</Typography>
                      </Stack>

                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleItemRemove(obj);
                        }}
                      >
                        <Clear style={{ width: '15px', height: '15px' }} />
                      </IconButton>
                    </Stack>
                  );
                })}
              </>
            )}
          </Box>
        )}
      </Search>
    </Box>
  );
};

export default SearchBarInSku;
