import React from 'react';
import DashboardLayout from '../../../layouts/dashboard/DashboardLayout';
import { useEffect } from 'react';
import { paramCase } from 'change-case';
// next
import Head from 'next/head';
import { useRouter } from 'next/router';
// @mui
import { Container } from '@mui/material';
import ProductDetailsAnalysisSection from '../../../components/productDetails/ProductDetailsAnalysisSection';
import ChartAndAnalysis from '../../../components/productDetails/ChartAndAnalysis';
import ProductAnalysisTable from '../../../components/productDetails/ProductAnalysisTable';
import ComparableTradeVolume from '../../../components/productDetails/ComparableTradeVolume';
import { useSettingsContext } from '../../../components/settings';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, useGetProductDetailQuery } from '../../../redux/slices/product';

ProductDetailsPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function ProductDetailsPage({ data }) {
  console.log(data);
  const router = useRouter();

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
        <ProductDetailsAnalysisSection product={data} />
        <ChartAndAnalysis product={data} />
        <ProductAnalysisTable product={data} />
        <ComparableTradeVolume product={data} />
      </Container>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const res = await fetch(`https://sku-markets.herokuapp.com/api/v1/product/${ctx.query.id}`);
  const data = await res.json();

  return {
    props: { data: data.product },
  };
}
