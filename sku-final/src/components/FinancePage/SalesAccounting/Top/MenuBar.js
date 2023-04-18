import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CheckIcon from '@mui/icons-material/Check';
import { Button, Menu, Stack, Typography } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useState } from 'react';

const menuOptions = ['1 hour', '6 hour', '1 day', '1 week', '1 month', '6 weeks', 'Custom'];

const MenuBar = () => {
  const [selectedDate, setSelectedDate] = useState('1 hour');

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setSelectedDate('Custom');
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const date = new Date();
  const [start, setStart] = useState(dayjs(date));
  const [end, setEnd] = useState(dayjs(date));
  return (
    <Stack direction="row" justifyContent="end">
      <Stack direction="row" justifyContent="end" spacing={1}>
        <Typography
          onClick={() => setSelectedDate('1 hour')}
          variant="subtitle2"
          fontSize="12px"
          sx={{
            cursor: 'pointer',
            display: 'flex',
            gap: '3px',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100px',
            height: '30px',
            border: (theme) =>
              theme.palette.mode === 'dark' ? '1px solid #161C24' : '1px solid #e0e0e0',
            borderRadius: '5px',
            color: (theme) =>
              selectedDate === '1 hour'
                ? '#fff'
                : theme.palette.mode === 'dark'
                ? '#fff'
                : theme.palette.primary.main,
            backgroundColor: (theme) =>
              selectedDate === '1 hour'
                ? theme.palette.primary.main
                : theme.palette.mode === 'dark'
                ? '#212B36'
                : '#fff',
          }}
        >
          {selectedDate === '1 hour' && <CheckIcon sx={{ fontSize: '16px' }} />}
          {'1 hour'}
        </Typography>
        <Typography
          onClick={() => setSelectedDate('6 hour')}
          variant="subtitle2"
          fontSize="12px"
          sx={{
            cursor: 'pointer',
            display: 'flex',
            gap: '3px',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100px',
            height: '30px',
            border: (theme) =>
              theme.palette.mode === 'dark' ? '1px solid #161C24' : '1px solid #e0e0e0',
            borderRadius: '5px',
            color: (theme) =>
              selectedDate === '6 hour'
                ? '#fff'
                : theme.palette.mode === 'dark'
                ? '#fff'
                : theme.palette.primary.main,
            backgroundColor: (theme) =>
              selectedDate === '6 hour'
                ? theme.palette.primary.main
                : theme.palette.mode === 'dark'
                ? '#212B36'
                : '#fff',
          }}
        >
          {selectedDate === '6 hour' && <CheckIcon sx={{ fontSize: '16px' }} />}
          {'6 hour'}
        </Typography>
        <Typography
          onClick={() => setSelectedDate('1 Day')}
          variant="subtitle2"
          fontSize="12px"
          sx={{
            cursor: 'pointer',
            display: 'flex',
            gap: '3px',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100px',
            height: '30px',
            border: (theme) =>
              theme.palette.mode === 'dark' ? '1px solid #161C24' : '1px solid #e0e0e0',
            borderRadius: '5px',
            color: (theme) =>
              selectedDate === '1 Day'
                ? '#fff'
                : theme.palette.mode === 'dark'
                ? '#fff'
                : theme.palette.primary.main,
            backgroundColor: (theme) =>
              selectedDate === '1 Day'
                ? theme.palette.primary.main
                : theme.palette.mode === 'dark'
                ? '#212B36'
                : '#fff',
          }}
        >
          {selectedDate === '1 Day' && <CheckIcon sx={{ fontSize: '16px' }} />}
          {'1 Day'}
        </Typography>
        <Typography
          onClick={() => setSelectedDate('1 Week')}
          variant="subtitle2"
          fontSize="12px"
          sx={{
            cursor: 'pointer',
            display: 'flex',
            gap: '3px',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100px',
            height: '30px',
            border: (theme) =>
              theme.palette.mode === 'dark' ? '1px solid #161C24' : '1px solid #e0e0e0',
            borderRadius: '5px',
            color: (theme) =>
              selectedDate === '1 Week'
                ? '#fff'
                : theme.palette.mode === 'dark'
                ? '#fff'
                : theme.palette.primary.main,
            backgroundColor: (theme) =>
              selectedDate === '1 Week'
                ? theme.palette.primary.main
                : theme.palette.mode === 'dark'
                ? '#212B36'
                : '#fff',
          }}
        >
          {selectedDate === '1 Week' && <CheckIcon sx={{ fontSize: '16px' }} />}
          {'1 Week'}
        </Typography>
        <Typography
          onClick={() => setSelectedDate('1 month')}
          variant="subtitle2"
          fontSize="12px"
          sx={{
            cursor: 'pointer',
            display: 'flex',
            gap: '3px',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100px',
            height: '30px',
            border: (theme) =>
              theme.palette.mode === 'dark' ? '1px solid #161C24' : '1px solid #e0e0e0',
            borderRadius: '5px',
            color: (theme) =>
              selectedDate === '1 month'
                ? '#fff'
                : theme.palette.mode === 'dark'
                ? '#fff'
                : theme.palette.primary.main,
            backgroundColor: (theme) =>
              selectedDate === '1 month'
                ? theme.palette.primary.main
                : theme.palette.mode === 'dark'
                ? '#212B36'
                : '#fff',
          }}
        >
          {selectedDate === '1 month' && <CheckIcon sx={{ fontSize: '16px' }} />}
          {'1 month'}
        </Typography>
        <Typography
          onClick={() => setSelectedDate('6 Weeks')}
          variant="subtitle2"
          fontSize="12px"
          sx={{
            cursor: 'pointer',
            display: 'flex',
            gap: '3px',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100px',
            height: '30px',
            border: (theme) =>
              theme.palette.mode === 'dark' ? '1px solid #161C24' : '1px solid #e0e0e0',
            borderRadius: '5px',
            color: (theme) =>
              selectedDate === '6 Weeks'
                ? '#fff'
                : theme.palette.mode === 'dark'
                ? '#fff'
                : theme.palette.primary.main,
            backgroundColor: (theme) =>
              selectedDate === '6 Weeks'
                ? theme.palette.primary.main
                : theme.palette.mode === 'dark'
                ? '#212B36'
                : '#fff',
          }}
        >
          {selectedDate === '6 Weeks' && <CheckIcon sx={{ fontSize: '16px' }} />}
          {'6 Weeks'}
        </Typography>
        <Typography
          onClick={handleClick}
          variant="subtitle2"
          fontSize="12px"
          sx={{
            cursor: 'pointer',
            display: 'flex',
            gap: '3px',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100px',
            height: '30px',
            border: (theme) =>
              theme.palette.mode === 'dark' ? '1px solid #161C24' : '1px solid #e0e0e0',
            borderRadius: '5px',
            color: (theme) =>
              selectedDate === 'Custom'
                ? '#fff'
                : theme.palette.mode === 'dark'
                ? '#fff'
                : theme.palette.primary.main,
            backgroundColor: (theme) =>
              selectedDate === 'Custom'
                ? theme.palette.primary.main
                : theme.palette.mode === 'dark'
                ? '#212B36'
                : '#fff',
          }}
        >
          {selectedDate === 'Custom' && <CheckIcon sx={{ fontSize: '16px' }} />}
          {'Custom'}
          {selectedDate === 'Custom' && <ArrowDropDownIcon sx={{ fontSize: '18px' }} />}
        </Typography>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <div style={{ width: '300px', padding: '10px' }}>
            <DateTimePicker
              label="Start Date and Time"
              value={start}
              onChange={(newValue) => setStart(newValue)}
              sx={{
                mb: 2,
                width: '100%',
                fontSize: '12px',
                '& .css-e9crry-MuiInputBase-input-MuiOutlinedInput-input': { fontSize: '12px' },
                '& .css-7aor6j-MuiInputBase-root-MuiOutlinedInput-root': { height: '40px' },
                '& .css-1rmd3mv-MuiFormLabel-root-MuiInputLabel-root': {
                  fontSize: '12px',
                  transform: 'translate(13px, 12px) scale(1)',
                },
              }}
            />

            <DateTimePicker
              label="End Date and Time"
              onChange={(newValue) => setEnd(newValue)}
              sx={{
                width: '100%',
                fontSize: '12px',
                '& .css-e9crry-MuiInputBase-input-MuiOutlinedInput-input': { fontSize: '12px' },
                '& .css-7aor6j-MuiInputBase-root-MuiOutlinedInput-root': { height: '40px' },
                '& .css-1rmd3mv-MuiFormLabel-root-MuiInputLabel-root': {
                  fontSize: '12px',
                  transform: 'translate(13px, 12px) scale(1)',
                },
              }}
            />
            <Typography fontSize="12px" variant="subtitle2" sx={{ ml: 1 }}>
              Require a Date in the past
            </Typography>
            <Stack direction="row" justifyContent="end" spacing={1} sx={{ mt: 0.3 }}>
              <Button
                variant="text"
                onClick={handleClose}
                sx={{
                  color: (theme) => (theme.palette.mode === 'dark' ? 'white' : 'black'),
                  fontSize: '12px',
                }}
              >
                CANCEL
              </Button>
              <Button variant="text" onClick={handleClose} sx={{ fontSize: '12px' }}>
                APPLY
              </Button>
            </Stack>
          </div>
        </Menu>
      </Stack>
    </Stack>
  );
};

export default MenuBar;
