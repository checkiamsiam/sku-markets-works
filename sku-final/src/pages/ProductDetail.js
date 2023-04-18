import { Container } from '@mui/material';
import SKUMarquee from 'components/common/marquee';
import ChartAndAnalysis from 'components/productDetails/ChartAndAnalysis';
import ComparableTradeVolume from 'components/productDetails/ComparableTradeVolume';
import ProductDetailsAnalysisSection from 'components/productDetails/ProductDetailsAnalysisSection';
import ProductStoreTable from 'components/productDetails/ProductStoreTable';
import { useSettingsContext } from 'components/settings';

export default function ProductDetail() {
  const { themeStretch } = useSettingsContext();

  return (
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <SKUMarquee />
        <ProductDetailsAnalysisSection />
        <ChartAndAnalysis />
        <ProductStoreTable />
        <ComparableTradeVolume />
      </Container>
  );
}
