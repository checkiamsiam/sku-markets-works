import { Box, Container } from '@mui/material';
import ActiveSKUProductsMarquee from 'components/common/marquee/ActiveSKUProductsMarquee';
import { useSettingsContext } from 'components/settings';
import { useGetAllCategoryTypesWithProductsQuery } from 'features/product/productAPI';
// import { m, useScroll, useSpring } from 'framer-motion';
import TypeBanner from 'layouts/skuMarkets/Home/Banner/TypeBanner';
import { useSearchParams } from 'react-router-dom';
import SkuCategoryB3 from '../SkuCategoryB3';
import SkuCategoryBanner from './SkuCategoryBanner';
import SkuCategoryName from './SkuCategoryName';

const SkuCategoryHome = () => {
  const { themeStretch } = useSettingsContext();
  const [searchParams, _] = useSearchParams();

  const fields =
    '_id,sku_marketplace,sku,current_price,price_change,buy_box_currency,brand_en,sku_rate,sku_rank,all_images,tags,updatedAt,sold_24_hours,stores,estimated_SOH,category_en,sku_type_en,sku_sub_type_en';
  const logic = `category=${encodeURIComponent(
    searchParams.get('name')
  )}&marketplace=${encodeURIComponent(searchParams.get('marketplace'))}`;

  const {
    data: categoryData,
    isLoading,
    isFetching,
  } = useGetAllCategoryTypesWithProductsQuery(`fields=${fields}&${logic}&limitProducts=50`);

  return (
    <>
      <Container sx={{ mt: 20 }} maxWidth={themeStretch ? false : 'lg'}>
        <ActiveSKUProductsMarquee />

        <Box sx={{ mb: 2, mt: 0.5, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1 }}>
          <SkuCategoryBanner />
        </Box>
        <TypeBanner types={categoryData?.data} isLoading={isLoading} isFetching={isFetching} />
        <SkuCategoryB3 />
        <SkuCategoryName
          object={categoryData?.data}
          isLoading={isLoading}
          isFetching={isFetching}
          limit={30}
        />
      </Container>
    </>
  );
};

export default SkuCategoryHome;
