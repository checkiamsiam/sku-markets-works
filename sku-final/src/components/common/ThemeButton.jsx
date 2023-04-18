import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const ThemeButton = styled(Button)(({ theme }) => ({
    color: theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
    '&:hover': {
        backgroundColor: 'white',
        color: theme.palette.primary.main,
        border: `1px solid ${theme.palette.primary.main}`,
    },
    '&.Mui-disabled': {
        cursor: 'no-drop',
        pointerEvents: 'auto',

        '&:hover': {
            boxShadow: 'none',
        },
    },

    border: `1px solid ${theme.palette.primary.main}`,
}));

export default ThemeButton;
