import { Typography } from '@mui/material';
import ChartForDashboardCard from 'components/chart/ChartForDashboard';
import MPLogo from 'components/common/MPLogo';
import SkuColumn from 'components/common/TableColumns/SkuColumn';
import { lightGray } from 'components/sellerboard/rfq/new/SellTable';

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
    width: 300,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    renderCell: ({ row }) => <SkuColumn row={row} />,
    headerClassName: 'super-app-theme--header',
    
  },
  {
    field: 'sku_marketplace',
    headerName: 'Marketplace',
    align: 'center',
    headerAlign: 'center',
    renderCell: ({ row }) => <MPLogo marketplace={row?.sku_marketplace} />,
    width: 150,
    headerClassName: 'super-app-theme--header',
    sortable: false,
    filterable: true,
    disableColumnMenu: true,
  },
  {
    field: 'number_of_sellers',
    type: 'number',
    headerName: 'Stores',
    align: 'center',
    headerAlign: 'center',
    width: 125,
    headerClassName: 'super-app-theme--header',
    sortable: false,
    filterable: true,
    disableColumnMenu: true,
  },
  {
    field: 'sku_rank',
    type: 'number',
    headerName: 'Rank',
    align: 'center',
    headerAlign: 'center',
    width: 100,
    headerClassName: 'super-app-theme--header',
    sortable: false,
    filterable: true,
    disableColumnMenu: true,
  },
  {
    field: 'current_price',
    type: 'number',
    headerName: 'BuyBox Sale Price',
    align: 'center',
    headerAlign: 'center',
    width: 150,
    headerClassName: 'super-app-theme--header',
    sortable: false,
    filterable: true,
    disableColumnMenu: true,
  },
  {
    field: 'price_change',
    type: 'number',
    headerName: 'Chg 24H',
    align: 'center',
    headerAlign: 'center',
    width: 150,
    sortable: false,
    filterable: true,
    disableColumnMenu: true,
    renderCell: ({ row }) => (
      <Typography
        sx={{
          color:
            row?.price_change >= 0 ? (row.price_change === 0 ? lightGray : 'green') : 'error.main',
        }}
      >
        {row?.price_change} %
      </Typography>
    ),
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'graph',
    type: 'number',
    headerName: 'Graph',
    align: 'center',
    headerAlign: 'center',
    width: 174,
    sortable: false,
    filterable: true,
    disableColumnMenu: true,
    renderCell: ({ row }) => (
      <ChartForDashboardCard
        height="35px"
        chart={{
          colors: [
            row?.price_change >= 0 ? (row.price_change === 0 ? lightGray : 'green') : 'error.main',
          ],
          series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
        }}
      />
    ),
    headerClassName: 'super-app-theme--header',
  },
];

export default columns;
