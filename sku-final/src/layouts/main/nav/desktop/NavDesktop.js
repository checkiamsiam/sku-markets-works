/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
import PropTypes from 'prop-types';
// @mui
import { Stack } from '@mui/material';
// @mui
import { Link } from '@mui/material';
import { useLocation } from 'react-router';
import { HashLink } from 'react-router-hash-link';
// ----------------------------------------------------------------------

NavDesktop.propTypes = {
  data: PropTypes.array,
  isOffset: PropTypes.bool,
};

const links = [
  {
    title: 'Home',
    path: '/#home',
  },
  {
    title: 'SKU Markets',
    path: '/become_partner/#TrySkuMarket',
  },
  {
    title: 'How it works!',
    path: '/become_partner/#MarketSolution',
  },
  {
    title: 'FAQ',
    path: '/become_partner/#FAQSection',
  },
  {
    title: 'Pricing Plans',
    path: '/become_partner/#PricingPlans',
  },
  {
    title: 'Contact Us',
    path: '/become_partner/#ContactUs',
  },
];

export default function NavDesktop({ isOffset, data }) {
  let location = useLocation();

  return (
    <Stack component="nav" direction="row" spacing={4}>
      {links.map((link) => (
        <NavList key={link.title} link={link} />
      ))}
    </Stack>
  );
}

const NavList = ({ link }) => {
  const { title, path } = link;

  return (
    <Link
      sx={{ color: '#0d6efd', fontSize: { md: 14, lg: 16 } }}
      component={HashLink}
      to={path || `/`}
      underline="none"
      color="inherit"
    >
      {title}
    </Link>
  );
};
