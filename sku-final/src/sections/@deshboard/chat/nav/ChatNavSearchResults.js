import { Avatar, ListItemButton, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import SearchNotFound from '../../../../components/search-not-found';

ChatNavSearchResults.propTypes = {
  searchResults: PropTypes.array,
  onSelectContact: PropTypes.func,
  searchContacts: PropTypes.string,
};

export default function ChatNavSearchResults({ searchContacts, searchResults, onSelectContact }) {
  const isNotFound = !searchResults.length && !!searchContacts;

  return (
    <>
      <Typography
        paragraph
        variant="h6"
        sx={{
          px: 2.5,
        }}
      >
        Contacts
      </Typography>

      {isNotFound ? (
        <SearchNotFound
          query={searchContacts}
          sx={{
            p: 3,
            mx: 'auto',
            width: `calc(100% - 40px)`,
            bgcolor: 'background.neutral',
          }}
        />
      ) : (
        <>
          {searchResults.map((result) => (
            <ListItemButton
              key={result._id}
              onClick={() => onSelectContact(result)}
              sx={{
                px: 2.5,
                py: 1.5,
                typography: 'subtitle2',
              }}
            >
              <Avatar alt={result?.partner?.name} src={result?.partner?.avatar} sx={{ mr: 2 }} />
              {result?.partner?.name}
            </ListItemButton>
          ))}
        </>
      )}
    </>
  );
}
