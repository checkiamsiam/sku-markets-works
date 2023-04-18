import { Button, Card, Fab, InputBase, Stack } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useSendMessageMutation } from 'features/chat/chat.api';
import { useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Iconify from '../../../../../components/iconify';

export default function ProfilePostInput() {
  const fileInputRef = useRef(null);
  const [sendMessage] = useSendMessageMutation();
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const params = useParams();

  const handleClickAttach = () => {
    fileInputRef.current?.click();
  };

  const handleSend = (event) => {
    navigate('/chat');
    if (message) {
      sendMessage({
        message,
        receiver: params.id,
      });
    }
    setMessage('');
  };

  const handelFileImport = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('chat_file', file);
    formData.append('type', 'file');
    formData.append('receiver', params.id);
    navigate('/chat');

    // send message
    sendMessage(formData);
  };

  return (
    <Card sx={{ p: 3 }}>
      <InputBase
        multiline
        fullWidth
        rows={4}
        placeholder="Share what you are thinking here..."
        sx={{
          p: 4,
          mb: 3,
          borderRadius: 1,
          border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.32)}`,
        }}
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      />

      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" spacing={1} alignItems="center" sx={{ color: 'text.secondary' }}>
          <Fab size="small" color="inherit" variant="softExtended" onClick={handleClickAttach}>
            <Iconify icon="ic:round-perm-media" width={24} sx={{ color: 'success.main' }} />
            Image/File
          </Fab>
        </Stack>

        <Button
          variant="contained"
          sx={{
            bgcolor: 'primary.main',
            color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
            '&:hover': {
              bgcolor: 'white',
              color: (theme) => (theme.palette.mode === 'light' ? 'primary.main' : 'primary.main'),
              border: (theme) => `1px solid ${theme.palette.primary.main}`,
            },
            border: (theme) => `1px solid ${theme.palette.primary.main}`,
          }}
          onClick={handleSend}
        >
          Chat
        </Button>
      </Stack>

      <input
        ref={fileInputRef}
        onChange={handelFileImport}
        type="file"
        style={{ display: 'none' }}
      />
    </Card>
  );
}
