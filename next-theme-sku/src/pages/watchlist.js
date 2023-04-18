import Head from 'next/head';
import React from 'react';
import WatchlistMain from '../components/watchlist/WatchlistMain';
import MainLayout from '../layouts/main';

Watchlist.getLayout = (page) => <MainLayout>{page}</MainLayout>;
export default function Watchlist() {
    return (
        <>
            <Head>
                <title> Watchlist | SKU Markets</title>
            </Head>
            <WatchlistMain/>
        </>
    );
};
