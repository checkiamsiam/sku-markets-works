import { Box } from '@mui/system';
import Footer from 'components/home/Footer';
import Header from 'layouts/main/Header';
import { Outlet } from 'react-router';

const index = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 1 }}>
      <Header />

      <Box component="main">
        <Outlet />
      </Box>
      <Footer/>
    </Box>
  );
};

export default index;
