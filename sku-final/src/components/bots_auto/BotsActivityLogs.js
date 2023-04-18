import {
  Box,
  ListItemButton,
  ListItemText,
  Stack,
  TablePagination,
  Typography,
} from '@mui/material';
import BlankWindow from 'components/common/BlankWindow';
import Iconify from 'components/iconify/Iconify';
import { useState } from 'react';
import { fToNow } from 'utils/formatTime';

const logs = [
  // {
  //   createdAt: '2023-01-06T08:49:57.807Z',
  //   message: 'Bots Automation activity logs',
  //   read: false,
  // },
  // {
  //   createdAt: '2023-01-07T08:49:57.807Z',
  //   message: 'Bots Automation activity logs',
  //   read: true,
  // },
  // {
  //   createdAt: '2023-01-08T08:49:57.807Z',
  //   message: 'Bots Automation activity logs',
  //   read: false,
  // },
  // {
  //   createdAt: '2023-01-09T08:49:57.807Z',
  //   message: 'Bots Automation activity logs',
  //   read: true,
  // },
  // {
  //   createdAt: '2023-01-10T08:49:57.807Z',
  //   message: 'Bots Automation activity logs',
  //   read: false,
  // },
  // {
  //   createdAt: '2023-01-10T08:49:57.807Z',
  //   message: 'Bots Automation activity logs',
  //   read: true,
  // },
];

const BotsActivityLogs = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };
  return (
    <>
      {logs.length > 0 ? (
        <Box sx={{ mt: 2 }}>
          {logs?.map((log, i) => (
            <ListItemButton
              key={i}
              sx={{
                py: 1.5,
                px: 2.5,
                mt: '1px',
                mb: 0.2,
                ...(log?.read === false && {
                  bgcolor: 'action.selected',
                }),
              }}
            >
              <ListItemText
                sx={{ fontSize: '15px' }}
                disableTypography
                primary={log.message}
                secondary={
                  <Stack
                    direction="row"
                    sx={{ mt: 0.5, typography: 'caption', color: 'text.disabled' }}
                  >
                    <Iconify icon="eva:clock-fill" width={16} sx={{ mr: 0.5 }} />
                    <Typography variant="caption">{fToNow(log?.createdAt)}</Typography>
                  </Stack>
                }
              />
            </ListItemButton>
          ))}
          <TablePagination
            component="div"
            count={50}
            rowsPerPageOptions={[10, 25, 50]}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      ) : (
        <BlankWindow
          title="You don't have any activity logs yet."
          description="You can add automation to see your activity logs here."
        />
      )}
    </>
  );
};

export default BotsActivityLogs;
