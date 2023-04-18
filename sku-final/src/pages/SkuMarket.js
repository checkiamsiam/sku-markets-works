import { Container, Pagination, Stack } from '@mui/material';
import { Box } from '@mui/system';
import TopSkuCard from 'components/SkuMarket/TopSkuCard';
import ActiveSKUProductsMarquee from 'components/common/marquee/ActiveSKUProductsMarquee';
import CustomBreadcrumbs from 'components/custom-breadcrumbs/CustomBreadcrumbs';
import FormProvider from 'components/hook-form/FormProvider';
import LoadingScreen from 'components/loading-screen/LoadingScreen';
import { useSettingsContext } from 'components/settings';
import {
  useAllSearchedProductsQuery,
  useGetAllSellerProductsQuery,
} from 'features/product/productAPI';
import { orderBy, uniqWith } from 'lodash';
import { Suspense, lazy, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import ShopProductSort from 'sections/@deshboard/Sku-Market/shop/ShopProductSort';
import { ShopFilterDrawer } from '../sections/@deshboard/Sku-Market/shop';

const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

const SkuMarketProduct = Loadable(lazy(() => import('components/SkuMarket/SkuMarketProduct')));

export default function EcommerceShopPage() {
  const { themeStretch } = useSettingsContext();

  const [searchParams, setSearchParams] = useSearchParams();

  const [openFilter, setOpenFilter] = useState(false);
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState();

  const PRODUCTS_IN_SINGLE_PAGE = 60;

  const fields =
    'sku_marketplace,sku,current_price,price_change,buy_box_currency,brand_en,sku_rate,sku_rank,all_images,tags,updatedAt,sold_24_hours,stores,estimated_SOH,category_en,sku_type_en,sku_sub_type_en';
  const query = `fields=${fields}&sort=-sku_rank&limit=${PRODUCTS_IN_SINGLE_PAGE}&page=${page}`;
  const {
    data: productsData,
    isSuccess,
    isLoading,
    isFetching,
  } = useGetAllSellerProductsQuery(query);

  const [searchedKeyword, setSearchedKeyword] = useState('');
  const {
    data: searchedData,
    isSuccess: isSuccessSearched,
    isFetching: isFetchingSearched,
    refetch: refetchSearched,
  } = useAllSearchedProductsQuery(
    `key=${searchedKeyword}&fields=${fields}&limit=${PRODUCTS_IN_SINGLE_PAGE}&page=${page}`
  );

  const [totalCount, setTotalCount] = useState(0);

  const [platforms, setPlatforms] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setSkuCategories] = useState([]);
  const [skuTypes, setSkuTypes] = useState([]);
  const [skuSubTypes, setSkuSubTypes] = useState([]);

  const defaultValues = {
    gender: [],
    category: 'All',
    colors: [],
    priceRange: [0, 200],
    rating: '',
    sortBy: 'featured',
  };

  const methods = useForm({
    defaultValues,
  });

  const {
    reset,
    watch,
    formState: { dirtyFields },
  } = methods;

  const isDefault =
    (!dirtyFields.gender &&
      !dirtyFields.category &&
      !dirtyFields.colors &&
      !dirtyFields.priceRange &&
      !dirtyFields.rating) ||
    false;

  const handleResetFilter = () => {
    setSearchedKeyword('');
    setSearchParams();
    setProducts(applyFilter(productsData.data, { sortBy: 'featured' }));
    reset();
  };

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  function useHandlePagination(event, page) {
    setPage(page);
  }

  useEffect(() => {
    if (searchParams.get('keyword')) {
      setSearchedKeyword(searchParams.get('keyword'));
      setProducts([]);
      refetchSearched();
    } else if (isSuccess) {
      let tempProducts = productsData.data;

      setTotalCount(
        productsData.total > PRODUCTS_IN_SINGLE_PAGE
          ? ~~(productsData.total / PRODUCTS_IN_SINGLE_PAGE) +
              (productsData.total % PRODUCTS_IN_SINGLE_PAGE)
          : 1
      );

      // URL SEARCH PARAMS FILTERING
      if (searchParams.get('sellerId')) {
        tempProducts = applyFilter(tempProducts, {
          sellerId: searchParams.get('sellerId'),
        });
      }
      if (searchParams.get('marketplace')) {
        tempProducts = applyFilter(tempProducts, {
          marketplace: searchParams.get('marketplace'),
        });
      }
      if (searchParams.get('brand')) {
        tempProducts = applyFilter(tempProducts, {
          brand: searchParams.get('brand'),
        });
      }
      if (searchParams.get('category')) {
        tempProducts = applyFilter(tempProducts, {
          category: searchParams.get('category'),
        });
      }
      if (searchParams.get('type')) {
        tempProducts = applyFilter(tempProducts, {
          type: searchParams.get('type'),
        });
      }
      if (searchParams.get('sub_type')) {
        tempProducts = applyFilter(tempProducts, {
          subType: searchParams.get('sub_type'),
        });
      }

      tempProducts = applyFilter(tempProducts, { sortBy: 'featured' });
      setProducts(tempProducts);

      setPlatforms(
        uniqWith(
          productsData.data.map(({ product }) => {
            return { label: product.sku_marketplace };
          }),
          (a, b) => a.label == b.label
        )
      );

      setBrands(
        uniqWith(
          productsData.data.map(({ product }) => {
            return { label: product.brand_en };
          }),
          (a, b) => a.label == b.label
        )
      );

      setSkuCategories(
        uniqWith(
          productsData.data.map(({ product }) => {
            return { label: product.category_en };
          }),
          (a, b) => a.label == b.label
        )
      );

      setSkuTypes(
        uniqWith(
          productsData.data.map(({ product }) => {
            return { label: product.sku_type_en ?? '' };
          }),
          (a, b) => a.label == b.label
        )
      );

      setSkuSubTypes(
        uniqWith(
          productsData.data.map(({ product }) => {
            return { label: product.sku_sub_type_en };
          }),
          (a, b) => a.label == b.label
        )
      );
    }
  }, [isSuccess, searchParams]);

  useEffect(() => {
    if (isSuccessSearched) {
      // In case of SKUs
      if (searchedData?.totalCountSKUs > 0) {
        setTotalCount(
          searchedData?.totalCountSKUs > PRODUCTS_IN_SINGLE_PAGE
            ? ~~(searchedData?.totalCountSKUs / PRODUCTS_IN_SINGLE_PAGE) +
                (searchedData?.totalCountSKUs % PRODUCTS_IN_SINGLE_PAGE)
            : 1
        );
        let tempProducts = searchedData?.data?.skus;
        tempProducts = applyFilter(tempProducts, { sortBy: 'featured' });
        setProducts(tempProducts);
      }
    }
  }, [isSuccessSearched, isFetchingSearched]);

  return (
    <>
      <Helmet>
        <title> Ecommerce: Shop | SKU Markets</title>
      </Helmet>

      <FormProvider methods={methods}>
        <Container sx={{ mt: 20 }} maxWidth={themeStretch ? false : 'lg'}>
          {/* <Typography sx={{ my: 3 }}>
            SKU Markets
          </Typography> */}
          <ActiveSKUProductsMarquee />
          <Stack sx={{ mt: 2 }}>
            <CustomBreadcrumbs
              links={[
                {
                  name: 'Home',
                  href: '/',
                },
                {
                  name: 'SKU',
                  disable: true,
                },
              ]}
            />
          </Stack>

          <Stack direction="row" justifyContent="flex-end" spacing={1} flexShrink={0}>
            <ShopFilterDrawer
              isDefault={isDefault}
              open={openFilter}
              onOpen={handleOpenFilter}
              onClose={handleCloseFilter}
              onResetFilter={handleResetFilter}
              products={productsData?.data}
              setProducts={setProducts}
              filtersHandler={applyFilter}
              dropDownData={[platforms, categories, brands, skuTypes, skuSubTypes]}
              searchParams={searchParams}
              setSearchParams={setSearchParams}
            />

            <ShopProductSort
              products={products}
              setProducts={setProducts}
              filtersHandler={applyFilter}
            />
          </Stack>

          {/* <Stack sx={{ mb: 3 }}>
            {searchedKeyword && (
              <>
                <Typography variant="body2" gutterBottom>
                  &nbsp;{`Products found`}
                </Typography>
               
              </>
            )}
          </Stack> */}
          <Stack sx={{ mb: 3 }}>
            <TopSkuCard id="63d80b197075dddb9310934b" />
          </Stack>
          <SkuMarketProduct
            productData={products}
            isLoadingProduct={isLoading}
            isFetchingProduct={isFetching}
            keyword={searchedKeyword}
          />
        </Container>
      </FormProvider>

      <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
        <Pagination count={totalCount} color="primary" onChange={useHandlePagination} />
      </Box>
    </>
  );
}

function applyFilter(products, filters) {
  // const { gender, category, colors, priceRange, rating, sortBy } = filters;
  const {
    sortBy,
    priceRange,
    rankRange,
    ratingRange,
    storesRange,
    stockRange,
    marketplace,
    category,
    brand,
    type,
    subType,
    sellerId,
  } = filters;

  // SORT BY
  if (sortBy === 'featured') {
    products = orderBy(products, ['product.sold_24_hours'], ['desc']);
  }

  if (sortBy === 'newest') {
    products = orderBy(products, ['product.updatedAt'], ['desc']);
  }

  if (sortBy === 'priceDesc') {
    products = orderBy(products, ['product.current_price'], ['desc']);
  }

  if (sortBy === 'priceAsc') {
    products = orderBy(products, ['product.current_price'], ['asc']);
  }

  // FILTER PRODUCTS
  if (priceRange) {
    // PRICE
    if (priceRange[0] != '0' || priceRange[1] != '0') {
      products = products.filter(
        ({ product }) =>
          product.current_price >= priceRange[0] && product.current_price <= priceRange[1]
      );
    }

    // RANK
    if (rankRange[0] != '0' || rankRange[1] != '0') {
      products = products.filter(
        ({ product }) => product.sku_rank >= rankRange[0] && product.sku_rank <= rankRange[1]
      );
    }

    // RATING
    if (ratingRange[0] != '0' || ratingRange[1] != '0') {
      products = products.filter(
        ({ product }) => product.sku_rate >= ratingRange[0] && product.sku_rate <= ratingRange[1]
      );
    }

    // NUM STORES
    if (storesRange[0] != '0' || storesRange[1] != '0') {
      products = products.filter(
        ({ product }) =>
          product.stores.length >= storesRange[0] && product.stores.length <= storesRange[1]
      );
    }

    // STOCK
    if (stockRange[0] != '0' || stockRange[1] != '0') {
      products = products.filter(
        ({ product }) =>
          product.estimated_SOH >= stockRange[0] && product.estimated_SOH <= stockRange[1]
      );
    }
  }

  // MARKETPLACE
  if (marketplace && marketplace != '') {
    products = products.filter(({ product }) => product.sku_marketplace == marketplace);
  }

  // CATEGORY
  if (category && category != '') {
    products = products.filter(({ product }) => product.category_en == category);
  }

  // BRAND
  if (brand && brand != '') {
    products = products.filter(({ product }) => product.brand_en == brand);
  }

  // TYPE
  if (type && type != '') {
    products = products.filter(({ product }) => product.sku_type_en == type);
  }

  // SUBTYPE
  if (subType && subType != '') {
    products = products.filter(({ product }) => product.sku_sub_type_en == subType);
  }

  // SELLER ID
  if (sellerId && sellerId != '') {
    products = products.filter(({ sellerIds }) => sellerIds.some((id) => id == sellerId));
  }

  // if (gender?.length) {
  //   products = products.filter(( {product} ) => gender.includes(product.gender));
  // }

  // if (category !== 'All') {
  //   products = products.filter(( {product} ) => product.category === category);
  // }

  // if (colors?.length) {
  //   products = products.filter(( {product} ) => product.colors.some((color) => colors.includes(color)));
  // }

  return products;
}
