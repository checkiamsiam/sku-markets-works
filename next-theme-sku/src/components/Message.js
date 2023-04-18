import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Slide from '@mui/material/Slide';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { clearMessage } from '../feature/message/messageSlice';
import useMessage from '../hooks/useMessage';

export default function Message() {
  const { message, type } = useMessage();
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);

  const handleChange = useCallback(() => {
    setChecked((prev) => !prev);
    dispatch(clearMessage());
  }, [dispatch]);

  useEffect(() => {
    if (message) {
      setChecked(true);

      const timer = setTimeout(() => {
        handleChange();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [dispatch, handleChange, message]);

  return (
    <Box
      sx={{
        width: {
          xs: '100%',
          sm: '80%',
          md: '60%',
          lg: '40%',
          xl: '20%',
        },
        top: {
          xs: 30,
        },
        right: '50%',
        zIndex: 9999,
        cursor: 'pointer',
        position: 'fixed',
        transform: 'translateX(50%)',
      }}
    >
      <Box>
        <Slide
          onClick={handleChange}
          direction="down"
          in={checked}
          mountOnEnter
          unmountOnExit
          style={{
            boxShadow: 'rgba(0, 0, 0, 0.4) 0px 30px 90px',
            borderRadius: '10px',
          }}
        >
          <Alert severity={type}>{message}</Alert>
        </Slide>
      </Box>
    </Box>
  );
}
