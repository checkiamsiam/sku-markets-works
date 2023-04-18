import { Link } from '@mui/material';
import MPLogo from 'components/common/MPLogo';
import { Link as DomLink } from 'react-router-dom';

const columns = [
  {
    field: 'id',
    hide: true,
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'category',
    headerName: 'Top Category',
    headerAlign: 'center',
    width: 150,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    renderCell: ({ row }) => (
      <Link component={DomLink} to={`/category/${row?.category}`}>
        {row?.category}
      </Link>
    ),
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'marketplace',
    headerName: 'Marketplace',
    align: 'center',
    headerAlign: 'center',
    renderCell: ({ row }) => <MPLogo marketplace={row?.marketplace} />,
    width: 120,
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'brand',
    type: 'number',
    headerName: 'Brands',
    align: 'center',
    headerAlign: 'center',
    width: 70,
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'types',
    type: 'number',
    headerName: 'Types',
    align: 'center',
    headerAlign: 'center',
    width: 70,
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'sub_types',
    type: 'number',
    headerName: 'Sub Types',
    align: 'center',
    headerAlign: 'center',
    width: 100,
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'sku',
    type: 'number',
    headerName: 'Ranked SKUs',
    align: 'center',
    headerAlign: 'center',
    width: 110,
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'stores',
    type: 'number',
    headerName: 'Stores',
    align: 'center',
    headerAlign: 'center',
    width: 100,
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'live',
    type: 'number',
    headerName: 'Live SKUs',
    align: 'center',
    headerAlign: 'center',
    width: 100,
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'not_live',
    type: 'number',
    headerName: 'Not Live SKUs',
    align: 'center',
    headerAlign: 'center',
    width: 130,
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'ff_store',
    type: 'number',
    headerName: 'Fulfilled by Stores',
    align: 'center',
    headerAlign: 'center',
    width: 150,
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'ff_mp',
    type: 'number',
    headerName: 'Fulfilled by MP',
    align: 'center',
    headerAlign: 'center',
    width: 130,
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'stocks',
    type: 'number',
    headerName: 'SOH',
    align: 'center',
    headerAlign: 'center',
    width: 150,
    headerClassName: 'super-app-theme--header',
  },
];

export default columns;
