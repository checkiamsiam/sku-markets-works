import { Container, Typography } from '@mui/material';
import FaqsHero from 'components/helpCenter/FaqsHero';
import HelpArticles from 'components/helpCenter/HelpArticles';
import HelpBrowse from 'components/helpCenter/HelpBrowse';

const HelpCenter = () => {
    return (
        <>
        <FaqsHero text1 = 'How' text2 ='can' text3 = 'we' text4 = 'help' text5 = 'you?'/>
        <Container id='#help_center' sx={{ pt: 7, pb: 10, position: 'relative' , zIndex: 1 }}>
        {/* <FaqsCategory /> */}
        <HelpBrowse/>
        <Typography sx={{ my: 3 }}>All Topics</Typography>
        <HelpArticles/>
      </Container>
        </>
    );
};

export default HelpCenter;