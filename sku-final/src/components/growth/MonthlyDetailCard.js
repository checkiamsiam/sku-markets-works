import { Box, Typography, Stack, useTheme, Divider } from '@mui/material/';
import MonthlyDetailsChart from './MonthlyDetailsChart';

const MonthlyDetailCard = ({ title }) => {
  const theme = useTheme();

  return (
    <Box sx={{ boxShadow: 3, borderRadius: 1 }}>
      <Box sx={{ boxShadow: 1 }}>
        <Stack
          sx={{
            // backgroundColor: theme.palette.primary.background,
            py: 1,
            borderRadius: 1,
            borderTop: '1px solid #ced4da',
          }}
        >
          <Typography variant="caption" textAlign="center" sx={{fontWeight:'700'}}>
            {title}
          </Typography>
        </Stack>
        <Stack
          direction="row"
          sx={{ backgroundColor: theme.palette.primary.background, py: 1 }}
          divider={
            <Divider orientation="vertical" flexItem color={theme.palette.secondary.contrastText} />
          }
        >
          <Typography
            variant="caption"
            width="33%"
            textAlign="center"
            color={theme.palette.secondary.contrastText}
          >
            Current Month
          </Typography>
          <Typography
            variant="caption"
            width="33%"
            textAlign="center"
            color={theme.palette.secondary.contrastText}
          >
            Previous Month
          </Typography>
          <Typography
            variant="caption"
            width="33%"
            textAlign="center"
            color={theme.palette.secondary.contrastText}
          >
            Month Before Last
          </Typography>
        </Stack>
        <Stack direction="row" sx={{ py: 1 }} divider={<Divider orientation="vertical" flexItem />}>
          <Typography variant="caption" width="33%" textAlign="center">
            SAR 10,000
          </Typography>
          <Typography variant="caption" width="33%" textAlign="center">
            SAR 40,000
          </Typography>
          <Typography variant="caption" width="33%" textAlign="center">
            SAR 800
          </Typography>
        </Stack>
      </Box>

      <Stack>
      <MonthlyDetailsChart
                chart={{
                  categories: ['Nov','Dec','Jan'],
                  series: [  
                        { name: 'Curr.', data: [10, 41, 77, ] },
                        { name: 'Prev.', data: [17, 34, 35, ] },
                        { name: 'B. Last', data: [35, 24, 13, ] },
                  ],
                  colors: ['#8BE78B','#007FFF', '#F76F72'],
                }}
              />
      </Stack>
    </Box>
  );
};

export default MonthlyDetailCard;
