import { Container, Grid } from '@mui/material';
import { AiFillLinkedin, AiOutlineMail, AiOutlineTwitter, AiOutlineWhatsApp } from 'react-icons/ai';

const ContactUs = () => {
  return (
    <Container sx={{ marginTop: '100px' }} id="ContactUs">
      <div style={{ textAlign: 'center' }}>
        <h1> Contact US </h1>
      </div>
      <div>
        <Grid
          container
          sx={{ textAlign: 'center', color: '#0d6efd', justifyContent: 'center' }}
          spacing={2}
        >
          <Grid item lg={4}>
            <h1>
              {' '}
              <a href="mailto:support@skumarkets.com" target="_blank" rel="noreferrer">
                <AiOutlineMail color="#0d6efd" />{' '}
              </a>
            </h1>
          </Grid>
          <Grid item lg={4}>
            <h1>
              <a
                href="https://api.whatsapp.com/send?phone=966570044545"
                target="_blank"
                rel="noreferrer"
              >
                {' '}
                <AiOutlineWhatsApp color="#0d6efd" />{' '}
              </a>
            </h1>
          </Grid>
          <Grid item sx={{ display: 'flex', justifyContent: 'center' }} lg={4}>
            <h1>
              <a
                style={{ marginRight: '50px' }}
                href="https://www.linkedin.com/company/sku-markets"
                target="_blank"
                rel="noreferrer"
              >
                {' '}
                <AiFillLinkedin color="#0d6efd" />{' '}
              </a>
            </h1>

            <h1>
              <a href="https://twitter.com/SKUmarkets" target="_blank" rel="noreferrer">
                {' '}
                <AiOutlineTwitter color="#0d6efd" />{' '}
              </a>
            </h1>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default ContactUs;
