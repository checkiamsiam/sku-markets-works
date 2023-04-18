import React from 'react';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import Box from '@mui/material/Box/Box';

const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

const ShippedRate = ({starValue, starHover, setStarHover, setStarValue}) => {
    return (
        <>
          <Box
                sx={{
                //   width: 200,
                  display: 'flex',
                  alignItems: 'center',
                  ml:1
                }}
              >
                <Rating
                  name="hover-feedback"
                  value={starValue}
                  size='small'
                  precision={0.5}
                  onChange={(event, newValue) => {
                    setStarValue(newValue);
                  }}
                  onChangeActive={(event, newHover) => {
                    setStarHover(newHover);
                  }}
                  emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                />
              </Box>
        </>
    );
};

export default ShippedRate;