import InfoIcon from '@mui/icons-material/Info';
import { Card, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { Stack } from '@mui/system';
import { useGetProductDetailQuery } from 'features/product/productAPI';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const ProductAnalysisCardTwo = () => {
    const { id } = useParams();
    const { data: product } = useGetProductDetailQuery(id);
    const [title, setTitle] = useState(product?.title_en?.split(' ').slice(0, 3).join(' '));
    const [tMore, setTmore] = useState(false);
    const [desc, setDesc] = useState(product?.description_en.split(' ').slice(0, 3).join(' '));
    const [dMore, setDmore] = useState(false);

    useEffect(() => {
        setTitle(product?.title_en?.split(' ').slice(0, 3).join(' '));
        setDesc(product?.description_en.split(' ').slice(0, 3).join(' '));
    }, [product?.description_en, product?.title_en]);

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

    // colors
    const lightGray = '#0d6efd';
    return (
        <>
            <Card
                sx={{ padding: '1.5rem', width: { lg: '40%' }, borderRadius: '10px', boxShadow: 3 }}
            >
                <Stack direction="column" spacing={1.5} fontSize="12px" marginTop={5}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <span style={{ width: '50%', fontWeight: 'bold', color: 'text.main' }}>
                            Sku Title:{' '}
                            <HtmlTooltip
                                title={
                                    <>
                                        <em>{"And here's"}</em> <b>{'some'}</b>{' '}
                                        <u>{'amazing content'}</u>. {"It's very engaging. Right?"}
                                    </>
                                }
                            >
                                <InfoIcon htmlColor={lightGray} fontSize="3px" />
                            </HtmlTooltip>
                        </span>
                        <span style={{ width: '50%', color: 'text.main' }}>
                            {title}
                            {tMore ? (
                                <span
                                    style={{
                                        color: lightGray,
                                        cursor: 'pointer',
                                        paddingLeft: '2px',
                                    }}
                                    onClick={() => {
                                        setTmore(false);
                                        setTitle(
                                            product?.title_en?.split(' ').slice(0, 3).join(' ')
                                        );
                                    }}
                                >
                                    Less
                                </span>
                            ) : (
                                <span
                                    style={{
                                        color: lightGray,
                                        cursor: 'pointer',
                                        paddingLeft: '2px',
                                    }}
                                    onClick={() => {
                                        setTitle(product?.title_en);
                                        setTmore(true);
                                    }}
                                >
                                    More...
                                </span>
                            )}
                        </span>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <span style={{ width: '50%', fontWeight: 'bold', color: 'text.main' }}>
                            Sku Category:{' '}
                            <HtmlTooltip
                                title={
                                    <>
                                        <em>{"And here's"}</em> <b>{'some'}</b>{' '}
                                        <u>{'amazing content'}</u>. {"It's very engaging. Right?"}
                                    </>
                                }
                            >
                                <InfoIcon htmlColor={lightGray} fontSize="3px" />
                            </HtmlTooltip>
                        </span>
                        <span style={{ width: '50%' }}>
                            <Link href="/category" underline="none" sx={{ color: lightGray }}>
                                {product?.category_en}
                            </Link>
                        </span>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <span style={{ width: '50%', fontWeight: 'bold', color: 'text.main' }}>
                            Sku Type:{' '}
                            <HtmlTooltip
                                title={
                                    <>
                                        <em>{"And here's"}</em> <b>{'some'}</b>{' '}
                                        <u>{'amazing content'}</u>. {"It's very engaging. Right?"}
                                    </>
                                }
                            >
                                <InfoIcon htmlColor={lightGray} fontSize="3px" />
                            </HtmlTooltip>
                        </span>
                        <span style={{ width: '50%', color: 'text.main' }}>
                            {product?.sku_sub_type_en}
                        </span>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <span style={{ width: '50%', fontWeight: 'bold', color: 'text.main' }}>
                            Sku Sub-Type:{' '}
                            <HtmlTooltip
                                title={
                                    <>
                                        <em>{"And here's"}</em> <b>{'some'}</b>{' '}
                                        <u>{'amazing content'}</u>. {"It's very engaging. Right?"}
                                    </>
                                }
                            >
                                <InfoIcon htmlColor={lightGray} fontSize="3px" />
                            </HtmlTooltip>
                        </span>
                        <span style={{ width: '50%', color: 'text.main' }}>
                            {product?.sku_sub_type_en}
                        </span>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <span style={{ width: '50%', fontWeight: 'bold', color: 'text.main' }}>
                            Sku Brand:{' '}
                            <HtmlTooltip
                                title={
                                    <>
                                        <em>{"And here's"}</em> <b>{'some'}</b>{' '}
                                        <u>{'amazing content'}</u>. {"It's very engaging. Right?"}
                                    </>
                                }
                            >
                                <InfoIcon htmlColor={lightGray} fontSize="3px" />
                            </HtmlTooltip>
                        </span>
                        <span style={{ width: '50%', color: lightGray }}>
                            {' '}
                            <Link href="/brand" underline="none">
                                {product?.brand_en}
                            </Link>
                        </span>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <span style={{ width: '50%', fontWeight: 'bold', color: 'text.main' }}>
                            Sku Description:{' '}
                            <HtmlTooltip
                                title={
                                    <>
                                        <em>{"And here's"}</em> <b>{'some'}</b>{' '}
                                        <u>{'amazing content'}</u>. {"It's very engaging. Right?"}
                                    </>
                                }
                            >
                                <InfoIcon htmlColor={lightGray} fontSize="3px" />
                            </HtmlTooltip>
                        </span>
                        <span style={{ width: '50%', color: 'text.main' }}>
                            {desc}
                            {dMore ? (
                                <span
                                    style={{
                                        color: lightGray,
                                        cursor: 'pointer',
                                        paddingLeft: '2px',
                                    }}
                                    onClick={() => {
                                        setDmore(false);
                                        setDesc(
                                            product?.description_en.split(' ').slice(0, 3).join(' ')
                                        );
                                    }}
                                >
                                    Less
                                </span>
                            ) : (
                                <span
                                    style={{
                                        color: lightGray,
                                        cursor: 'pointer',
                                        paddingLeft: '2px',
                                    }}
                                    onClick={() => {
                                        setDesc(product?.description_en);
                                        setDmore(true);
                                    }}
                                >
                                    More...
                                </span>
                            )}
                        </span>
                    </Stack>
                </Stack>
            </Card>
        </>
    );
};

export default ProductAnalysisCardTwo;
