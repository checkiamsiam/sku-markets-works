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
    field: 'stockInbound',
    headerName: 'Stock- In/ Inbound',
    align: 'center',
    headerAlign: 'center',
    width: 150,
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'TCrcvd',
    headerName: 'Total Cost Received',
    type: 'number',
    align: 'center',
    headerAlign: 'center',
    width: 160,
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'currUnt',
    headerName: 'Current Unit Cost',
    type: 'number',
    align: 'center',
    headerAlign: 'center',
    width: 160,
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'AvgCOT',
    headerName: 'Average Cost Over Time',
    type: 'number',
    align: 'center',
    headerAlign: 'center',
    width: 200,
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
    field: 'sohEst',
    type: 'number',
    headerName: 'SOH Estimated Value',
    align: 'center',
    headerAlign: 'center',
    width: 150,
    headerClassName: 'super-app-theme--header',
  },
  
  {
    field: 'rtv',
    headerName: 'RTV',
    align: 'center',
    headerAlign: 'center',
    width: 85,
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'rtvEst',
    headerName: 'RTV Estimated Value',
    align: 'center',
    headerAlign: 'center',
    width: 170,
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'rtvP',
    headerName: 'RTV %',
    align: 'center',
    headerAlign: 'center',
    width: 170,
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'stockRjct',
    headerName: 'Stock- In/Rejected',
    type: 'number',
    align: 'center',
    headerAlign: 'center',
    width: 150,
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'rjctEst',
    headerName: 'Rejected Estimated Value',
    type: 'number',
    align: 'center',
    headerAlign: 'center',
    width: 100,
    headerClassName: 'super-app-theme--header',
  }
];
InventoryDetaisGrid.propTypes = {
  data: PropTypes.array,
};

export default function InventoryDetaisGrid({ data }) {
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
