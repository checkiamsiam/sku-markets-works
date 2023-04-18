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
    width: 210,
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
    field: 'current_price',
    type: 'number',
    headerName: 'Buy Box Price',
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
    headerName: 'Chg 24h',
    align: 'center',
    headerAlign: 'center',
    width: 145,
    renderCell: ({ row }) => {
      return <span  style={{ color: row?.price_change >= 0 ? (row?.price_change === 0 ? lightGray : 'green') : 'red' }}>{row?.price_change}%</span>;
    } ,
    headerClassName: 'super-app-theme--header',
    sortable: false,
    filterable: true,
    disableColumnMenu: true,
  },
];

export default columns;
