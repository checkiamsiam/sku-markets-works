import PropTypes from 'prop-types';
// @mui
import { Stack } from '@mui/material';
//
// next
import NextLink from 'next/link';
// @mui
import { Link } from '@mui/material';
// ----------------------------------------------------------------------

NavDesktop.propTypes = {
  data: PropTypes.array,
  isOffset: PropTypes.bool,
};

const links = [
  {
    title: 'Home',
    path: '/',
  },
  {
    title: 'About',
    path: '/about',
  },
];

export default function NavDesktop({ isOffset, data }) {
  return (
    <Stack component="nav" direction="row" spacing={5} sx={{ mr: 5, height: 1 }}>
      {links.map((link) => (
        <NavList key={link.title} link={link} />
      ))}
    </Stack>
  );
}

const NavList = ({ link }) => {
  const { title, path } = link;

  return (
    <Link component={NextLink} href={path} underline="none">
      {title}
    </Link>
  );
};
