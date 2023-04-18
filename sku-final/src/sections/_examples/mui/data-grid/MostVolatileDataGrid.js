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
    width: 180,
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
    width: 100,
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'buybox',
    type: 'number',
    headerName: 'Buybox Sale Price',
    align: 'center',
    headerAlign: 'center',
    width: 135,
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'chg',
    type: 'number',
    headerName: 'Chg 24H',
    align: 'center',
    headerAlign: 'center',
    width: 80,
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'max',
    type: 'number',
    headerName: 'Max Offer Price',
    align: 'center',
    headerAlign: 'center',
    width: 140,
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'min',
    type: 'number',
    headerName: 'Min Offer Price',
    align: 'center',
    headerAlign: 'center',
    width: 140,
    headerClassName: 'super-app-theme--header',
  },
];
MostVolatileDataGrid.propTypes = {
  data: PropTypes.array,
};

export default function MostVolatileDataGrid({ data }) {
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
