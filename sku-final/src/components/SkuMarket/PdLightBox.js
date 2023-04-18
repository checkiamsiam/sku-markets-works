import React from 'react';
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";

const PdLightBox = ({index,slides,open,close,onGetCurrentIndex}) => {
    
    return (
       <Lightbox
        index={index}
        slides={slides}
        open={open}
        close={close}
        onGetCurrentIndex={onGetCurrentIndex}
        plugins={[Zoom,Thumbnails,Fullscreen]}
      />
    );
};

export default PdLightBox;