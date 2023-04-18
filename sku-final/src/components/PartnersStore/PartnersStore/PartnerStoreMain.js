import { Box, Card, Typography } from '@mui/material';
import AnimatedGradiantText from 'components/common/AnimatedGradiantText';
import '../../../components/SkuMarket/SkuMarketStyle.css';
import PartnerStoreSlider from './PartnerStoreSlider';

const PartnerStoreMain = () => {
  const productDummyData = [1, 2, 3, 4, 5, 6];

  return (
    <>
      <Card sx={{ p: 2, my: 2 }}>
        <Box
          sx={{
            borderBottom: '2px solid #f9f9f9',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            pb: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AnimatedGradiantText>Sponsored Partner Stores</AnimatedGradiantText>
          </Box>
        </Box>
        <PartnerStoreSlider userDummy={productDummyData} />
      </Card>
    </>
  );
};

export default PartnerStoreMain;
