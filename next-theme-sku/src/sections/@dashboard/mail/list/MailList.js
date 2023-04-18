import PropTypes from 'prop-types';
// @mui
import { LinearProgress, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// utils
import { bgBlur } from '../../../../utils/cssStyles';
// components
import EmptyContent from '../../../../components/empty-content';
import Scrollbar from '../../../../components/scrollbar';
//
import MailItem from './MailItem';

// ----------------------------------------------------------------------

MailList.propTypes = {
  dense: PropTypes.bool,
  isEmpty: PropTypes.bool,
  labels: PropTypes.array,
  mails: PropTypes.object,
  isLoading: PropTypes.bool,
  onSelectMail: PropTypes.func,
  selectedMails: PropTypes.func,
  onDeselectMail: PropTypes.func,
};

export default function MailList({
  mails,
  dense,
  labels,
  isEmpty,
  isLoading,
  onSelectMail,
  selectedMails,
  onDeselectMail,
}) {
  const theme = useTheme();

  const { allIds, byId } = mails;

  return (
    <Stack sx={{ position: 'relative', height: `calc(100% - 80px)` }}>
      {isLoading && (
        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{
            top: 0,
            left: 0,
            width: 1,
            height: 1,
            zIndex: 9,
            position: 'absolute',
            ...bgBlur({ color: theme.palette.background.paper }),
          }}
        >
          <LinearProgress color="inherit" sx={{ width: 1, maxWidth: 320 }} />
        </Stack>
      )}

      {isEmpty && !isLoading ? (
        <EmptyContent
          title="There is no conversation"
          img="/assets/illustrations/illustration_empty_mail.svg"
        />
      ) : (
        <Scrollbar sx={{ height: 1 }}>
          <Stack sx={{ minWidth: { md: 960 } }}>
            {allIds.map((mailId) => (
              <MailItem
                key={mailId}
                dense={dense}
                mail={byId[mailId]}
                selected={selectedMails(mailId)}
                onSelect={() => onSelectMail(mailId)}
                onDeselect={() => onDeselectMail(mailId)}
                getLabel={(labelId) => labels.filter((label) => label.id === labelId)[0]}
              />
            ))}
          </Stack>
        </Scrollbar>
      )}
    </Stack>
  );
}
