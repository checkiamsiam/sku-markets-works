import { Link } from '@mui/material';

export const columns = [
  {
    field: 'type',
    headerName: 'Export Type',
    width: 240,
    sortable: false,
    filterable: true,
    disableColumnMenu: true,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'subType',
    headerName: 'Export Sub-Type',
    width: 240,
    sortable: false,
    filterable: true,
    disableColumnMenu: true,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'at',
    headerName: 'Exported At',
    width: 240,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'by',
    headerName: 'Exported By',
    width: 250,
    sortable: false,
    filterable: true,
    disableColumnMenu: true,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'status',
    headerName: 'Export Status',
    width: 240,
    sortable: false,
    filterable: true,
    disableColumnMenu: true,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'file',
    headerName: 'Original File Uploaded',
    width: 240,
    sortable: false,
    renderCell: () =>  {
      return (
        <Link href="#" underline="none" sx={{ fontSize: '14px' }}>
          Link
        </Link>
      );
    },
    filterable: true,
    disableColumnMenu: true,
    align: 'center',
    headerAlign: 'center',
  }
];
