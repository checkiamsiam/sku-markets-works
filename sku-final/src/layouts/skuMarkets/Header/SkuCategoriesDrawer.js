import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Stack,
  Typography
} from '@mui/material';
import Iconify from 'components/iconify/Iconify';
import Scrollbar from 'components/scrollbar/Scrollbar';
import { NAV } from 'config-global';
import { useGetAllCategoriesQuery } from 'features/product/productAPI';
import useAuth from 'hooks/useAuth';
import { NavLink, useLocation } from 'react-router-dom';
import getFullName from 'utils/getFullName';

const CATEGORY = [
  {
    label: 'Toys',
    image:
      'https://sku-final-git-master-skumarketsproduction.vercel.app/assets/images/marketplace/noon-ksa.jpeg',
  },
  {
    label: 'Baby Products',
    image:
      'https://sku-final-git-master-skumarketsproduction.vercel.app/assets/images/marketplace/noon-uae.jpeg',
  },
  {
    label: 'Electronics and Mobiles',
    image:
      'https://sku-final-git-master-skumarketsproduction.vercel.app/assets/images/marketplace/noon-ksa.jpeg',
  },
];

const SkuCategoriesDrawer = ({ open, onClose }) => {
  const user = useAuth();
  const location = useLocation();

  const OPTIONS = [
    { label: 'Shipping and Delivery', path: 'apps/shipping_delivery' },
    { label: 'Accounting & Finance', path: 'apps/shipping_delivery' },
    { label: 'Marketing', path: 'apps/shipping_delivery' },
    { label: 'Analytics', path: 'apps/shipping_delivery' },
    { label: 'Others', path: 'apps/shipping_delivery' },
  ];

  const { data } = useGetAllCategoriesQuery();

  return (
    <>
      <Drawer
        anchor="left"
        open={open}
        onClose={onClose}
        BackdropProps={{
          invisible: true,
        }}
        PaperProps={{
          sx: { width: NAV.W_BASE },
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ pl: 2, pr: 1, py: 2 }}
        >
          {user?.name && <Typography variant="subtitle1">Hello, {user?.name}</Typography>}

          <IconButton onClick={onClose}>
            <Iconify icon="eva:close-fill" />
          </IconButton>
        </Stack>
        <Divider />
        <Scrollbar>
          <List>
            {data?.data?.map((obj, i) => (
              <ListItem disablePadding>
                <Accordion sx={{ width: 1, pl: 1 }}>
                  <AccordionSummary
                    // expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Box
                      key={i}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <img
                        src={`/assets/images/marketplace/${obj?.sku_marketplace
                          .split('/')
                          ?.join('-')
                          ?.toLowerCase()}.jpeg`}
                        width="40px"
                        alt=""
                      />
                      <Typography fontWeight={300} sx={{ fontSize: '14px', paddingLeft: '14px' }}>
                        {getFullName(obj?.sku_marketplace?.replace('/', '-'))}
                      </Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails sx={{ w: '100%' }}>
                    {obj.categories?.map((cat, i) => (
                      <ListItemButton
                        key={i}
                        component={NavLink}
                        to={`/skuMarket_category?name=${encodeURIComponent(
                          cat?.category_en
                        )}&marketplace=${encodeURIComponent(obj?.sku_marketplace)}`}
                        sx={{
                          backgroundColor:
                            location.pathname + location.search ===
                            `/skuMarket_category?name=${encodeURIComponent(
                              cat?.category_en
                            )}&marketplace=${encodeURIComponent(obj?.sku_marketplace)}`
                              ? 'rgba(32, 101, 209, 0.08)'
                              : 'default',
                          mb: 1,
                          fontSize: '13px',
                        }}
                        onClick={onClose}
                      >
                        {cat?.category_en}
                      </ListItemButton>
                    ))}
                  </AccordionDetails>
                </Accordion>
              </ListItem>
            ))}
          </List>
        </Scrollbar>
      </Drawer>
    </>
  );
};

export default SkuCategoriesDrawer;
