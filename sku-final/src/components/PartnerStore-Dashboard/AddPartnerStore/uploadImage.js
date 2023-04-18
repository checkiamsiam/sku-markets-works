import DeleteIcon from '@mui/icons-material/Delete';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { MdBackup } from 'react-icons/md';
import ImageUploading from 'react-images-uploading';

const UploadLogoImage = () => {
  const [images, setImages] = useState([]);
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };
  return (
    <ImageUploading
      multiple={false}
      value={images}
      onChange={onChange}
      maxNumber={1}
      dataURLKey="data_url"
    >
      {({
        imageList,
        onImageUpload,
        onImageRemoveAll,
        onImageUpdate,
        onImageRemove,
        isDragging,
        dragProps,
      }) => (
        // write your building UI
        <div className="upload__image-wrapper">
          {imageList.length <= 0 ? (
            <Button onClick={onImageUpload} {...dragProps} sx={{ width: '100%' }}>
              <Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '70px',
                      lineHeight: '13px',
                      color: isDragging ? 'red' : '#1562ff80',
                    }}
                  >
                    <MdBackup />
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '14px',
                      color: isDragging ? 'red' : 'gray',
                      lineHeight: '13px',
                    }}
                  >
                    Drop or click to upload
                  </Typography>
                </Box>
              </Box>
            </Button>
          ) : (
            <Stack direction="row" justifyContent="center">
              {imageList.map((image, index) => (
                <div key={index} className="image-item">
                  <img src={image['data_url']} alt="" width="100" />
                  <div className="image-item__btn-wrapper">
                    <IconButton
                      onClick={() => onImageUpdate(index)}
                      color="primary"
                      aria-label="upload picture"
                      component="label"
                    >
                      <DynamicFeedIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => onImageRemove(index)}
                      color="primary"
                      aria-label="upload picture"
                      component="label"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </div>
              ))}{' '}
            </Stack>
          )}
        </div>
      )}
    </ImageUploading>
  );
};

export default UploadLogoImage;
