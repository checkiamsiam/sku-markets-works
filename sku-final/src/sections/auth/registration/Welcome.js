import useOffSetTop from 'hooks/useOffSetTop';
import Header from 'layouts/compact/Header';
import { HEADER } from 'config-global';

import React from 'react';
import { Box, Stack, Container, Typography, Button, List, ListItem } from '@mui/material';

import welcomeImage from 'assets/images/welcome.png';

const Welcome = ({setCurrentStep}) => {

    const isOffset = useOffSetTop(HEADER.H_MAIN_DESKTOP);
  return (
  <Box sx={{width: '100%'}}>
    <Header isOffset={isOffset} />
    <Container component="main">
      <Stack
        sx={{
          m: 'auto',
          maxWidth: 800,
          minHeight: '100vh',
          textAlign: 'center',
          justifyContent: 'center',
        }}
      >
      <Box>

      <Stack direction="row" justifyContent="center" alignItems="center">
        <Box component='img' src={welcomeImage} alt='welcome' sx={{width: 300, height:300}} />
      </Stack>
        <Typography variant='h3' sx={{color: 'black', fontSize: 30, fontWeight: 500, textAlign: 'center', mt: 2}}>Welcome to SKU Markets</Typography>
        <Typography variant='body1'>Thank you for your interest to use our SKU Markets Ecommerce Solutions. We're here to Supercharge and grow Your online business faster with SKU Markets! To get started you will need to upload following documents.</Typography>

        <List sx={{ listStyleType: 'disc', mt: 3 }}>
          <ListItem sx={{ display: 'list-item', padding: 0.75, }}>Trading License or commercial registration</ListItem>
          <ListItem sx={{ display: 'list-item', padding: 0.75, }}>Residence ID</ListItem>
          <ListItem sx={{ display: 'list-item', padding: 0.75, }}>A Stamped bank letter stating your bank account details.</ListItem>
          <ListItem sx={{ display: 'list-item', padding: 0.75, }}>VAT certificate, or Tax Certificate.</ListItem>
          <ListItem sx={{ display: 'list-item', padding: 0.75, }}>Brand Certificates.</ListItem>
          <ListItem sx={{ display: 'list-item', padding: 0.75, }}>Couriers Agreement ( it’s optional).</ListItem>
          <ListItem sx={{ display: 'list-item', padding: 0.75, fontWeight: 700 }}>Tax Card</ListItem>
        </List>

        <Typography variant='h6' sx={{color: 'black', textAlign: 'left', my: 4, fontWeight: 500}}>Ready to create business account with SKU Markets? Let's go!</Typography>
        <Stack direction='row' alignItems='center' justifyContent='center'>
          <Button
            onClick={() => {
              setCurrentStep(1)
              window.scrollTo(0, 0);
            }}
            sx={{
            px: 4,
            bgcolor: 'primary.main',
            border: (theme) => `1px solid ${theme.palette.primary.main}`,
            color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
            '&:hover': {
              bgcolor: 'white',
              color: (theme) => (theme.palette.mode === 'light' ? 'primary.main' : 'primary.main'),
              border: (theme) => `1px solid ${theme.palette.primary.main}`,
            },
          }}>Get Started</Button>
        </Stack>
      </Box>
      </Stack>
    </Container>
  </Box>
)};

export default Welcome;
