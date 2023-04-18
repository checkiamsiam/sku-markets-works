import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { Box, Grid } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';

const columns = [
  // OPTIONS
  // https://mui.com/x/api/data-grid/grid-col-def/#main-content
  // - hide: false (default)
  // - editable: false (default)
  // - filterable: true (default)
  // - sortable: true (default)
  // - disableColumnMenu: false (default)

  // FIELD TYPES
  // --------------------
  // 'string' (default)
  // 'number'
  // 'date'
  // 'dateTime'
  // 'boolean'
  // 'singleSelect'

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
    width: 120,
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'stores',
    type: 'number',
    headerName: 'Stores',
    align: 'center',
    headerAlign: 'center',
    width: 70,
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'rate',
    type: 'number',
    headerName: 'Rate',
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
    width: 100,
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'fullfilment',
    type: 'number',
    headerName: 'Fullfilment Type',
    align: 'center',
    headerAlign: 'center',
    width: 130,
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'status',
    type: 'number',
    headerName: 'SKU Status',
    align: 'center',
    headerAlign: 'center',
    width: 100,
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'buybox',
    type: 'number',
    headerName: 'Buybox Sale Price',
    align: 'center',
    headerAlign: 'center',
    width: 170,
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
    field: 'mxPrice',
    type: 'number',
    headerName: 'Max Offer Price',
    align: 'center',
    headerAlign: 'center',
    width: 150,
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'minPrice',
    type: 'number',
    headerName: 'Min Offer Price',
    align: 'center',
    headerAlign: 'center',
    width: 150,
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'eof',
    type: 'number',
    headerName: 'E Opp To Fullfilment',
    align: 'center',
    headerAlign: 'center',
    width: 170,
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'eos',
    headerName: 'E Opp To Stock',
    align: 'center',
    headerAlign: 'center',
    width: 150,
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'tradeV',
    type: 'number',
    headerName: 'Trade Volume',
    align: 'center',
    headerAlign: 'center',
    width: 120,
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'tags',
    headerName: 'Tags',
    align: 'center',
    headerAlign: 'center',
    width: 80,
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'asp',
    type: 'number',
    headerName: 'ASP',
    align: 'center',
    headerAlign: 'center',
    width: 60,
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'mCap',
    type: 'number',
    headerName: 'Vol (24h) / MCap',
    align: 'center',
    headerAlign: 'center',
    width: 130,
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'eSOH',
    type: 'number',
    headerName: 'Estimated SOH',
    align: 'center',
    headerAlign: 'center',
    width: 120,
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'doh',
    type: 'number',
    headerName: 'DOH',
    align: 'center',
    headerAlign: 'center',
    width: 60,
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'enr',
    type: 'number',
    headerName: 'ENR',
    align: 'center',
    headerAlign: 'center',
    width: 60,
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'maxInv',
    type: 'number',
    headerName: 'Max Investment',
    align: 'center',
    headerAlign: 'center',
    width: 120,
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'minInv',
    type: 'number',
    headerName: 'Min Investment',
    align: 'center',
    headerAlign: 'center',
    width: 120,
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'eqti',
    type: 'number',
    headerName: 'EQTI',
    align: 'center',
    headerAlign: 'center',
    width: 60,
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
  {
    field: 'esu',
    type: 'number',
    headerName: 'Sales volume L 24 H',
    align: 'center',
    headerAlign: 'center',
    width: 170,
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'emc',
    type: 'number',
    headerName: 'E Marketplace cap',
    align: 'center',
    headerAlign: 'center',
    width: 150,
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'eoaf',
    type: 'number',
    headerName: 'E Opp to Amazon Fulfillment',
    align: 'center',
    headerAlign: 'center',
    width: 210,
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'eonf',
    type: 'number',
    headerName: 'E Opp to Noon Fulfilment	',
    align: 'center',
    headerAlign: 'center',
    width: 180,
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'demand',
    type: 'number',
    headerName: 'Demand',
    align: 'center',
    headerAlign: 'center',
    width: 80,
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'supply',
    type: 'number',
    headerName: 'Supply',
    align: 'center',
    headerAlign: 'center',
    width: 80,
    headerClassName: 'super-app-theme--header',
  },
];
StoreSKUData.propTypes = {
  data: PropTypes.array,
};

export default function StoreSKUData({ data }) {
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
