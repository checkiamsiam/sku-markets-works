import { Typography } from '@mui/material';
import { Container } from '@mui/system';
import SKUMarquee from 'components/common/marquee';
import InventoryDetailsTable from 'components/inventory/inventoryDetailsTable/InventoryDetailsTable';
import InventoryStock from 'components/inventory/inventoryStock/InventoryStock';
import InventoryTab from 'components/inventory/InventoryTab';
import NoonDetailsGrid from 'components/inventory/NoonDetailsGrid';
import { useSettingsContext } from 'components/settings';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';

const Inventory = () => {
  const { themeStretch } = useSettingsContext();
  const [inventoryTab, setInventoryTab] = useState('noon');
  return (
    <>
      <Helmet>
        <title> Inventory Dashboard | SKU Markets</title>
      </Helmet>
      <SKUMarquee />
      <Container sx={{ marginTop: '30px' }} maxWidth={themeStretch ? false : 'xl'}>
        <Typography sx={{ my: 3 }}>Inventory Dashboard</Typography>
        <InventoryTab setInventoryTab={setInventoryTab} />
        {inventoryTab === 'noon' && (
          <>
            <NoonDetailsGrid />
            <InventoryDetailsTable />
            <InventoryStock />
          </>
        )}
      </Container>
    </>
  );
};

export default Inventory;
