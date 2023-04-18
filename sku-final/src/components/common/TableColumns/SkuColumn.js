import { Box } from '@mui/material';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { Link as DomLink } from 'react-router-dom';

export default function SkuColumn({ row }) {
    return (
        <Box sx={{ width: '100%' }}>
            <Stack direction="row" alignItems={'center'} spacing={2}>
                <Box
                    component="img"
                    src={row?.all_images[0]}
                    alt="product img"
                    sx={{ width: 50, height: 50, objectFit: 'cover' }}
                />
                <Stack spacing={0}>
                    <Link
                        component={DomLink}
                        lineHeight={1}
                        fontSize={12}
                        to={`/product/${row?.id}`}
                    >
                        {row?.sku}
                    </Link>
                    <Link
                        component={DomLink}
                        fontSize={12}
                        color="text.secondary"
                        lineHeight={1}
                        to={`/brand/${row?.brand_en}`}
                    >
                        {row?.brand_en}
                    </Link>
                    <Link
                        component={DomLink}
                        fontSize={12}
                        lineHeight={1}
                        color="text.secondary"
                        to={`/category/${row?.category_en}`}
                    >
                        {row?.category_en}
                    </Link>
                </Stack>
            </Stack>
        </Box>
    );
}
