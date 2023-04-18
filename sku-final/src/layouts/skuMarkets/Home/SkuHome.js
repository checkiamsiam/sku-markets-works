import { Box, Container } from '@mui/material';
import RecentlyVisitedProducts from 'components/SkuMarket/RecentlyVisitedProducts';
import ActiveSKUProductsMarquee from 'components/common/marquee/ActiveSKUProductsMarquee';
import { useSettingsContext } from 'components/settings';
import { useGetAllCategoriesWithProductsQuery } from 'features/product/productAPI';
import { useLocales } from 'locales';
import BottomBanner from './Banner/BottomBanner';
import CategoryBanner from './Banner/CategoryBanner';
import ProductBanner from './Banner/ProductBanner';
import TopBanner from './Banner/TopBanner';
import SkuCategoryInHome from './category slider';
import OffersSection from './offersSection/OffersSection';
import TopFooter from './topFooter/topFooter';

const SkuHome = () => {
  const { themeStretch } = useSettingsContext();
  const { data, isLoading, isFetching } = useGetAllCategoriesWithProductsQuery();

  const { dynamicLang } = useLocales();
  const lng = dynamicLang === 'ar';

  return (
    <>
      <Container sx={{ mt: 20 }} maxWidth={themeStretch ? false : 'lg'}>
        <ActiveSKUProductsMarquee />
        <Box sx={{ mb: 2, mt: 0.5, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1 }}>
          <TopBanner lng={lng} />
        </Box>
        <BottomBanner categories={data?.data} isLoading={isLoading} isFetching={isFetching} />
        <RecentlyVisitedProducts />
        <ProductBanner lng={lng} />
        <SkuCategoryInHome />
        <OffersSection />
        <CategoryBanner
          data={data?.data}
          rows={33}
          next={7}
          md={1.71428}
          isLoading={isLoading}
          isFetching={isFetching}
        />
        <TopFooter />
      </Container>
    </>
  );
};

export default SkuHome;
