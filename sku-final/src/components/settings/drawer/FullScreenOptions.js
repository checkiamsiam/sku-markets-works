import { useState } from 'react';
//
import SvgColor from '../../svg-color';
import { StyledCard } from '../styles';

// ----------------------------------------------------------------------

export default function FullScreenOptions() {
  const [fullscreen, setFullscreen] = useState(false);

  const onToggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setFullscreen(true);
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
      setFullscreen(false);
    }
  };

  return (
    <StyledCard
      selected={fullscreen}
      onClick={onToggleFullScreen}
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
      <SvgColor
        src={`/assets/icons/setting/${fullscreen ? 'ic_exit_full_screen' : 'ic_full_screen'}.svg`}
      />
    </StyledCard>
  );
}
