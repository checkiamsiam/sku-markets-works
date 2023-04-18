import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  FormControl,
  Grid,
  Link,
  MenuItem,
  OutlinedInput,
  Stack,
  Typography,
} from '@mui/material';
import useClickOutside from 'hooks/useSearchBarToggle';
import { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PrevieusActivityAcDetail from './PrevieusActivityAcDetail';

const PreviusActivities = ({setActiveTab}) => {
  const refAcc = useRef();
  const [expand1, setExpand1] = useState(false);
  const [expand2, setExpand2] = useState(false);
  useClickOutside(refAcc, () => {
    setExpand1(false);
    setExpand2(false);
  });
  // input states
  const [dCPTime, setDCPTime] = useState('Previous 12 month');

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
  return (
    <Box sx={{ p: 2, marginTop: '-20px' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="subtitle2">Previous Activities</Typography>
        <FormControl sx={{ minWidth: { xs: '100%', md: 250, position: 'relative' } }} size="small">
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
              <MenuItem
                onClick={() => setValueDCPT('Previous 12 month')}
                value={`Previous 12 month`}
              >
                Previous 12 month
              </MenuItem>
              {[2022, 2021, 2020, 2019, 2018].map((y, i) => {
                return (
                  <MenuItem key={i} onClick={() => setValueDCPT(y)} value={`${y + 1} Days`}>
                    {y}
                  </MenuItem>
                );
              })}
            </div>
          )}
        </FormControl>
      </Stack>
      <div ref={ref}>
        <Accordion
          expanded={expand1}
          onChange={(e, expand) => {
            setExpand2(false);
            setExpand1(expand);
          }}
          sx={{
            p: 2,
            boxShadow: 5,
            transition: 'all 0.3s ease-in-out',
            ':hover': {
              backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1F262E' : '#F6F7F8'),
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Grid container>
              <Grid item xs={12} md={5}>
                <Typography variant="h6" sx={{mt:2}}>February 2023</Typography>
              </Grid>
              <Grid item xs={12} md={2}>
                <Typography variant="subtitle2">Net Cost</Typography>
                <Typography variant="subtitle1" fontSize="14px" fontWeight="700" sx={{ my: 1 }}>
                  SAR 0.00
                </Typography>
              </Grid>

              <Grid item xs={12} md={2}>
                <Typography variant="subtitle2">Payments</Typography>
                <Typography variant="subtitle1" fontSize="14px" fontWeight="700" sx={{ my: 1 }}>
                  SAR 0.00
                </Typography>
              </Grid>
              <Grid item xs={12} md={3}>
              <Link
              onClick={()=> setActiveTab("Documents")}
                  underline="always"
                  sx={{ fontSize: '12px' }}
                >
                  Download Subscription Statements and VAT and Tax Documents
                </Link>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
          <PrevieusActivityAcDetail data={{preMonth: "January"}}/>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expand2}
          onChange={(e, expand) => {
            setExpand1(false);
            setExpand2(expand);
          }}
          sx={{
            p: 2,
            boxShadow: 5,
            transition: 'all 0.3s ease-in-out',
            ':hover': {
              backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1F262E' : '#F6F7F8'),
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
             <Grid container>
              <Grid item xs={12} md={5}>
                <Typography variant="h6" sx={{mt:2}}>January 2023</Typography>
              </Grid>
              <Grid item xs={12} md={2}>
                <Typography variant="subtitle2">Net Cost</Typography>
                <Typography variant="subtitle1" fontSize="14px" fontWeight="700" sx={{ my: 1 }}>
                  SAR 0.00
                </Typography>
              </Grid>

              <Grid item xs={12} md={2}>
                <Typography variant="subtitle2">Payments</Typography>
                <Typography variant="subtitle1" fontSize="14px" fontWeight="700" sx={{ my: 1 }}>
                  SAR 0.00
                </Typography>
              </Grid>
              <Grid item xs={12} md={3}>
              <Link
                  onClick={()=> setActiveTab("Documents")}
                  underline="always"
                  sx={{ fontSize: '12px' }}
                >
                  Download Subscription Statements and VAT and Tax Documents
                </Link>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
          <PrevieusActivityAcDetail data={{preMonth: "December"}}/>
          </AccordionDetails>
        </Accordion>
      </div>

      {/* <BlankWindow
        title="Your account is new. You don't have any previous activities yet"
        description="You Can Upgrade Your account for more features"
      /> */}
    </Box>
  );
};

export default PreviusActivities;
