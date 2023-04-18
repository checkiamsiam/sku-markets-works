import { Avatar, Collapse, Divider, Stack, Typography } from '@mui/material';
import useChat from 'hooks/useChat';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Iconify from '../../../../components/iconify';
import ChatRoomCollapseButton from './ChatRoomCollapseButton';

ChatRoomSingle.propTypes = {
  isCollapse: PropTypes.bool,
  onCollapse: PropTypes.func,
  participant: PropTypes.object,
};

export default function ChatRoomSingle({ isCollapse, onCollapse }) {
  const { participant } = useChat();

  if (!participant) {
    return null;
  }

  return (
    <div>
      <Stack alignItems="center" sx={{ py: 4 }}>
        <Avatar
          key={participant?.partner?._id}
          alt={participant?.partner?.name}
          src={participant?.partner?.avatar}
          sx={{ width: 96, height: 96, mb: 2 }}
        />

        <Typography
          component={Link}
          variant="subtitle1"
          to={`/UserProfile/${participant?.partner?._id}`}
          sx={{color: "primary.main"}}
        >
          {participant?.partner?.name}
        </Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
          {participant.role}
        </Typography>
      </Stack>

      <Divider />

      <ChatRoomCollapseButton isCollapse={isCollapse} onCollapse={onCollapse}>
        information
      </ChatRoomCollapseButton>

      <Collapse in={isCollapse}>
        <Stack
          spacing={2}
          sx={{
            p: (theme) => theme.spacing(2, 2.5, 2.5, 2.5),
          }}
        >
          {[
            {
              icon: 'eva:pin-fill',
              value: participant?.partner?.address || 'N/A',
            },
            { icon: 'eva:phone-fill', value: participant?.partner?.phone || 'N/A' },
            { icon: 'eva:email-fill', value: participant?.partner?.email || 'N/A' },
          ].map((row, index) => (
            <Stack key={row.icon} direction="row">
              <Iconify
                icon={row.icon}
                sx={{
                  mr: 1,
                  mt: 0.5,
                  flexShrink: 0,
                  color: 'text.disabled',
                }}
              />
              <Typography variant="body2" noWrap={index === 2}>
                {row.value}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Collapse>
    </div>
  );
}
