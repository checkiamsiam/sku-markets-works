import { useDropzone } from 'react-dropzone';
// @mui
import { styled, alpha } from '@mui/material/styles';
//
import Iconify from '../iconify';
import { MdBackup } from 'react-icons/md';
import DeleteIcon from '@mui/icons-material/Delete';
import { Stack, Typography, IconButton } from '@mui/material';

// ----------------------------------------------------------------------

const StyledDropZone = styled('div')(({ theme }) => ({
  width: '100%',
  height: '350px',
  fontSize: 24,
  display: 'flex',
  cursor: 'pointer',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  marginLeft: 'auto',
  marginRight: 'auto',
  color: theme.palette.text.disabled,
  borderRadius: theme.shape.borderRadius,
  border: `dashed 1px ${theme.palette.divider}`,
  backgroundColor: alpha(theme.palette.grey[500], 0.08),
  '&:hover': {
    opacity: 0.72,
  },
}));

// ----------------------------------------------------------------------

export default function UploadPDF({ placeholder, file, error, disabled, onDelete, sx, ...other }) {
  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    disabled,
    ...other,
  });

  const hasFile = !!file;
  const isError = isDragReject || error;

  return (
    <StyledDropZone
      disabled={hasFile}
      {...getRootProps()}
      sx={{
        ...(isDragActive && {
          opacity: 0.72,
        }),
        ...(isError && {
          color: 'error.main',
          bgcolor: 'error.lighter',
          borderColor: 'error.light',
        }),
        ...(disabled && {
          opacity: 0.48,
          pointerEvents: 'none',
        }),
        ...sx,
      }}
    >
      <input {...getInputProps()} />

      <Placeholder isDragActive={isDragActive} hasFile={hasFile} />

    </StyledDropZone>
  );
}

const Placeholder = ({ hasFile, isDragActive, ...other }) => {
  return (
    <Stack direction='column' alignItems='center' justifyContent='center' spacing={2} sx={{opacity: hasFile ? 0 : 1}}>
      <Typography
      sx={{
        fontSize: '70px',
        lineHeight: '13px',
        color: isDragActive ? 'primary.main' : '#1562ff80',
      }}
    >
      <MdBackup />
    </Typography>
    <Typography
      sx={{
        fontSize: '14px',
        color: isDragActive ? 'primary.main' : 'gray',
        lineHeight: '13px',
      }}
    >
      {isDragActive ? 'Drop the file here' : 'Drop or click to upload'}
    </Typography>
  </Stack>
)}
