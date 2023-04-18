import { useGetConversationDetailsQuery } from 'features/chat/chat.api';
import useChat from 'hooks/useChat';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import Lightbox from '../../../../components/lightbox';
import Scrollbar from '../../../../components/scrollbar';
import ChatMessageItem from './ChatMessageItem';

ChatMessageList.propTypes = {
  conversation: PropTypes.object,
};

export default function ChatMessageList({ conversation }) {
  const scrollRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(-1);
  const [imagesLightbox, setImagesLightbox] = useState([]);

  useEffect(() => {
    const scrollMessagesToBottom = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    };
    scrollMessagesToBottom();
  }, [conversation.messages]);

  const handleOpenLightbox = (imageUrl) => {
    setImagesLightbox([{ src: imageUrl }]);
    setSelectedImage(0);
  };

  const handleCloseLightbox = () => {
    setSelectedImage(-1);
  };

  const { participant, conversationDetails } = useChat();

  const partnerID = participant?.partner?._id;

  const { data: newData } = useGetConversationDetailsQuery(
    {
      id: partnerID,
      query: `page=1&limit=1000&sort=-createdAt&fields=message,type,createdAt,senderId,receiverId,receiver,sender`,
    },
    {
      skip: !partnerID,
    }
  );

  return (
    <>
      <Scrollbar
        scrollableNodeProps={{
          ref: scrollRef,
        }}
        sx={{ p: 3, height: 1 }}
      >
        {newData &&
          newData?.data?.map((message) => (
            <ChatMessageItem
              key={message?._id}
              message={message}
              onOpenLightbox={() => handleOpenLightbox(message.message)}
            />
          ))}
      </Scrollbar>

      <Lightbox
      index={0}
      slides={imagesLightbox}
      open={selectedImage >= 0}
      close={handleCloseLightbox}
      />
    </>
  );
}
