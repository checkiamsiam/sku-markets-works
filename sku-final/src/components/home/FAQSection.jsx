import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Grid,
  Typography
} from '@mui/material';
import Iconify from 'components/iconify/Iconify';
// import { useRouter } from "next/router";
import React from 'react';
import { AiOutlineMail, AiOutlineTwitter } from 'react-icons/ai';
import { useNavigate } from 'react-router';
import style from './styles/Home.module.css';

const FAQS = [
  {
    id: 1,
    heading: 'How dose our service work?',
    detail:
      'We do collecting data cross internet, calculating and reflecting it to your dashboard. Weareable to provide with top needed information to take the right business decisions on the fastest way!',
  },
  {
    id: 2,
    heading: 'Do you provide your services for my specific SKUs?',
    detail:
      'Yes we do please you just need to prepare your SKUs list and upload it to your account or contact our support team and they will help easily',
  },
  {
    id: 3,
    heading: 'Which payment methods are accepted?',
    detail:
      'We accept all major credit cards and payments. You can also choose to checkout with Apple Pay. We will do our best to add new payment methods in the future.',
  },
  {
    id: 4,
    heading: 'What is your Refund Policy?',
    detail:
      'Any plans that has yet to go live is eligible for a complete refund. Plans that have already begun cannot be canceled because you have had access to our digital content. If this is a concern for you, we recommend to avoid using our platform.',
  },
  {
    id: 5,
    heading: 'Are there any rules I should follow when ordering?',
    detail: 'Just choose your plan and follow the system instructions!',
  },
  {
    id: 6,
    heading: 'How can I cancel my subscription?',
    detail:
      'From within your billing dashboard, you can cancel all your subscriptions. When you place an order, your billing account is created instantly and you will receive an email with your login details.',
  },
];

const FAQSection = () => {
  // const router = useRouter();
  const navigate = useNavigate();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div id="FAQSection">
    <Container sx={{ my: 15 }}>
      <div style={{ textAlign: 'center' }}>
        <Typography variant="h4" component="h4">
          Frequently Asked Questions
        </Typography>
        <Typography component="h4">
          If you can’t find the answer to your question here, feel free to contact our support team.
        </Typography>

        <Box sx={{ my: 3, display: 'flex', justifyContent: 'center' }}>
          <a
            style={{ textDecoration: 'none' }}
            href="https://mail.google.com/mail/u/0/#inbox?compose=new"
            className={style.faqbtnMail}
          >
            <AiOutlineMail /> EMAIL US YOUR QUESTION{' '}
          </a>
          <a
            href="https://twitter.com/SKUmarkets"
            className={style.faqbtnTwieet}
            style={{ textDecoration: 'none' }}
          >
            {' '}
            <AiOutlineTwitter /> SEND US A TWEET{' '}
          </a>
        </Box>
      </div>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          {FAQS.slice(0,3).map((accordion) => (
            <Accordion
              key={accordion.id}
              expanded={expanded === accordion.id}
              onChange={handleChange(accordion.id)}
            >
              <AccordionSummary
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
              >
                <Typography variant="subtitle1">{accordion.heading}</Typography>
              </AccordionSummary>

              <AccordionDetails>
                <Typography>{accordion.detail}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Grid>
        <Grid item xs={12} md={6}>
          {FAQS.slice(3,6).map((accordion) => (
            <Accordion
              key={accordion.id}
              expanded={expanded === accordion.id}
              onChange={handleChange(accordion.id)}
            >
              <AccordionSummary
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
              >
                <Typography variant="subtitle1">{accordion.heading}</Typography>
              </AccordionSummary>

              <AccordionDetails>
                <Typography>{accordion.detail}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Grid>
      </Grid>
    </Container>
    </div>
  );
};

export default FAQSection;
