import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Divider,
  FormControl,
  Grid,
  MenuItem,
  OutlinedInput,
  Stack,
  Typography,
} from '@mui/material';
import useClickOutside from 'hooks/useSearchBarToggle';
import { useRef, useState } from 'react';

const ShippingShipped = () => {
  // input states
  const [dCPTime, setDCPTime] = useState('3 Days');
  const [dSCPTime, setDSCPTime] = useState('7 Days');
  const [dWPTime, setDWPTime] = useState('14 Days');

  // Logics Default Same City Processing Time
  const ref = useRef();
  const [dCPTimeDropOpen, setdCPTimeDropOpen] = useState(false);
  const setValueDCPT = (value) => {
    setDCPTime(value);
    setdCPTimeDropOpen(false);
  };
  useClickOutside(ref, () => {
    setdCPTimeDropOpen(false);
  });

  //Logics Default Same Country Processing Time
  const ref2 = useRef();
  const [dSCPTimeDropOpen, setdSCPTimeDropOpen] = useState(false);
  const setValueDSCPT = (value) => {
    setDSCPTime(value);
    setdSCPTimeDropOpen(false);
  };
  useClickOutside(ref2, () => {
    setdSCPTimeDropOpen(false);
  });
  //Logics Default Worldwide Processing Time
  const ref3 = useRef();
  const [dWPTimeDropOpen, setdWPTimeDropOpen] = useState(false);
  const setValueDWPT = (value) => {
    setDWPTime(value);
    setdWPTimeDropOpen(false);
  };
  useClickOutside(ref3, () => {
    setdWPTimeDropOpen(false);
  });

  return (
    <div>
      <Divider />
      <Grid container sx={{ mt: 3 }}>
        <Grid item xs={12} md={4}>
          <Typography>Default Same City Processing Time</Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <Stack direction="row" justifyContent="end" alignItems="center">
            <FormControl
              sx={{ minWidth: { xs: '100%', md: 250, position: 'relative' } }}
              size="small"
            >
              <div style={{ position: 'relative' }}>
                <OutlinedInput
                  onClick={() => setdCPTimeDropOpen(true)}
                  disabled
                  value={dCPTime}
                  sx={{ width: '100%', border: '1px solid #212B36' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                  }}
                >
                  <ExpandMoreIcon
                    sx={{
                      transition: '.4s',
                      transform: dCPTimeDropOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                  />
                </div>
              </div>
              {dCPTimeDropOpen && (
                <div
                  ref={ref}
                  style={{
                    transition: '.4s',
                    position: 'absolute',
                    zIndex: '100',
                    width: '100%',
                    height: '160px',
                    overflowY: 'scroll',
                    left: '0px',
                    backgroundColor: 'white',
                    boxShadow:
                      'rgba(145, 158, 171, 0.24) 0px 0px 2px 0px, rgba(145, 158, 171, 0.24) -20px 20px 40px',
                    borderRadius: '10px',
                    top: '100%',
                  }}
                >
                  { [...Array(10).keys()].map((i) => {
                    if(i === 0) {
                      return (
                        <MenuItem onClick={() => setValueDCPT(`${i + 1} Day`)} value={`${i + 1} Day`}>
                          {i + 1} Day
                        </MenuItem>
                      );
                    }else{
                      return (
                        <MenuItem onClick={() => setValueDCPT(`${i + 1} Days`)} value={`${i + 1} Days`}>
                          {i + 1} Days
                        </MenuItem>
                      );
                    }
                    
                  })}
                </div>
              )}
            </FormControl>
          </Stack>
        </Grid>
      </Grid>

      <Grid container sx={{ mt: 3 }}>
        <Grid item xs={12} md={4}>
          <Typography>Default Same Country Processing Time</Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <Stack direction="row" justifyContent="end" alignItems="center">
            <FormControl
              sx={{ minWidth: { xs: '100%', md: 250, position: 'relative' } }}
              size="small"
            >
              <div style={{ position: 'relative' }}>
                <OutlinedInput
                  onClick={() => setdSCPTimeDropOpen(true)}
                  disabled
                  value={dSCPTime}
                  sx={{ width: '100%', border: '1px solid #212B36' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                  }}
                >
                  <ExpandMoreIcon
                    sx={{
                      transition: '.4s',
                      transform: dSCPTimeDropOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                  />
                </div>
              </div>
              {dSCPTimeDropOpen && (
                <div
                  ref={ref2}
                  style={{
                    transition: '.4s',
                    position: 'absolute',
                    zIndex: '100',
                    width: '100%',
                    left: '0px',
                    height: '160px',
                    overflowY: 'scroll',
                    backgroundColor: 'white',
                    boxShadow:
                      'rgba(145, 158, 171, 0.24) 0px 0px 2px 0px, rgba(145, 158, 171, 0.24) -20px 20px 40px',
                    borderRadius: '10px',
                    top: '100%',
                  }}
                >
                  { [...Array(25).keys()].map((i) => {
                    if(i === 0) {
                      return (
                        <MenuItem onClick={() => setValueDSCPT(`${i + 1} Day`)} value={`${i + 1} Day`}>
                          {i + 1} Day
                        </MenuItem>
                      );
                    }else{
                      return (
                        <MenuItem onClick={() => setValueDSCPT(`${i + 1} Days`)} value={`${i + 1} Days`}>
                          {i + 1} Days
                        </MenuItem>
                      );
                    }
                    
                  })}
                </div>
              )}
            </FormControl>
          </Stack>
        </Grid>
      </Grid>
      <Grid container sx={{ mt: 3 }}>
        <Grid item xs={12} md={4}>
          <Typography>Default Worldwide Processing Time</Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <Stack direction="row" justifyContent="end" alignItems="center">
            <FormControl
              sx={{ minWidth: { xs: '100%', md: 250, position: 'relative' } }}
              size="small"
            >
              <div style={{ position: 'relative' }}>
                <OutlinedInput
                  onClick={() => setdWPTimeDropOpen(true)}
                  disabled
                  value={dWPTime}
                  sx={{ width: '100%', border: '1px solid #212B36' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                  }}
                >
                  <ExpandMoreIcon
                    sx={{
                      transition: '.4s',
                      transform: dWPTimeDropOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                  />
                </div>
              </div>
              {dWPTimeDropOpen && (
                <div
                  ref={ref3}
                  style={{
                    transition: '.4s',
                    position: 'absolute',
                    zIndex: '100',
                    width: '100%',
                    height: '160px',
                    overflowY: 'scroll',
                    left: '0px',
                    backgroundColor: 'white',
                    boxShadow:
                      'rgba(145, 158, 171, 0.24) 0px 0px 2px 0px, rgba(145, 158, 171, 0.24) -20px 20px 40px',
                    borderRadius: '10px',
                    top: '100%',
                  }}
                >
                  { [...Array(45).keys()].map((i) => {
                    if(i === 0) {
                      return (
                        <MenuItem onClick={() => setValueDWPT(`${i + 1} Day`)} value={`${i + 1} Day`}>
                          {i + 1} Day
                        </MenuItem>
                      );
                    }else{
                      return (
                        <MenuItem onClick={() => setValueDWPT(`${i + 1} Days`)} value={`${i + 1} Days`}>
                          {i + 1} Days
                        </MenuItem>
                      );
                    }
                    
                  })}
                </div>
              )}
            </FormControl>
          </Stack>
        </Grid>
      </Grid>
    </div>
  );
};

export default ShippingShipped;
