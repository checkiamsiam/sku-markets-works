import { Box } from '@mui/material';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

const FinanceRootTab = ({ setTabs, TABS, tab, setActiveTab }) => {
  const handleChange = (e, n) => {
    setTabs(n);
    setActiveTab('Overview');
  };
  return (
    <Box sx={{ mb: 3, mt: '-25px', padding: '0px 20px' }}>
      <Tabs value={tab} onChange={handleChange}>
        {TABS.map((tab) => (
          <Tab key={tab.id} label={tab.tab} value={tab.label} />
        ))}
      </Tabs>
    </Box>
  );
};

export default FinanceRootTab;
