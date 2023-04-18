import { Typography } from '@mui/material';
import SKUMarquee from 'components/common/marquee';

const NewChartPage = () => {
  return (
    <>
      <SKUMarquee />
      <Typography sx={{ m: 3 }}>Chat</Typography>
      <div>
        <h1>Chart</h1>
        <p>Mostofa you can write you code from here.</p>
      </div>
    </>
  );
};

export default NewChartPage;
