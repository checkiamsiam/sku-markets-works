import { Box, Container, Grid } from '@mui/material';
import CustomBreadcrumbs from 'components/custom-breadcrumbs/CustomBreadcrumbs';
import { articles } from 'components/helpCenter/articles';
import { browsers } from 'components/helpCenter/browsers';
import { RxDotFilled } from 'react-icons/rx';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import FaqsHero from '../components/helpCenter/FaqsHero';

const BrowsePage = () => {
  let { title } = useParams();
  const article = articles?.find((art) => art.title === title);
  const browser = browsers?.find((art) => art.title === title);
  return (
    <>
      <FaqsHero text1={title} text2="" text3="" text4="" text5="" />
      <Container sx={{ pt: 3, pb: 10, position: 'relative' }}>
        <CustomBreadcrumbs
          links={[
            {
              name: 'Help Center',
              href: '/help_center',
            },
            { name: title },
          ]}
        />
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {article && (
            <>
              {article?.questions?.map((qsn, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Box
                    component={NavLink}
                    to={`/help_center/${title}/${qsn}`}
                    sx={{
                      color: 'text.primary',
                      alignItems: 'center',
                      textDecoration: 'none',
                      '&:hover': { textDecoration: 'underline' },
                    }}
                  >
                    <span style={{ color: '#0D6EFD' }}>
                      <RxDotFilled />
                    </span>{' '}
                    {qsn}
                  </Box>
                </Grid>
              ))}
            </>
          )}
          {browser && (
            <>
              {browser?.questions?.map((qsn, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Box
                    component={NavLink}
                    to={`/help_center/${title}/${qsn}`}
                    sx={{
                      color: 'text.primary',
                      alignItems: 'center',
                      textDecoration: 'none',
                      '&:hover': { textDecoration: 'underline' },
                    }}
                  >
                    <span style={{ color: '#0D6EFD' }}>
                      <RxDotFilled />
                    </span>{' '}
                    {qsn}
                  </Box>
                </Grid>
              ))}
            </>
          )}
          {(title === 'About SKU Markets' ||
            title === 'Get Started' ||
            title === 'Become a Partner' ||
            title === 'Subscriptions & Commissions') && (
            <Grid item xs={12} sm={6} md={4}>
              <Box
                component={NavLink}
                to="/policies"
                sx={{
                  color: 'text.primary',
                  alignItems: 'center',
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                <span style={{ color: '#0D6EFD' }}>
                  <RxDotFilled />
                </span>{' '}
                What is SKU Markets Policies?
              </Box>
            </Grid>
          )}
        </Grid>
      </Container>
    </>
  );
};

export default BrowsePage;
