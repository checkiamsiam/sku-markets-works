import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { Card, Chip, Link, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import useAuth from 'hooks/useAuth';
import { BsWhatsapp } from 'react-icons/bs';

const DeliveryMethod = () => {
    const user = useAuth();
    return (
        <Card sx={{ boxShadow: 3, borderRadius: 1, mx: 5, my: 3 }}>
            <Box sx={{ m: 2, color: 'text.main' }}>
                <Typography variant="h6">Delivery Method</Typography>
                <Typography variant="caption">
                    Please follow the instructions below to connect your WhatsApp
                </Typography>
                <Box sx={{ pt: 3 }}>
                    <Chip
                        sx={{ color: 'text.main', bgcolor: 'transparent', fontSize: '18px' }}
                        icon={<BsWhatsapp style={{ color: '#27C469', fontSize: '22px' }} />}
                        label="WhatsApp"
                    />
                </Box>
                <Typography variant="caption">
                    SKU Markets Bot is
                    {user.isWhatsappVerified ?
                        <span style={{ color: 'green' }}> connected</span> :
                        <span style={{ color: 'red' }}> not connected</span>
                    }
                </Typography>
                <Box sx={{ py: 1 }}>
                    <Typography variant="caption" gutterBottom>
                        To connect the bot to your WhatsApp account:
                    </Typography>
                    <Stack direction="column" sx={{ pl: 5 }}>
                        <Typography variant="caption">
                            1. Install WhatsApp on your phone, on your desktop, or access the web
                            version.
                        </Typography>
                        <Typography variant="caption">
                            2. Add your WhatsApp number in your account settings to connect your
                            WhatsApp number with SKU Markets Bot.
                        </Typography>
                        <Typography variant="caption">
                            3. Verify your WhatsApp number from your account Settings page.
                        </Typography>
                        <Typography variant="caption">
                            4. Your account becomes linked. You can refresh this page and check it.
                        </Typography>
                    </Stack>
                </Box>
                <Box sx={{ pt: 1 }}>
                    <Chip
                        sx={{ color: 'text.main', bgcolor: 'transparent', fontSize: '18px' }}
                        icon={<MailOutlineIcon />}
                        label="Email"
                    />
                </Box>
                <Typography variant="caption">
                    Active E-mail is:
                    <span>
                        {' '}
                        <Link href="#" underline="none">
                            {user?.email}
                        </Link>
                    </span>
                </Typography>
            </Box>
        </Card>
    );
};

export default DeliveryMethod;
