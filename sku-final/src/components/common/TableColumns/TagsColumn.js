import { useTheme } from '@emotion/react';
import Label from 'components/label/Label';

const TagsColumn = ({ row }) => {
    const theme = useTheme();
    const isLight = theme.palette.mode === 'light';

    const tags = row?.tags;
    if (tags?.length > 0) {
        return tags.map((tag) => (
            <Label
                variant={isLight ? 'soft' : 'filled'}
                color={tag === 'Hot' ? 'error' : 'success'}
                sx={{ mx: 'auto' }}
            >
                {tag}
            </Label>
        ));
    } else {
        return (
            <Label variant={isLight ? 'soft' : 'filled'} color={'warning'} sx={{ mx: 'auto' }}>
                None
            </Label>
        );
    }
};

export default TagsColumn;
