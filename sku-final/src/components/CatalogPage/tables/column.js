import { Box, Link, Stack, Typography } from '@mui/material';
import MPLogo from 'components/common/MPLogo';
import ActionColumn from './ActionColumn';
import ShowAllImage from './ShowAllImage';

export const columns = [
  {
    field: 'sku',
    headerName: 'SKU',
    renderCell: ({ row }) => (
      <Stack direction="row" justifyContent="center" alignItems="center" spacing={5}>
        <Box
          component="img"
          src={row?.all_images[0]}
          alt="product img"
          sx={{ width: 50, height: 50, objectFit: 'cover' }}
        />
        <Typography variant="subtitle2" sx={{ fontSize: '12px' }}>
          {row?.sku}
        </Typography>
      </Stack>
    ),
    width: 250,
    sortable: false,
    filterable: true,
    // disableColumnMenu: true,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'All Image',
    headerName: 'All Image',
    width: 120,
    sortable: false,
    filterable: false,
    renderCell: ({ row }) => <ShowAllImage row={row} />,
    disableColumnMenu: true,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'sku_marketplace',
    headerName: 'SKU Marketplace',
    width: 180,
    sortable: false,
    filterable: true,
    renderCell: ({ row }) => <MPLogo marketplace={row?.sku_marketplace} />,
    disableColumnMenu: false,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'title_en',
    headerName: 'Title en',
    width: 130,
    sortable: false,
    filterable: true,
    disableColumnMenu: false,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'brand_en',
    headerName: 'Brand en',
    width: 120,
    sortable: false,
    filterable: true,
    disableColumnMenu: false,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'category_en',
    headerName: 'Category en',
    width: 160,
    sortable: false,
    filterable: true,
    disableColumnMenu: false,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'sku_type_en',
    headerName: 'SkuType en',
    width: 150,
    sortable: false,
    filterable: true,
    disableColumnMenu: false,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'sku_sub_type_en',
    headerName: 'Sku Sub-Type en',
    width: 180,
    sortable: false,
    filterable: true,
    disableColumnMenu: false,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'description_en',
    headerName: 'Description en',
    width: 120,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    align: 'center',
    headerAlign: 'center',
  },

  {
    field: 'title_ar',
    headerName: 'Title ar',
    width: 130,
    sortable: false,
    filterable: true,
    disableColumnMenu: false,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'brand_ar',
    headerName: 'Brand ar',
    width: 120,
    sortable: false,
    filterable: true,
    disableColumnMenu: false,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'category_ar',
    headerName: 'Category ar',
    width: 160,
    sortable: false,
    filterable: true,
    disableColumnMenu: false,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'sku_type_ar',
    headerName: 'SkuType ar',
    width: 150,
    sortable: false,
    filterable: true,
    disableColumnMenu: false,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'sku_sub_type_ar',
    headerName: 'Sku Sub-Type ar',
    width: 180,
    sortable: false,
    filterable: true,
    disableColumnMenu: false,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'description_ar',
    headerName: 'Description ar',
    width: 120,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'actions',
    headerName: 'Actions',
    align: 'center',
    headerAlign: 'center',
    width: 550,
    renderCell: ({ row }) => <ActionColumn row={row} />,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
  },
];
