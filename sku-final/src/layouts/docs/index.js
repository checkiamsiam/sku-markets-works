import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuIcon from '@mui/icons-material/Menu';
import { Divider } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/styles';
import { Stack } from '@mui/system';
import { HEADER } from 'config-global';
import useOffSetTop from 'hooks/useOffSetTop';
import PropTypes from 'prop-types';
import * as React from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/SKU-Market-Logo.svg';

const drawerWidth = 240;
const Docs = (props) => {
  const theme = useTheme();
  const isOffset = useOffSetTop(HEADER.H_MAIN_DESKTOP);
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const location = useLocation();
  const router = useParams
  const navigate = useNavigate();

  const OPTIONS = [
    { label: 'Shipping and Delivery', path: 'apps/shipping_delivery' },
    { label: 'Accounting & Finance', path: 'apps/shipping_delivery' },
    { label: 'Marketing', path: 'apps/shipping_delivery' },
    { label: 'Analytics', path: 'apps/shipping_delivery' },
    { label: 'Others', path: 'apps/shipping_delivery' },
  ];

  const handleClick = (p) => {
    navigate(p);
    setMobileOpen(false);
  };

  const drawer = (
    <Box sx={{ mt: 10 }}>
      <Typography variant="caption" sx={{ fontWeight: 700, px: 3, fontSize: '11px', mb: 3 }}>
        GETTING STARTED
      </Typography>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => handleClick('/apps/introduction')}
            sx={{
              backgroundColor:
                location.pathname === '/apps/introduction' ? 'rgba(32, 101, 209, 0.08)' : 'default',
              mx: 1,
              borderRadius: 1,
              mb: 1,
            }}
          >
            <ListItemText primary="Introduction " />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <Accordion sx={{ w: '100%', pl: 1 }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Categories</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ w: '100%' }}>
              {OPTIONS.map((ctgry, i) => (
                <ListItemButton
                  key={i}
                  onClick={() => handleClick(ctgry.path)}
                  sx={{
                    backgroundColor:
                      location.pathname === ctgry.path ? 'rgba(32, 101, 209, 0.08)' : 'default',
                    mb: 1,
                  }}
                >
                  {ctgry.label}
                </ListItemButton>
              ))}
            </AccordionDetails>
          </Accordion>
        </ListItem>
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          color="transparent"
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)`, md: '100%' },
            ml: { sm: `${drawerWidth}px` },
            background: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(20px)',
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
        >
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={0.5}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
              <Box component={Link} to="/" sx={{ textDecoration: 'none' }}>
                <img src={logo} alt="SKU Markets" width={150} />
              </Box>
            </Stack>
            <Box
              component={Link}
              to="/help_center"
              sx={{
                color: theme.palette.mode === 'dark' ? 'white' : 'black',
                textDecoration: 'none',
                fontSize: '13px',
                fontWeight: 600,
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              Need Help?
            </Box>
          </Toolbar>
        </AppBar>
        {location.pathname === '/signup' || <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>}
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        >
          <Toolbar />
          <Outlet />
        </Box>
      </Box>
    </>
  );
};
Docs.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};
export default Docs;
