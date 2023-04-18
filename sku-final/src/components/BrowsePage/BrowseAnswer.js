import { Card, Container, Stack, Typography } from '@mui/material';
import CustomBreadcrumbs from 'components/custom-breadcrumbs/CustomBreadcrumbs';
import BrowsersAnswers from 'components/helpCenter/BrowsersAnswers';
import FaqsHero from 'components/helpCenter/FaqsHero';
import { useParams } from 'react-router';

const BrowseAnswer = () => {
  const { ANSWERS } = BrowsersAnswers();
  let { q } = useParams();
  const Ans = ANSWERS.find((ans) => ans.q === q);
  return (
    <>
      <FaqsHero text1={Ans?.title} text2="" text3="" text4="" text5="" />
      <Container sx={{ pt: 3, pb: 10 }}>
        <CustomBreadcrumbs
          links={[
            {
              name: 'Help Center',
              href: '/help_center',
            },
            {
              name: Ans.title,
              href: `/help_center/${Ans?.title}`,
            },
            { name: q },
          ]}
        />
        <Card sx={{ py: 2, textAlign: 'center', alignItems: 'center' }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
            Welcome to SKU Markets
          </Typography>
          {/* <div dangerouslySetInnerHTML={{ __html: Ans.ans }} /> */}
          {Ans?.ans}
          {/* <Typography variant="subtitle1" sx={{p:2}}>{Ans?.ans}</Typography> */}
          <Stack sx={{ p: 4, textAlign: 'left' }}>
            <Typography variant="caption">Do you have any more questions?</Typography>
            <Typography component="div" variant="caption">
              Contact us at
              <Typography
                component="a"
                href="mailto: support@skumarkets.com"
                variant="caption"
                sx={{ textDecoration: 'none', color: 'primary.main', pl: 1 }}
              >
                support@skumarkets.com
              </Typography>
            </Typography>
          </Stack>
        </Card>
      </Container>
    </>
  );
};

export default BrowseAnswer;

/* let myQsn = "myQsn$"
myQsn = myQsn.replace('$','?'); */
// console.log(myQsn);
