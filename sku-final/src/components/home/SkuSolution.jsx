import Grid from '@mui/material/Grid/Grid';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/system';
import fee from '../../assets/images/fee.png';
import Growth from '../../assets/images/growth-icon.png';
import lowPrice from '../../assets/images/low-price.png';
import privacy from '../../assets/images/privacy.png';
import scale from '../../assets/images/scale.png';
import security from '../../assets/images/security.png';

const SkuSolution = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ marginY: '40px', textAlign: 'center' }} component="h4">
        Why SKU Markets Solution
      </Typography>
      <Grid container spacing={2}>
        <Grid item lg={6}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div>
              <img
                src={Growth}
                alt=""
                style={{ marginLeft: '10px', marginRight: '50px' }}
                width={35}
                height={35}
              />
            </div>
            <div>
              <h4 style={{ marginTop: '0', marginBottom: '5px', color: 'text.main' }}>
                {' '}
                Increase Sales & Revenue
              </h4>
              <p style={{ marginTop: '0', textAlign: 'justify' }}>
                Save 90% of the time searching for offers in the MarketPlaces to check for new
                opportunities to expand your selection, preparing your new SKUs 10X of your
                competitors to achieve high sales by also notifying your whatsApp on prices and
                stock changing as of today.
              </p>
            </div>
          </div>
        </Grid>
        <Grid item lg={6}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div>
              <img
                src={lowPrice}
                alt=""
                style={{ marginLeft: '10px', marginRight: '50px' }}
                width={35}
                height={35}
              />
            </div>
            <div>
              <h4 style={{ marginTop: '0', marginBottom: '5px', color: 'text.main' }}>
                {' '}
                Reduce Operational Costs
              </h4>
              <p style={{ marginTop: '0', textAlign: 'justify' }}>
                The job could be completed at the lower operational cost by showing you which SKUs
                has the opportunities without wasting your employees time and they can work more
                efficiently and productivity by just looking to the good sources!
              </p>
            </div>
          </div>
        </Grid>
        <Grid item lg={6}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div>
              <img
                src={scale}
                alt=""
                style={{ marginLeft: '10px', marginRight: '50px' }}
                width={35}
                height={35}
              />
            </div>
            <div>
              <h4 style={{ marginTop: '0', marginBottom: '5px', color: 'text.main' }}>
                {' '}
                Scale Your Business
              </h4>
              <p style={{ marginTop: '0', textAlign: 'justify' }}>
                The SKU Markets system helps you to scale your business by expanding your selection
                easily as we already can analyse the top selling and trending SKUs as we also
                hunting any potential SKUs to grab it to you easily!
              </p>
            </div>
          </div>
        </Grid>
        <Grid item lg={6}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div>
              <img
                src={security}
                alt=""
                style={{ marginLeft: '10px', marginRight: '50px' }}
                width={35}
                height={35}
              />
            </div>
            <div>
              <h4 style={{ marginTop: '0', marginBottom: '5px', color: 'text.main' }}>
                {' '}
                Enhanced security standards
              </h4>
              <p style={{ marginTop: '0', textAlign: 'justify' }}>
                SKU Markets has done all necessary steps to secure users access keys and credentials
                data by applying enterprise-grade security standards.
              </p>
            </div>
          </div>
        </Grid>
        <Grid item lg={6}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div>
              <img
                src={fee}
                alt=""
                style={{ marginLeft: '10px', marginRight: '50px' }}
                width={35}
                height={35}
              />
            </div>
            <div>
              <h4 style={{ marginTop: '0', marginBottom: '5px', color: 'text.main' }}>
                Also it's SKU markets!
              </h4>
              <p style={{ marginTop: '0', textAlign: 'justify' }}>
                It's not just a place where you can manage your sales channels, it's also a selling
                platform where you can increase your wholesales
              </p>
            </div>
          </div>
        </Grid>
        <Grid item lg={6}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div>
              <img
                src={privacy}
                alt=""
                style={{ marginLeft: '10px', marginRight: '50px' }}
                width={35}
                height={35}
              />
            </div>
            <div>
              <h4 style={{ marginTop: '0', marginBottom: '5px', color: 'text.main' }}>
                {' '}
                We Rspect privacy
              </h4>
              <p style={{ marginTop: '0', textAlign: 'justify' }}>
                SKU Markets Does not share personal user’s data with third parties or data
                associated with user’s activity.
              </p>
            </div>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SkuSolution;
