import Head from 'next/head';
import React from 'react';
import AlertsMain from '../components/alerts/AlertsMain';
import MainLayout from '../layouts/main';


Alerts.getLayout = (page) => <MainLayout>{page}</MainLayout>;
export default function Alerts()  {
    return (
        <>
        <Head>
        <title> Alerts | SKU Markets</title>
      </Head>
            <AlertsMain/>
        </>
    );
};
