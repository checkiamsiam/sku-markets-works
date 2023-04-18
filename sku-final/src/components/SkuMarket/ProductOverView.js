import { Box, Typography } from '@mui/material';
import { useState } from 'react';

const ProductOverView = ({ title, type, subType, description }) => {
  const [desc, setDesc] = useState(description?.split(' ').slice(0, 55).join(' '));
  const [dMore, setDmore] = useState(false);

  return (
    <Box sx={{ display: 'flex', py: 2 }}>
      <Box>
        <Typography component="p" sx={{ fontSize: '14px', fontWeight: 'bold', px: 4, my: 1 }}>
          SKU Title:
        </Typography>

        <Typography component="p" sx={{ fontSize: '14px', fontWeight: 'bold', px: 4, my: 1 }}>
          SKU Type:
        </Typography>
        <Typography component="p" sx={{ fontSize: '14px', fontWeight: 'bold', px: 4, my: 1 }}>
          SKU Sub- Type:
        </Typography>
        <Typography component="p" sx={{ fontSize: '14px', fontWeight: 'bold', px: 4, my: 1 }}>
          SKU Description:
        </Typography>
      </Box>
      <Box>
        <Typography component="p" sx={{ fontSize: '14px', px: 4, my: 1 }}>
          {title}
        </Typography>

        <Typography component="p" sx={{ fontSize: '14px', px: 4, my: 1 }}>
          {type}
        </Typography>
        <Typography component="p" sx={{ fontSize: '14px', px: 4, my: 1 }}>
          {subType}
        </Typography>
        <Typography component="p" sx={{ fontSize: '14px', px: 4, my: 1 }}>
          {desc}
          {dMore ? (
            <span
              style={{
                color: '#0d6efd',
                cursor: 'pointer',
                paddingLeft: '2px',
              }}
              onClick={() => {
                setDmore(false);
                setDesc(description.split(' ').slice(0, 55).join(' '));
              }}
            >
              Less
            </span>
          ) : (
            <span
              style={{
                color: '#0d6efd',
                cursor: 'pointer',
                paddingLeft: '2px',
              }}
              onClick={() => {
                setDesc(description);
                setDmore(true);
              }}
            >
              More...
            </span>
          )}
        </Typography>
      </Box>
    </Box>
  );
};

export default ProductOverView;
