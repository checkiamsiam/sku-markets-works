import { CardHeader, Stack } from '@mui/material';
import { useState } from 'react';

const Header = () => {
  const [searchSKUs, setSearchSKUs] = useState('');

  const [searchResults, setSearchResults] = useState([]);
  return (
    <Stack
      spacing={2}
      direction={{ xs: 'column', sm: 'row' }}
      alignItems={{ sm: 'center' }}
      justifyContent="space-between"
      sx={{ px: 5 }}
    >
      <CardHeader
        title="Marketplace Insights, Analytics & Statistics (Top Ranked)"
        sx={{ mb: 2 }}
      />
    </Stack>
  );
};

export default Header;
