import { Link } from '@mui/material';

export const columns = [
  {
    field: 'type',
    headerName: 'Import Type',
    width: 200,
    sortable: false,
    filterable: true,
    disableColumnMenu: true,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'subType',
    headerName: 'Import Sub-Type',
    width: 200,
    sortable: false,
    filterable: true,
    disableColumnMenu: true,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'at',
    headerName: 'Imported At',
    width: 200,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'by',
    headerName: 'Imported By',
    width: 240,
    sortable: false,
    filterable: true,
    disableColumnMenu: true,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'status',
    headerName: 'Imported Status',
    width: 180,
    sortable: false,
    filterable: true,
    disableColumnMenu: true,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'file',
    headerName: 'Original File Uploaded',
    width: 200,
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
  },
  {
    field: 'comment',
    headerName: 'Comment',
    width: 250,
    sortable: false,
    filterable: true,
    disableColumnMenu: true,
    align: 'center',
    headerAlign: 'center',
  },
];
