const { Link } = require('react-router-dom');

const MPLogo = ({ hight = 20, width = 50, marketplace, link = true }) => {
  const url = marketplace?.split('/')?.join('-')?.toLowerCase();

  if (!link) {
    return (
      <img
        src={`/assets/images/marketplace/${url}.jpeg`}
        alt={marketplace}
        style={{
          height: `${hight}px`,
          width: `${width}px`,
          display: 'inline-block',
        }}
      />
    );
  }

  return (
    <Link to={`/marketplace/${url}`}>
      <img
        src={`/assets/images/marketplace/${url}.jpeg`}
        alt={marketplace}
        style={{
          height: `${hight}px`,
          width: `${width}px`,
          display: 'inline-block',
        }}
      />
    </Link>
  );
};

export default MPLogo;
