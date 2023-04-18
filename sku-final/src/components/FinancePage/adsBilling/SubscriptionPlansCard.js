import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { Card, Typography, useTheme } from '@mui/material';

const SubscriptionPlanCard = ({ objective, setSelectedObjective, selectedObjective }) => {
  const theme = useTheme();
  const selectObjtive = () => {
    setSelectedObjective(objective);
  };
  return (
    <Card
      onClick={selectObjtive}
      sx={{
        p: 2,
        overflow: 'visible',
        position: 'relative',
        border:
          objective?.id === selectedObjective?.id ? '2px solid #1562ff' : '2px solid transparent',
      }}
    >
      <LocalOfferIcon />
      <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }}>{objective.title}</Typography>
      <Typography sx={{ fontSize: '12px' }}>
        {' '}
        {objective.description}{' '}
      </Typography>
      {objective?.id === selectedObjective?.id && (
        <CheckCircleOutlineIcon
          sx={{
            color: '#1562ff',
            backgroundColor: theme.palette.mode === 'dark' ? '#212B36' : 'white',
            borderRadius: '50%',
            position: 'absolute',
            zIndex: 10,
            top: '-7px',
            right: '-7px',
          }}
        />
      )}
    </Card>
  );
};

export default SubscriptionPlanCard;
