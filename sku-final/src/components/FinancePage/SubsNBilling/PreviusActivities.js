import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Box,
  FormControl,
  MenuItem,
  OutlinedInput,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import useClickOutside from 'hooks/useSearchBarToggle';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import PrevPlan from './PrevPlan';
import BlankWindow from 'components/common/BlankWindow';

const PreviusActivities = ({setActiveTab}) => {
  const { plans } = useSelector(state => state.subscription);

  const theme = useTheme()
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
                backgroundColor: theme.palette.mode === "dark" ? "#212B36" : 'white',
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

      {plans?.length <= 1 ? (
      <BlankWindow
        title="You don't have any previous subscription activities yet"
        description="You Can Upgrade Your account for more features"
      />
      ) : (
      <div>
        {plans?.slice(1).map((item, i) => <PrevPlan
          key={item?._id}
          item={item}
          setActiveTab={setActiveTab}
        />
        )}
      </div>
      )}
    </Box>
  );
};

export default PreviusActivities;
