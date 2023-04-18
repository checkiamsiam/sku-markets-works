/* eslint-disable no-restricted-globals */
import { Box, Button, Card, Container, Snackbar, Tab, Tabs, useTheme } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import ActiveSKUProductsMarquee from 'components/common/marquee/ActiveSKUProductsMarquee';
import Iconify from 'components/iconify/Iconify';
import { useSettingsContext } from 'components/settings';
import { useShareProfileMutation } from 'features/auth/authAPI';
import { setUserShare } from 'features/auth/authSlice';
import { m, useScroll, useSpring } from 'framer-motion';
import { forwardRef, useEffect, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Helmet } from 'react-helmet-async';
import { FaShare } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Profile, ProfileCover } from 'sections/@deshboard/user/profile';
import { _userAbout, _userFeeds } from '_mock/arrays';
const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function UserProfilePage() {
  
  const { themeStretch } = useSettingsContext();
  const { id } = useParams();
  const [shareProfile] = useShareProfileMutation();
  const dispatch = useDispatch();
  useEffect(() => {
    if (id) {
      shareProfilehandle(id);
    } else {
      dispatch(setUserShare({}));
    }
    return () => {};
  }, [id]);
  const shareProfilehandle = async () => {
    await shareProfile({ userid: id });
  };
  const user = useSelector((state) => state.user);

  const [currentTab, setCurrentTab] = useState('profile');

  const TABS = [
    {
      value: 'profile',
      label: 'Profile',
      icon: <Iconify icon="ic:round-account-box" />,
      component: <Profile info={_userAbout} posts={_userFeeds} />,
    },
  ];
  const [value, setValue] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCopyUrl = () => {
    setValue(location.href + `/${user?._id}`);
    setCopied(true);
    handleClick();
  };

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  return (
    <>
      <Helmet>
        <title> User: Profile | Minimal UI</title>
      </Helmet>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          The Profile URl are copied
        </Alert>
      </Snackbar>

      <Container sx={{ mt: 20, mb: 4 }} maxWidth={themeStretch ? false : 'lg'}>
        <ActiveSKUProductsMarquee />
        {/* <Typography component="p" sx={{ fontSize: '1.5rem', fontWeight: 'bold', my: 3 }}>
          Seller Profile
        </Typography> */}
        <Card
          sx={{
            mb: 3,
            height: 280,
            position: 'relative',
            marginTop: '10px',
          }}
        >
          <ProfileCover name={user?.displayName} role={_userAbout.role} cover={_userAbout.cover} />

          <Tabs
            value={currentTab}
            onChange={(event, newValue) => setCurrentTab(newValue)}
            sx={{
              width: 1,
              bottom: 0,
              zIndex: 9,
              position: 'absolute',
              bgcolor: 'background.paper',
              '& .MuiTabs-flexContainer': {
                pr: { md: 3 },
                justifyContent: {
                  sm: 'center',
                  md: 'flex-end',
                },
              },
            }}
          >
            {TABS.map((tab) => (
              <Tab key={tab.value} value={tab.value} icon={tab.icon} label={tab.label} />
            ))}
            <CopyToClipboard text={value}>
              <Button onClick={handleCopyUrl} variant="text">
                Share{' '}
                <span style={{ marginLeft: '6px' }}>
                  {' '}
                  <FaShare />{' '}
                </span>{' '}
              </Button>
            </CopyToClipboard>
          </Tabs>
        </Card>

        {TABS.map(
          (tab) => tab.value === currentTab && <Box key={tab.value}> {tab.component} </Box>
        )}
      </Container>
    </>
  );
}
