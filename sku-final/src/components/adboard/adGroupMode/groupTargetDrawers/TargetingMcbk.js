import { Card, Divider, Tab, Tabs, Typography } from '@mui/material';
import { useState } from 'react';
import CategoryTar from './CategoryTar';
import MarketplaceTar from './MarketplaceTar';
import BrandTar from './BrandTar';
import KeywordTar from './KeywordTar';

const TABS = [
  { id: 1, tab: 'Marketplaces', label: 'Marketplaces' },
  { id: 2, tab: 'Categories', label: 'Categories' },
  { id: 3, tab: 'Brands', label: 'Brands' },
  { id: 4, tab: 'Keywords', label: 'Keywords' },
];

const TargetingMcbk = () => {
  const [tab, setTab] = useState('Marketplaces');
  return (
    <Card sx={{ p: 2 }}>
      <Typography variant="subtitle1" sx={{ px: 1, fontSize: '14px', mb: '5px' }}>
        Targeting
      </Typography>
      <Typography variant="subtitle2" sx={{ px: 1, fontSize: '12px' }}>
        Select Targets
      </Typography>

      <Card sx={{ p: 2 }}>
        <Tabs value={tab} onChange={(e, n) => setTab(n)}>
          {TABS.map((tab) => (
            <Tab key={tab.id} label={tab.tab} value={tab.label} />
          ))}
        </Tabs>
        <Divider />
        {tab === 'Marketplaces' && <MarketplaceTar />}
        {tab === 'Categories' && <CategoryTar />}
        {tab === 'Brands' && <BrandTar />}
        {tab === 'Keywords' && <KeywordTar />}
      </Card>
    </Card>
  );
};

export default TargetingMcbk;
