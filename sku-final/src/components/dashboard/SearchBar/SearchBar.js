import SearchIcon from '@mui/icons-material/Search';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import { styled } from '@mui/material/styles';
import useClickOutside from 'hooks/useSearchBarToggle';
import { useEffect, useRef, useState } from 'react';
import flag from '../../../assets/images/flags/market-flag.jpeg';

const SearchBar = () => {
  const theme = useTheme();
  const searchRef = useRef();
  const searchInputRef = useRef();
  const [searchOptionVisible, setSearchOptionVisible] = useState(false);
  useClickOutside(searchRef, () => {
    setSearchOptionVisible(false);
  });
  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    zIndex: 50,
    py: 1,
    boxShadow: searchOptionVisible && '-2px 2px 5px 0px',
    borderRadius: theme.shape.borderRadius,
    backgroundColor:
      theme.palette.mode === 'dark' ? '#212B36' : searchOptionVisible ? 'white' : '#EFF2F5',
    width: '600px',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    position: 'absolute',
    top: '13px',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    width: '100%',
    padding: '3px 0px',
    color: theme.palette.mode === 'dark' ? 'white' : 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '400px',
      position: 'relative',
      zIndex: 50,
    },
  }));
  const handleFocus = () => {
    setSearchOptionVisible(true);
  };
  useEffect(() => {
    setTimeout(() => {
      if (searchOptionVisible) {
        searchInputRef.current.focus();
      }
    }, 1000);
  }, [searchOptionVisible]);
  return (
    <Box>
      <Search ref={searchRef}>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          onClick={handleFocus}
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
          inputRef={searchInputRef}
        />
        {searchOptionVisible && (
          ////  dinamic reserve for api intigator
          // <Box
          //   sx={{
          //     px: 2,
          //     pb: 3,
          //     height: '350px',
          //     width: '100%',
          //     overflowY: 'auto',
          //     position: 'absolute',
          //     zIndex: 99999,
          //     top: '55px',
          //     backgroundColor: theme.palette.mode === 'dark' ? '#212B36' : 'white',
          //     borderRadius: 1 ,
          //     boxShadow: 3,
          //   }}
          // >
          //   {skus && skus?.length != 0 && (
          //     <>
          //       <Typography
          //         fontSize="12px"
          //         color={theme.palette.mode === 'dark' ? 'white' : 'black'}
          //         sx={{ mt: 2 }}
          //       >
          //         SKUs
          //       </Typography>
          //       {skus?.map((obj) => {
          //         return (
          //           <Stack
          //             direction="row"
          //             justifyContent="space-between"
          //             sx={{
          //               cursor: 'pointer',
          //               py: 1,
          //               px: 1,
          //               borderRadius: '5px',
          //               ':hover': {
          //                 color: theme.palette.mode === 'dark' && 'black',
          //                 backgroundColor: '#E6F2FC',
          //               },
          //             }}
          //             onClick={() =>
          //               handleItemClick(`/skuMarket/${obj?.product?._id}/${obj?.sellerIds[0]}`)
          //             }
          //           >
          //             <Stack direction="row" spacing={1} alignItems="center">
          //               <img
          //                 src={`/assets/images/marketplace/${obj?.product?.sku_marketplace?.replace(
          //                   '/',
          //                   '-'
          //                 )}.jpeg`}
          //                 alt=""
          //                 width="30px"
          //               />
          //               <Typography fontSize="13px">{obj?.product?.sku}</Typography>
          //             </Stack>
          //             {/* <Typography fontSize="13px"># 10</Typography> */}
          //           </Stack>
          //         );
          //       })}{' '}
          //     </>
          //   )}
          //   {marketplaces && marketplaces?.length > 0 && (
          //     <>
          //       <Typography
          //         fontSize="12px"
          //         color={theme.palette.mode === 'dark' ? 'white' : 'black'}
          //         sx={{ mt: 2 }}
          //       >
          //         Marketplace
          //       </Typography>
          //       {marketplaces?.map((obj) => {
          //         return (
          //           <Stack
          //             onClick={() =>
          //               handleItemClick(
          //                 `/skuMarket?marketplace=${encodeURIComponent(obj?.sku_marketplace)}`
          //               )
          //             }
          //             direction="row"
          //             justifyContent="space-between"
          //             sx={{
          //               cursor: 'pointer',
          //               py: 1,
          //               px: 1,
          //               borderRadius: '5px',
          //               ':hover': {
          //                 color: theme.palette.mode === 'dark' && 'black',
          //                 backgroundColor: '#E6F2FC',
          //               },
          //             }}
          //           >
          //             <Stack
          //               direction="row"
          //               spacing={1}
          //               alignItems="center"
          //               onClick={() => console.log('BOT')}
          //             >
          //               <img
          //                 src={`/assets/images/marketplace/${obj?.sku_marketplace?.replace(
          //                   '/',
          //                   '-'
          //                 )}.jpeg`}
          //                 alt=""
          //                 width="30px"
          //               />
          //               <Typography fontSize="13px">{obj?.sku_marketplace}</Typography>{' '}
          //             </Stack>
          //           </Stack>
          //         );
          //       })}
          //     </>
          //   )}
          //   {categories && categories?.length != 0 && (
          //     <>
          //       <Typography
          //         fontSize="12px"
          //         color={theme.palette.mode === 'dark' ? 'white' : 'black'}
          //         sx={{ mt: 2 }}
          //       >
          //         Category
          //       </Typography>
          //       {categories?.map((obj) => {
          //         return (
          //           <Stack
          //             direction="row"
          //             justifyContent="space-between"
          //             sx={{
          //               cursor: 'pointer',
          //               py: 1,
          //               px: 1,
          //               borderRadius: '5px',
          //               ':hover': {
          //                 color: theme.palette.mode === 'dark' && 'black',
          //                 backgroundColor: '#E6F2FC',
          //               },
          //             }}
          //             onClick={() =>
          //               handleItemClick(
          //                 `/skuMarket?marketplace=${encodeURIComponent(
          //                   obj?.sku_marketplace
          //                 )}&category=${encodeURIComponent(obj?.category_en)}`
          //               )
          //             }
          //           >
          //             <Stack direction="row" spacing={1} alignItems="center">
          //               <img
          //                 src={`/assets/images/marketplace/${obj?.sku_marketplace?.replace(
          //                   '/',
          //                   '-'
          //                 )}.jpeg`}
          //                 alt=""
          //                 width="30px"
          //               />
          //               <Typography fontSize="13px">{obj?.category_en}</Typography>
          //             </Stack>
          //           </Stack>
          //         );
          //       })}
          //     </>
          //   )}
          //   {brands && brands?.length != 0 && (
          //     <>
          //       <Typography
          //         fontSize="12px"
          //         color={theme.palette.mode === 'dark' ? 'white' : 'black'}
          //         sx={{ mt: 2 }}
          //       >
          //         Brands
          //       </Typography>
          //       {brands?.map((obj) => {
          //         return (
          //           <Stack
          //             direction="row"
          //             justifyContent="space-between"
          //             sx={{
          //               cursor: 'pointer',
          //               py: 1,
          //               px: 1,
          //               borderRadius: '5px',
          //               ':hover': {
          //                 color: theme.palette.mode === 'dark' && 'black',
          //                 backgroundColor: '#E6F2FC',
          //               },
          //             }}
          //             onClick={() =>
          //               handleItemClick(
          //                 `/skuMarket?marketplace=${encodeURIComponent(
          //                   obj?.sku_marketplace
          //                 )}&brand=${encodeURIComponent(obj?.brand_en)}`
          //               )
          //             }
          //           >
          //             <Stack direction="row" spacing={1} alignItems="center">
          //               <img
          //                 src={`/assets/images/marketplace/${obj?.sku_marketplace?.replace(
          //                   '/',
          //                   '-'
          //                 )}.jpeg`}
          //                 alt=""
          //                 width="30px"
          //               />
          //               <Typography fontSize="13px">{obj?.brand_en}</Typography>
          //             </Stack>
          //           </Stack>
          //         );
          //       })}
          //     </>
          //   )}
          //   {searchedItems && searchedItems?.length != 0 && (
          //     <>
          //       <Typography
          //         fontSize="12px"
          //         color={theme.palette.mode === 'dark' ? 'white' : 'black'}
          //         sx={{ mt: 3 }}
          //       >
          //         Recently Searched
          //       </Typography>
          //       {searchedItems?.map((obj) => {
          //         return (
          //           <Stack
          //             direction="row"
          //             justifyContent="space-between"
          //             sx={{
          //               cursor: 'pointer',
          //               py: 1,
          //               px: 1,
          //               borderRadius: '5px',
          //               ':hover': {
          //                 color: theme.palette.mode === 'dark' && 'black',
          //                 backgroundColor: '#E6F2FC',
          //               },
          //             }}
          //             onClick={() => {
          //               searchInputRef.current.value = obj;
          //               searchInputRef.current.dispatchEvent(new Event('input', { bubbles: true }));
          //             }}
          //           >
          //             <Stack direction="row" spacing={1} alignItems="center">
          //               <Typography fontSize="13px">{obj}</Typography>
          //             </Stack>

          //             <IconButton
          //               size="small"
          //               onClick={(e) => {
          //                 e.stopPropagation();
          //               }}
          //             >
          //               <Clear style={{ width: '15px', height: '15px' }} />
          //             </IconButton>
          //           </Stack>
          //         );
          //       })}
          //     </>
          //   )}
          // </Box>
          /// dummy part
          <Box
            sx={{
              px: 2,
              pb: 3,
              height: '400px',
              overflowY: 'auto',
              width: '100%',
              position: 'absolute',
              zIndex: 99999,
              top: '55px',
              backgroundColor: theme.palette.mode === 'dark' ? '#212B36' : 'white',
              borderRadius: 1,
              boxShadow: 3,
            }}
          >
            <>
              <Typography
                fontSize="12px"
                color={theme.palette.mode === 'dark' ? 'white' : 'black'}
                sx={{ mt: 2 }}
              >
                SKUs
              </Typography>
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
              >
                <Stack direction="row" spacing={1} alignItems="center">
                  <img src={flag} alt="" width="30px" />
                  <Typography fontSize="13px">LA721ST0PD4NCNAFAMZ</Typography>
                </Stack>
                <Typography fontSize="13px"># 10</Typography>
              </Stack>
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
              >
                <Stack direction="row" spacing={1} alignItems="center">
                  <img src={flag} alt="" width="30px" />
                  <Typography fontSize="13px">LA721ST0PD4NCNAFAMZ</Typography>
                </Stack>
                <Typography fontSize="13px"># 10</Typography>
              </Stack>
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
              >
                <Stack direction="row" spacing={1} alignItems="center">
                  <img src={flag} alt="" width="30px" />
                  <Typography fontSize="13px">LA721ST0PD4NCNAFAMZ</Typography>
                </Stack>
                <Typography fontSize="13px"># 10</Typography>
              </Stack>
            </>
            <>
              <Typography
                fontSize="12px"
                color={theme.palette.mode === 'dark' ? 'white' : 'black'}
                sx={{ mt: 2 }}
              >
                Marketplace
              </Typography>
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
              >
                <Stack direction="row" spacing={1} alignItems="center">
                  <img src={flag} alt="" width="30px" />
                  <Typography fontSize="13px">Noon/ Egypt</Typography>
                </Stack>
              </Stack>
            </>
            <>
              <Typography
                fontSize="12px"
                color={theme.palette.mode === 'dark' ? 'white' : 'black'}
                sx={{ mt: 2 }}
              >
                Category
              </Typography>
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
              >
                <Stack direction="row" spacing={1} alignItems="center">
                  <img src={flag} alt="" width="30px" />
                  <Typography fontSize="13px">Baby Products</Typography>
                </Stack>
              </Stack>
            </>
            <>
              <Typography
                fontSize="12px"
                color={theme.palette.mode === 'dark' ? 'white' : 'black'}
                sx={{ mt: 2 }}
              >
                Brands
              </Typography>
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
              >
                <Stack direction="row" spacing={1} alignItems="center">
                  <img src={flag} alt="" width="30px" />
                  <Typography fontSize="13px">Tommee Tippee</Typography>
                </Stack>
              </Stack>
            </>
            <>
              <Typography
                fontSize="12px"
                color={theme.palette.mode === 'dark' ? 'white' : 'black'}
                sx={{ mt: 3 }}
              >
                Recently Searched
              </Typography>
              <Stack
                direction="row"
                spacing={2}
                sx={{ cursor: 'pointer', mt: 1, width: '400px', overflowX: 'auto' }}
              >
                <Stack
                  width="150px"
                  direction="column"
                  spacing={1}
                  justifyContent="center"
                  alignItems="center"
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
                  <img src={flag} alt="" width="30px" />
                  <Typography fontSize="13px">Tommee Tippee</Typography>
                </Stack>
                <Stack
                  width="150px"
                  direction="column"
                  spacing={1}
                  alignItems="center"
                  justifyContent="center"
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
                  <img src={flag} alt="" width="30px" />
                  <Typography fontSize="13px">Tommee Tippee</Typography>
                </Stack>
              </Stack>
            </>
          </Box>
        )}
      </Search>
    </Box>
  );
};

export default SearchBar;
