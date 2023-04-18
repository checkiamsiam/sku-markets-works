import React from 'react';
import InfoIcon from '@mui/icons-material/Info';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip placement="right" {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
    },
}));

const lightGray = '#0d6efd';

const ThemeTooltip = () => {
    return (
        <HtmlTooltip
            title={
                <>
                    <em>{"And here's"}</em> <b>{'some'}</b> <u>{'amazing content'}</u>.{' '}
                    {"It's very engaging. Right?"}
                </>
            }
        >
            <InfoIcon htmlColor={lightGray} fontSize="3px" />
        </HtmlTooltip>
    );
};

export default ThemeTooltip;
