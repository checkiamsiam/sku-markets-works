import { LinearProgress } from '@material-ui/core';
import { Box, Stack, Typography } from '@mui/material';
import { useRef, useState } from 'react';
import { MdBackup } from 'react-icons/md';

const TransactionFileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const inputRef = useRef();

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleFileUpload = () => {
    // Use the selectedFile state to upload the file
    // Update the uploadProgress state as needed
  };

  return (
    <div>
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileSelect}
        style={{ display: 'none' }}
        ref={inputRef}
      />
      <Stack
        direction="row"
        onClick={() => inputRef.current.click()}
        justifyContent="center"
        sx={{
          cursor: 'pointer',
          py: 2,
          mb: 1,
          ':hover': {
            backgroundColor: '#F5F5F5',
          },
        }}
      >
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
              color: '#1562ff80',
            }}
          >
            <MdBackup />
          </Typography>
          <Typography
            sx={{
              fontSize: '14px',
              color: 'gray',
              lineHeight: '13px',
            }}
          >
            Drop or click to upload
          </Typography>
        </Box>
      </Stack>

      {selectedFile && (
        <div>
          <LinearProgress variant="determinate" value={uploadProgress} />
          <p>{selectedFile.name}</p>
        </div>
      )}
    </div>
  );
};

export default TransactionFileUpload;
