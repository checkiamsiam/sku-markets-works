import { Divider, IconButton, Stack } from '@mui/material';
import Iconify from 'components/iconify/Iconify';

const CompaniesDrawer = ({ toggleDrawer }) => {
  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ pl: 2, pr: 1, py: 2 }}
      >
        {/* <Typography variant="subtitle1">Add Partner Store</Typography> */}

        <IconButton onClick={toggleDrawer}>
          <Iconify icon="eva:close-fill" />
        </IconButton>
      </Stack>

      <Divider />
    </>
  );
};

export default CompaniesDrawer;
