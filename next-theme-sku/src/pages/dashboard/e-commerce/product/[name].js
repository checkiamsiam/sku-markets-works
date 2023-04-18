import { useEffect } from 'react';
import { paramCase } from 'change-case';
// next
import Head from 'next/head';
import { useRouter } from 'next/router';
// @mui
import { Container } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../../../redux/store';
import { getProducts } from '../../../../redux/slices/product';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// layouts
import DashboardLayout from '../../../../layouts/dashboard';
// components
import { useSettingsContext } from '../../../../components/settings';
import ProductDetailsAnalysisSection from '../../../../components/productDetails/ProductDetailsAnalysisSection';
import ChartAndAnalysis from '../../../../components/productDetails/ChartAndAnalysis';
import ProductAnalysisTable from '../../../../components/productDetails/ProductAnalysisTable';
import ComparableTradeVolume from '../../../../components/productDetails/ComparableTradeVolume';

// ----------------------------------------------------------------------

ProductDetailsPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function ProductDetailsPage() {
  const { themeStretch } = useSettingsContext();

  const dispatch = useDispatch();

  const {
    query: { name },
  } = useRouter();

  const currentProduct = useSelector((state) =>
    state.product.products.find((product) => paramCase(product.name) === name)
  );

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <>
      <Head>
        <title> Ecommerce: Edit product | Minimal UI</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <ProductDetailsAnalysisSection />
        <ChartAndAnalysis />
        <ProductAnalysisTable />
        <ComparableTradeVolume />
      </Container>
    </>
  );
}
