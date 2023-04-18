import { Box, Card, CardHeader, Typography } from '@mui/material';
import PriceIncreaseGrid from './PriceIncreaseGrid';

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
      cost: 396,
  
      currPrice: 496,
      newPrice: 596,
      rjctReason: 'Not Available',
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
      cost: 396,
  
      currPrice: 496,
      newPrice: 596,
      rjctReason: 'Not Available',
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
      cost: 396,
  
      currPrice: 496,
      newPrice: 596,
      rjctReason: 'Not Available',
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
      cost: 396,
  
      currPrice: 496,
      newPrice: 596,
      rjctReason: 'Not Available',
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
      cost: 396,
  
      currPrice: 496,
      newPrice: 596,
      rjctReason: 'Not Available',
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
      cost: 396,
  
      currPrice: 496,
      newPrice: 596,
      rjctReason: 'Not Available',
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
      cost: 396,
      currPrice: 496,
      newPrice: 596,
      rjctReason: 'Not Available',
    },
  ];
  
  export const _dataGrid = brandAPI.map((mkt, index) => ({
    id: index,
    sku: mkt.sku,
    marketplace: mkt.marketplace,
    cost: mkt.cost,
    rjctReason: mkt.rjctReason,
    currPrice: mkt.currPrice,
    newPrice: mkt.newPrice,
  }));

const PriceIncreaseTable = () => {
 /*  const { brand } = useParams();
  const query = `limit=5&brand_en=${brand}&page=1&sort=-sku_rate&fields=sku,brand_en,category_en,all_images,sku_rate,sku_rtv,number_of_sellers,sku_marketplace,is_live,buy_box_sku_fulfillment_type,current_price,price_change,trade_value,tags,estimated_SOH,maxIn_investment,minIn_investment,rtvP,sold_24_hours,est_market_cap,dsohand_percentage,supply_percentage`;

  const { data } = useGetAllProductsQuery(query); */

  //   console.log(data);

  return (
    <>
      <Card sx={{ mt: 3 }} >
        <CardHeader title="Price to increase" sx={{ mb: 1.5 }} />
        <Box sx={{ height: 470 }}>
          <PriceIncreaseGrid data={_dataGrid} />
        </Box>
      </Card>

      <Typography variant="caption">
        Designed for users to instantly see the market situations on the marketplaces and predicts
        what will come next.
      </Typography>
    </>
  );
};

export default PriceIncreaseTable;
