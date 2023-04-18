import { IconButton, InputAdornment, InputBase, Stack, useTheme } from '@mui/material';
import { useSendMessageMutation } from 'features/chat/chat.api';
import useChat from 'hooks/useChat';
import { useRef, useState } from 'react';
import Iconify from '../../../../components/iconify';
import EmojiPicker from 'emoji-picker-react';
import MenuPopover from 'components/menu-popover';

export default function ChatMessageInput({ disabled, conversationId, onSend, sx, ...other }) {
  const theme = useTheme();
  const fileInputRef = useRef(null);
  const { participant } = useChat();
  const [message, setMessage] = useState('');
  const [sendMessage] = useSendMessageMutation();
  const [showEmojiPicker, setShowEmojiPicker] = useState(null);

  const handleSend = (event) => {
    if (event.key === 'Enter') {
      if (message) {
        sendMessage({
          message,
          receiver: participant?.partner?._id,
        });
      }
      setMessage('');
    }
  };

  const handelPhotoImport = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('chat_file', file);
    formData.append('type', 'photo');
    formData.append('receiver', participant?.partner?._id);

    // send message
    sendMessage(formData);
  };

  const handelFileImport = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('chat_file', file);
    formData.append('type', 'file');
    formData.append('receiver', participant?.partner?._id);

    // send message
    sendMessage(formData);
  };

  const id = Boolean(showEmojiPicker) ? 'emojiPopover' : undefined;

  return (
    <>
      <InputBase
        value={message}
        onKeyUp={handleSend}
        onChange={(event) => setMessage(event.target.value)}
        onFocus={() => setShowEmojiPicker(false)}
        placeholder="Type a message"
        startAdornment={
          <InputAdornment position="start">

            <IconButton aria-describedby={id} size="small" onClick={(e) => setShowEmojiPicker(e.currentTarget)} >
              <Iconify icon="eva:smiling-face-fill" />
            </IconButton>

            <MenuPopover
              id={id}
              open={Boolean(showEmojiPicker)}
              anchorEl={showEmojiPicker}
              onClose={() => setShowEmojiPicker(null)}
              sx={{ p: 0 }}
              arrow='bottom-left'
            >
              <EmojiPicker
                theme={theme.palette.mode === 'light' ? 'light' : 'dark'}
                height={350}
                previewConfig={{showPreview: false}}
                skinTonesDisabled
                onEmojiClick={(emojiData, e) => setMessage(prev => prev + emojiData.emoji)}
              />
            </MenuPopover>
          </InputAdornment>
        }
        endAdornment={
          <Stack direction="row" spacing={1} sx={{ flexShrink: 0, mr: 1.5 }}>
            <IconButton
              onChange={handelPhotoImport}
              color="primary"
              aria-label="upload picture"
              component="label"
            >
              <input hidden accept="image/*" type="file" />
              <Iconify icon="ic:round-add-photo-alternate" />
            </IconButton>

            <IconButton
              onChange={handelFileImport}
              color="primary"
              aria-label="upload file"
              component="label"
            >
              <input hidden type="file" />
              <Iconify icon="eva:attach-2-fill" />
            </IconButton>
          </Stack>
        }
        sx={{
          pl: 1,
          height: 56,
          flexShrink: 0,
          borderTop: (theme) => `solid 1px ${theme.palette.divider}`,
          ...sx,
        }}
        {...other}
      />

      <input type="file" ref={fileInputRef} style={{ display: 'none' }} />
    </>
  );
}
