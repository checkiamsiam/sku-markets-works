import { Box, Card, CardHeader, Typography } from '@mui/material';
import PricesBuilderGrid from './PricesBuilderGrid';

const brandAPI = [
    {
        sku: {
            img: 'https://f.nooncdn.com/products/tr:n-t_400/pzsku/Z94261292DCEEFDB3F518Z/45/_/1658755374/e4d5548e-3358-4c19-b6cb-a68cdf30e97e.jpg',
            skuN: 'N35997789A',
            ctgry: 'Beauty & Health',
            brand: 'Tomme Tippee',
        },
        marketplace:
            'https://sku-markets.vercel.app/static/media/noon-saudi.c6b665a962341d75a9b658b6012c4194.svg',
        brkCost: 34,
        skuType: 'Express',
        sale15: 30,
        sale30: 40,
        bSeller: 'Not Available',
        currUnt: 35,
        bPrice: 30,
        mSkus: 17,
        newPrice: 30,
        bSkus: 15,
        eSkus: 21,
    },
    {
        sku: {
            img: 'https://f.nooncdn.com/products/tr:n-t_400/pzsku/Z94261292DCEEFDB3F518Z/45/_/1658755374/e4d5548e-3358-4c19-b6cb-a68cdf30e97e.jpg',
            skuN: 'N35997789A',
            ctgry: 'Beauty & Health',
            brand: 'Tomme Tippee',
        },

        marketplace:
            'https://sku-markets.vercel.app/static/media/noon-saudi.c6b665a962341d75a9b658b6012c4194.svg',
        brkCost: 34,
        skuType: 'Express',
        sale15: 30,
        sale30: 40,
        bSeller: 'Not Available',
        currUnt: 35,
        bPrice: 30,
        mSkus: 17,
        newPrice: 30,
        bSkus: 15,
        eSkus: 21,
    },
    {
        sku: {
            img: 'https://f.nooncdn.com/products/tr:n-t_400/pzsku/Z94261292DCEEFDB3F518Z/45/_/1658755374/e4d5548e-3358-4c19-b6cb-a68cdf30e97e.jpg',
            skuN: 'N35997789A',
            ctgry: 'Beauty & Health',
            brand: 'Tomme Tippee',
        },

        marketplace:
            'https://sku-markets.vercel.app/static/media/noon-saudi.c6b665a962341d75a9b658b6012c4194.svg',
        brkCost: 34,
        skuType: 'Express',
        sale15: 30,
        sale30: 40,
        bSeller: 'Not Available',
        currUnt: 35,
        bPrice: 30,
        mSkus: 17,
        newPrice: 30,
        bSkus: 15,
        eSkus: 21,
    },
    {
        sku: {
            img: 'https://f.nooncdn.com/products/tr:n-t_400/pzsku/Z94261292DCEEFDB3F518Z/45/_/1658755374/e4d5548e-3358-4c19-b6cb-a68cdf30e97e.jpg',
            skuN: 'N35997789A',
            ctgry: 'Beauty & Health',
            brand: 'Tomme Tippee',
        },

        marketplace:
            'https://sku-markets.vercel.app/static/media/noon-saudi.c6b665a962341d75a9b658b6012c4194.svg',
        brkCost: 34,
        skuType: 'Express',
        sale15: 30,
        sale30: 40,
        bSeller: 'Not Available',
        currUnt: 35,
        bPrice: 30,
        mSkus: 17,
        newPrice: 30,
        bSkus: 15,
        eSkus: 21,
    },
    {
        sku: {
            img: 'https://f.nooncdn.com/products/tr:n-t_400/pzsku/Z94261292DCEEFDB3F518Z/45/_/1658755374/e4d5548e-3358-4c19-b6cb-a68cdf30e97e.jpg',
            skuN: 'N35997789A',
            ctgry: 'Beauty & Health',
            brand: 'Tomme Tippee',
        },

        marketplace:
            'https://sku-markets.vercel.app/static/media/noon-saudi.c6b665a962341d75a9b658b6012c4194.svg',
        brkCost: 34,
        skuType: 'Express',
        sale15: 30,
        sale30: 40,
        bSeller: 'Not Available',
        currUnt: 35,
        bPrice: 30,
        mSkus: 17,
        newPrice: 30,
        bSkus: 15,
        eSkus: 21,
    },
    {
        sku: {
            img: 'https://f.nooncdn.com/products/tr:n-t_400/pzsku/Z94261292DCEEFDB3F518Z/45/_/1658755374/e4d5548e-3358-4c19-b6cb-a68cdf30e97e.jpg',
            skuN: 'N35997789A',
            ctgry: 'Beauty & Health',
            brand: 'Tomme Tippee',
        },

        marketplace:
            'https://sku-markets.vercel.app/static/media/noon-saudi.c6b665a962341d75a9b658b6012c4194.svg',
        brkCost: 34,
        skuType: 'Express',
        sale15: 30,
        sale30: 40,
        bSeller: 'Not Available',
        currUnt: 35,
        bPrice: 30,
        mSkus: 17,
        newPrice: 30,
        bSkus: 15,
        eSkus: 21,
    },
    {
        sku: {
            img: 'https://f.nooncdn.com/products/tr:n-t_400/pzsku/Z94261292DCEEFDB3F518Z/45/_/1658755374/e4d5548e-3358-4c19-b6cb-a68cdf30e97e.jpg',
            skuN: 'N35997789A',
            ctgry: 'Beauty & Health',
            brand: 'Tomme Tippee',
        },

        marketplace:
            'https://sku-markets.vercel.app/static/media/noon-saudi.c6b665a962341d75a9b658b6012c4194.svg',
        brkCost: 34,
        skuType: 'Express',
        sale15: 30,
        sale30: 40,
        bSeller: 'Not Available',
        currUnt: 35,
        bPrice: 30,
        mSkus: 17,
        newPrice: 30,
        bSkus: 15,
        eSkus: 21,
    },
];

export const _dataGrid = brandAPI.map((mkt, index) => ({
    id: index,
    sku: mkt.sku,
    marketplace: mkt.marketplace,
    brkCost: mkt.brkCost,
    skuType: mkt.skuType,
    sale15: mkt.sale15,
    sale30: mkt.sale30,
    currUnt: mkt.currUnt,
    bPrice: mkt.bPrice,
    mSkus: mkt.mSkus,
    newPrice: mkt.newPrice,
    bSkus: mkt.bSkus,
    eSkus: mkt.eSkus,
    bSeller: mkt.bSeller,
}));

const PricesBuilderTable = () => {
    return (
        <>
            <Card sx={{ mt: 3 }}>
                <CardHeader title="Prices Builder" sx={{ mb: 1.5 }} />
                <Box sx={{ height: 470 }}>
                    <PricesBuilderGrid data={_dataGrid} />
                </Box>
            </Card>

            <Typography variant="caption">
                Designed for users to instantly see the market situations on the marketplaces and
                predicts what will come next.
            </Typography>
        </>
    );
};

export default PricesBuilderTable;
