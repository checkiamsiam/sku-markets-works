import { Button, Card, Paper } from '@mui/material';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import SKUMarquee from 'components/common/marquee';
import SvgColor from 'components/svg-color/SvgColor';
import { useGetAllWatchListsQuery } from 'features/watchList/watchListAPI';
import { useEffect, useState } from 'react';
import WatchlistDataTable from '../WatchlistDataTable';
import AddNewWatchlist from './AddNewWatchlist';
import DataStorage from './DataStorage';
import Edit from './Edit';
import NewWatchlist from './NewWatchlist';
import Remove from './Remove';
import SearchWatchlist from './SearchWatchlist';
import SelectedWatchlist from './SelectedWatchlist';

/* Paper style */
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.subtitle1,
  padding: theme.spacing(1),
  textAlign: 'center',
  boxShadow: 'none',
  bgcolor: 'background.paper',
  color: theme.palette.text.main,
}));

const WatchlistTable = () => {
  const [search, setSearch] = useState([]);
  const [select, setSelect] = useState('');
  const [addNew, setAddNew] = useState(false);
  const handleCloseNew = () => setAddNew(false);
  const handleShowNew = () => setAddNew(true);

  // console.log(select);

  // Pop -Up Edit
  const [edit, setEdit] = useState(false);
  const handleCloseEdit = () => setEdit(false);
  const handleShowEdit = () => setEdit(true);

  // Pop -Up Remove
  const [remove, setRemove] = useState(false);
  const handleCloseRemove = () => setRemove(false);
  const handleShowRemove = () => setRemove(true);

  const { data, refetch, isLoading } = useGetAllWatchListsQuery();
  const [view, setView] = useState(data?.[0]);
  useEffect(() => {
    setView(data?.[0]);
  }, [data]);

  const [skuOnView, setSkuOnView] = useState(false);
  return (
    <>
      <SKUMarquee />
      <Stack direction="row" justifyContent="space-between" sx={{ my: 3, mx: 5 }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <SvgColor
            src="/assets/icons/navbar/ic_watchlist.svg"
            sx={{ width: '25px', height: '25px' }}
          />
          <Typography>My Watchlists</Typography>
        </Stack>
      </Stack>
      {data?.length ? (
        <>
          {skuOnView && <DataStorage view={view} />}
          <Card sx={{ boxShadow: 3, borderRadius: 1, mx: 5 }}>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={{ xs: 1, sm: 1, md: 1 }}
              sx={{ m: 3 }}
            >
              <Item>
                <SearchWatchlist view={view} />
              </Item>
              <Item>
                <SelectedWatchlist
                  view={view}
                  setView={setView}
                  select={select}
                  setSelect={setSelect}
                  data={data}
                />
              </Item>
              <Item>
                <Button
                  sx={{
                    xs: '100%',
                    boxShadow: 3,
                    fontSize: '13px',
                    textTransform: 'capitalize',
                  }}
                  color="inherit"
                  onClick={handleShowNew}
                >
                  Add New Watchlist
                </Button>
                <AddNewWatchlist
                  addNew={addNew}
                  data={data}
                  refetch={refetch}
                  handleCloseNew={handleCloseNew}
                />
              </Item>

              <Item>
                <Button
                  sx={{
                    minWidth: { xs: '100%', md: 70 },
                    boxShadow: 3,
                    fontSize: '13px',
                    textTransform: 'capitalize',
                  }}
                  color="inherit"
                  onClick={handleShowEdit}
                >
                  Edit
                </Button>
                <Edit
                  edit={edit}
                  data={data}
                  view={view}
                  setView={setView}
                  handleCloseEdit={handleCloseEdit}
                />
              </Item>
              <Item>
                <Button
                  sx={{
                    minWidth: { xs: '100%' },
                    boxShadow: 3,
                    fontSize: '13px',
                    textTransform: 'capitalize',
                  }}
                  color="inherit"
                  onClick={handleShowRemove}
                >
                  Remove
                </Button>
                <Remove
                  remove={remove}
                  view={view}
                  data={data}
                  refetch={refetch}
                  setView={setView}
                  handleCloseRemove={handleCloseRemove}
                />
              </Item>
            </Stack>
            <WatchlistDataTable setSkuOnView={setSkuOnView} view={view} />
          </Card>
        </>
      ) : (
        <NewWatchlist refetch={refetch} setSearch={setSearch} />
      )}
    </>
  );
};

export default WatchlistTable;
