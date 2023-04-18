import { Typography } from '@mui/material';
import QntCell from './QntCell';
import SkuColumnForModal from './SkuColumnForModal';
import SkuPendingColumnForModal from './SkuColumnPending';

export const shipmentDataColumns = [
  {
    field: 'id',
    hide: true,
    width: 80,
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'sku',
    headerName: (
      <Typography variant="subtitle2" textAlign="center">
        SKU <br /> 30
      </Typography>
    ),
    align: 'center',
    headerAlign: 'center',
    width: 320,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    renderCell: ({ row }) => <SkuColumnForModal row={row} />,
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'quantity',
    headerName: (
      <Typography variant="subtitle2" textAlign="center">
        QTY <br /> 500
      </Typography>
    ),
    align: 'center',
    headerAlign: 'center',
    width: 170,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    renderCell: ({ row }) => <QntCell quantity={row.quantity} />,
    headerClassName: 'super-app-theme--header',
  },
];
export const shipmentPendingDataColumns = [
  {
    field: 'id',
    hide: true,
    width: 80,
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'sku',
    headerName: (
      <Typography variant="subtitle2" textAlign="center">
        SKU <br /> 30
      </Typography>
    ),
    align: 'center',
    headerAlign: 'center',
    width: 310,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    renderCell: ({ row }) => <SkuPendingColumnForModal row={row} />,
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'quantity',
    headerName: (
      <Typography variant="subtitle2" textAlign="center">
        QTY <br /> 500
      </Typography>
    ),
    align: 'center',
    headerAlign: 'center',
    width: 165,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    renderCell: ({ row }) => <QntCell quantity={row.quantity} />,
    headerClassName: 'super-app-theme--header',
  },
];

export const shipmentDataRow = [
  {
    id: '1',
    sku: 'N39265265A',
    brand_en: 'Apple',
    category_en: 'Mobile Phones',
    all_images: ['https://storage.googleapis.com/sku_markets_noon/N39265265A-4407.jpg'],
    sku_marketplace: 'noon/ksa',
    quantity: 12,
  },
  {
    id: '2',
    sku: 'N392652A',
    brand_en: 'Apple',
    category_en: 'Mobile Phones',
    all_images: ['https://storage.googleapis.com/sku_markets_noon/N39265265A-4407.jpg'],
    sku_marketplace: 'noon/ksa',
    quantity: 12,
  },
  {
    id: '3',
    sku: 'N392665A',
    brand_en: 'le',
    category_en: 'Mobile P',
    all_images: ['https://storage.googleapis.com/sku_markets_noon/N39265265A-4407.jpg'],
    sku_marketplace: 'noon/ksa',
    quantity: 12,
  },
  {
    id: '4',
    sku: 'N392665A',
    brand_en: 'le',
    category_en: 'Mobile P',
    all_images: ['https://storage.googleapis.com/sku_markets_noon/N39265265A-4407.jpg'],
    sku_marketplace: 'noon/ksa',
    quantity: 12,
  },
  {
    id: '5',
    sku: 'N392665A',
    brand_en: 'le',
    category_en: 'Mobile P',
    all_images: ['https://storage.googleapis.com/sku_markets_noon/N39265265A-4407.jpg'],
    sku_marketplace: 'noon/ksa',
    quantity: 12,
  },
];
export const shipmentPendingDataRow = [
  {
    id: '1',
    sku: 'N39265265A',
    partner_code: '5010415232380',
    brand_en: 'Apple',
    category_en: 'Mobile Phones',
    all_images: ['https://storage.googleapis.com/sku_markets_noon/N39265265A-4407.jpg'],
    sku_marketplace: 'noon/ksa',
    quantity: 12,
  },
  {
    id: '2',
    sku: 'N39265265A',
    partner_code: '5010415232380',
    brand_en: 'Apple',
    category_en: 'Mobile Phones',
    all_images: ['https://storage.googleapis.com/sku_markets_noon/N39265265A-4407.jpg'],
    sku_marketplace: 'noon/ksa',
    quantity: 12,
  },
  {
    id: '3',
    sku: 'N39265265A',
    partner_code: '5010415232380',
    brand_en: 'Apple',
    category_en: 'Mobile Phones',
    all_images: ['https://storage.googleapis.com/sku_markets_noon/N39265265A-4407.jpg'],
    sku_marketplace: 'noon/ksa',
    quantity: 12,
  },
  {
    id: '4',
    sku: 'N39265265A',
    partner_code: '5010415232380',
    brand_en: 'Apple',
    category_en: 'Mobile Phones',
    all_images: ['https://storage.googleapis.com/sku_markets_noon/N39265265A-4407.jpg'],
    sku_marketplace: 'noon/ksa',
    quantity: 12,
  },
  {
    id: '5',
    sku: 'N39265265A',
    partner_code: '5010415232380',
    brand_en: 'Apple',
    category_en: 'Mobile Phones',
    all_images: ['https://storage.googleapis.com/sku_markets_noon/N39265265A-4407.jpg'],
    sku_marketplace: 'noon/ksa',
    quantity: 12,
  },
];
