// @mui
//
import SvgColor from '../../svg-color';
import { useSettingsContext } from '../SettingsContext';
import { StyledCard } from '../styles';

// ----------------------------------------------------------------------

export default function ModeOptions() {
  const { themeMode, onChangeMode } = useSettingsContext();

  return (
    <StyledCard
      selected={themeMode}
      onClick={onChangeMode}
      sx={{
        width: 35,
        height: 30,
        typography: 'subtitle2',
        '& .svg-color': {
          width: 11,
          height: 11,
        },
      }}
    >
      <SvgColor src={`/assets/icons/setting/${themeMode === 'light' ? 'ic_sun' : 'ic_moon'}.svg`} />
    </StyledCard>
  );
}
