import { Box, Card } from '@mui/material';
import AnimatedGradiantText from 'components/common/AnimatedGradiantText';
import PartnerStoreSlider from 'components/PartnersStore/PartnersStore/PartnerStoreSlider';

const SkuCategoryB3 = () => {
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
            <AnimatedGradiantText>Sponsored Brands</AnimatedGradiantText>
          </Box>
        </Box>
        <PartnerStoreSlider userDummy={productDummyData} topSkuCard="topSkuCard" ctgry="ctgry" />
      </Card>
    </>
  );
};

export default SkuCategoryB3;
