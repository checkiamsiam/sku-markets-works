import { FormControl, MenuItem, OutlinedInput, Select } from '@mui/material';
import LoadingScreen from 'components/loading-screen/LoadingScreen';
import { useGetAllWatchListsQuery } from 'features/watchList/watchListAPI';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const SelectedWatchlist = ({ view, select, setSelect, setView }) => {
  const { data, isLoading } = useGetAllWatchListsQuery();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <FormControl sx={{ minWidth: { xs: '100%', md: 250 } }} size="small">
        <Select
          sx={{
            borderRadius: 1,
          }}
          displayEmpty
          value={view?.name || select}
          input={<OutlinedInput />}
          MenuProps={MenuProps}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <>{data[0].name}</>;
            }
            return view?.name || data[0].name;
          }}
          inputProps={{ 'aria-label': 'Without label' }}
          onChange={(e) => {
            setSelect(e.target.value);
          }}
        >
          {data?.map((mi) => (
            <MenuItem
              onClick={() => {
                setView(mi);
              }}
              key={mi._id}
              value={mi.name}
            >
              {mi.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default SelectedWatchlist;
