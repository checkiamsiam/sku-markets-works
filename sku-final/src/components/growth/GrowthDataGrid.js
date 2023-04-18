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
    field: 'status',
    headerName: 'SKU Status',
    align: 'center',
    headerAlign: 'center',
    width: 100,
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
    field: 'rank',
    type: 'number',
    headerName: 'Rank',
    align: 'center',
    headerAlign: 'center',
    width: 50,
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'slp',
    headerName: 'SLP GVs',
    type: 'number',
    align: 'center',
    headerAlign: 'center',
    width: 100,
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'ucr',
    headerName: 'UCR %',
    align: 'center',
    headerAlign: 'center',
    width: 85,
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'clp',
    headerName: 'CLP GVs',
    type: 'number',
    align: 'center',
    headerAlign: 'center',
    width: 100,
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'lpGvs',
    headerName: 'LP GVs Contribution',
    type: 'number',
    align: 'center',
    headerAlign: 'center',
    width: 150,
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'revenue',
    headerName: 'Revenue',
    type: 'number',
    align: 'center',
    headerAlign: 'center',
    width: 80,
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'reContribution',
    headerName: 'Reveneue Contribution %',
    type: 'number',
    align: 'center',
    headerAlign: 'center',
    width: 200,
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'units',
    type: 'number',
    headerName: 'Units',
    align: 'center',
    headerAlign: 'center',
    width: 55,
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'asp',
    type: 'number',
    headerName: 'ASP',
    align: 'center',
    headerAlign: 'center',
    width: 50,
    headerClassName: 'super-app-theme--header',
  },
];
GrowthDataGrid.propTypes = {
  data: PropTypes.array,
};

export default function GrowthDataGrid({ data }) {
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
