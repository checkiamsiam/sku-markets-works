import { Link } from '@mui/material';
import Lightbox from 'components/lightbox/Lightbox';
import { useState } from 'react';

const ShowAllImage = ({ row }) => {
  const allImg = row.all_images;
  const [selectedImage, setSelectedImage] = useState(-1);
  const [imagesLightbox, setImagesLightbox] = useState([]);

  const handleCloseLightbox = () => {
    setSelectedImage(-1);
  };

  const handleOpenLightBox = () => {
    setImagesLightbox([]);
    for (const imageUrl of allImg) {
      setImagesLightbox((imagesLightbox) => [...imagesLightbox, { src: imageUrl }]);
    }
    setSelectedImage(0);
  };

  return (
    <>
      <Link onClick={handleOpenLightBox} href="#" underline="none" sx={{ fontSize: '14px' }}>
        View All Images
      </Link>
      <Lightbox
        index={0}
        slides={imagesLightbox}
        open={selectedImage >= 0}
        close={handleCloseLightbox}
      />
    </>
  );
};

export default ShowAllImage;
