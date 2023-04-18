import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';

import useAuth from 'hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import ApiBase from 'app/ApiBase';
import { logout } from 'features/auth/authSlice';
import { addMessage } from 'features/message/messageSlice';

import processing from 'assets/images/processing.png';

const ActivationProcess = () => {
  const user = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();


  useEffect(() => {
    if(user?.status === 'active') {
    navigate('/');
  } else if (user?.status === 'banned') {
    dispatch(logout());
    dispatch(ApiBase.util.resetApiState());

    setTimeout(() => {
      navigate('/', {replace: true});
      dispatch(addMessage({message: "You're logged out", type: 'error'}));
    }, 5000);
  }
}, [user?.status, navigate, dispatch])

  return (
    <Box sx={{mt: 4}}>
      <Typography variant="h3" sx={{color: 'primary.darker', mb: 2}}>Great! that&#39;s all for now</Typography>
      <Typography variant='body1' sx={{color: 'grey.main'}} >Our team is going through your profile for activation process. Once your account is activated you will hear from us</Typography>
      <Box component='img' src={processing} alt='processing' />
    </Box>
  );
};

export default ActivationProcess;
