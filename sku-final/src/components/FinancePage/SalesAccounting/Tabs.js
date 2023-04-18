import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Card, Divider, Stack, Typography, useTheme } from '@mui/material';

const TABS = [
  {
    label: 'Overview',
    value: 'Overview',
    id: 1,
  },
  {
    label: 'Documents',
    value: 'Documents',
    id: 2,
  },
  {
    label: 'Promotions',
    value: 'Promotions',
    id: 3,
  },
  {
    label: 'Billing Transfers',
    value: 'Billing Transfers',
    id: 4,
  },
  {
    label: 'Settings',
    value: 'Settings',
    id: 5,
  },
];

const TabsControl = ({ activeTab, setActiveTab, setCollapsible, collapsible }) => {
  const theme = useTheme();
  return (
    <>
      <Stack sx={{ mb: 3, position: 'relative' }}>
        <Divider />
        <Stack
          onClick={() => setCollapsible(!collapsible)}
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{
            cursor: 'pointer',
            padding: '2px',
            backgroundColor: theme.palette.mode === 'dark' ? '#212B36' : '#EFF2F5',
            position: 'absolute',
            borderRadius: '5px',
            top: '-11px',
            right: '10px',
          }}
        >
          {collapsible ? <KeyboardArrowLeftIcon /> : <KeyboardArrowRightIcon />}
        </Stack>
      </Stack>

      {collapsible && (
        <Card sx={{ padding: '10px 10px 10px 0px', minHeight: '60vh' }}>
          {TABS.map((tab) => (
            <>
              <Typography
                key={tab.id}
                onClick={() => setActiveTab(tab.value)}
                fontSize="14px"
                sx={{
                  cursor: 'pointer',
                  py: 1,
                  px: 1,
                  borderLeft:
                    activeTab === tab.value ? `3px solid ${'#2065D1'}` : '3px solid transparent',
                  ':hover': {
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'dark' ? '#1F262E' : '#F6F7F8',
                  },
                }}
              >
                {tab.label}
              </Typography>
              {tab.value === 'Documents' && <Divider sx={{ mb: 2 }} />}
            </>
          ))}
        </Card>
      )}
    </>
  );
};

export default TabsControl;
