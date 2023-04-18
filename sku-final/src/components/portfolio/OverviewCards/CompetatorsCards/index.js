import { Box, Card, Grid, TablePagination } from '@mui/material';
import { useState } from 'react';
import SKUCard from './SKUCards';


const CompetatorsCards = ({collapsible}) => {
  // handle pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };
  return (
    <Box>
      <Grid container spacing={2} sx={{ mb: 5 }}>
        {[...Array(rowsPerPage * 3).keys()].map((p , i) => (
          <Grid key={i} item xs={12} md={6} lg={collapsible ? 4 : 3}>
            <SKUCard />
          </Grid>
        ))}
      </Grid>
      <Grid item xs={12}>
        <TablePagination
          component="div"
          count={50}
          rowsPerPageOptions={[4, 8, 16]}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Grid>
    </Box>
  );
};

export default CompetatorsCards;
