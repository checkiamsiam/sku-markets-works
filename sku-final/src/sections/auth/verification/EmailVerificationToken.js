import { Box, CircularProgress, Typography } from '@mui/material';
import { useVerifyEmailTokenQuery } from 'features/auth/authAPI';
import { addMessage } from 'features/message/messageSlice';
import useAuth from 'hooks/useAuth';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';
import { useNavigate,  useParams } from 'react-router-dom';

const EmailVerificationToken = () => {
  const { token } = useParams();
  const user = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [skip, setSkip] = useState(true);
  const { isSuccess, isError, isLoading } = useVerifyEmailTokenQuery(token, { skip });

   	useEffect(() => {
   		if(isSuccess) {
   			navigate("/signup");
   		} else if (isError) {
        navigate("/signup");
      }
   	}, [isSuccess, isError, navigate, dispatch])

   	useEffect(() => {
      if(!user.email) {
         navigate("/login");
      } else if (user.isEmailVerified === true) {
         navigate("/profile");
         dispatch( addMessage({message: 'Email is verified',type: 'info'}))
      } else {
      	setSkip(false);
      }
   	}, [navigate, setSkip]);

  return (
    <>
      <Helmet>
        <title>Email Verification | SKU Markets</title>
      </Helmet>

      {isLoading && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
          }}
        >
          <Box>
            <CircularProgress />
          </Box>
          <Typography>Verifying your email Address</Typography>
        </Box>
      )}
      {isError && (
        <Typography variant="subtitle1" sx={{ fontSize: 20 }}>
          Verification Failed
        </Typography>
      )}
    </>
  );
};

export default EmailVerificationToken;
