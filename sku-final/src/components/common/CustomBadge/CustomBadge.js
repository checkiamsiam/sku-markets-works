import { Box } from '@mui/material';

const CustomBadge = ({ text, color = 'white', bgColor = '#0d6efd' }) => {
  return (
    <Box
      sx={{
        padding: '4px 10px 4px 6px',
        color,
        borderRadius: '5px',
        backgroundColor: bgColor,
        fontSize: '12px',
        display: 'inline-block',
        position: 'relative',
      }}
    >
      {text}
      <div
        class="triangle triangle-1"
        style={{
          display: 'inline-block',
          margin: '0px 5px',
          verticalAlign: 'center',
          width: '10px',
          height: '10px',
          borderBottom: `solid 5px ${bgColor}`,
          borderLeft: `solid 5px ${bgColor}`,
          borderTop: 'solid 5px transparent',
          borderRight: 'solid 5px transparent',
          transform: 'rotate(90deg)',
          position: 'absolute',
          right: '-2px',
          bottom: '-10px',
        }}
      ></div>
    </Box>
  );
};

export default CustomBadge;
