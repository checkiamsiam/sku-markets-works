import { Stack, Typography } from '@mui/material';
import SKUMarquee from 'components/common/marquee';
import SvgColor from 'components/svg-color/SvgColor';
import { Chat } from 'sections/@deshboard/chat';
import { Helmet } from 'react-helmet-async';

const ChatPage = () => {
  return (
    <>
      <Helmet>
        <title>Chat | SKU Markets</title>
      </Helmet>

      {/*<SKUMarquee />*/}
      <Stack direction="row" justifyContent="space-between" sx={{ my: 3, mx: 5 }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <SvgColor
            src="/assets/icons/navbar/ic_chat_outline.svg"
            sx={{ width: '25px', height: '25px' }}
          />
          <Typography>Chat</Typography>
        </Stack>
      </Stack>
      <Chat />
    </>
  );
};

export default ChatPage;
