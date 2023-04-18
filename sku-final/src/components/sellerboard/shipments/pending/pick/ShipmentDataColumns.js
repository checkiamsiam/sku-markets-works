import { Typography } from '@mui/material';
import QntCell from './QntCell';
import SkuColumnForModal from './SkuColumnForModal';

export const ShipmentDataColumns = ({ sku, qty }) => {
  const shipmentDataColumns = [
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
          SKU <br /> {sku}
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
          QTY <br /> {qty}
        </Typography>
      ),
      align: 'center',
      headerAlign: 'center',
      width: 170,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: ({ row }) => <QntCell quantity={row.quantity} orderId={row?.orderId} />,
      headerClassName: 'super-app-theme--header',
    },
  ];

  return shipmentDataColumns;
};

export default ShipmentDataColumns;
