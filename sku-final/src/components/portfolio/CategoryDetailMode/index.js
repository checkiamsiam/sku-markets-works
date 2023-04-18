import WestIcon from '@mui/icons-material/West';
import { CardHeader, Grid, Stack, TablePagination, Typography, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import LoadingScreen from 'components/loading-screen/LoadingScreen';
import { useAnalyticsByCategoryQuery } from 'features/category/categoryAPI';
import { toggleIsCategoryDetailMode } from 'features/portfolio/portfolioSlice';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BelowCard from './BelowCard';
import CategoryDetailModeCard from './CardInDetailBrand';
import TopCard from './TopCard';

const CaterogyDetailMode = ({ collapsible }) => {
  const { targetCategoryForDetailView } = useSelector((state) => state.portfolios);
  const { data, isLoading } = useAnalyticsByCategoryQuery(targetCategoryForDetailView);
  const theme = useTheme();
  const dispatch = useDispatch();
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

  const handleModeChange = () => {
    dispatch(toggleIsCategoryDetailMode())
  }

  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <Box sx={{ mt: '-10px' }}>
      <Box width="100px">
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={0.8}
          onClick={handleModeChange }
          variant="contained"
          sx={{
            py: '5px',
            fontSize: '15px',
            backgroundColor: theme.palette.mode === 'dark' ? '#212B36' : '#EFF2F5',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          <WestIcon sx={{ fontSize: '15px' }} />
          <Typography sx={{ fontSize: '16px' }}>Back</Typography>
        </Stack>
      </Box>
      <TopCard data={data} collapsible={collapsible} />
      <BelowCard data={data} />
      <CardHeader title="Categories' Store Brands" sx={{ mb: 2 }} />
      <Grid container spacing={2} sx={{ mb: 5 }}>
        {[...Array(rowsPerPage * 3).keys()].map((p , i) => (
          <Grid key={i} item xs={12} md={6} lg={collapsible ? 4 : 3}>
            <CategoryDetailModeCard />
          </Grid>
        ))}
      </Grid>
      <Grid container>
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
      </Grid>
    </Box>
  );
};

export default CaterogyDetailMode;
