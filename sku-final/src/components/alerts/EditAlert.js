import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import {
  Autocomplete,
  Backdrop,
  Button,
  Checkbox,
  Fade,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputBase,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import { useState } from 'react';

const styleM = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { md: '47vw', xs: '95vw', sm: '95vw' },
    bgcolor: 'background.paper',
    //   border: "1px solid #000",
    borderRadius: 3,
    boxShadow: 0,
    px: 3,
    py: 1,
};

const Item = styled(Paper)(({ theme }) => ({
    bgcolor: 'background.paper',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.main,
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const EditAlert = ({ openEditAlert, handleCloseAlertEdit }) => {
    const sku = [
        { label: 'Amazon' },
        { label: 'Google' },
        { label: 'Asus' },
        { label: 'Microsoft' },
        { label: 'iphone' },
    ];
    const alert_type = [
        { label: 'Price Range' },
        { label: 'Price Moves Above' },
        { label: 'Price Moves Below' },
        { label: 'Stock Range' },
        { label: 'Stock Moves Above' },
        { label: 'Stock Moves Below' },
        { label: 'Stores Range' },
        { label: 'Stores Moves Above' },
        { label: 'Stores Moves Below' },
        { label: 'SKU to Stores' },
        { label: 'SKU to Fulfilment' },
    ];

    const [value, setValue] = useState('');
    const [type, setType] = useState('Price Range');
    // console.log(type);
    const [view, setView] = useState(false);
    const [checked, setChecked] = useState(false);
    return (
        <>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openEditAlert}
                onClose={handleCloseAlertEdit}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openEditAlert}>
                    <Box sx={styleM}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                mb: 1,
                            }}
                        >
                            <Typography id="transition-modal-title" variant="h6" component="h2">
                                Add New Alert
                            </Typography>
                            <IconButton sx={{ color: 'text.main' }} onClick={handleCloseAlertEdit}>
                                <CloseOutlinedIcon />
                            </IconButton>
                        </Box>

                        <Box sx={{ width: '100%' }}>
                            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                <Grid item xs={6}>
                                    <Item>
                                        <FormControl sx={{ width: '100%' }} size="small">
                                            <label>SKU/ASIAN/MPN</label>
                                            <Autocomplete
                                                id="optn-select-demo"
                                                sx={{
                                                    borderRadius: 1,
                                                }}
                                                options={sku}
                                                autoHighlight
                                                getOptionLabel={(option) => option.label}
                                                renderInput={(params) => (
                                                    <TextField
                                                        sx={{ fontSize: '13px' }}
                                                        {...params}
                                                        placeholder={sku[0].label}
                                                        value={value}
                                                        size="small"
                                                        onBlur={(e) => {
                                                            setValue(e.target.value);
                                                        }}
                                                        inputProps={{
                                                            ...params.inputProps,
                                                            autoComplete: 'new-password', // disable autocomplete and autofill
                                                        }}
                                                    />
                                                )}
                                            />
                                        </FormControl>
                                    </Item>
                                </Grid>
                                <Grid item xs={6}></Grid>
                                <Grid item xs={6}>
                                    <Item>
                                        <FormControl sx={{ width: '100%' }} size="small">
                                            <label>Alert Type</label>
                                            <Select
                                                sx={{
                                                    fontSize: '15px',
                                                    textTransform: 'capitalize',
                                                    borderRadius: 1,
                                                }}
                                                displayEmpty
                                                value={type}
                                                input={<OutlinedInput />}
                                                MenuProps={MenuProps}
                                                renderValue={(selected) => {
                                                    if (selected.length === 0) {
                                                        return <>{alert_type[0].label}</>;
                                                    }
                                                    return selected;
                                                }}
                                                inputProps={{ 'aria-label': 'Without label' }}
                                                onChange={(e) => {
                                                    setType(e.target.value);
                                                }}
                                            >
                                                {alert_type?.map((mi) => (
                                                    <MenuItem
                                                        onClick={() => {
                                                            setView(mi);
                                                        }}
                                                        key={mi.label}
                                                        value={mi.label}
                                                    >
                                                        {mi.label}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Item>
                                </Grid>
                                <Grid item xs={6}>
                                    <Item>
                                        <Typography>
                                            Description <br />
                                            <span style={{ fontSize: '12px' }}>
                                                {type === 'Price Range' ||
                                                type === 'Stock Range' ||
                                                type === 'Stores Range'
                                                    ? ` Notifies when ${
                                                          type === 'Price Range'
                                                              ? 'price'
                                                              : type === 'Stock Range'
                                                              ? 'stock'
                                                              : 'stores'
                                                      } exiting the range.`
                                                    : `Notifies when the ${
                                                          type === 'Price Moves Below' ||
                                                          type === 'Price Moves Above'
                                                              ? 'price'
                                                              : type === 'Stock Moves Below' ||
                                                                type === 'Stock Moves Above'
                                                              ? 'stock'
                                                              : type === 'Stores Moves Below' ||
                                                                type === 'Stores Moves Above'
                                                              ? 'stores'
                                                              : 'SKU'
                                                      } reaches the condition value.`}
                                            </span>
                                        </Typography>
                                    </Item>
                                </Grid>
                                {type === 'Price Range' ||
                                type === 'Stock Range' ||
                                type === 'Stores Range' ? (
                                    <>
                                        <Grid item xs={6}>
                                            <Item>
                                                <FormControl sx={{ width: '100%' }}>
                                                    <label>
                                                        {type === 'Price Range'
                                                            ? 'Price'
                                                            : type === 'Stock Range'
                                                            ? 'Stock'
                                                            : 'Stores'}{' '}
                                                        moves below
                                                    </label>
                                                    <InputBase
                                                        sx={{
                                                            px: 1,
                                                            flex: 1,
                                                            width: '100%',
                                                            boxShadow: 0,
                                                            border: '1px solid gray',
                                                            borderRadius: 1,
                                                        }}
                                                        type="text"
                                                    />
                                                </FormControl>
                                            </Item>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Item>
                                                <FormControl sx={{ width: '100%' }}>
                                                    <label>
                                                        {type === 'Price Range'
                                                            ? 'Price'
                                                            : type === 'Stock Range'
                                                            ? 'Stock'
                                                            : 'Stores'}{' '}
                                                        moves avobe
                                                    </label>
                                                    <InputBase
                                                        sx={{
                                                            px: 1,
                                                            flex: 1,
                                                            width: '100%',
                                                            boxShadow: 0,
                                                            border: '1px solid gray',
                                                            borderRadius: 1,
                                                        }}
                                                        type="text"
                                                    />
                                                </FormControl>
                                            </Item>
                                        </Grid>
                                    </>
                                ) : (
                                    <>
                                        {type === 'SKU to Stores' ||
                                        type === 'SKU to Fulfilment' ? (
                                            <></>
                                        ) : (
                                            <>
                                                {type === 'Price Moves Below' ||
                                                type === 'Stock Moves Below' ||
                                                type === 'Stores Moves Below' ? (
                                                    <Grid item xs={6}>
                                                        <Item>
                                                            <FormControl sx={{ width: '100%' }}>
                                                                <label>
                                                                    {type === 'Price Moves Below'
                                                                        ? 'Price'
                                                                        : type ===
                                                                          'Stock Moves Below'
                                                                        ? 'Stock'
                                                                        : 'Stores'}{' '}
                                                                    moves below
                                                                </label>
                                                                <InputBase
                                                                    sx={{
                                                                        px: 1,
                                                                        flex: 1,
                                                                        width: '100%',
                                                                        boxShadow: 0,
                                                                        border: '1px solid gray',
                                                                        borderRadius: 1,
                                                                    }}
                                                                    type="text"
                                                                />
                                                            </FormControl>
                                                        </Item>
                                                    </Grid>
                                                ) : (
                                                    <Grid item xs={6}>
                                                        <Item>
                                                            <FormControl sx={{ width: '100%' }}>
                                                                <label>
                                                                    {type === 'Price Moves Above'
                                                                        ? 'Price'
                                                                        : type ===
                                                                          'Stock Moves Above'
                                                                        ? 'Stock'
                                                                        : 'Stores'}{' '}
                                                                    moves above
                                                                </label>
                                                                <InputBase
                                                                    sx={{
                                                                        px: 1,
                                                                        flex: 1,
                                                                        width: '100%',
                                                                        boxShadow: 0,
                                                                        border: '1px solid gray',
                                                                        borderRadius: 1,
                                                                    }}
                                                                    type="text"
                                                                />
                                                            </FormControl>
                                                        </Item>
                                                    </Grid>
                                                )}
                                            </>
                                        )}
                                    </>
                                )}
                            </Grid>

                            <FormControl sx={{ width: '100%', my: 2 }}>
                                <label>Comment</label>
                                <InputBase
                                    sx={{
                                        px: 1,
                                        flex: 1,
                                        width: '100%',
                                        boxShadow: 0,
                                        border: '1px solid gray',
                                        borderRadius: 1,
                                    }}
                                    type="text"
                                />
                            </FormControl>
                            <Stack
                                direction="row"
                                alignItems="center"
                                justifyContent="left"
                                spacing={1}
                            >
                                <span
                                    style={{
                                        fontSize: '15px',
                                        color: 'text.main',
                                        fontWeight: 500,
                                    }}
                                >
                                    Delivery Method
                                </span>
                                <FormControlLabel
                                    control={<Checkbox />}
                                    label="WhatsApp"
                                    name="whatsapp"
                                    id="whatsapp"
                                    value="whatsapp"
                                    checked={checked}
                                    onChange={(e) => setChecked(!checked)}
                                />
                                <FormControlLabel
                                    control={<Checkbox />}
                                    label="Email"
                                    name="email"
                                    id="email"
                                    value="email"
                                    checked={checked}
                                    onChange={(e) => setChecked(e.target.checked)}
                                />
                            </Stack>
                            <Box
                                sx={{
                                    p: 2,
                                    border: '1px solid #a9d5de',
                                    borderRadius: 1,
                                    my: 2,
                                    color: '#a9d5de',
                                }}
                            >
                                <Typography sx={{ fontWeight: 'bold' }}>Summery</Typography>
                                <Typography variant="caption" sx={{ fontSize: '14px' }}>
                                    Alert me one time when Quant (QNT) price is &gt;= $ 113.1.
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ textAlign: 'end', mb: 2 }}>
                            <Button
                                variant="outlined"
                                sx={{ color: 'text.main' }}
                                onClick={handleCloseAlertEdit}
                            >
                                Cancel
                            </Button>

                            <Button
                                sx={{
                                    bgcolor: 'primary.main',
                                    color: (theme) =>
                                        theme.palette.mode === 'light'
                                            ? 'common.white'
                                            : 'grey.800',
                                    '&:hover': {
                                        bgcolor: 'white',
                                        color: (theme) =>
                                            theme.palette.mode === 'light'
                                                ? 'primary.main'
                                                : 'primary.main',
                                        border: (theme) =>
                                            `1px solid ${theme.palette.primary.main}`,
                                    },
                                    mx: 2,
                                }}
                                onClick={handleCloseAlertEdit}
                            >
                                Update
                            </Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </>
    );
};

export default EditAlert;
