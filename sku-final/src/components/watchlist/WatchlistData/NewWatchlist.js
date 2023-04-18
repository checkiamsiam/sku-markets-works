import AddIcon from '@mui/icons-material/Add';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Box, Button, Card, IconButton, Paper, TextField } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useCreateWatchListMutation } from 'features/watchList/watchListAPI';
import { useState } from 'react';

const styleM = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { md: '40vw', xs: '90vw', sm: '90vw' },
    borderRadius: 2,
    boxShadow: 0,
    bgcolor: 'background.paper',
    px: 3,
    py: 1,
};

const Item = styled(Paper)(({ theme }) => ({
    bgcolor: 'background.paper',
    ...theme.typography.subtitle1,
    padding: theme.spacing(1),
    textAlign: 'center',
    boxShadow: 'none',
    color: theme.palette.text.main,
}));

const NewWatchlist = ({ refetch, setSearch }) => {
    const [createWatchList, { isLoading }] = useCreateWatchListMutation();
    /* New */
    const [newD, setNewD] = useState('');
    const [openNew, setOpenNew] = useState(false);
    const handleCloseNewD = () => setOpenNew(false);
    const handleShowNewD = () => setOpenNew(true);

    const handleCreate = async () => {
        await createWatchList({ name: newD });
        refetch();
        setNewD('');
        setSearch('');
        handleCloseNewD();
    };
    return (
        <>
            <Card sx={{ boxShadow: 3, borderRadius: 1, mx: 5, py: 2 }}>
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={{ xs: 1, sm: 1, md: 1 }}
                    sx={{ m: 3 }}
                >
                    <Item>
                        <Button
                            variant="outlined"
                            startIcon={<AddIcon />}
                            sx={{
                                minWidth: { xs: '100%' },
                                fontSize: '13px',
                                textTransform: 'capitalize',
                                px:3
                            }}
                            onClick={handleShowNewD}
                        >
                            New
                        </Button>
                        <Modal
                            aria-labelledby="transition-modal-title"
                            aria-describedby="transition-modal-description"
                            open={openNew}
                            onClose={handleCloseNewD}
                            closeAfterTransition
                            BackdropComponent={Backdrop}
                            BackdropProps={{
                                timeout: 500,
                            }}
                        >
                            <Fade in={openNew}>
                                <Box sx={styleM}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            mb: 1,
                                        }}
                                    >
                                        <Typography
                                            id="transition-modal-title"
                                            variant="h6"
                                            component="h2"
                                        >
                                            New watchlist
                                        </Typography>
                                        <IconButton
                                            sx={{ color: 'text.main' }}
                                            onClick={handleCloseNewD}
                                        >
                                            <CloseOutlinedIcon />
                                        </IconButton>
                                    </Box>

                                    <TextField
                                        fullWidth
                                        sx={{ mt: 2, mb: 5 }}
                                        id="outlined-basic"
                                        label="Enter Watchlist Title"
                                        variant="outlined"
                                        value={newD}
                                        onChange={(e) => {
                                            setNewD(e.target.value);
                                        }}
                                    />
                                    <Box sx={{ textAlign: 'end', mb: 2 }}>
                                        <Button
                                            variant="outlined"
                                            sx={{ color: 'text.main' }}
                                            onClick={handleCloseNewD}
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
                                            onClick={handleCreate}
                                            disabled={newD.length === 0 || isLoading}
                                        >
                                            Create
                                        </Button>
                                    </Box>
                                </Box>
                            </Fade>
                        </Modal>
                    </Item>
                </Stack>
            </Card>
        </>
    );
};

export default NewWatchlist;
