import CheckIcon from '@mui/icons-material/Check';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneAllRoundedIcon from '@mui/icons-material/DoneAllRounded';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import SearchIcon from '@mui/icons-material/Search';
import {
  Avatar,
  Box,
  Button,
  LinearProgress,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Stack,
  TablePagination,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import InputBase from '@mui/material/InputBase';
import { alpha, styled } from '@mui/material/styles';
import BlankWindow from 'components/common/BlankWindow';
import SKUMarquee from 'components/common/marquee';
import LoadingScreen from 'components/loading-screen/LoadingScreen';
import { format, subDays } from 'date-fns';
import {
  useDeleteAllNotificationsMutation,
  useDeleteNotificationMutation,
  useGetAllNotificationsQuery,
  useGetUnReadNotificationsQuery,
  useMarkAllNotificationsAsReadMutation,
  useMarkNotificationAsReadMutation,
} from 'features/notification/notificationAPI';
import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { useNavigate } from 'react-router';
import { fToNow } from 'utils/formatTime';
import Iconify from '../../src/components/iconify';

import MenuPopover from 'components/menu-popover'; 

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  marginBottom: '10px',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.mode === 'dark' ? '#35373B' : '#EFF2F5',
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  position: 'absolute',
  top: '13px',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.mode === 'dark' ? 'white' : 'inherit',
  padding: '5px 0px',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
  },
}));

const NotificationPage = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [markAsRead, { isSuccess, isLoading: markOneLoading }] =
    useMarkNotificationAsReadMutation();
  const [markAllRead, { isLoading: markAllLoading }] = useMarkAllNotificationsAsReadMutation();
  const [deleteNtfy, { isLoading: deleteOneLoading }] = useDeleteNotificationMutation();
  const [deleteAll, { isLoading: deleteAllLoading }] = useDeleteAllNotificationsMutation();
  const { refetch: unRefetch } = useGetUnReadNotificationsQuery();

  const date = Date.now();
  const [selectedValue, setSelectedValue] = useState({from: 1671519571904, to: format(date, "T"), value: "Choose Filter"});
  const [selectedDate, setSelectedDate] = useState({from: date, to: date});
  const [search, setSearch] = useState("");

  const query = `page=${page + 1}&limit=${rowsPerPage}&range_start=${selectedValue?.from}&range_end=${selectedValue?.to}&search=${search}`;
  const { data, refetch, isLoading } = useGetAllNotificationsQuery(query);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  const markHandler = async (id) => {
    await markAsRead(id);
    if (isSuccess) {
      refetch();
      unRefetch();
    }
  };

  const markAllHandler = async () => {
    await markAllRead();
    refetch();
    unRefetch();
  };

  const deleteHandler = async (id) => {
    await deleteNtfy(id);
    refetch();
    unRefetch();
  };

  const deleteAllHandler = async () => {
    await deleteAll();
    refetch();
    unRefetch();
  };

  const navigate = useNavigate();

  const [open, setOpen] = useState(null);
  const handleClick = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handlePickDate = (date) => {
    setSelectedDate(date);
  };

  const handleApply = () => {
    setSelectedValue({from: format(selectedDate?.from, "T"), to: format(selectedDate?.to, "T"), value: `${format(selectedDate?.from, "dd/MM/yy")} - ${format(selectedDate?.to, "dd/MM/yy")}`, isCustom: true});
    handleClose();
  }

  const removeFilter = () => {
    setSelectedValue({from: 1671519571904, to: format(date, "T"), value: "Choose Filter"});
  }

  // const StyledMenu = styled((props) => (
  //   <Menu
  //     elevation={0}
  //     anchorOrigin={{
  //       vertical: 'bottom',
  //       horizontal: 'right',
  //     }}
  //     transformOrigin={{
  //       vertical: 'top',
  //       horizontal: 'right',
  //     }}
  //     {...props}
  //   />
  // ))(({ theme }) => ({
  //   '& .MuiPaper-root': {
  //     borderRadius: 6,
  //     marginTop: theme.spacing(1),
  //     width: selectedValue?.value === 'Customized date range' ? '350px' : '220px',
  //     color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
  //     boxShadow:
  //       'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
  //     '& .MuiMenu-list': {
  //       padding: '4px 0',
  //     },
  //     '& .MuiMenuItem-root': {
  //       '& .MuiSvgIcon-root': {
  //         fontSize: 18,
  //         color: theme.palette.text.secondary,
  //         marginRight: theme.spacing(1.5),
  //       },
  //       '&:active': {
  //         backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
  //       },
  //     },
  //   },
  // }));

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      {(deleteAllLoading || deleteOneLoading || markOneLoading || markAllLoading) && (
        <LinearProgress />
      )}
      <SKUMarquee />
      <Box sx={{ my: 1, px: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" marginTop={2}>
          <Typography>Notification Center</Typography>
          <Stack direction="row" alignItems="center" spacing={3}>
            {data?.total ? <Button onClick={deleteAllHandler}>Delete All</Button> : null}
            {data?.total ? <Button onClick={markAllHandler}>Mark all as read</Button> : null}
            {selectedValue?.value !== "Choose Filter" ? <Button onClick={removeFilter}>Remove Filter</Button> : null }

            <div style={{ position: 'relative' }}>
              <TextField
                width="250px"
                disabled
                id="notiSelectValue"
                onClick={handleClick}
                value={selectedValue?.value}
                size="small"
              />
              {open ? (
                <KeyboardArrowUpIcon sx={{ position: 'absolute', right: '10px', top: '7px' }} />
              ) : (
                <KeyboardArrowDownIcon sx={{ position: 'absolute', right: '10px', top: '7px' }} />
              )}
            </div>
            <MenuPopover 
              sx={{ width: `${selectedValue?.isCustom ? "350px" : "250px"}`, p: 0 }}
              id="notiSelectValue"
              open={open}
              onClose={handleClose}
            >
              <MenuItem
                onClick={() => {
                  setSelectedValue({from: format(date, "T"), to: format(date, "T"), value: "Today"});
                  handleClose();
                }}
                disableRipple
              >
                <Stack
                  width="100%"
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography>Today</Typography>
                  {selectedValue?.value === "Today" && <CheckIcon />}
                </Stack>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setSelectedValue({from: format(subDays(date, 7), "T"), to: format(date, "T"), value: "Last 7 days"});
                  handleClose();
                }}
                disableRipple
              >
                <Stack
                  width="100%"
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography>Last 7 days</Typography>
                  {selectedValue?.value === "Last 7 days" && <CheckIcon />}
                </Stack>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setSelectedValue({from: format(subDays(date, 14), "T"), to: format(date, "T"), value: "Last 14 days"});
                  handleClose();
                }}
                disableRipple
              >
                <Stack
                  width="100%"
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography>Last 14 days</Typography>
                  {selectedValue?.value === "Last 14 days" && <CheckIcon />}
                </Stack>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setSelectedValue({from: format(subDays(date, 30), "T"), to: format(date, "T"), value: "Last 30 days"});
                  handleClose();
                }}
                disableRipple
              >
                <Stack
                  width="100%"
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography>Last 30 days</Typography>
                    {selectedValue?.value === "Last 30 days" && <CheckIcon />}
                </Stack>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setSelectedValue({isCustom: true});
                }}
                disableRipple
              >
                <Stack
                  width="100%"
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography>Customized date range</Typography>
                  {selectedValue?.isCustom === true && <CheckIcon />}
                </Stack>
              </MenuItem>
              {selectedValue?.isCustom === true && (
                <MenuItem disableRipple>
                  <Stack direction='column' spacing={0.3} width='100%'>
                    <DayPicker mode="range" selected={selectedDate} onSelect={handlePickDate} />
                  
                    <Stack direction="row" justifyContent="end" spacing={1} sx={{pr: 6}} >
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
                      <Button variant="text" onClick={handleApply} sx={{ fontSize: '12px' }}>
                        APPLY
                      </Button>
                    </Stack>
                  </Stack>

                {/*<Box sx={{ width: '100%' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Start Date and Time"
                value={start}
                onChange={(newValue) => setStart(newValue)}
                sx={{
                  display: 'block',
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
                  display: 'block',
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
                <Button variant="text" onClick={handleApply} sx={{ fontSize: '12px' }}>
                  APPLY
                </Button>
              </Stack>
            </LocalizationProvider>
          </Box>*/}


                </MenuItem>
              )}
            </MenuPopover>
          </Stack>
        </Stack>
      </Box>
      {data?.total ? (
        <Stack direction="row" justifyContent="center">
          <Paper
            sx={{
              p: { md: 3, xs: 1, sm: 1 },
              mt: 1,
              width: '100%',
              borderRadius: '10px',
              boxShadow: 3,
            }}
          >
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                // value={search}
                // onChange={e => setSearch(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') setSearch(e.target.value);
                }}
              />
            </Search>
            {data?.notifications?.map((ntfy) => (
              <ListItemButton
                key={ntfy._id}
                sx={{
                  py: 1.5,
                  px: 2.5,
                  mt: '1px',
                  mb: 0.2,
                  mx: 1,
                  ...(ntfy?.read === false && {
                    bgcolor: 'action.selected',
                  }),
                }}
              >
                <ListItemText
                  onClick={() => {
                    markHandler(ntfy._id);
                    navigate(ntfy.url);
                  }}
                  sx={{ fontSize: '15px' }}
                  disableTypography
                  primary={ntfy.message}
                  secondary={
                    <Stack
                      direction="row"
                      sx={{ mt: 0.5, typography: 'caption', color: 'text.disabled' }}
                    >
                      <Iconify icon="eva:clock-fill" width={16} sx={{ mr: 0.5 }} />
                      <Typography variant="caption">{fToNow(ntfy?.createdAt)}</Typography>
                    </Stack>
                  }
                />
                <ListItemAvatar>
                  <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
                    <Tooltip title="Delete">
                      <Avatar
                        onClick={() => deleteHandler(ntfy._id)}
                        sx={{ bgcolor: 'background.neutral' }}
                      >
                        <DeleteIcon />
                      </Avatar>
                    </Tooltip>
                    {ntfy.read === false ? (
                      <Tooltip title="Mark as read">
                        <Avatar
                          onClick={() => markHandler(ntfy._id)}
                          sx={{ bgcolor: 'background.neutral' }}
                        >
                          <CheckRoundedIcon />
                        </Avatar>
                      </Tooltip>
                    ) : (
                      <Avatar
                        onClick={() => markHandler(ntfy._id)}
                        sx={{ bgcolor: 'background.neutral' }}
                      >
                        <DoneAllRoundedIcon color="primary" />
                      </Avatar>
                    )}
                  </Stack>
                </ListItemAvatar>
              </ListItemButton>
            ))}
            <TablePagination
              component="div"
              count={data?.total}
              rowsPerPageOptions={[25, 50, 100]}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Stack>
      ) : (
        <BlankWindow
          title="You don't have any new notifications in this date period"
          description="You can select other date periods to see older notifications."
        />
      )}
    </>
  );
};

export default NotificationPage;
