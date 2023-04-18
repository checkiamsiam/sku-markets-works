import { useTheme } from '@emotion/react';
import Label from 'components/label/Label';

const BooleanTag = ({ isTrue }) => {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  return (
    <Label
      variant={isLight ? 'soft' : 'filled'}
      color={isTrue ? 'success' : 'warning'}
      sx={{ mx: 'auto' }}
    >
      {isTrue ? 'Yes' : 'No'}
    </Label>
  );
};

export default BooleanTag;
