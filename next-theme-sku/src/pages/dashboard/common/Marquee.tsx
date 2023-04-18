import { Container } from '@mui/material';
import Image from 'next/image';
import Marquee from 'react-fast-marquee';
import style from 'styles/Marquee.module.css';
import TopBarLogo from '../../../assets/Image/svg/noon-saudi.svg';

const items = [
  {
    _id: 1,
    image: TopBarLogo,
    brand: 'N35997789A',
  },
  {
    _id: 2,
    image: TopBarLogo,
    brand: 'N35997789A',
  },
  {
    _id: 3,
    image: TopBarLogo,
    brand: 'N35997789A',
  },
  {
    _id: 4,
    image: TopBarLogo,
    brand: 'N35997789A',
  },
  {
    _id: 5,
    image: TopBarLogo,
    brand: 'N35997789A',
  },
  {
    _id: 6,
    image: TopBarLogo,
    brand: 'N35997789A',
  },
  {
    _id: 7,
    image: TopBarLogo,
    brand: 'N35997789A',
  },
  {
    _id: 8,
    image: TopBarLogo,
    brand: 'N35997789A',
  },
  {
    _id: 9,
    image: TopBarLogo,
    brand: 'N35997789A',
  },
  {
    _id: 10,
    image: TopBarLogo,
    brand: 'N35997789A',
  },
  {
    _id: 11,
    image: TopBarLogo,
    brand: 'N35997789A',
  },
  {
    _id: 12,
    image: TopBarLogo,
    brand: 'N35997789A',
  },
  {
    _id: 13,
    image: TopBarLogo,
    brand: 'N35997789A',
  },
  {
    _id: 14,
    image: TopBarLogo,
    brand: 'N35997789A',
  },
  {
    _id: 15,
    image: TopBarLogo,
    brand: 'N35997789A',
  },
  {
    _id: 16,
    image: TopBarLogo,
    brand: 'N35997789A',
  },
];

const SKUMarquee = () => {
  return (
    <div
      style={{ padding: '10px', marginTop: '50px', marginBottom: '50px' }}
      className={style.marqueeContainer}
    >
      <Container maxWidth="xl">
        <Marquee pauseOnHover loop={0} speed={50}>
          <div className={style.marqueeStyle}>
            {items.map((item) => (
              <div key={item._id} className={style.marqueeContentStyle}>
                <div>
                  <Image
                    src={item.image}
                    alt={item.brand}
                    height={item.brand === 'amazon' ? 15 : 15}
                    width={100}
                    className={style.marqueeImgStyle}
                  />
                </div>

                <p
                  style={{
                    fontWeight: '600',
                    color: '#0d6efd',
                    marginRight: '8px',
                    marginLeft: '8px',
                  }}
                >
                  {item.brand}
                </p>
                <p>$1199.21</p>

                <p
                  style={{
                    fontWeight: '400',
                    color: 'red',
                    marginRight: '8px',
                    marginLeft: '8px',
                  }}
                >
                  -2.021%
                </p>
              </div>
            ))}
          </div>
        </Marquee>
      </Container>
    </div>
  );
};

export default SKUMarquee;
