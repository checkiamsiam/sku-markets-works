import { Container, Stack, Typography } from '@mui/material';
import SKUMarquee from 'components/common/marquee';
// import Buy from 'components/sellerboard/Buy';
import Sell from 'components/sellerboard/Sell';
import TabsStyled from 'components/sellerboard/TabsStyled';
import { useSettingsContext } from 'components/settings';
import SvgColor from 'components/svg-color/SvgColor';
import { useGetSellerBoardFlowSetupQuery } from 'features/sellerBoardFlowSetup/sellerBoardFlowSetupAPI';
import { useState } from 'react';

const Sellerboard = () => {
  const { themeStretch } = useSettingsContext();
  // top tab
  const [sellTab, setSellTab] = useState('rfq');
  // const {state}=useLocation();
  // console.log("seller id====>",state);
  
  useGetSellerBoardFlowSetupQuery()

  return (
    <>
      <SKUMarquee />
      <Container maxWidth={themeStretch ? false : 'xl'}>
      <Stack direction="row" justifyContent="space-between" sx={{ my: 3 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <SvgColor
              src="/assets/icons/navbar/ic_sell.svg"
              sx={{ width: '25px', height: '25px' }}
            />
           <Typography>Sellerboard</Typography>
          </Stack>

        </Stack>
        
        <Sell sellTab={sellTab} />
        {/* <Buy/> */}
        {/* <SearchSortFilter /> */}
        <TabsStyled sellTab={sellTab} setSellTab={setSellTab} />
      </Container>
    </>
  );
};

export default Sellerboard;
