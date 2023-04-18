import { Box, Button } from '@mui/material';
import ConfirmationAlert from 'components/sellerboard/sellerboardAlerts/ConfirmationAlert';
import React, { useState } from 'react';
import Clock from './Clock';
import { useCountdown } from './useCountdown';

const ExpiredNotice = ({text,item,title,alert}) => {
     /* Accept Alert */
     const [openAccept, setOpenAccept] = useState(false);
     const handleCloseAccept = () => setOpenAccept(false);
     const handleShowAccept = () => setOpenAccept(true);
  return (
    <>
      <Button
        sx={{
          bgcolor: 'primary.main',
          border: (theme) => `1px solid ${theme.palette.primary.main}`,
          color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
          '&:hover': {
            bgcolor: 'white',
            color: (theme) => (theme.palette.mode === 'light' ? 'primary.main' : 'primary.main'),
            border: (theme) => `1px solid ${theme.palette.primary.main}`,
          },
          width: { md: 100, xs: 75 },
          mt:1
        }}
        onClick={handleShowAccept}
      >
        Withdraw
      </Button>
      <ConfirmationAlert open={openAccept} handleClose={handleCloseAccept} item={item} alert={alert} title={title} btnTitle={'Withdraw'} text={text}/>
    </>
  );
};

const ShowCounter = ({ days, hours, minutes, seconds }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Clock value={days} isDanger={days <= 3} />
      <p>:</p>
      <Clock value={hours} isDanger={false} />
      <p>:</p>
      <Clock value={minutes} isDanger={false} />
      <p>:</p>
      <Clock value={seconds} isDanger={false} />
    </Box>
  );
};

const CountdownTimer = ({ targetDate, text, title, item, alert }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  if (days + hours + minutes + seconds <= 0) {
    return <ExpiredNotice item={item} text={text} title={title} alert={alert} />;
  } else {
    return <ShowCounter days={days} hours={hours} minutes={minutes} seconds={seconds} />;
  }
};

export default CountdownTimer;
