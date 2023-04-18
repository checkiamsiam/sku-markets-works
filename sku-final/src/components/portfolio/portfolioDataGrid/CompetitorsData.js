import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';

const columns = [
  {
    field: 'id',
    hide: true,
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'stores',
    headerName: 'Store Name',
    align: 'center',
    headerAlign: 'center',
    width: 115,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    renderCell: (params) => (<Link style={{ textDecoration: 'none', color: 'GrayText' }} to="/brand">
    {params.row?.stores}
  </Link>),
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'rate',
    type: 'number',
    headerName: 'Store Rate',
    align: 'center',
    headerAlign: 'center',
    width: 105,
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'skus',
    type: 'number',
    headerName: 'No of SKUs',
    align: 'center',
    headerAlign: 'center',
    width: 105,
    headerClassName: 'super-app-theme--header',
  },
  
  {
    field: 'soh',
    type: 'number',
    headerName: 'SOH',
    align: 'center',
    headerAlign: 'center',
    width: 70,
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'sp',
    headerName: 'Selection Percentage',
    align: 'center',
    headerAlign: 'center',
    width: 170,
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'health',
    type: 'number',
    headerName: 'Health Status',
    align: 'center',
    headerAlign: 'center',
    width: 110,
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'evalue',
    type: 'number',
    headerName: 'Estimated Value',
    align: 'center',
    headerAlign: 'center',
    width: 150,
    headerClassName: 'super-app-theme--header',
  },
  
];
CompetitorsData.propTypes = {
  data: PropTypes.array,
};

export default function CompetitorsData({ data }) {
  const [pageSize, setPageSize] = useState(5);

  return (
    <DataGrid
      sx={{
        '& .super-app-theme--header': {
          backgroundColor: '#0D6EFD',
          color: 'white',
        },
      }}
      checkboxSelection
      disableSelectionOnClick
      rows={data}
      columns={columns}
      pageSize={pageSize}
      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
      rowsPerPageOptions={[5, 10, 25]}
      pagination
      disableDensitySelector={true}
      components={{
        Toolbar: GridToolbar,
      }}
    />
  );
}
