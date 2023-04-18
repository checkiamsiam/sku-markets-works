import React from 'react';
import { m } from 'framer-motion';
import { alpha, Box, Button, Paper } from '@mui/material';
import { MotionViewport, varFade } from 'components/animate';
import TextMaxLine from 'components/text-max-line/TextMaxLine';
import { Icon } from '@iconify/react';
import { browsers } from './browsers';
import { Link } from 'react-router-dom';

const HelpBrowse = () => {
  return (
    <>
      <Box
        component={MotionViewport}
        gap={2.5}
        display="grid"
        gridTemplateColumns={{
          md: 'repeat(4, 1fr)',
          lg: 'repeat(4, 1fr)',
          xs:'repeat(1,1fr)'
        }}
        sx={{ mb: 10 }}
      >
        {browsers?.map((browse) => (
          <m.div key={browse.title} variants={varFade().in}>
            <Paper
              variant="outlined"
              sx={{
                px: 3,
                py: 5,
                borderRadius: 2,
                textAlign: 'center',
                borderColor: (theme) => alpha(theme.palette.grey[500], 0.12),
                '&:hover': {
                  boxShadow: (theme) => theme.customShadows.z24,
                },
              }}
            >
              {browse?.image ? (
                <Box
                component='img'
                  alt={browse.title}
                  src={browse.image}
                  sx={{ mb: 2, width: 100, height: 85, mx: 'auto' }}
                />
              ) : (
                <Box
                  component={Icon}
                  icon={browse?.icon}
                  sx={{ mb: 2, width: 80, height: 80, mx: 'auto', color: '#0D6EFD' }}
                />
              )}

              <TextMaxLine variant="subtitle2" persistent>
                {browse.title}
              </TextMaxLine>
              <Button component={Link} sx={{textDecoration:'none',color:'text.main'}} to={`/help_center/${browse.title}`}variant='text'>{browse.label}</Button>
            </Paper>
          </m.div>
        ))}
      </Box>
    </>
  );
};

export default HelpBrowse;
