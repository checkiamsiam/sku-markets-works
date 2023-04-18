import React from 'react';
import { m } from 'framer-motion';
import { alpha, Box, Button, Paper } from '@mui/material';
import { MotionViewport, varFade } from 'components/animate';
import TextMaxLine from 'components/text-max-line/TextMaxLine';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import { articles } from './articles';

const HelpArticles = () => {

  return (
    <>
    <Box
        component={MotionViewport}
        gap={2.5}
        display="grid"
        gridTemplateColumns={{
          md: 'repeat(5, 1fr)',
          lg: 'repeat(5, 1fr)',
          xs:'repeat(1,1fr)'
        }}
        sx={{ mb: 15 }}
      >
        {articles?.map((article) => (
          <m.div key={article.title} variants={varFade().in}>
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
            
                <Box
                  component={Icon}
                  icon={article?.icon}
                  sx={{ mb: 2, width: 50, height: 50, mx: 'auto', color:'primary.main' }}
                />


              <TextMaxLine variant="subtitle2" persistent>
                {article.title}
              </TextMaxLine>
              <Button component={Link} sx={{textDecoration:'none',color:'text.main'}} to={`/help_center/${article.title}`}variant='text'>See All {article?.questions?.length} Articles</Button>
            </Paper>
          </m.div>
        ))}
      </Box>
    </>
  );
};

export default HelpArticles;
