import { styled } from '@mui/system';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled';
import { Box } from '@mui/material';

const blue = {
  50: '#F0F7FF',
  100: '#C2E0FF',
  200: '#80BFFF',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B2',
  800: '#004C99',
  900: '#003A75',
};

const grey = {
  50: '#f6f8fa',
  100: '#eaeef2',
  200: '#d0d7de',
  300: '#afb8c1',
  400: '#8c959f',
  500: '#6e7781',
  600: '#57606a',
  700: '#424a53',
  800: '#32383f',
  900: '#24292f',
};

const Tab = styled(TabUnstyled)`
  //   font-family: IBM Plex Sans, sans-serif;
  color: #fff;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 600;
  background-color: transparent;
  width: 100%;
  height: 100%;
  padding: 10px 12px;
  margin: 6px 6px;
  border: none;
  border-radius: 7px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: ${blue[400]};
  }

  /* &:focus {
        color: #fff;
        outline: 3px solid ${blue[200]};
      } */

  &.${tabUnstyledClasses.selected} {
    background-color: #fff;
    color: ${blue[600]};
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabsList = styled(TabsListUnstyled)(
  ({ theme }) => `
      min-width: 380px;
      background-color: ${blue[500]};
      border-radius: 12px;
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      align-content: space-between;
      box-shadow: 0px 4px 30px ${theme.palette.mode === 'dark' ? grey[900] : grey[200]};
      `
);

const TABS=[
    {id:1, tab:'Dashboard', label:'dashboard'},
    {id:2, tab:'Opportunities', label:'opportunities'},
    {id:3, tab:'Competitors', label:'competitors'},
    {id:4, tab:'SKUs Status', label:'skus_status'},
    {id:5, tab:'Categories & Brands Growths', label:'categories_brands_growths'},
]

const PortfolioTabs = ({ setPortfolioTab }) => {
  return (
    <>
      <Box sx={{mb:5}}>
        <TabsUnstyled defaultValue={0}>
          <TabsList>
            {TABS.map((tab)=>
                <Tab key={tab.id} onClick={() => setPortfolioTab(tab.label)}>{tab.tab}</Tab>
            )}
          </TabsList>
        </TabsUnstyled>
      </Box>
    </>
  );
};

export default PortfolioTabs;
