import { Box, Grid } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import { useState } from 'react';
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
                                color: 'gray',
                            }}
                        >
                            <p style={{ fontWeight: '600' }}>
                                <Link
                                    style={{ textDecoration: 'none', color: '#0d6efd' }}
                                    to={`product`}
                                >
                                    {params.row?.sku.skuN}
                                </Link>
                            </p>
                            <p>
                                <Link
                                    style={{ textDecoration: 'none', color: 'gray' }}
                                    to="/category"
                                >
                                    {params.row?.sku.ctgry}
                                </Link>
                            </p>
                            <p>
                                <Link
                                    style={{ textDecoration: 'none', color: 'GrayText' }}
                                    to="/brand"
                                >
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
        field: 'currUnt',
        headerName: 'Current Unit Cost',
        type: 'number',
        align: 'center',
        headerAlign: 'center',
        width: 130,
        headerClassName: 'super-app-theme--header',
    },
    {
        field: 'brkCost',
        headerName: 'Breakeven Cost',
        type: 'number',
        align: 'center',
        headerAlign: 'center',
        width: 120,
        headerClassName: 'super-app-theme--header',
    },
    {
        field: 'sale15',
        headerName: 'Unit Sale Price 15%',
        type: 'number',
        align: 'center',
        headerAlign: 'center',
        width: 150,
        headerClassName: 'super-app-theme--header',
    },
    {
        field: 'sale30',
        headerName: 'Unit Sale Price 30%',
        type: 'number',
        align: 'center',
        headerAlign: 'center',
        width: 150,
        headerClassName: 'super-app-theme--header',
    },

    {
        field: 'bSeller',
        type: 'number',
        headerName: 'BuyBox Seller',
        align: 'center',
        headerAlign: 'center',
        width: 110,
        headerClassName: 'super-app-theme--header',
    },
    {
        field: 'bPrice',
        type: 'number',
        headerName: 'BuyBox Price',
        align: 'center',
        headerAlign: 'center',
        width: 110,
        headerClassName: 'super-app-theme--header',
    },

    {
        field: 'skuType',
        headerName: 'SKU Type',
        align: 'center',
        headerAlign: 'center',
        width: 85,
        headerClassName: 'super-app-theme--header',
    },
    {
        field: 'newPrice',
        headerName: 'New Price',
        align: 'center',
        headerAlign: 'center',
        width: 90,
        headerClassName: 'super-app-theme--header',
    },
    {
        field: 'bSkus',
        headerName: 'Is Our Buybox SKUs',
        align: 'center',
        headerAlign: 'center',
        width: 150,
        headerClassName: 'super-app-theme--header',
    },
    {
        field: 'eSkus',
        headerName: 'Express SKUs',
        type: 'number',
        align: 'center',
        headerAlign: 'center',
        width: 110,
        headerClassName: 'super-app-theme--header',
    },
    {
        field: 'mSkus',
        headerName: 'Market SKUs',
        type: 'number',
        align: 'center',
        headerAlign: 'center',
        width: 110,
        headerClassName: 'super-app-theme--header',
    },
];
PricesBuilderGrid.propTypes = {
    data: PropTypes.array,
};

export default function PricesBuilderGrid({ data }) {
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
