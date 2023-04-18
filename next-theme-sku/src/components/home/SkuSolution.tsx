import Grid from '@mui/material/Grid/Grid';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/system';
import Image from 'next/image';
import React from 'react';
import Growth from '../../assets/images/growth-icon.png';
import lowPrice from '../../assets/images/low-price.png';
import scale from '../../assets/images/scale.png';
import security from '../../assets/images/security.png';
import fee from '../../assets/images/fee.png';
import privacy from '../../assets/images/privacy.png';


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
              <Image
                src={Growth}
                alt=""
                style={{ marginLeft: '10px', marginRight: '50px' }}
                width={35}
                height={35}
              />
            </div>
            <div>
              <h4 style={{ marginTop: '0', marginBottom: '5px', color: 'gray' }}>
                {' '}
                Increase Sales & Revenue
              </h4>
              <p style={{ marginTop: '0', textAlign: 'justify' }}>
                Save 90% of the time searching for offers in the MarketPlaces to check for new
                opportunities to expand your selection, preparing your new SKUs 10X of your
                competitors to achieve high sales
              </p>
            </div>
          </div>
        </Grid>
        <Grid item lg={6}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div>
              <Image
                src={lowPrice}
                alt=""
                style={{ marginLeft: '10px', marginRight: '50px' }}
                width={35}
                height={35}
              />
            </div>
            <div>
              <h4 style={{ marginTop: '0', marginBottom: '5px', color: 'gray' }}>
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
              <Image
                src={scale}
                alt=""
                style={{ marginLeft: '10px', marginRight: '50px' }}
                width={35}
                height={35}
              />
            </div>
            <div>
              <h4 style={{ marginTop: '0', marginBottom: '5px', color: 'gray' }}>
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
              <Image
                src={security}
                alt=""
                style={{ marginLeft: '10px', marginRight: '50px' }}
                width={35}
                height={35}
              />
            </div>
            <div>
              <h4 style={{ marginTop: '0', marginBottom: '5px', color: 'gray' }}>
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
              <Image
                src={fee}
                alt=""
                style={{ marginLeft: '10px', marginRight: '50px' }}
                width={35}
                height={35}
              />
            </div>
            <div>
              <h4 style={{ marginTop: '0', marginBottom: '5px', color: 'gray' }}>
                No Additional Fees
              </h4>
              <p style={{ marginTop: '0', textAlign: 'justify' }}>
                SKU Markets does not charge any additional fees. For more information about our
                subscription model, please review our Pricing section.
              </p>
            </div>
          </div>
        </Grid>
        <Grid item lg={6}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div>
              <Image
                src={privacy}
                alt=""
                style={{ marginLeft: '10px', marginRight: '50px' }}
                width={35}
                height={35}
              />
            </div>
            <div>
              <h4 style={{ marginTop: '0', marginBottom: '5px', color: 'gray' }}>
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
