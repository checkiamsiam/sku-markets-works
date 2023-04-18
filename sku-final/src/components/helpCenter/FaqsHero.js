import { m } from 'framer-motion';
// @mui
import {
  Container,
  InputAdornment,
  ListItemButton,
  ListItemText,
  Stack,
  TextField,
} from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import { MotionContainer, TextAnimate, varFade } from 'components/animate';
import Iconify from 'components/iconify/Iconify';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import BrowsersAnswers from './BrowsersAnswers';

const StyledRoot = styled('div')(({ theme }) => ({
  position: 'relative',
  zIndex: 5,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundImage:
    'url(/assets/background/overlay_1.svg), url(/assets/images/faqs/sku-market-default-cover-profile.jpg)',
  padding: theme.spacing(10, 0),
  [theme.breakpoints.up('md')]: {
    height: 560,
    padding: 0,
  },
}));

const StyledContent = styled('div')(({ theme }) => ({
  textAlign: 'center',
  [theme.breakpoints.up('md')]: {
    bottom: 80,
    textAlign: 'left',
    position: 'absolute',
  },
}));

export default function FaqsHero({ text1, text2, text3, text4, text5 }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState('');
  const { ANSWERS } = BrowsersAnswers();

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = ANSWERS?.filter((value) => {
      return value.q?.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === '') {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };
  return (
    <StyledRoot>
      <Container component={MotionContainer}>
        <StyledContent>
          <div>
            <TextAnimate text={text1} sx={{ color: 'primary.main' }} variants={varFade().inRight} />
            <br />

            <Stack spacing={2} display="inline-flex" direction="row" sx={{ color: 'common.white' }}>
              <TextAnimate text={text2} />
              <TextAnimate text={text3} />
              <TextAnimate text={text4} />
              <TextAnimate text={text5} />
            </Stack>
          </div>

          <m.div variants={varFade().inUp}>
            <TextField
              placeholder="Search support..."
              value={wordEntered}
              onChange={handleFilter}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                position: 'relative',
                mt: 5,
                '& fieldset': { display: 'none' },
                '& .MuiOutlinedInput-root': {
                  width: 280,
                  color: 'common.white',
                  typography: 'subtitle1',
                  border: (theme) => `solid 1px ${alpha(theme.palette.common.white, 0.24)}`,
                  transition: (theme) =>
                    theme.transitions.create(['box-shadow', 'width', 'background-color'], {
                      duration: theme.transitions.duration.shorter,
                    }),
                  '&.Mui-focused': {
                    color: 'grey.800',
                    bgcolor: 'common.white',
                    width: { sm: 320 },
                    boxShadow: (theme) => theme.customShadows.z20,
                  },
                },
              }}
            />
            <div>
              {filteredData.length !== 0 && (
                <Box
                  sx={{
                    position: 'absolute',
                    zIndex: 500,
                    bgcolor: 'background.paper',
                    borderRadius: 1,
                    mt: 1,
                  }}
                >
                  {filteredData.slice(0, 5).map((value) => (
                    <ListItemButton
                      component={Link}
                      to={`/help_center/${value.title}/${value.q}`}
                      key={value.q}
                      sx={{ py: 1, px: 2.5, mt: '1px', mb: 0.2, zIndex: 1 }}
                    >
                      <ListItemText sx={{ fontSize: '13px' }} disableTypography primary={value.q} />
                    </ListItemButton>
                  ))}
                </Box>
              )}
            </div>
          </m.div>
        </StyledContent>
      </Container>
    </StyledRoot>
  );
}
