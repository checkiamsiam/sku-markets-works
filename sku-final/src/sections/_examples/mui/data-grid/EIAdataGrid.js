import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { Box, Grid } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';

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
    width: 200,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    renderCell: (params) => (
      <Box sx={{ width: '100%' }}>
        <Grid container spacing={2}>
          <Grid
            item
            lg={4}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <img src={params.row?.sku.img} alt="product img" width="50" height="50" />
          </Grid>
          <Grid item lg={8}>
            <div
              style={{
                fontSize: '12px',
                lineHeight: '5px',
                color: 'text.main',
              }}
            >
              <p style={{ fontWeight: '600' }}>
                <Link style={{ textDecoration: 'none', color: '#0d6efd' }} to={`product`}>
                  {params.row?.sku.skuN}
                </Link>
              </p>
              <p>
                <Link style={{ textDecoration: 'none', color: 'text.main' }} to="/category">
                  {params.row?.sku.ctgry}
                </Link>
              </p>
              <p>
                <Link style={{ textDecoration: 'none', color: 'GrayText' }} to="/brand">
                  {params.row?.sku.brand}
                </Link>
              </p>
            </div>
          </Grid>
        </Grid>
      </Box>
    ),
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'marketplace',
    headerName: 'Marketplace',
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => <img width="40" src={params.row.marketplace} alt="marketplace" />,
    width: 110,
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'maxIn',
    type: 'number',
    headerName: 'Max Investment',
    align: 'center',
    headerAlign: 'center',
    width: 130,
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'minIn',
    type: 'number',
    headerName: 'Min Investment',
    align: 'center',
    headerAlign: 'center',
    width: 130,
    headerClassName: 'super-app-theme--header',
  }, 
  {
    field: 'enr',
    type: 'number',
    headerName: 'ENR',
    align: 'center',
    headerAlign: 'center',
    width: 50,
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'doh',
    headerName: 'DOH',
    align: 'center',
    headerAlign: 'center',
    width: 85,
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'eqti',
    headerName: 'EQTI',
    align: 'center',
    headerAlign: 'center',
    width: 85,
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'em',
    type: 'number',
    headerName: 'EM',
    align: 'center',
    headerAlign: 'center',
    width: 50,
    headerClassName: 'super-app-theme--header',
  },
];
EIAdataGrid.propTypes = {
  data: PropTypes.array,
};

export default function EIAdataGrid({ data }) {
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
