import { Stack } from '@mui/material';
import MPLogo from 'components/common/MPLogo';
import DeleteSKU from 'components/common/SKUactions/DeleteSKU';
import UpdateAlert from 'components/common/SKUactions/UpdateAlert';
import SkuColumn from 'components/common/TableColumns/SkuColumn';

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
    renderCell: ({ row }) => <SkuColumn row={row} />,
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'sku_marketplace',
    headerName: 'Marketplace',
    align: 'center',
    headerAlign: 'center',
    renderCell: ({ row }) => <MPLogo marketplace={row?.sku_marketplace} />,
    width: 100,
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'category_en',
    type: 'number',
    headerName: 'Category',
    hide: true,
    align: 'center',
    headerAlign: 'center',
    width: 80,
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'brand_en',
    type: 'number',
    headerName: 'Brand',
    hide: true,
    align: 'center',
    headerAlign: 'center',
    width: 60,
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'number_of_sellers',
    type: 'number',
    headerName: 'Stores',
    align: 'center',
    headerAlign: 'center',
    width: 60,
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'sku_rate',
    type: 'number',
    headerName: 'Rate',
    align: 'center',
    headerAlign: 'center',
    width: 60,
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'sku_rank',
    type: 'number',
    headerName: 'Rank',
    align: 'center',
    headerAlign: 'center',
    width: 60,
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'buy_box_sku_fulfillment_type',
    type: 'string',
    headerName: 'Fulfillment Type',
    align: 'center',
    headerAlign: 'center',
    width: 140,
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'is_live',
    type: 'boolean',
    headerName: 'SKU Status',
    align: 'center',
    headerAlign: 'center',
    width: 100,
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'current_price',
    type: 'number',
    headerName: 'Buy Box Sale Price',
    align: 'center',
    headerAlign: 'center',
    width: 150,
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
    field: 'getTopBottomPrice',
    type: 'number',
    headerName: 'Max Offer Price',
    align: 'center',
    headerAlign: 'center',
    width: 120,
    headerClassName: 'super-app-theme--header',
    renderCell: ({ value }) => {
      return <span>{value?.topPrice?.last30Days}</span>;
    },
  },
  {
    field: 'bottomPrice',
    type: 'number',
    headerName: 'Min Offer Price',
    align: 'center',
    headerAlign: 'center',
    width: 120,
    headerClassName: 'super-app-theme--header',
    renderCell: ({ row }) => {
      return <span>{row?.getTopBottomPrice?.bottomPrice?.last30Days}</span>;
    },
  },
 
  {
    field: 'e_opp_to_fulfillment',
    type: 'boolean',
    headerName: 'E Opp to Fulfillment',
    align: 'center',
    headerAlign: 'center',
    width: 190,
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'opp_stock',
    type: 'boolean',
    headerName: 'E Opp to Stock',
    align: 'center',
    headerAlign: 'center',
    width: 120,
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'opp_other_platform',
    type: 'boolean',
    headerName: 'E Opp to Other Fulfillment',
    align: 'center',
    headerAlign: 'center',
    width: 190,
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'Actions',
    headerName: 'Actions',
    align: 'center',
    headerAlign: 'center',
    width: 120,
    renderCell: ({ row }) => {
      return (
        <Stack direction="row" justifyContent="center" alignItems="center">
          <UpdateAlert row={row} />
          <DeleteSKU row={row} from="watchlist"/>
        </Stack>
      );
    },
    sortable: true,
    filterable: true,
    disableColumnMenu: true,
    headerClassName: 'super-app-theme--header',
  },
];

export default columns;
