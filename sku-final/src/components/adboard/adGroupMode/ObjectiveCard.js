import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Card, Typography, useTheme } from '@mui/material';

const ObjectiveCard = ({
  objective,
  setSelectedObjective,
  selectedObjective,
  setActiveStep,
  usedPlace,
}) => {
  const theme = useTheme();
  const selectObjtive = () => {
    if (objective.disable) {
      return;
    }
    setSelectedObjective(objective);
    if (usedPlace === 'objective') {
      setActiveStep((prevActiveStep) => {
        if (prevActiveStep === 2) return prevActiveStep + 1;
        else return prevActiveStep;
      });
      return;
    }
    if (usedPlace === 'types') {
      setActiveStep((prevActiveStep) => {
        if (prevActiveStep === 3) return prevActiveStep + 1;
        else return prevActiveStep;
      });
      return;
    }
  };
  return (
    <Card
      onClick={selectObjtive}
      sx={{
        p: 2,
        overflow: 'visible',
        height: '100%',
        position: 'relative',
        cursor: objective.disable ? 'not-allowed' : 'pointer',
        border:
          objective?.id === selectedObjective?.id ? '2px solid #1562ff' : '2px solid transparent',
      }}
    >
      {objective.icon}
      <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }}>{objective.title}</Typography>
      <Typography sx={{ fontSize: '12px' }}>{objective.description}</Typography>
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

export default ObjectiveCard;
