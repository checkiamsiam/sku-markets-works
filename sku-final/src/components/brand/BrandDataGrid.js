import { useTheme } from '@emotion/react';
import { Box, Grid, Link } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import MPLogo from 'components/common/MPLogo';
import Label from 'components/label/Label';
import { Link as DomLink } from 'react-router-dom';

export default function BrandDataGrid({ data, page, setPage, loading }) {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  const columns = [
    {
      field: 'id',
      hide: true,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'sku',
      headerName: 'SKU',
      align: 'center',
      headerAlign: 'center',
      width: 180,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <Box sx={{ width: '100%' }}>
          <Grid container spacing={2}>
            <Grid
              item
              lg={4}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <img src={params.row?.all_images[0]} alt="product img" width="50" height="50" />
            </Grid>
            <Grid item lg={8}>
              <div
                style={{
                  fontSize: '12px',
                  lineHeight: '5px',
                  color: 'gray',
                }}
              >
                <p style={{ fontWeight: '600' }}>
                  <Link component={DomLink} to={`/product/${params.row?._id}`}>
                    {params.row?.sku}
                  </Link>
                </p>
                <p>
                  <Link
                    component={DomLink}
                    color="text.secondary"
                    to={`/category/${params.row?.category_en}`}
                  >
                    {params.row?.category_en}
                  </Link>
                </p>
                <p>
                  <Link
                    component={DomLink}
                    color="text.secondary"
                    to={`/brand/${params.row?.brand_en}`}
                  >
                    {params.row?.brand_en}
                  </Link>
                </p>
              </div>
            </Grid>
          </Grid>
        </Box>
      ),
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'marketplace',
      headerName: 'Marketplace',
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => <MPLogo marketplace={params.row?.sku_marketplace} />,
      width: 120,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'number_of_sellers',
      type: 'number',
      headerName: 'Stores',
      align: 'center',
      headerAlign: 'center',
      width: 70,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'sku_rate',
      type: 'number',
      headerName: 'Rate',
      align: 'center',
      headerAlign: 'center',
      width: 70,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'sku_rank',
      type: 'number',
      headerName: 'Rank',
      align: 'center',
      headerAlign: 'center',
      width: 100,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'fulfillment',
      renderCell: (params) => (
        <Label variant={isLight ? 'soft' : 'filled'} color={'warning'} sx={{ mx: 'auto' }}>
          {params.row?.buy_box_sku_fulfillment_type === 'Fulfilled by MP'
            ? 'Express'
            : params.row?.buy_box_sku_fulfillment_type === 'Fulfilled by Stores'
            ? 'Stores'
            : 'Not Available'}
        </Label>
      ),
      type: 'number',
      headerName: 'Fulfillment Type',
      align: 'center',
      headerAlign: 'center',
      width: 130,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'status',
      type: 'boolean',
      headerName: 'SKU Status',
      align: 'center',
      headerAlign: 'center',
      width: 100,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => (
        <Label
          variant={isLight ? 'soft' : 'filled'}
          color={params.row?.is_live ? 'success' : 'error'}
          sx={{ mx: 'auto' }}
        >
          {params.row?.is_live ? 'Live' : 'Not Live'}
        </Label>
      ),
    },
    {
      field: 'current_price',
      type: 'number',
      headerName: 'BuyBox Sale Price',
      align: 'center',
      headerAlign: 'center',
      width: 170,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'price_change',
      type: 'number',
      headerName: 'Chg 24H',
      align: 'center',
      headerAlign: 'center',
      width: 80,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'mxPrice',
      type: 'number',
      headerName: 'Max Offer Price',
      align: 'center',
      headerAlign: 'center',
      width: 150,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'minPrice',
      type: 'number',
      headerName: 'Min Offer Price',
      align: 'center',
      headerAlign: 'center',
      width: 150,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'eof',
      type: 'number',
      headerName: 'E Opp To Fullfilment',
      align: 'center',
      headerAlign: 'center',
      width: 170,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'eos',
      headerName: 'E Opp To Stock',
      align: 'center',
      headerAlign: 'center',
      width: 150,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'trade_value',
      type: 'number',
      headerName: 'Trade Volume',
      align: 'center',
      headerAlign: 'center',
      width: 120,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'tags',
      headerName: 'Tags',
      align: 'center',
      headerAlign: 'center',
      width: 80,
      renderCell: (params) => {
        const tags = params.row?.tags;
        if (tags.length > 0) {
          return tags.map((tag) => (
            <Label
              variant={isLight ? 'soft' : 'filled'}
              color={tag === 'Hot' ? 'error' : 'success'}
              sx={{ mx: 'auto' }}
            >
              {tag}
            </Label>
          ));
        } else {
          return (
            <Label variant={isLight ? 'soft' : 'filled'} color={'warning'} sx={{ mx: 'auto' }}>
              None
            </Label>
          );
        }
      },
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'average_selling_price',
      type: 'number',
      headerName: 'ASP',
      align: 'center',
      headerAlign: 'center',
      width: 60,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'volume_to_market_cap_ratio',
      type: 'number',
      headerName: 'Vol (24h) / MCap',
      align: 'center',
      headerAlign: 'center',
      width: 130,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'estimated_SOH',
      type: 'number',
      headerName: 'Estimated SOH',
      align: 'center',
      headerAlign: 'center',
      width: 120,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'doh',
      type: 'number',
      headerName: 'DOH',
      align: 'center',
      headerAlign: 'center',
      width: 60,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'enr',
      type: 'number',
      headerName: 'ENR',
      align: 'center',
      headerAlign: 'center',
      width: 60,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'max_investment',
      type: 'number',
      headerName: 'Max Investment',
      align: 'center',
      headerAlign: 'center',
      width: 120,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'min_investment',
      type: 'number',
      headerName: 'Min Investment',
      align: 'center',
      headerAlign: 'center',
      width: 120,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'EQTI',
      type: 'number',
      headerName: 'EQTI',
      align: 'center',
      headerAlign: 'center',
      width: 60,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'em',
      type: 'number',
      headerName: 'EM',
      align: 'center',
      headerAlign: 'center',
      width: 50,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'sold_24_hours',
      type: 'number',
      headerName: 'Sales volume L 24 H',
      align: 'center',
      headerAlign: 'center',
      width: 170,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'est_market_cap',
      type: 'number',
      headerName: 'E Marketplace cap',
      align: 'center',
      headerAlign: 'center',
      width: 150,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'eoaf',
      type: 'number',
      headerName: 'E Opp to Amazon Fulfillment',
      align: 'center',
      headerAlign: 'center',
      width: 210,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'eonf',
      type: 'number',
      headerName: 'E Opp to Noon Fulfilment	',
      align: 'center',
      headerAlign: 'center',
      width: 180,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'demand_percentage',
      type: 'number',
      headerName: 'Demand',
      align: 'center',
      headerAlign: 'center',
      width: 80,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'supply_percentage',
      type: 'number',
      headerName: 'Supply',
      align: 'center',
      headerAlign: 'center',
      width: 80,
      headerClassName: 'super-app-theme--header',
    },
  ];

  return (
    <DataGrid
      sx={{
        '& .super-app-theme--header': {
          backgroundColor: '#0D6EFD',
          color: 'white',
        },
      }}
      pagination
      rows={data}
      pageSize={5}
      rowCount={200}
      columns={columns}
      loading={loading}
      paginationMode="server"
      onPageChange={(page) => setPage(page)}
      rowsPerPageOptions={[5]}
      checkboxSelection
      disableSelectionOnClick
      disableDensitySelector={true}
      components={{
        Toolbar: GridToolbar,
      }}
    />
  );
}
