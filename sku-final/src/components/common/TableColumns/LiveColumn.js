import { useTheme } from '@emotion/react';
import Label from 'components/label/Label';

const LiveColumn = ({ row }) => {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';
  return (
    <Label
      variant={isLight ? 'soft' : 'filled'}
      color={row?.is_live ? 'success' : 'error'}
      sx={{ mx: 'auto' }}
    >
      {row?.is_live ? 'Live' : 'Not Live'}
    </Label>
  );
};

export default LiveColumn;
