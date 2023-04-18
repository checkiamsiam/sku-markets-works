import { styled } from '@mui/material/styles';
import { varFade } from 'components/animate/variants/fade';
import { m } from 'framer-motion';
import { textGradient } from 'utils/cssStyles';

const AnimatedGradiantText = ({ children }) => {
  const StyledGradientText = styled(m.p)(({ theme }) => ({
    ...textGradient(
      `300deg, ${theme.palette.primary.main} 0%, ${theme.palette.warning.main} 25%, ${theme.palette.primary.main} 50%, ${theme.palette.warning.main} 75%, ${theme.palette.primary.main} 100%`
    ),
    fontSize: `16px`,
    fontWeight: 'bold',
    marginRight: 2,
    paddingLeft: '15px',
    backgroundSize: '400%',
    textAlign: 'center',
    lineHeight: 1,
    padding: 0,
    [theme.breakpoints.up('md')]: {
      fontSize: `16px`,
    },
  }));
  return (
    <m.div variants={varFade().in}>
      <StyledGradientText
        animate={{ backgroundPosition: '200% center' }}
        transition={{
          repeatType: 'reverse',
          ease: 'linear',
          duration: 20,
          repeat: Infinity,
        }}
      >
        {children}
      </StyledGradientText>
    </m.div>
  );
};

export default AnimatedGradiantText;
